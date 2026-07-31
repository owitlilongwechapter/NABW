import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiUsers, FiTarget, FiActivity, FiDownload, FiShare2 } from 'react-icons/fi';
import Hero from '../../components/ui/Hero';
import { projectsAPI } from '../../lib/api';

export default function ProjectDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const res = await projectsAPI.getBySlug(slug);
        setProject(res.data.data);
      } catch (err) {
        console.error('Failed to fetch project:', err);
        if (err.error === 'Project not found' || err.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <>
        <Hero title="Loading..." height="h-[50vh]" />
        <div className="section-padding">
          <div className="container-custom animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Hero title="Project Not Found" height="h-[50vh]" />
        <section className="section-padding">
          <div className="container-custom text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or has been removed.</p>
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (!project) return null;

  return (
    <>
      <Hero
        title={project.title}
        subtitle={project.shortDescription}
        bgImage={project.featuredImage}
        height="h-[60vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FiTarget className="w-6 h-6 text-primary-600 mr-3" />
                  Project Overview
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>

              {/* Objectives */}
              {project.objectives && project.objectives.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FiTarget className="w-6 h-6 text-primary-600 mr-3" />
                    Objectives
                  </h2>
                  <ul className="space-y-3">
                    {project.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-primary-700 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{obj}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Activities */}
              {project.activities && project.activities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FiActivity className="w-6 h-6 text-primary-600 mr-3" />
                    Implementation Activities
                  </h2>
                  <ul className="space-y-3">
                    {project.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-primary-700 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{activity}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Beneficiaries */}
              {project.beneficiaries && project.beneficiaries.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <FiUsers className="w-6 h-6 text-primary-600 mr-3" />
                    Target Beneficiaries
                  </h2>
                  <ul className="space-y-3">
                    {project.beneficiaries.map((beneficiary, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-primary-700 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{beneficiary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expected Results */}
              {project.expectedResults && project.expectedResults.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Expected Results</h2>
                  <ul className="space-y-3">
                    {project.expectedResults.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-green-700 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achieved Results */}
              {project.achievedResults && project.achievedResults.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Achieved Results</h2>
                  <ul className="space-y-3">
                    {project.achievedResults.map((result, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          <span className="text-blue-700 font-bold text-xs">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700">{result}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.gallery.map((image, idx) => (
                      <div key={idx} className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} gallery ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {project.resources && project.resources.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Downloadable Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.resources.map((resource, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-lg p-4 flex items-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                          <FiDownload className="w-6 h-6 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{resource.title}</h3>
                          <p className="text-sm text-gray-500">{resource.type?.toUpperCase()}</p>
                        </div>
                        <a
                          href={resource.url}
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
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Information</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <div className="flex items-center mt-1">
                      <FiMapPin className="w-4 h-4 text-primary-500 mr-1" />
                      <span className="text-gray-700">{project.location}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Start Date</span>
                    <div className="flex items-center mt-1">
                      <FiCalendar className="w-4 h-4 text-primary-500 mr-1" />
                      <span className="text-gray-700">{formatDate(project.startDate)}</span>
                    </div>
                  </div>
                  {project.endDate && (
                    <div>
                      <span className="text-sm text-gray-500">End Date</span>
                      <div className="flex items-center mt-1">
                        <FiCalendar className="w-4 h-4 text-primary-500 mr-1" />
                        <span className="text-gray-700">{formatDate(project.endDate)}</span>
                      </div>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="ml-2 text-gray-700">{project.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Partners */}
              {project.partners && project.partners.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Project Partners</h3>
                  <div className="space-y-3">
                    {project.partners.map((partner) => (
                      <div key={partner._id} className="flex items-center">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-10 h-10 object-contain mr-3"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-primary-700 font-bold text-xs">{partner.name?.charAt(0)}</span>
                          </div>
                        )}
                        <span className="text-gray-700">{partner.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {project.relatedProjects && project.relatedProjects.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Projects</h3>
                  <div className="space-y-4">
                    {project.relatedProjects.map((related) => (
                      <Link
                        key={related._id}
                        href={`/projects/${related.slug}`}
                        className="block group"
                      >
                        <div className="flex items-center">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                            {related.featuredImage ? (
                              <img
                                src={related.featuredImage}
                                alt={related.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-primary-700 font-bold text-xs">
                                {related.title}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                              {related.title}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-2">
                              {related.shortDescription}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Share This Project</h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: project.title,
                        text: project.shortDescription,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="w-full btn-outline flex items-center justify-center"
                >
                  <FiShare2 className="mr-2 w-5 h-5" />
                  Share Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
