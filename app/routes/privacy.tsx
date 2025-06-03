import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - ABCya3" },
    { name: "description", content: "Privacy Policy for ABCya3. Learn how we collect, use, and protect your information." }
  ];
};

export default function Privacy() {
  return (
    <div className="container">
      <div className="privacy-page">
        <h1>Privacy Policy</h1>
        
        <div className="privacy-intro">
          <p>
            At ABCya3, we are committed to protecting your privacy and the privacy of children who use our website.
            This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.
          </p>
          <p>
            Last updated: June 1, 2023
          </p>
        </div>
        
        <section className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information in the following ways:
          </p>
          <h3>1.1 Information You Provide</h3>
          <p>
            We may collect information that you provide directly to us, such as when you:
          </p>
          <ul>
            <li>Create an account or register for our services</li>
            <li>Contact us for customer support or information</li>
            <li>Subscribe to our newsletters or updates</li>
            <li>Participate in surveys, contests, or promotions</li>
          </ul>
          <p>
            This information may include your name, email address, and other contact details.
          </p>
          
          <h3>1.2 Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device and usage, including:
          </p>
          <ul>
            <li>IP address and device identifiers</li>
            <li>Browser type and operating system</li>
            <li>Pages viewed and time spent on our website</li>
            <li>Referring website or source</li>
            <li>General geographic location (such as country or city)</li>
          </ul>
        </section>
        
        <section className="privacy-section">
          <h2>2. How We Use Information</h2>
          <p>
            We use the information we collect for the following purposes:
          </p>
          <ul>
            <li>To provide and maintain our website and services</li>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To send you updates, newsletters, or other communications that you have requested</li>
            <li>To improve our website, content, and user experience</li>
            <li>To monitor and analyze usage patterns and trends</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>
            We do not use personal information for targeted advertising to children or to create profiles of children for commercial purposes.
          </p>
        </section>
        
        {/* Additional sections would continue here */}
        
        <section className="privacy-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:privacy@abcya3clone.com">privacy@abcya3clone.com</a><br />
            Address: 123 Education Lane, Learning City, ED 12345
          </p>
        </section>
      </div>
    </div>
  );
}



