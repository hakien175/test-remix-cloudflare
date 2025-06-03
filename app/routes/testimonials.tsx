import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Testimonials - ABCya3" },
    { name: "description", content: "Read what parents, teachers, and students have to say about ABCya3 educational games." }
  ];
};

export default function Testimonials() {
  return (
    <div className="container">
      <div className="testimonials-page">
        <h1>Testimonials</h1>
        
        <div className="testimonials-intro">
          <p>
            At ABCya3, we're proud of the positive impact our educational games have on children, 
            parents, and teachers around the world. Here's what our users have to say about their 
            experiences with our platform.
          </p>
        </div>
        
        <section className="testimonial-section">
          <h2>From Teachers</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "ABCya3 has been an invaluable resource in my classroom. The games are engaging 
                  and my students love them! I especially appreciate how the games are aligned with 
                  educational standards and cover a wide range of subjects. It's perfect for our 
                  computer lab time and as rewards for completing other work."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/teacher1.jpg" alt="Teacher" className="author-image" />
                <div className="author-info">
                  <h3>Sarah Johnson</h3>
                  <p>3rd Grade Teacher, Lincoln Elementary</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "As a special education teacher, I'm always looking for resources that can be adapted 
                  to different learning needs. ABCya3 offers games at various difficulty levels, 
                  making it easy to find appropriate content for each of my students. The colorful 
                  graphics and interactive elements keep my students engaged and motivated to learn."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/teacher2.jpg" alt="Teacher" className="author-image" />
                <div className="author-info">
                  <h3>Michael Rodriguez</h3>
                  <p>Special Education Teacher, Westside School</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "I use ABCya3 as part of my station rotations during math and literacy blocks. 
                  The games reinforce the concepts we're learning in class, and the students don't even 
                  realize they're practicing skills because they're having so much fun! It's been a 
                  game-changer for my classroom management and student engagement."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/teacher3.jpg" alt="Teacher" className="author-image" />
                <div className="author-info">
                  <h3>Emily Chen</h3>
                  <p>1st Grade Teacher, Oakridge Elementary</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="testimonial-section">
          <h2>From Parents</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "As a parent, I'm always concerned about the quality of screen time my children get. 
                  ABCya3 has been a wonderful discovery for our family. The games are not only fun 
                  but also educational. I love that there are no ads or inappropriate content, so I can 
                  feel confident letting my kids play independently."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/parent1.jpg" alt="Parent" className="author-image" />
                <div className="author-info">
                  <h3>Jennifer Williams</h3>
                  <p>Mother of two, Ages 6 and 8</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "My son struggles with reading, and traditional learning methods weren't working well 
                  for him. The games on ABCya3 have made a huge difference! He's excited to practice 
                  reading skills now because the games make it fun. I've seen significant improvement in 
                  his confidence and abilities since we started using this platform."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/parent2.jpg" alt="Parent" className="author-image" />
                <div className="author-info">
                  <h3>David Thompson</h3>
                  <p>Father of a 7-year-old</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "During the pandemic when schools were closed, ABCya3 was a lifesaver for our 
                  family. The variety of educational games kept my children learning and entertained 
                  during a challenging time. Even now that they're back in school, they still ask to 
                  play their favorite games. It's become a positive part of our after-school routine."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/parent3.jpg" alt="Parent" className="author-image" />
                <div className="author-info">
                  <h3>Maria Garcia</h3>
                  <p>Mother of three, Ages 5, 8, and 10</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="testimonial-section">
          <h2>From Students</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "I love playing the math games on ABCya3! They're super fun and help me get 
                  better at math. My favorite game is Math Adventure because I get to solve puzzles 
                  and beat levels. It's way more fun than doing worksheets!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/student1.jpg" alt="Student" className="author-image" />
                <div className="author-info">
                  <h3>Ethan, Age 9</h3>
                  <p>3rd Grade Student</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The spelling games helped me learn lots of new words. I used to not like spelling 
                  practice, but now I do because it's like playing a game. My teacher says I've improved 
                  a lot, and I feel proud of myself!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/student2.jpg" alt="Student" className="author-image" />
                <div className="author-info">
                  <h3>Sophia, Age 7</h3>
                  <p>2nd Grade Student</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "I play ABCya3 games during computer time at school and sometimes at home too. 
                  The science games are my favorite because I learn cool facts about animals and plants. 
                  I want to be a scientist when I grow up!"
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/student3.jpg" alt="Student" className="author-image" />
                <div className="author-info">
                  <h3>Aiden, Age 10</h3>
                  <p>4th Grade Student</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="testimonial-section">
          <h2>From Educational Experts</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "As an educational consultant, I evaluate many digital learning platforms. ABCya3 
                  stands out for its thoughtful design and pedagogical approach. The games effectively 
                  balance fun with learning objectives, and the progression of difficulty within games 
                  helps children build skills incrementally. I frequently recommend it to schools and parents."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/expert1.jpg" alt="Expert" className="author-image" />
                <div className="author-info">
                  <h3>Dr. Rebecca Martinez, Ph.D.</h3>
                  <p>Educational Technology Consultant</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>
                  "The integration of multiple learning modalities in ABCya3 games is impressive. 
                  Visual, auditory, and kinesthetic elements are combined to create engaging experiences 
                  that can reach diverse learners. The platform demonstrates a solid understanding of 
                  how children learn and what motivates them to persist through challenges."
                </p>
              </div>
              <div className="testimonial-author">
                <img src="/images/expert2.jpg" alt="Expert" className="author-image" />
                <div className="author-info">
                  <h3>Professor James Wilson</h3>
                  <p>Childhood Education Department, State University</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="share-testimonial">
          <h2>Share Your Experience</h2>
          <p>
            We'd love to hear about your experience with ABCya3! If you're a teacher, parent, 
            or student who has used our platform, please consider sharing your story with us.
          </p>
          <Link to="/contact" className="primary-button">Submit Your Testimonial</Link>
        </div>
      </div>
    </div>
  );
}