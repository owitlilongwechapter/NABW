import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronLeft, FiChevronRight, FiGlobe, FiHeart, FiBriefcase } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '../components/ui/Hero';
import { aboutAPI, partnersAPI } from '../lib/api';
import picture1 from '../styles/pictures/Picture1.png';
import picture2 from '../styles/pictures/Picture2.png';
import picture3 from '../styles/pictures/Picture3.png';
import picture4 from '../styles/pictures/Picture4.png';
import picture5 from '../styles/pictures/Picture5.jpg';
import picture6 from '../styles/pictures/Picture6.png';
import picture7 from '../styles/pictures/Picture7.png';

const homepagePhotos = [picture1, picture2, picture3, picture4, picture5, picture6, picture7].map((image) => image.src);
const teamMembers = [
  { name: 'Ms Barbara Banda', role: 'President' },
  { name: 'Mr Jack Banda', role: 'Project Coordinator' },
  { name: 'Maryrose Ikumi', role: 'Monitoring and Evaluation Expert' },
  { name: 'Packston Chalema', role: 'Accountant' },
];
const projectSnapshots = [
  {
    title: 'Gender-Inclusive Public Procurement',
    description: 'Building women-led businesses’ access to government contracts through training, policy advocacy and open contracting.',
    image: picture6,
  },
  {
    title: 'Building Back Better',
    description: 'Supporting women-owned businesses to recover and strengthen resilience after climate-related shocks.',
    image: picture7,
  },
  {
    title: 'Green & Inclusive Energy',
    description: 'Advancing women’s participation in greener, more inclusive energy systems and supply chains.',
    image: picture4,
  },
  {
    title: 'Gender Equality Advocacy',
    description: 'Bringing women’s priorities into public dialogue, policy and decision-making.',
    image: picture3,
  },
];
const partnerCategories = [
  {
    title: 'Government Organisations',
    matches: ['line ministries', 'malawi bureau', 'national economic empowerment fund', 'fines project', 'smedi'],
  },
  {
    title: 'Donors and Development Partners',
    matches: ['urgent africa fund', 'christian aid', 'world university service', 'wusc', 'hivos', 'graca', 'british council', 'giz'],
  },
  { title: 'Local Institutions', matches: [] },
];

