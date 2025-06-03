import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Cookie Policy - ABCya3" },
    { name: "description", content: "Cookie Policy for ABCya3. Learn how we use cookies on our website." }
  ];
};

export default function Cookies() {
  return (
    <div className="container">
      <div className="cookies-page">
        <h1>Cookie Policy</h1>
        
        <div className="privacy-intro">
          <p>
            This Cookie Policy explains how ABCya3 uses cookies and similar technologies to recognize you when you visit our website.
            It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <p>
            Last updated: June 1, 2023
          </p>
        </div>
        
        <section className="privacy-section">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently,
            as well as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, ABCya3) are called "first-party cookies."
            Cookies set by parties other than the website owner are called "third-party cookies."
            Third-party cookies enable third-party features or functionality to be provided on or through the website
            (e.g., advertising, interactive content, and analytics).
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>2. Types of Cookies We Use</h2>
          <p>
            We use the following types of cookies:
          </p>
          
          <h3>2.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off in our systems.
            They are usually only set in response to actions made by you which amount to a request for services,
            such as setting your privacy preferences, logging in, or filling in forms.
          </p>
          
          <h3>2.2 Performance Cookies</h3>
          <p>
            These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.
            They help us to know which pages are the most and least popular and see how visitors move around the site.
          </p>
          
          <h3>2.3 Functional Cookies</h3>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization.
            They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
        </section>
        
        {/* Additional sections would continue here */}
        
        <section className="privacy-section">
          <h2>3. How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the instructions provided in the browser you are using.
          </p>
          <p>
            Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
          </p>
          <p>
            The specific steps to control cookies vary by browser:
          </p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
          </ul>
          <p>
            Please note that if you choose to reject cookies, you may not be able to use the full functionality of our website.
          </p>
        </section>
        
        <section className="privacy-section">
          <h2>4. How Often Will We Update This Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
          </section>
        </div>
      </div>
  );
}




