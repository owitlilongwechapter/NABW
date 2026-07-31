import { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import ContactForm from '../components/forms/ContactForm';
import FAQItem from '../components/ui/FAQItem';
import { faqsAPI } from '../lib/api';
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';

export default function Contact() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await faqsAPI.getAll();
        setFaqs(res.data.data);
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out with any questions or inquiries."
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FiMapPin className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Our Office</h3>
                      <p className="text-gray-600 text-sm">
                        123 Business Street<br />
                        City, Country 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiPhone className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMail className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">info@nabw.org</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiClock className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                      <p className="text-gray-600 text-sm">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors">
                    <FiFacebook className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors">
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors">
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors">
                    <FiInstagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors">
                    <FiYoutube className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Find Us</h3>
                <div className="bg-gray-200 rounded-xl h-64 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019874876425!2d-122.40135168468187!3d37.78735897975795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064b534c3db%3A0x1c0b5b3b3b3b3b3b!2s123%20Business%20St%2C%20San%20Francisco%2C%20CA%2094105%2C%20USA!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NABW Office Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            {loading ? (
              <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            ) : faqs.length > 0 ? (
              <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
                {faqs.map((faq) => (
                  <FAQItem key={faq._id} faq={faq} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">FAQs are being updated. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
