import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import logo from '../../styles/2NABW_Colour_LG_RGB.jpg';

const navigation = [
  { name: 'Home', href: '/', dropdown: [{ name: 'About Us', href: '/about' }, { name: 'Our Impact', href: '/impact' }] },
  { name: 'Our Impact', href: '/impact' },
  { name: 'Projects & Initiatives', href: '/projects', dropdown: [{ name: 'Building Back Better', href: '/projects' }, { name: 'SheActs4Feminomics', href: '/projects' }, { name: 'Green & Inclusive Energy', href: '/projects' }] },
  { name: 'Contact', href: '/contact' },
  { name: 'Take Action', href: '/take-action/benefits', dropdown: [{ name: 'Benefits of Membership', href: '/take-action/benefits' }, { name: 'Become a Member', href: '/take-action/become-member' }] },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  const closeDropdowns = () => {
    setDropdownOpen(null);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white shadow-sm py-3'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="NABW home">
            <Image
              src={logo}
              alt="National Association of Business Women"
              className="h-auto w-[150px] sm:w-[210px]"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setDropdownOpen(item.name)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                  {item.dropdown && <FiChevronDown className="ml-1 w-4 h-4" />}
                </Link>

                {item.dropdown && dropdownOpen === item.name && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name || subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        onClick={closeDropdowns}
                      >
                        {subItem.name || subItem.href.replace('/projects', 'Projects')}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link href="/take-action/become-member" className="btn-primary text-sm">Become a Member</Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen bg-white shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container-custom py-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name} className="border-b border-gray-100 last:border-0">
              <Link
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name || subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name || subItem.href.replace('/projects', 'Projects')}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href="/take-action/become-member" className="block mx-4 mt-4 btn-primary text-center text-sm" onClick={() => setMobileMenuOpen(false)}>
            Become a Member
          </Link>
        </div>
      </div>
    </header>
  );
}
