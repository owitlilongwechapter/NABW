import { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import { aboutAPI } from '../lib/api';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await aboutAPI.get();
        setAbout(res.data.data);
      } catch (err) {
        console.error('Failed to fetch about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
      <Hero
        title="About Us"
        subtitle="Learn about our history, mission, and commitment to empowering business women."
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ) : about ? (
            <>
              {/* Mission & Vision */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-primary-700 mb-4">Our Mission</h2>
                  <p className="text-gray-700 leading-relaxed">{about.mission}</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-primary-700 mb-4">Our Vision</h2>
                  <p className="text-gray-700 leading-relaxed">{about.vision}</p>
                </div>
              </div>

              {/* History */}
              {about.history && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{about.history}</p>
                  </div>
                </div>
              )}

              {/* Objectives */}
              {about.objectives && about.objectives.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Objectives</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {about.objectives.map((obj, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-primary-700 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{obj}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Values */}
              {about.coreValues && about.coreValues.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Core Values</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {about.coreValues.map((value, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center group">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-primary-700 font-bold text-xl">{value.icon || '★'}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                        <p className="text-gray-600 text-sm">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Leadership */}
              {about.leadership && about.leadership.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Leadership Structure</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {about.leadership.map((leader, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center">
                        {leader.image ? (
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-primary-700 font-bold text-2xl">
                              {leader.name?.charAt(0)}
                            </span>
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                        <p className="text-primary-600 font-medium mb-2">{leader.position}</p>
                        {leader.bio && <p className="text-gray-600 text-sm">{leader.bio}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Governance */}
              {about.governance && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Governance</h2>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <p className="text-gray-700 leading-relaxed">{about.governance}</p>
                  </div>
                </div>
              )}

              {/* Strategic Priorities */}
              {about.strategicPriorities && about.strategicPriorities.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Strategic Priorities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {about.strategicPriorities.map((priority, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-start">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-primary-700 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{priority}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">About information is currently being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
