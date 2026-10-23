import { useState } from 'react';
import Image from 'next/image';
import Hero from '../../components/ui/Hero';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import galleryManifest from '../../galleryManifest.json';

const currentInitiatives = [
  {
    title: 'FAWE',
    shortDescription: 'Enhancing gender inclusive public procurement and open contracting in Malawi.',
    fullDescription: 'NABW is implementing the project with support from the Women and Girls Fund, financed by the Scottish Government and managed by Ecorys UK and FAWEMA. It works to remove barriers and promote gender-responsive public procurement so women-led businesses can access, compete for and benefit from government contracts.',
    objectives: [
      'Influence inclusive procurement policies and institutional practices.',
      'Build women entrepreneurs’ procurement knowledge, readiness and skills.',
      'Promote transparency, accountability and open contracting.',
    ],
    achievedResults: [
      '7 policy recommendations developed and submitted.',
      '22 policymakers engaged in targeted policy discussions.',
      '56 women entrepreneurs trained.',
      '4 advocacy engagements conducted.',
      '1 policy brief developed and disseminated.',
      '11 campaign materials developed.',
      '20 women participating in a procurement mentorship programme.',
      '1 stakeholder roundtable convened.',
    ],
    featuredImage: galleryManifest.projects.fawe[0],
    gallery: galleryManifest.projects.fawe,
  },
  {
    title: 'GDM',
    shortDescription: 'Explore photographs from NABW’s GDM project.',
    fullDescription: 'A selection of photographs from the GDM project is available in the gallery. More project information can be added when it is available.',
    featuredImage: galleryManifest.projects.gdm[0],
    gallery: galleryManifest.projects.gdm,
  },
];

const previousProjects = [
  {
    title: 'Policy Advocacy Project',
    shortDescription: 'NABW’s SheActs4Feminomics and 2020 advocacy work brought stakeholders together to strengthen policy and regulatory frameworks affecting women-owned SMEs and economic justice.',
    fullDescription: 'In 2022, NABW implemented the six-month SheActs4Feminomics project with financial support from Urgent Action Fund, working with civil-society partners including For Equality, CEWAG, MHRRC and Chikulamayembe Women Forum. The work focused on macro-level policies affecting women’s economic justice and rights, and on strengthening policy and regulatory frameworks to address challenges faced by women-owned SMEs. The profile also records a 2020 Financial Inclusion and Gender Responsive Procurement advocacy campaign attended by the State President and cabinet ministers.',
    objectives: [
      'Strengthen policy and regulatory frameworks addressing challenges faced by women-owned SMEs.',
      'Advance women’s economic justice and rights through policy dialogue.',
    ],
    activities: [
      'Workshop on gender mainstreaming in SME policies, strategies and programmes.',
      'Policy dialogue on public procurement and business formalisation.',
      'Plenary session on achieving economic justice for women-owned SMEs.',
      'Financial Inclusion and Gender Responsive Procurement advocacy campaign.',
    ],
    beneficiaries: ['Women-owned SMEs', 'Women entrepreneurs', 'Civil-society and policy stakeholders'],
    achievedResults: ['The 2020 campaign contributed to the development of a Financial Inclusion Index for monitoring financial institutions.'],
    featuredImage: galleryManifest.projects.sheacts4feminomics[0],
    gallery: galleryManifest.projects.sheacts4feminomics,
  },
  {
    title: 'Women’s Empowerment Project',
    shortDescription: 'NABW’s training and mentorship programmes built women entrepreneurs’ leadership, financial, digital marketing and product-development skills.',
    fullDescription: 'The NABW Profile 2024 documents a programme of practical training and mentorship for women entrepreneurs. Topics included entrepreneurial behaviour, life skills and leadership; financial literacy, management and record keeping; e-commerce and digital marketing; product development and quality control; and mentorship.',
    activities: [
      'Entrepreneurial behaviour, life skills and leadership training.',
      'Financial literacy, business management and record-keeping training.',
      'E-commerce and digital marketing training.',
      'Product development and quality-control training.',
      'Mentor training and matching mentors with mentees.',
    ],
    beneficiaries: ['Women entrepreneurs', 'Women-owned businesses', 'Business mentors and mentees'],
    achievedResults: [
      '77 of 90 targeted women (85%) completed leadership and life-skills training; at least 80% took leadership roles in their communities or business networks.',
      '77 of 90 women (85%) completed financial-literacy training; participants reported an average 85% increase in knowledge, 80% implemented business changes, and 90% organised their financial records.',
      '90 of 90 targeted women completed e-commerce and digital-marketing training; 70% established or improved their online presence.',
      '64 women entrepreneurs were trained against a target of 60; 70% developed or improved a product.',
      '28 of 30 targeted mentors (93%) were trained, with each assigned at least three mentees.',
    ],
    featuredImage: galleryManifest.projects.awe[0],
    gallery: [...galleryManifest.projects.awe, ...galleryManifest.projects.fawe, ...galleryManifest.projects.we4d],
  },
  {
    title: 'Transparency and Accountability Project',
    shortDescription: 'NABW and civil-society partners reviewed progress and remaining gaps 25 years after the Beijing Platform for Action was adopted.',
    fullDescription: 'Under the Beijing Declaration Platform for Action +25 process in 2020, NABW and civil-society partners consulted on achievements and gaps since the platform’s adoption in 1995. Discussions considered emerging challenges for women and what more could be done, including access to quality education and reproductive health and rights services, and women’s representation in positions of power and decision-making.',
    objectives: [
      'Review progress and gaps in implementing the Beijing Platform for Action since 1995.',
      'Identify emerging challenges for women and actions to advance gender equality.',
    ],
    activities: [
      'Consultations with civil-society organisations on achievements and gaps.',
      'Discussion of education, reproductive health and rights, and women’s participation in decision-making.',
    ],
    beneficiaries: ['Women and girls', 'Civil-society organisations', 'Stakeholders working on gender equality'],
    featuredImage: galleryManifest.impact[0],
    gallery: galleryManifest.impact,
  },
  {
    title: 'Building Back Better',
    shortDescription: 'Supporting women-owned businesses to recover and build resilience following climate-related events.',
    fullDescription: 'NABW supports women-owned businesses to recover and strengthen resilience after climate-related events and other external shocks.',
    beneficiaries: ['Women-owned businesses', 'Women entrepreneurs'],
    featuredImage: galleryManifest.projects['building-back-better'][0],
    gallery: galleryManifest.projects['building-back-better'],
  },
  {
    title: 'Green and Inclusive Energy',
    shortDescription: 'Advancing women’s participation in greener, more inclusive energy systems and supply chains.',
    beneficiaries: ['Women entrepreneurs', 'Women-led businesses'],
    featuredImage: galleryManifest.projects['green-inclusive-energy'][0],
    gallery: galleryManifest.projects['green-inclusive-energy'],
  },
  {
    title: 'AWE',
    shortDescription: 'A catalogue of activities and photographs from the AWE project.',
    featuredImage: galleryManifest.projects.awe[0],
    gallery: galleryManifest.projects.awe,
  },
  {
    title: 'FAWE',
    shortDescription: 'A catalogue of activities and photographs from the FAWE project.',
    featuredImage: galleryManifest.projects.fawe[0],
    gallery: galleryManifest.projects.fawe,
  },
  {
    title: 'WE4D',
    shortDescription: 'A catalogue of activities and photographs from the WE4D project.',
    featuredImage: galleryManifest.projects.we4d[0],
    gallery: galleryManifest.projects.we4d,
  },
  {
    title: 'GDM',
    shortDescription: 'A selection of photographs from NABW’s GDM project.',
    featuredImage: galleryManifest.projects.gdm[0],
    gallery: galleryManifest.projects.gdm,
  },
];

