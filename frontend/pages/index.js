import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiUsers, FiGlobe, FiAward, FiTrendingUp, FiHeart, FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import Hero from '../components/ui/Hero';
import ProjectCard from '../components/ui/ProjectCard';
import EventCard from '../components/ui/EventCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import ImpactStatCard from '../components/ui/ImpactStat';
import { projectsAPI, eventsAPI, testimonialsAPI, partnersAPI, impactStatsAPI, newsAPI, aboutAPI } from '../lib/api';

const heroImage = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [impactStats, setImpactStats] = useState([]);
  const [news, setNews] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, eventsRes, testimonialsRes, partnersRes, statsRes, newsRes, aboutRes] = await Promise.allSettled([
          projectsAPI.getFeatured(),
          eventsAPI.getUpcoming(),
          testimonialsAPI.getAll(),
          partnersAPI.getAll(),
          impactStatsAPI.getAll(),
          newsAPI.getFeatured(),
          aboutAPI.get(),
        ]);

        if (projectsRes.status === 'fulfilled') setFeaturedProjects(projectsRes.value.data.data);
        if (eventsRes.status === 'fulfilled') setUpcomingEvents(eventsRes.value.data.data);
        if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data.data);
        if (partnersRes.status === 'fulfilled') setPartners(partnersRes.value.data.data);
        if (statsRes.status === 'fulfilled') setImpactStats(statsRes.value.data.data);
        if (newsRes.status === 'fulfilled') setNews(newsRes.value.data.data);
        if (aboutRes.status === 'fulfilled') setAbout(aboutRes.value.data.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <Hero
        title="Empowering Business Women Across the Nation"
        subtitle="The National Association of Business Women is committed to fostering economic empowerment, leadership development, and sustainable growth for women entrepreneurs and professionals."
        ctaText="Join Our Mission"
        ctaLink="/take-action/become-member"
        bgImage={heroImage}
        height="h-[80vh]"
      />

      {/* Mission, Vision, Values */}
      {about && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {about.mission}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiHeart className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600 text-sm">{about.mission}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiGlobe className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600 text-sm">{about.vision}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiAward className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Core Values</h3>
                <div className="space-y-2">
                  {about.coreValues?.slice(0, 3).map((value, idx) => (
                    <p key={idx} className="text-sm text-gray-600">• {value.title}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-padding bg-primary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Take Action Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of business women and be part of the change you want to see.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/take-action/become-member" className="btn-secondary">
              Become a Member
            </Link>
            <Link href="/projects" className="btn-outline border-white text-white hover:bg-white hover:text-primary-700">
              Explore Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            <Link href="/projects" className="text-primary-600 hover:text-primary-700 font-medium">
              View All Projects →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Impact Statistics */}
      {impactStats.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Together, we have made a meaningful difference in the lives of thousands of women.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat) => (
                <ImpactStatCard key={stat._id} stat={stat} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/impact" className="btn-primary">
                Learn More About Our Impact
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
              <Link href="/events" className="text-primary-600 hover:text-primary-700 font-medium">
                View All Events →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.slice(0, 3).map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Members Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from the women who have transformed their businesses and careers through NABW.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial._id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent News */}
      {news.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Latest News & Highlights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item._id} className="card group">
                  <div className="relative overflow-hidden">
                    {item.featuredImage ? (
                      <img
                        src={item.featuredImage}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                        <span className="text-primary-700 font-bold">{item.title}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Logos */}
      {partners.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We collaborate with leading organizations to amplify our impact.
              </p>
            </div>

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
        </section>
      )}
    </>
  );
}
