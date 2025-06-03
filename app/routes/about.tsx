import { Link } from "@remix-run/react";

export default function About() {
  return (
    <div className="container">
      <div className="about-page">
        <h1>About ABCya3</h1>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            ABCya3 is dedicated to providing free educational games and apps for kids. 
            Our mission is to make learning fun and engaging through interactive digital content 
            that helps children develop essential skills while having fun.
          </p>
          <p>
            We believe that educational games can be a powerful tool for learning, 
            offering children the opportunity to practice academic skills in an 
            environment that feels like play rather than work.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            ABCya3 was created by a team of educators and developers who saw 
            the need for high-quality, educational games that children would actually 
            enjoy playing. What started as a small collection of games has grown into 
            a comprehensive platform used by millions of children, teachers, and parents worldwide.
          </p>
          <p>
            Our team continues to develop new games and improve existing ones based on 
            educational standards and feedback from our users. We're committed to creating 
            content that is not only fun but also pedagogically sound.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Educational Value</h2>
          <p>
            All of our games are designed with specific educational objectives in mind. 
            We cover a wide range of subjects including math, reading, science, and more. 
            Our games are aligned with common educational standards and are organized by 
            grade level to make it easy for teachers and parents to find appropriate content.
          </p>
          <p>
            We work closely with educators to ensure that our games provide meaningful 
            learning experiences while maintaining the fun factor that keeps children engaged.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Safe for Kids</h2>
          <p>
            We understand the importance of creating a safe online environment for children. 
            Our platform is completely free of external advertisements, pop-ups, and links to 
            other websites. We do not collect personal information from children and are 
            committed to complying with all regulations regarding children's online privacy.
          </p>
          <p>
            Parents and teachers can feel confident that children using ABCya3 will have 
            a safe, ad-free experience focused entirely on learning and fun.
          </p>
        </section>
        
        <section className="about-section">
          <h2>For Teachers</h2>
          <p>
            ABCya3 is widely used in classrooms around the world. We offer special 
            resources for teachers, including lesson plans, activity guides, and the ability 
            to create custom game playlists for their students.
          </p>
          <p>
            Our games can be used for whole-class instruction, small group activities, 
            or individual practice. They're perfect for learning centers, computer lab time, 
            or as supplementary resources for specific skills.
          </p>
          <Link to="/teachers" className="cta-button">Teacher Resources</Link>
        </section>
        
        <section className="about-section">
          <h2>For Parents</h2>
          <p>
            Parents can use ABCya3 to support their children's learning at home. 
            Our games provide a fun way for children to practice skills they're learning 
            in school or explore new subjects they're interested in.
          </p>
          <p>
            We offer guidance for parents on how to select appropriate games for their 
            children and how to incorporate educational gaming into a balanced approach 
            to screen time.
          </p>
          <Link to="/parents" className="cta-button">Parent Resources</Link>
        </section>
        
        <section className="about-section contact-section">
          <h2>Contact Us</h2>
          <p>
            We value feedback from our users and are always looking for ways to improve 
            our platform. If you have questions, suggestions, or comments, please don't 
            hesitate to reach out to us.
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:info@abcya3clone.com">info@abcya3clone.com</a></p>
            <p><strong>Address:</strong> 123 Education Lane, Learning City, ED 12345</p>
          </div>
          <p>
            You can also connect with us on social media for updates, new game announcements, 
            and educational resources.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </section>
      </div>
    </div>
  );
}