const projectListings = previousProjects
  .filter(({ title }) => !/women.*empowerment project|transparency and accountability project|^FAWE$|^GDM$/i.test(title))
  .map((project, index) => (index === 0 ? { ...project, title: 'SheActs4Feminomics' } : project));

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const selectedProjectImages = selectedProject?.gallery?.length
    ? selectedProject.gallery
    : selectedProject?.featuredImage ? [selectedProject.featuredImage] : [];

  const nextImage = () => {
    if (selectedProjectImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProjectImages.length);
    }
  };

  const prevImage = () => {
    if (selectedProjectImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProjectImages.length) % selectedProjectImages.length);
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">Current initiative · Progress to September 2026</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Current Projects</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-700">Select a project to view its information and photo gallery.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {currentInitiatives.map((project) => (
              <button
                key={project.title}
                type="button"
                onClick={() => openModal(project)}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
                aria-label={`View ${project.title} project information`}
              >
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image src={project.featuredImage} alt={`${project.title} project`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{project.shortDescription}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary-700">View project information <span aria-hidden="true">→</span></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Previous Projects</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(showAllProjects ? projectListings : projectListings.slice(0, 3)).map((project) => (
              <article key={project.title} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
                <button
                  type="button"
                  onClick={() => openModal(project)}
                  className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-700"
                  aria-label={`View details for ${project.title}`}
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <Image src={project.featuredImage} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-300 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-700">{project.shortDescription}</p>
                    <span className="mt-5 inline-block text-sm font-semibold text-primary-700">View project details</span>
                  </div>
                </button>
              </article>
            ))}
          </div>
          {projectListings.length > 3 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAllProjects((showAll) => !showAll)}
                className="btn-primary"
                aria-expanded={showAllProjects}
              >
                {showAllProjects ? 'Show fewer projects' : 'See more projects'}
              </button>
            </div>
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
                  {selectedProjectImages.length > 0 && (
                    <div className="mb-8">
                      <div className="relative bg-gray-100 rounded-xl overflow-hidden h-96 mb-4">
                        <img
                          src={selectedProjectImages[currentImageIndex]}
                          alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {selectedProjectImages.length > 1 && (
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
                      {selectedProjectImages.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {selectedProjectImages.map((img, idx) => (
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

                    {selectedProject.beneficiaries && selectedProject.beneficiaries.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Beneficiaries</h3>
                        <ul className="space-y-2">
                          {selectedProject.beneficiaries.map((beneficiary, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
                              <span>{beneficiary}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedProject.achievedResults && selectedProject.achievedResults.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Results</h3>
                        <ul className="space-y-2">
                          {selectedProject.achievedResults.map((result, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary-600" />
                              <span>{result}</span>
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
                        {selectedProject.startDate && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Project period</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(selectedProject.startDate).getFullYear()}
                              {selectedProject.endDate ? `–${new Date(selectedProject.endDate).getFullYear()}` : '–Present'}
                            </p>
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
