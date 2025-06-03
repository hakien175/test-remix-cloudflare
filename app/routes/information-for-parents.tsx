import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Information for Parents - ABCya3" },
    { name: "description", content: "Resources and information for parents about using ABCya3 educational games with children at home." }
  ];
};

export default function Parents() {
  return (
    <div className="container">
      <div className="parents-page">
        <h1>Information for Parents</h1>
        
        <div className="parents-intro">
          <p>
            Welcome to the Parents' Section of ABCya3! We understand that as a parent, 
            you want to provide your child with educational resources that are both fun and 
            beneficial to their learning. Our platform offers hundreds of educational games 
            designed to help children learn while having fun.
          </p>
        </div>
        
        <div className="parents-content">
          <aside className="sidebar">
            <div className="sidebar-nav">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#educational-value">Educational Value</a></li>
                <li><a href="#age-appropriate">Age-Appropriate Content</a></li>
                <li><a href="#screen-time">Balancing Screen Time</a></li>
                <li><a href="#safety">Online Safety</a></li>
                <li><a href="#learning-at-home">Supporting Learning at Home</a></li>
                <li><a href="#special-needs">Children with Special Needs</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ul>
            </div>
            
            <div className="sidebar-cta">
              <h3>Get Started Today</h3>
              <p>Explore our collection of educational games with your child!</p>
              <Link to="/" className="primary-button">Browse Games</Link>
            </div>
          </aside>
          
          <div className="main-content">
            <section id="educational-value" className="content-section">
              <h2>Educational Value of Our Games</h2>
              <p>
                All games on ABCya3 are designed with specific educational objectives in mind. 
                Our team works with educators to ensure that our content aligns with educational 
                standards and provides meaningful learning experiences.
              </p>
              <p>
                Our games cover a wide range of subjects including:
              </p>
              <ul className="feature-list">
                <li>
                  <span className="feature-icon">📚</span>
                  <div>
                    <h4>Math</h4>
                    <p>Number recognition, counting, addition, subtraction, multiplication, division, fractions, and more.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">✏️</span>
                  <div>
                    <h4>Language Arts</h4>
                    <p>Letter recognition, phonics, spelling, grammar, reading comprehension, and writing skills.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">🔬</span>
                  <div>
                    <h4>Science</h4>
                    <p>Basic scientific concepts, animal habitats, the human body, space, and environmental awareness.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">🌎</span>
                  <div>
                    <h4>Social Studies</h4>
                    <p>Geography, history, cultural awareness, and community roles.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">🎨</span>
                  <div>
                    <h4>Creativity</h4>
                    <p>Art, music, storytelling, and creative problem-solving.</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">🧩</span>
                  <div>
                    <h4>Critical Thinking</h4>
                    <p>Logic puzzles, strategy games, and problem-solving activities.</p>
                  </div>
                </li>
              </ul>
              <p>
                Beyond academic skills, our games also help develop important cognitive and social-emotional 
                skills such as memory, attention, perseverance, and self-confidence.
              </p>
            </section>
            
            <section id="age-appropriate" className="content-section">
              <h2>Age-Appropriate Content</h2>
              <p>
                We understand the importance of providing content that's appropriate for your child's 
                age and developmental stage. Our games are organized by grade level to help you find 
                suitable activities:
              </p>
              <div className="grade-buttons">
                <Link to="/preschool" className="grade-button">Preschool</Link>
                <Link to="/kindergarten" className="grade-button">Kindergarten</Link>
                <Link to="/grade-1" className="grade-button">Grade 1</Link>
                <Link to="/grade-2" className="grade-button">Grade 2</Link>
                <Link to="/grade-3" className="grade-button">Grade 3</Link>
                <Link to="/grade-4" className="grade-button">Grade 4</Link>
                <Link to="/grade-5" className="grade-button">Grade 5</Link>
                <Link to="/grade-6" className="grade-button">Grade 6+</Link>
              </div>
              <p>
                Each game includes information about the target age range and the specific skills it helps 
                develop. We recommend starting with games at your child's current grade level and adjusting 
                based on their individual abilities and interests.
              </p>
              <div className="tip-box">
                <h4>Parent Tip:</h4>
                <p>
                  Observe your child while they play. If a game seems too challenging and causes frustration, 
                  try a simpler version. If they master a game quickly, they might be ready for more advanced content.
                </p>
              </div>
            </section>
            
            <section id="screen-time" className="content-section">
              <h2>Balancing Screen Time</h2>
              <p>
                While educational games can be valuable learning tools, we encourage a balanced approach 
                to screen time. Here are some guidelines to help you establish healthy digital habits:
              </p>
              <ul className="checklist">
                <li>Set clear time limits for game play (e.g., 20-30 minutes per session)</li>
                <li>Balance digital activities with physical play, reading, and social interaction</li>
                <li>Use games as a supplement to, not a replacement for, other learning activities</li>
                <li>Play together with your child when possible to make it a social experience</li>
                <li>Avoid screen time right before bedtime as it can interfere with sleep</li>
                <li>Take breaks to rest eyes and move around</li>
              </ul>
              <p>
                The American Academy of Pediatrics recommends limiting screen time to 1 hour per day of 
                high-quality content for children ages 2-5, with consistent limits for older children. 
                What matters most is not just the quantity of screen time, but the quality of the content 
                and your involvement in your child's digital experiences.
              </p>
            </section>
            
            <section id="safety" className="content-section">
              <h2>Online Safety</h2>
              <p>
                We prioritize creating a safe online environment for children. ABCya3 features:
              </p>
              <div className="safety-features">
                <div className="safety-feature">
                  <span className="safety-icon">🛡️</span>
                  <h4>Ad-Free Environment</h4>
                  <p>No external advertisements or pop-ups that could lead children away from the site.</p>
                </div>
                <div className="safety-feature">
                  <span className="safety-icon">🔒</span>
                  <h4>Privacy Protection</h4>
                  <p>We do not collect personal information from children and comply with children's online privacy regulations.</p>
                </div>
                <div className="safety-feature">
                  <span className="safety-icon">👁️</span>
                  <h4>Content Monitoring</h4>
                  <p>All games and content are reviewed to ensure they're appropriate for children.</p>
                </div>
                <div className="safety-feature">
                  <span className="safety-icon">🔗</span>
                  <h4>No External Links</h4>
                  <p>Children cannot accidentally navigate to external websites while playing our games.</p>
                </div>
              </div>
              <p>
                While we take these measures to create a safe environment, we still recommend supervising 
                young children during their online activities and having ongoing conversations about 
                internet safety.
              </p>
            </section>
            
            <section id="learning-at-home" className="content-section">
              <h2>Supporting Learning at Home</h2>
              <p>
                Our games can be a valuable part of your child's learning journey at home. Here are some 
                tips for maximizing the educational benefits:
              </p>
              <ol className="numbered-list">
                <li>
                  <h4>Connect games to real-world learning</h4>
                  <p>
                    If your child plays a math game, look for opportunities to apply those concepts in 
                    daily activities like cooking, shopping, or building projects.
                  </p>
                </li>
                <li>
                  <h4>Ask questions</h4>
                  <p>
                    Engage your child in conversation about what they're learning. Ask them to explain 
                    how they solved a problem or what they discovered while playing.
                  </p>
                </li>
                <li>
                  <h4>Set learning goals</h4>
                  <p>
                    Work with your child to set specific learning goals and select games that help them 
                    practice those skills. Celebrate their progress!
                  </p>
                </li>
                <li>
                  <h4>Complement school learning</h4>
                  <p>
                    Use our games to reinforce concepts your child is learning in school. Ask their 
                    teacher about current topics and find related games.
                  </p>
                </li>
                <li>
                  <h4>Create a learning routine</h4>
                  <p>
                    Incorporate educational game time into your regular routine, such as after homework 
                    or as a weekend activity.
                  </p>
                </li>
              </ol>
              <div className="resource-box">
                <h4>Parent Resources:</h4>
                <p>
                  We offer printable activity sheets that complement many of our games. These can help 
                  extend the learning beyond screen time and reinforce concepts through different modalities.
                </p>
                <Link to="/resources/printables" className="secondary-button">View Printable Resources</Link>
              </div>
            </section>
            
            <section id="special-needs" className="content-section">
              <h2>Children with Special Needs</h2>
              <p>
                Our games can be particularly beneficial for children with various learning differences 
                and special needs. Many parents and educators have found our platform helpful for:
              </p>
              <ul>
                <li>
                  <strong>Children with ADHD:</strong> Games that focus on attention, memory, and executive 
                  function skills in an engaging format.
                </li>
                <li>
                  <strong>Children with dyslexia:</strong> Phonics games and reading activities with audio 
                  support and visual cues.
                </li>
                <li>
                  <strong>Children with autism:</strong> Predictable game structures, visual supports, and 
                  social skills activities.
                </li>
                <li>
                  <strong>Children with fine motor challenges:</strong> Games that provide practice with 
                  mouse or touch screen skills at various difficulty levels.
                </li>
              </ul>
              <p>
                The interactive, multi-sensory nature of our games can make learning more accessible and 
                enjoyable for children who might struggle with traditional learning methods. The immediate 
                feedback and self-paced nature of digital games can also build confidence and independence.
              </p>
              <p>
                We recommend exploring different games to find those that best match your child's specific 
                needs, interests, and learning style.
              </p>
            </section>
            
            <section id="faq" className="content-section">
              <h2>Frequently Asked Questions</h2>
              
              <div className="faq-item">
                <h3>Is ABCya3 completely free?</h3>
                <p>
                  Yes, all games on ABCya3 are completely free to play. We do not require subscriptions 
                  or in-app purchases to access our educational content.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Do I need to create an account for my child?</h3>
                <p>
                  No, we do not require account creation to play our games. This means your child can start 
                  playing immediately without sharing any personal information.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Can my child play on a tablet or mobile device?</h3>
                <p>
                  Yes, our platform is mobile-friendly and works on tablets and smartphones as well as computers. 
                  Most games are designed to work with both touch screens and mouse/keyboard controls.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>How do I know which games are right for my child's age?</h3>
                <p>
                  You can browse games by grade level using our navigation menu. Each game also includes 
                  information about the target age range and skills it helps develop.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>How often do you add new games?</h3>
                <p>
                  We regularly add new games to our collection. Check our homepage or follow us on social 
                  media to stay updated on the latest additions.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>Can I track my child's progress?</h3>
                <p>
                  Currently, we do not offer progress tracking features. However, we encourage parents to 
                  engage with their children about what they're learning and observe their progress over time.
                </p>
              </div>
              
              <div className="faq-item">
                <h3>How can I provide feedback or suggest a game idea?</h3>
                <p>
                  We welcome your feedback and suggestions! Please visit our <Link to="/contact">Contact page</Link> 
                  to share your thoughts with our team.
                </p>
              </div>
            </section>
            
            <div className="contact-cta">
              <h2>Have More Questions?</h2>
              <p>
                We're here to help! If you have additional questions or need support, please don't 
                hesitate to reach out to our team.
              </p>
              <Link to="/contact" className="primary-button">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}