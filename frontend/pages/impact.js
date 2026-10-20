import { useEffect, useState } from 'react';
import Image from 'next/image';
import Hero from '../components/ui/Hero';
import { partnersAPI } from '../lib/api';
import { FiChevronDown } from 'react-icons/fi';
import picture1 from '../styles/pictures/Picture1.png';
import picture2 from '../styles/pictures/Picture2.png';
import picture6 from '../styles/pictures/Picture6.png';

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

export default function Impact() {
  const [partners, setPartners] = useState([]);
  const [openPartnerCategory, setOpenPartnerCategory] = useState(null);
  const [openImpactCard, setOpenImpactCard] = useState(null);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const partnersRes = await partnersAPI.getAll().catch(() => ({ data: { data: [] } }));
        setPartners(partnersRes.data.data || []);
      } catch (error) {
        console.error('Failed to load impact data:', error);
      }
    };

    fetchImpactData();
  }, []);

  const groupedPartners = partnerCategories.map((category, categoryIndex) => ({
    ...category,
    partners: partners.filter((partner) => {
      const name = (partner.name || '').toLowerCase();
      const earlierCategoryMatches = partnerCategories
        .slice(0, categoryIndex)
        .some((earlierCategory) => earlierCategory.matches.some((match) => name.includes(match)));

      if (earlierCategoryMatches) return false;
      if (category.matches.length === 0) return true;
      return category.matches.some((match) => name.includes(match));
    }),
  }));

  const impactAreas = [
    {
      title: 'Businesses Supported', image: picture1, imageAlt: 'Women-led businesses showcasing their products',
      highlights: [
        { title: 'Financial skills', detail: '77 of 90 targeted women completed financial literacy training. Participants reported an average 85% increase in financial knowledge; 80% implemented business changes, and 90% organised their financial records.' },
        { title: 'Product improvement', detail: '64 women entrepreneurs took part in product development and quality-control training against a target of 60. 70% developed or improved a product.' },
        { title: 'Mentorship', detail: '28 of 30 targeted mentors were trained, and each was assigned at least three mentees to support business formalisation and growth.' },
      ],
    },
    {
      title: 'Training and Capacity Building', image: picture6, imageAlt: 'Women entrepreneurs taking part in a learning session',
      highlights: [
        { title: 'Leadership and life skills', detail: '77 of 90 targeted women completed training. At least 80% went on to take leadership roles in their communities or business networks.' },
        { title: 'Digital marketing', detail: '90 women completed e-commerce and digital-marketing training; 70% established or improved their online presence.' },
        { title: 'Practical business skills', detail: 'Training covered financial literacy, management and record keeping, product development, quality control, entrepreneurial behaviour and leadership.' },
      ],
    },
    {
      title: 'Market Access and Trade Opportunities', image: picture2, imageAlt: 'Women entrepreneurs at a NABW enterprise exhibition',
      highlights: [
        { title: 'Public procurement advocacy', detail: 'NABW’s policy advocacy has brought stakeholders together to address barriers facing women-owned SMEs and promote gender-responsive public procurement.' },
        { title: 'Online market presence', detail: 'E-commerce and digital-marketing training helped women-owned businesses build or improve their online presence, creating additional ways to reach customers.' },
        { title: 'Business connections', detail: 'NABW connects women entrepreneurs through exhibitions, mentorship and business networks that help them showcase products and pursue new opportunities.' },
      ],
    },
  ];
  return (
    <>
      <Hero
        title="Our Impact"
        subtitle="NABW's programmes, advocacy and partnerships strengthen women's economic resilience, leadership and climate action in Malawi."
        bgImage="/images/MUSME5.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-primary-700 uppercase tracking-[0.2em] text-xs font-semibold mb-3">Impact</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Measurable outcomes from NABW's work</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              NABW's work is grounded in evidence-based programming and advocacy for women-led businesses, leadership development and climate resilience across Malawi.
            </p>
          </div>

          <div className="mb-16">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {impactAreas.map((area) => {
                const isOpen = openImpactCard === area.title;
                const panelId = `impact-area-${area.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

                return (
                  <article key={area.title} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <button type="button" onClick={() => setOpenImpactCard((current) => current === area.title ? null : area.title)} className="flex min-h-24 w-full items-center justify-between gap-4 p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-700" aria-expanded={isOpen} aria-controls={panelId}>
                      <span className="text-xl font-bold text-gray-900">{area.title}</span>
                      <FiChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-primary-700 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div id={panelId} className="border-t border-gray-100">
                        <div className="relative aspect-[4/3] w-full bg-primary-50">
                          <Image src={area.image} alt={area.imageAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                        </div>
                        <div className="space-y-5 p-6">
                          {area.highlights.map((highlight) => (
                            <div key={highlight.title}>
                              <h3 className="font-semibold text-primary-800">{highlight.title}</h3>
                              <p className="mt-1 text-sm leading-relaxed text-gray-700">{highlight.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Partners & Collaborators</h2>
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
                        aria-controls={`impact-partners-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      >
                        <span>{category.title}</span>
                        <FiChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-primary-700 transition-transform ${openPartnerCategory === category.title ? 'rotate-180' : ''}`} />
                      </button>
                    </h3>
                    {openPartnerCategory === category.title && (
                      <div id={`impact-partners-${category.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="grid grid-cols-1 gap-3 border-t border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>
    </>
  );
}

