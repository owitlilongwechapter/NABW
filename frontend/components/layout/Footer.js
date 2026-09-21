import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import sponsorLogo from '../../styles/fawema.jpg';

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
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-20 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NABW</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              A women-founded and women-led non-profit organisation dedicated to empowering women in business and leadership roles in Malawi.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-gray-300">
              <span>Sponsored by</span>
              <img
                src={sponsorLogo.src}
                alt="FAWEMA"
                className="h-16 w-auto object-contain rounded-md"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Thematic Areas</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white transition-colors">Economic Empowerment</li>
              <li className="hover:text-white transition-colors">Social Advocacy</li>
              <li className="hover:text-white transition-colors">Climate Action & Renewable Energy</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span>Plot 3/3345, Area 3, Likuni Road</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-primary-500" />
                <span>+265 995 752 813<br />+265 888285280</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-primary-500" />
                <a href="mailto:nabwmalawi@gmail.com" className="hover:text-white transition-colors">nabwmalawi@gmail.com</a>
              </div>
            </div>

            <form onSubmit={handleSubscribe} className="mt-4">
              <label className="text-sm text-gray-400 mb-2 block">Subscribe to NABW updates</label>
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
                  {subscribed ? '✓' : 'Go'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} NABW - National Association of Business Women. All rights reserved.</p>
          <div className="flex justify-center space-x-3 mt-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/national-association-of-business-women" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
            <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Twitter" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary-600 text-white flex items-center justify-center transition-colors">
              <FaInstagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
