import { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import ContactForm from '../components/forms/ContactForm';
import FAQItem from '../components/ui/FAQItem';
import { faqsAPI } from '../lib/api';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

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
        title="Contact NABW"
        subtitle="Connect with the National Association of Business Women for partnership, membership and programme information."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FiMapPin className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Physical Address</h3>
                      <p className="text-gray-600 text-sm">Plot 3/3345, Area 3, Likuni Road</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMapPin className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Postal Address</h3>
                      <p className="text-gray-600 text-sm">P.O. Box 40442, Kanengo, Lilongwe</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiPhone className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Telephone</h3>
                      <p className="text-gray-600 text-sm">+265 995 752 813</p>
                      <p className="text-gray-600 text-sm">+265 888285280</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiMail className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">
                        <a href="mailto:nabwmalawi@gmail.com" className="text-primary-600 hover:underline">nabwmalawi@gmail.com</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FiClock className="w-6 h-6 text-primary-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Official Channels</h3>
                      <p className="text-gray-600 text-sm">Facebook page and website are listed in the official NABW organisational profile.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-40 bg-gray-200 rounded-xl animate-pulse"></div>
                ))}
              </div>
            ) : faqs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {faqs.map((faq) => (
                  <div key={faq._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <FAQItem faq={faq} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">FAQs are currently being updated by the organisation.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
