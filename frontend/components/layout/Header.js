import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const navigation = [
  { name: 'Home', href: '/', dropdown: [{ name: 'About Us', href: '/about' }, { name: 'Our Strategic Plan', href: '/strategic-plan' }] },
  { name: 'Our Impact', href: '/impact' },
  { name: 'Projects', href: '/projects', dropdown: 'dynamic' },
  { name: 'Events', href: '/events' },
  { name: 'Take Action', href: '/take-action/benefits', dropdown: [{ name: 'Benefits of Membership', href: '/take-action/benefits' }, { name: 'Become a Member', href: '/take-action/become-member' }] },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [projects, setProjects] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch projects for dropdown
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data.data.slice(0, 8));
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      }
    };
    fetchProjects();
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
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NABW</span>
            </div>
            <span className="text-xl font-bold text-primary-800">NABW</span>
            <span className="hidden sm:block text-sm text-gray-600">National Association of Business Women</span>
          </Link>

          {/* Desktop Navigation */}
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
                  {(item.dropdown || item.dropdown === 'dynamic') && (
                    <FiChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown */}
                {(dropdownOpen === item.name || (item.dropdown === 'dynamic' && dropdownOpen === item.name)) && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                    onMouseEnter={() => setDropdownOpen(item.name)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {item.dropdown === 'dynamic' ? (
                      <>
                        {projects.map((project) => (
                          <Link
                            key={project._id}
                            href={`/projects/${project.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                            onClick={closeDropdowns}
                          >
                            {project.title}
                          </Link>
                        ))}
                        <Link
                          href="/projects"
                          className="block px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 border-t border-gray-100 transition-colors"
                          onClick={closeDropdowns}
                        >
                          View All Projects →
                        </Link>
                      </>
                    ) : (
                      item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                          onClick={closeDropdowns}
                        >
                          {subItem.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/take-action/become-member"
              className="btn-primary text-sm"
            >
              Become a Member
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  {item.dropdown === 'dynamic' ? (
                    projects.map((project) => (
                      <Link
                        key={project._id}
                        href={`/projects/${project.slug}`}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {project.title}
                      </Link>
                    ))
                  ) : (
                    item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/take-action/become-member"
            className="block mx-4 mt-4 btn-primary text-center text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            Become a Member
          </Link>
        </div>
      </div>
    </header>
  );
}
