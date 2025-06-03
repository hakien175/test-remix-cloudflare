import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Terms of Service - ABCya3" },
    { name: "description", content: "Terms of Service for ABCya3. Please read these terms carefully before using our website." }
  ];
};

export default function Terms() {
  return (
    <div className="container">
      <div className="terms-page">
        <h1>Terms of Service</h1>
        
        <div className="terms-intro">
          <p>
            Welcome to ABCya3. Please read these Terms of Service ("Terms") carefully before using our website.
            By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms,
            please do not use our website.
          </p>
          <p>
            Last updated: June 1, 2023
          </p>
        </div>
        
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ABCya3, you agree to be bound by these Terms and all applicable laws and regulations.
            If you do not agree with any of these Terms, you are prohibited from using or accessing this website.
          </p>
        </section>
        
        <section className="terms-section">
          <h2>2. Intellectual Property</h2>
          <p>
            All content, features, and functionality on ABCya3, including but not limited to text, graphics, logos,
            icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive property of
            ABCya3 or its licensors and are protected by copyright, trademark, and other intellectual property laws.
          </p>
          
          <h3>2.1 Trademarks</h3>
          <p>
            The ABCya3 name, logo, and all related names, logos, product and service names, designs, and slogans are
            trademarks of ABCya3 or its affiliates or licensors. You may not use such marks without the prior written
            permission of ABCya3.
          </p>
          
          <h3>2.2 Copyright</h3>
          <p>
            All content on this website is protected by copyright. You may access and use the content for personal,
            non-commercial purposes only. Any other use, including reproduction, modification, distribution, transmission,
            republication, display, or performance of the content without prior written permission is strictly prohibited.
          </p>
        </section>
        
        {/* Additional sections would continue here */}
        
        <section className="terms-section">
          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:terms@abcya3clone.com">terms@abcya3clone.com</a><br />
            Address: 123 Education Lane, Learning City, ED 12345
          </p>
        </section>
      </div>
    </div>
  );
}



