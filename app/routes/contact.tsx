import { Form, useActionData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us - ABCya3" },
    { name: "description", content: "Get in touch with ABCya3. We'd love to hear from you!" }
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  
  const errors = {
    name: name ? null : "Name is required",
    email: email ? null : "Email is required",
    subject: subject ? null : "Subject is required",
    message: message ? null : "Message is required",
  };
  
  // Return errors if any field is empty
  if (Object.values(errors).some(error => error)) {
    return json({ errors, success: false });
  }
  
  // In a real app, you would send the form data to your backend or email service
  console.log("Form submitted:", { name, email, subject, message });
  
  // Simulate successful submission
  return json({ success: true, errors: null });
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Show success message after successful submission
  if (actionData?.success && !showSuccess) {
    setShowSuccess(true);
  }
  
  return (
    <div className="container">
      <div className="contact-page">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Get In Touch</h2>
            <p>
              We'd love to hear from you! Whether you have a question about our games,
              need technical support, or want to suggest a new feature, our team is here to help.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"/>
                </svg>
                <span>Email: <a href="mailto:info@abcya3clone.com">info@abcya3clone.com</a></span>
              </div>
              
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"/>
                </svg>
                <span>Phone: (123) 456-7890</span>
              </div>
              
              <div className="contact-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
                </svg>
                <span>Address: 123 Education Lane, Learning City, ED 12345</span>
              </div>
            </div>
            
            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-buttons">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            {showSuccess ? (
              <div className="success-message">
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <button 
                  className="primary-button"
                  onClick={() => setShowSuccess(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2>Send Us a Message</h2>
                <Form method="post">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      aria-invalid={actionData?.errors?.name ? true : undefined}
                      aria-errormessage={actionData?.errors?.name ? "name-error" : undefined}
                    />
                    {actionData?.errors?.name && (
                      <div className="error-message" id="name-error">{actionData.errors.name}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      aria-invalid={actionData?.errors?.email ? true : undefined}
                      aria-errormessage={actionData?.errors?.email ? "email-error" : undefined}
                    />
                    {actionData?.errors?.email && (
                      <div className="error-message" id="email-error">{actionData.errors.email}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      aria-invalid={actionData?.errors?.subject ? true : undefined}
                      aria-errormessage={actionData?.errors?.subject ? "subject-error" : undefined}
                    />
                    {actionData?.errors?.subject && (
                      <div className="error-message" id="subject-error">{actionData.errors.subject}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6} 
                      required 
                      aria-invalid={actionData?.errors?.message ? true : undefined}
                      aria-errormessage={actionData?.errors?.message ? "message-error" : undefined}
                    ></textarea>
                    {actionData?.errors?.message && (
                      <div className="error-message" id="message-error">{actionData.errors.message}</div>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="primary-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}