import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiDownload, FiCalendar, FiTarget, FiLayers } from 'react-icons/fi';
import Hero from '../components/ui/Hero';
import { strategicPlanAPI } from '../lib/api';

export default function StrategicPlan() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await strategicPlanAPI.get();
        setPlan(res.data.data);
      } catch (err) {
        console.error('Failed to fetch strategic plan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  return (
    <>
      <Hero
        title="Our Strategic Plan"
        subtitle="Guiding our mission forward through clear goals, strategic pillars, and measurable outcomes."
        bgImage="https://images.unsplash.com/photo-1507683905886-89bbcad6f8bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ) : plan ? (
            <>
              {/* Overview */}
              <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{plan.title}</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  {plan.description}
                </p>
                {plan.timeline && (
                  <div className="mt-6 inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-sm text-primary-700">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {plan.timeline.startYear} - {plan.timeline.endYear}
                  </div>
                )}
              </div>

              {/* Long-term Goals */}
              {plan.longTermGoals && plan.longTermGoals.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <FiTarget className="w-8 h-8 text-primary-600 mr-3" />
                    Long-Term Goals
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {plan.longTermGoals.map((goal, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-primary-600">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{goal.title}</h3>
                        <p className="text-gray-600">{goal.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strategic Pillars */}
              {plan.strategicPillars && plan.strategicPillars.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <FiLayers className="w-8 h-8 text-primary-600 mr-3" />
                    Strategic Pillars
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plan.strategicPillars.map((pillar, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-8 text-center group">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-primary-700 font-bold text-2xl">{pillar.icon || '★'}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                        <p className="text-gray-600 text-sm">{pillar.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Implementation Framework */}
              {plan.implementationFramework && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Framework</h2>
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {plan.implementationFramework}
                    </p>
                  </div>
                </div>
              )}

              {/* Downloadable Documents */}
              {plan.documents && plan.documents.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Downloadable Documents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plan.documents.map((doc, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <FiDownload className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{doc.title}</h3>
                          <p className="text-sm text-gray-500">{doc.type?.toUpperCase()}</p>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-4 text-primary-600 hover:text-primary-700"
                          download
                        >
                          <FiDownload className="w-5 h-5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center mt-16">
                <Link href="/take-action/become-member" className="btn-primary">
                  Join Our Mission
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Strategic plan information is currently being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
