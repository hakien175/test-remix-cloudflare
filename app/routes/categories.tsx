import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Categories" },
    { name: "description", content: "List of categories" },
  ];
};

type Category = {
  id: number;
  name: string;
  // Thêm các trường khác nếu cần
};

type LoaderData = {
  categories: Category[];
  lastUpdated: string;
};

// Hàm để lấy số lượng categories từ database
async function getCategoryCount(env: any) {
  // Thay thế bằng logic truy vấn database thực tế
  // Ví dụ: return await env.DB.prepare("SELECT COUNT(*) as count FROM categories").first();
  return { count: 10 }; // Giả lập
}

// Hàm để lấy danh sách categories từ database
async function getCategories(env: any) {
  // Thay thế bằng logic truy vấn database thực tế
  // Ví dụ: return await env.DB.prepare("SELECT * FROM categories").all();
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
  }));
}

export async function loader({ request, context }: LoaderFunctionArgs) {
  const env = context.cloudflare;
  const cacheKey = "categories-list";
  const cacheTime = 10 * 60; // 10 phút
  
  // Kiểm tra cache
  const cache = await caches.open("categories-cache");
  const cachedResponse = await cache.match(cacheKey);
  
  if (cachedResponse) {
    const data = await cachedResponse.json();
    
    // Kiểm tra xem cache có hết hạn chưa
    const now = Date.now();
    const lastUpdated = new Date(data.lastUpdated).getTime();
    
    if (now - lastUpdated < cacheTime * 1000) {
      // Cache còn hạn, trả về dữ liệu từ cache
      return json(data);
    }
    
    // Cache hết hạn, kiểm tra count
    const currentCount = await getCategoryCount(env);
    const previousCount = data.categories.length;
    
    if (currentCount.count === previousCount) {
      // Không có thay đổi, cập nhật thời gian và tiếp tục sử dụng cache
      const updatedData = {
        ...data,
        lastUpdated: new Date().toISOString()
      };
      
      await cache.put(
        cacheKey,
        new Response(JSON.stringify(updatedData), {
          headers: { "Content-Type": "application/json" }
        })
      );
      
      return json(updatedData);
    }
  }
  
  // Lấy dữ liệu mới
  const categories = await getCategories(env);
  const data: LoaderData = {
    categories,
    lastUpdated: new Date().toISOString()
  };
  
  // Lưu vào cache
  await cache.put(
    cacheKey,
    new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    })
  );
  
  return json(data, {
    headers: {
      "Cache-Control": `max-age=${cacheTime}, s-maxage=${cacheTime}`
    }
  });
}

export default function Categories() {
  const { categories, lastUpdated } = useLoaderData<typeof loader>();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <p className="text-sm text-gray-500 mb-4">
        Last updated: {new Date(lastUpdated).toLocaleString()}
      </p>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <li 
            key={category.id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}