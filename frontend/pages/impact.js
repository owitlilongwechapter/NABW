import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUsers, FiGlobe, FiAward, FiTrendingUp, FiHeart, FiBriefcase } from 'react-icons/fi';
import Hero from '../components/ui/Hero';
import ImpactStatCard from '../components/ui/ImpactStat';
import TestimonialCard from '../components/ui/TestimonialCard';
import { impactStatsAPI, testimonialsAPI, partnersAPI } from '../lib/api';

export default function Impact() {
  const [impactStats, setImpactStats] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, testimonialsRes, partnersRes] = await Promise.allSettled([
          impactStatsAPI.getAll(),
          testimonialsAPI.getAll(),
          partnersAPI.getAll(),
        ]);

        if (statsRes.status === 'fulfilled') setImpactStats(statsRes.value.data.data);
        if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data.data);
        if (partnersRes.status === 'fulfilled') setPartners(partnersRes.value.data.data);
      } catch (err) {
        console.error('Failed to fetch impact data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero
        title="Our Impact"
        subtitle="Making a measurable difference in the lives of business women and their communities."
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable Outcomes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Through our programs, initiatives, and partnerships, we have created lasting impact
              across communities, empowering thousands of women to achieve economic independence
              and leadership success.
            </p>
          </div>

          {/* Impact Statistics */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-40"></div>
              ))}
            </div>
          ) : impactStats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {impactStats.map((stat) => (
                <ImpactStatCard key={stat._id} stat={stat} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 mb-16">
              <p className="text-gray-600">Impact statistics are being updated. Please check back soon.</p>
            </div>
          )}

          {/* Success Stories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Success Stories</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
                ))}
              </div>
            ) : testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial._id} testimonial={testimonial} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Success stories are being updated. Please check back soon.</p>
              </div>
            )}
          </div>

          {/* Annual Reports */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Annual Reports</h2>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600 mb-6">
                Download our annual reports to learn more about our achievements and future plans.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="#" className="btn-primary flex items-center justify-center">
                  <FiAward className="mr-2 w-5 h-5" />
                  2023 Annual Report
                </Link>
                <Link href="#" className="btn-secondary flex items-center justify-center">
                  <FiAward className="mr-2 w-5 h-5" />
                  2022 Annual Report
                </Link>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Photo Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-primary-200 to-primary-400 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-primary-700 font-bold text-sm">
                    Impact Photo {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          {partners.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Partners in Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {partners.map((partner) => (
                  <div key={partner._id} className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center group">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-16 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-primary-700 font-bold text-center">{partner.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