export default function Home() {
  const [about, setAbout] = useState(null);
  const [partners, setPartners] = useState([]);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [isTeamPaused, setIsTeamPaused] = useState(false);
  const [openPartnerCategory, setOpenPartnerCategory] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [aboutRes, partnersRes] = await Promise.all([
          aboutAPI.get().catch(() => ({ data: { data: null } })),
          partnersAPI.getAll().catch(() => ({ data: { data: [] } })),
        ]);

        setAbout(aboutRes.data.data);
        setPartners(partnersRes.data.data || []);
      } catch (error) {
        console.error('Failed to load homepage data:', error);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    if (isTeamPaused) return undefined;

    const interval = setInterval(() => {
      setActiveTeamIndex((currentIndex) => (currentIndex + 1) % teamMembers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isTeamPaused]);

  const showTeamMember = (index) => {
    setActiveTeamIndex((index + teamMembers.length) % teamMembers.length);
  };

  const groupedPartners = partnerCategories.map((category, categoryIndex) => ({
    ...category,
    partners: partners.filter((partner) => {
      const name = partner.name.toLowerCase();
      const earlierCategoryMatches = partnerCategories
        .slice(0, categoryIndex)
        .some((earlierCategory) => earlierCategory.matches.some((match) => name.includes(match)));

      if (earlierCategoryMatches) return false;
      if (category.matches.length === 0) {
        return !partnerCategories
          .slice(0, categoryIndex)
          .some((earlierCategory) => earlierCategory.matches.some((match) => name.includes(match)));
      }

      return category.matches.some((match) => name.includes(match));
    }),
  }));

  const values = about?.coreValues || [];

  return (
    <>
      <Hero
        title={about?.organizationName || 'National Association of Business Women (NABW)'}
        subtitle={about?.mission || 'A women-founded and women-led non-profit organisation dedicated to empowering women in business and leadership roles in Malawi.'}
        ctaText="Learn About NABW"
        ctaLink="/about"
        bgImages={homepagePhotos}
        height="h-[80vh]"
      />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {about?.organizationName || 'National Association of Business Women (NABW)'}
            </h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed">
              {about?.history || 'NABW is a women-founded and women-led non-profit and non-governmental organisation dedicated to empowering women in business and leadership roles. Founded in 1990 as an NGO under the Trusteeship Act of 1962 of the Laws of Malawi, NABW works to advance women’s economic and social transformation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiHeart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mission</h3>
              <p className="text-gray-700 leading-relaxed">{about?.mission || 'Mission information is currently being updated.'}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FiGlobe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Vision</h3>
              <p className="text-gray-700 leading-relaxed">{about?.vision || 'Vision information is currently being updated.'}</p>
            </div>

          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">Values</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.length > 0 ? values.map((value) => (
              <div key={value.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiBriefcase className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
              </div>
            )) : (
              <div className="col-span-full text-center text-gray-600 py-8">Values are being prepared for publication.</div>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-700">On the ground</p>
              <h2 className="text-3xl font-bold text-gray-900">Project snapshots</h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-primary-700 hover:text-primary-900">
              Explore projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projectSnapshots.map((project) => (
              <Link key={project.title} href="/projects" className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-4">
                <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">People</p>
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
          </div>
          <div
            className="mx-auto max-w-xl"
            role="region"
            aria-roledescription="carousel"
            aria-label="NABW team members"
            onMouseEnter={() => setIsTeamPaused(true)}
            onMouseLeave={() => setIsTeamPaused(false)}
            onFocus={() => setIsTeamPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsTeamPaused(false);
            }}
          >
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTeamIndex * 100}%)` }}
              >
                {teamMembers.map((person, index) => (
                  <article
                    key={person.name}
                    className="min-w-full rounded-xl bg-white p-8 text-center shadow-lg"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${teamMembers.length}`}
                    aria-hidden={index !== activeTeamIndex}
                  >
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
                      {person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                    <p className="mt-2 text-sm font-semibold text-primary-700">{person.role}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => showTeamMember(activeTeamIndex - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
                aria-label="Previous team member"
              >
                <FiChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2" role="group" aria-label="Choose team member">
                {teamMembers.map((person, index) => (
                  <button
                    key={person.name}
                    type="button"
                    onClick={() => showTeamMember(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${index === activeTeamIndex ? 'bg-primary-700' : 'bg-gray-300 hover:bg-gray-500'}`}
                    aria-label={`Show ${person.name}`}
                    aria-current={index === activeTeamIndex ? 'true' : undefined}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => showTeamMember(activeTeamIndex + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-primary-600 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700"
                aria-label="Next team member"
              >
                <FiChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">Partners</p>
            <h2 className="text-3xl font-bold text-gray-900">Partners & Collaborators</h2>
          </div>
          {partners.length > 0 ? (
            <div className="mx-auto max-w-4xl space-y-3">
              {groupedPartners.map((category) => category.partners.length > 0 && (
                <div key={category.title} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenPartnerCategory((current) => current === category.title ? null : category.title)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-700"
                      aria-expanded={openPartnerCategory === category.title}
                      aria-controls={`partners-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    >
                      <span>{category.title}</span>
                      <FiChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-primary-700 transition-transform ${openPartnerCategory === category.title ? 'rotate-180' : ''}`} />
                    </button>
                  </h3>
                  {openPartnerCategory === category.title && (
                    <div id={`partners-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="grid grid-cols-1 gap-3 border-t border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
                      {category.partners.map((partner) => (
                        <div key={partner._id || partner.name} className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">{partner.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">Partner information is being updated.</div>
          )}
        </div>
      </section>

    </>
  );
}
