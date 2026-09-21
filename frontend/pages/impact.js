import { useEffect, useState } from 'react';
import Hero from '../components/ui/Hero';
import { impactStatsAPI, partnersAPI } from '../lib/api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function Impact() {
  const [stats, setStats] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const [statsRes, partnersRes] = await Promise.all([
          impactStatsAPI.getAll().catch(() => ({ data: { data: [] } })),
          partnersAPI.getAll().catch(() => ({ data: { data: [] } })),
        ]);

        setStats(statsRes.data.data || []);
        setPartners(partnersRes.data.data || []);
      } catch (error) {
        console.error('Failed to load impact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + achievements.length) % achievements.length);
  };

  const achievements = [
    {
      title: 'Entrepreneurial Behaviour, Life Skills and Leadership',
      detail: '77 of 90 targeted women were trained, representing 85%, with improved self-confidence and decision-making abilities and at least 80% of participants taking leadership roles within their communities or business networks.',
    },
    {
      title: 'Financial Literacy, Management and Record Keeping',
      detail: '77 of 90 women were trained, representing 85%. Participants demonstrated an average 85% increase in financial literacy knowledge, 80% reported implementing changes in their businesses, and 90% now have organised financial records compared with less than 50% at the start of the project.',
    },
    {
      title: 'Product Development and Quality Control',
      detail: '64 women entrepreneurs were trained against a target of 60, quality improvements enhanced the competitiveness of women-led businesses, and 70% of participants successfully developed or improved existing products.',
    },
    {
      title: 'Mentorship Programme',
      detail: '28 of 30 targeted mentors were trained, representing 93%. Each mentor was assigned at least three mentees, and the programme assisted in business formalisation and improved the credibility of women-owned businesses.',
    },
  ];

  const initiatives = [
    {
      title: 'Building Back Better After Climate Related Events',
      detail: 'Involved technical assistance from the Investment Climate Reform (ICR) Facility to support women-owned businesses to recover and build resilience after climate-related events and other external shocks.',
    },
    {
      title: 'Promoting Insurance Coverage among Women-owned Businesses',
      detail: 'Developed following Cyclone Freddy to help women-owned SMEs mitigate climate-related risks through insurance and awareness campaigns in the affected districts.',
    },
    {
      title: 'SheActs4Feminomics',
      detail: 'A six-month project implemented by NABW in 2022 focused on macro-level policies affecting women’s economic justice and rights.',
    },
    {
      title: 'Green & Inclusive Energy (GIE)',
      detail: 'Supported by Hivos from 2016–2020, GIE focused on reducing energy poverty and increasing women’s participation in the energy supply chain.',
    },
  ];

  return (
    <>
      <Hero
        title="Our Impact"
        subtitle="NABW’s programmes, advocacy and partnerships strengthen women’s economic resilience, leadership and climate action in Malawi."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-700 uppercase tracking-[0.2em] text-xs font-semibold mb-3">Impact</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable outcomes from NABW’s work</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              NABW’s work is grounded in evidence-based programming and advocacy for women-led businesses, leadership development and climate resilience across Malawi.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-40 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : stats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {stats.map((stat) => (
                <div key={stat._id || stat.title} className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-4xl font-bold text-primary-700 mb-2">{stat.value}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{stat.title}</div>
                  <p className="text-gray-700">{stat.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-16 text-center text-gray-600">Impact statistics are being updated.</div>
          )}

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Recent Work & Achievements</h2>
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{achievement.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{achievement.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
                aria-label="Previous slide"
              >
                <FiChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
                aria-label="Next slide"
              >
                <FiChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {achievements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partners & Collaborators</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.length > 0 ? partners.map((partner) => (
                <div key={partner._id || partner.name} className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-700 shadow-sm">{partner.name}</div>
              )) : (
                <div className="col-span-full text-center text-gray-600 py-8">Partner information is being updated.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
