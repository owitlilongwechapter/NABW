import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NABW</span>
              </div>
              <span className="text-xl font-bold text-white">NABW</span>
            </div>
            <p className="text-sm text-gray-400">
              The National Association of Business Women is dedicated to empowering and supporting business women across the nation through advocacy, networking, and capacity building.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/strategic-plan" className="hover:text-white transition-colors">Our Strategic Plan</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Projects</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="hover:text-white transition-colors">All Projects</Link></li>
              <li><Link href="/projects/women-empowerment" className="hover:text-white transition-colors">Women Empowerment</Link></li>
              <li><Link href="/projects/economic-inclusion" className="hover:text-white transition-colors">Economic Inclusion</Link></li>
              <li><Link href="/projects/leadership-development" className="hover:text-white transition-colors">Leadership Development</Link></li>
              <li><Link href="/projects/digital-skills" className="hover:text-white transition-colors">Digital Skills Training</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Contact & Newsletter</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>123 Business Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-500" />
                <span>info@nabw.org</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>Office Hours:</p>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mt-4">
              <label className="text-sm text-gray-400 mb-2 block">Subscribe to our newsletter</label>
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
                >
                  {subscribed ? '✓' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NABW - National Association of Business Women. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
