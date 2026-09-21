import { useEffect, useState } from 'react';
import Hero from '../../components/ui/Hero';
import { projectsAPI } from '../../lib/api';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsAPI.getAll();
        setProjects(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject?.gallery?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
    }
  };

  const prevImage = () => {
    if (selectedProject?.gallery?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
    }
  };

  return (
    <>
      <Hero
        title="Projects & Initiatives"
        subtitle="Official NABW initiatives focused on economic empowerment, leadership, climate resilience, advocacy and inclusive energy."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary-700 uppercase tracking-[0.2em] text-xs font-semibold mb-3">Programmes</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Official NABW projects and initiatives</h2>
          </div>

          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-36 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="relative">
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {projects.map((project, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div
                        onClick={() => openModal(project)}
                        className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition-shadow duration-300"
                      >
                        {project.featuredImage && (
                          <div className="mb-6 rounded-lg overflow-hidden h-48 bg-gray-100">
                            <img
                              src={project.featuredImage}
                              alt={project.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">{project.shortDescription || project.fullDescription}</p>
                        <div className="text-primary-600 font-semibold hover:text-primary-700 text-sm">
                          Click to view details →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
                aria-label="Previous project"
              >
                <FiChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all z-10"
                aria-label="Next project"
              >
                <FiChevronRight className="w-6 h-6 text-gray-900" />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-primary-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-600 py-10">Projects are currently being updated.</div>
          )}

          {/* Project Detail Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
              <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <FiX className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8">
                  {/* Gallery */}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <div className="mb-8">
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden h-96 mb-4">
                        <img
                          src={selectedProject.gallery[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedProject.gallery.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                              aria-label="Previous image"
                            >
                              <FiChevronLeft className="w-6 h-6 text-gray-900" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                              aria-label="Next image"
                            >
                              <FiChevronRight className="w-6 h-6 text-gray-900" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image Thumbnails */}
                      {selectedProject.gallery.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {selectedProject.gallery.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                idx === currentImageIndex ? 'border-primary-600' : 'border-gray-300 hover:border-primary-400'
                              }`}
                            >
                              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Details */}
                  <div className="space-y-6">
                    {selectedProject.fullDescription && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Overview</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedProject.fullDescription}</p>
                      </div>
                    )}

                    {selectedProject.objectives && selectedProject.objectives.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Objectives</h3>
                        <ul className="space-y-2">
                          {selectedProject.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.activities && selectedProject.activities.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Activities</h3>
                        <ul className="space-y-2">
                          {selectedProject.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="w-2 h-2 rounded-full bg-primary-600 mt-2 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.location && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Location</p>
                          <p className="font-semibold text-gray-900">{selectedProject.location}</p>
                        </div>
                        {selectedProject.status && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Status</p>
                            <p className="font-semibold text-gray-900 capitalize">{selectedProject.status}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
