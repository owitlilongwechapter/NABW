import Link from 'next/link';
import { FiUsers, FiTrendingUp, FiBriefcase, FiAward, FiCalendar, FiBookOpen, FiGlobe, FiHeart } from 'react-icons/fi';
import Hero from '../../components/ui/Hero';

const benefits = [
  {
    icon: FiUsers,
    title: 'Networking Opportunities',
    description: 'Connect with successful businesswomen, entrepreneurs, and industry leaders through exclusive networking events, meetups, and online communities.',
  },
  {
    icon: FiTrendingUp,
    title: 'Capacity Building',
    description: 'Access workshops, training programs, and mentorship opportunities designed to enhance your business acumen and professional skills.',
  },
  {
    icon: FiBriefcase,
    title: 'Advocacy Participation',
    description: 'Be part of a collective voice advocating for women\'s economic rights, fair business practices, and policy changes at national and regional levels.',
  },
  {
    icon: FiAward,
    title: 'Exclusive Events',
    description: 'Gain access to premium events including conferences, seminars, award ceremonies, and special presentations by industry experts.',
  },
  {
    icon: FiBookOpen,
    title: 'Professional Development',
    description: 'Benefit from continuing education resources, certification programs, and career advancement opportunities tailored for businesswomen.',
  },
  {
    icon: FiGlobe,
    title: 'Market Access',
    description: 'Expand your business reach through our partner network, trade missions, and business-to-business matchmaking opportunities.',
  },
  {
    icon: FiHeart,
    title: 'Community Impact',
    description: 'Make a meaningful difference in your community through our corporate social responsibility initiatives and volunteer programs.',
  },
  {
    icon: FiCalendar,
    title: 'Resource Library',
    description: 'Access a comprehensive library of business resources, research reports, templates, and best practices curated for women entrepreneurs.',
  },
];

const membershipCategories = [
  { value: 'individual', label: 'Individual Membership', price: 'MWK 50,000/Year' },
];

export default function Benefits() {
  return (
    <>
      <Hero
        title="Benefits of Membership"
        subtitle="Discover the value and opportunities that come with being part of NABW."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Join NABW?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Becoming a member of the National Association of Business Women opens doors to a world of
              opportunities, connections, and resources designed to accelerate your professional growth
              and business success.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <benefit.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Membership Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Membership Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipCategories.map((category) => (
                <div key={category.value} className="bg-white rounded-xl shadow-lg p-8 text-center border-2 border-gray-100 hover:border-primary-300 transition-colors">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUsers className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.label}</h3>
                  <p className="text-primary-600 font-bold text-lg mb-4">{category.price}</p>
                  <p className="text-gray-600 text-sm mb-6">
                    Join our community and unlock exclusive benefits tailored to your needs.
                  </p>
                  <a
                    href="https://forms.gle/Ddy1vJcfHQa3ngzb7"
                    className="btn-primary w-full text-sm"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-primary-700 to-primary-800 rounded-2xl shadow-xl p-12 text-center text-white mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="w-8 h-8 text-white" />
              </div>
              <blockquote className="text-xl italic mb-6">
                &ldquo;NABW has transformed my business and my life. The connections, mentorship, and resources
                I&apos;ve gained are invaluable. I&apos;m not just a member; I&apos;m part of a movement.&rdquo;
              </blockquote>
              <cite className="text-lg font-medium">
                — Maryrose Ikumi
              </cite>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Join?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards unlocking your full potential. Complete our membership
              application form and become part of our growing community of businesswomen.
            </p>
            <Link href="/take-action/become-member" className="btn-primary text-lg px-10 py-4">
              Become a Member Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
