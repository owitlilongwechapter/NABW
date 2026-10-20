import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiMaximize2, FiX } from 'react-icons/fi';
import Hero from '../components/ui/Hero';
import FAQItem from '../components/ui/FAQItem';
import { aboutAPI, faqsAPI } from '../lib/api';
import nabwMap from '../styles/nabw map.png';

function ImpactMetric({ label, value }) {
  return (
    <div className="py-1.5">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold">
        <span className="leading-tight text-gray-700">{label}</span>
        <span className="shrink-0 rounded-full bg-primary-700 px-2 py-0.5 text-white">{value}%</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-primary-100"
        role="progressbar"
        aria-label={label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={value}
      >
        <div className="h-full rounded-full bg-primary-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ImpactHighlight({ label, value }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex shrink-0 flex-col items-center" aria-label={`${label}: ${value}%`}>
      <div className="relative h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#f6e0ea" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="#7d204d"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-primary-800">{value}%</span>
      </div>
      <span className="mt-1 max-w-28 text-center text-[11px] font-semibold leading-tight text-primary-800">{label}</span>
    </div>
  );
}


export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [faqsLoading, setFaqsLoading] = useState(true);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const mapTriggerRef = useRef(null);
  const mapDialogRef = useRef(null);
  const mapCloseButtonRef = useRef(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await aboutAPI.get();
        setAbout(res.data.data);
      } catch (error) {
        console.error('Failed to fetch about information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await faqsAPI.getAll();
        setFaqs(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setFaqsLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  useEffect(() => {
    if (!isMapOpen) return undefined;

    const dialog = mapDialogRef.current;
    const trigger = mapTriggerRef.current;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    mapCloseButtonRef.current?.focus();

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') setIsMapOpen(false);
      if (event.key !== 'Tab' || !dialog) return;

      const focusableElements = Array.from(dialog.querySelectorAll(focusableSelector));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDialogKeyDown);
      trigger?.focus();
    };
  }, [isMapOpen]);

  if (loading) {
    return (
      <>
        <Hero title="About NABW" height="h-[50vh]" />
        <section className="section-padding">
          <div className="container-custom animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-24 bg-gray-200 rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-40 bg-gray-200 rounded-xl" />
              <div className="h-40 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </section>
      </>
    );
  }

  const values = about?.coreValues || [];
  const priorities = about?.strategicPriorities || [];
  const heroImage = '/images/MUSME5.jpg';
  return (
    <>
      <Hero
        title="About NABW"
        subtitle={about?.mission || 'A women-founded and women-led non-profit organisation dedicated to empowering women in business and leadership roles.'}
        bgImage={heroImage}
      />  
    
    

      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-16">
            <p className="text-primary-700 uppercase tracking-[0.2em] text-xs font-semibold mb-3 text-center">About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{about?.organizationName || 'NABW: Women empowering women for economic and social transformation'}</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed">{about?.history || 'NABW is a women-founded and women-led non-profit and non-governmental organisation dedicated to empowering women in business and leadership roles.'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">{about?.mission || 'Mission information is currently being updated.'}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-primary-700 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">{about?.vision || 'Vision information is currently being updated.'}</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.length > 0 ? values.map((value) => (
                <div key={value.title} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                </div>
              )) : (
                <div className="col-span-full text-center text-gray-600 py-8">Values are being prepared for publication.</div>
              )}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Strategic Priorities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {priorities.length > 0 ? priorities.map((priority, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-5 border-l-4 border-primary-600">
                  <p className="text-gray-700 font-medium">{priority}</p>
                </div>
              )) : (
                <div className="col-span-full text-center text-gray-600 py-8">Strategic priorities are being updated.</div>
              )}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Governance</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed mb-6">{about?.governance || 'NABW has a membership-led structure and a Board of Directors that guides the organisation.'}</p>
            </div>
          </div>

          <section className="section-padding">
            <div className="text-center mb-10">
              <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">Impact</p>
              <h2 className="text-3xl font-bold text-gray-900">Our Recent Work &amp; Achievements</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)] lg:items-start lg:gap-8">
              <div className="space-y-6">
                <article className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-5">
                    <ImpactHighlight label="Women trained" value={85} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Entrepreneurial Behaviour, Life Skills and Leadership</h3>
                      <p className="text-gray-700 leading-relaxed">77 of 90 targeted women were trained, representing 85%. Participants reported improved self-confidence and decision-making abilities, and at least 80% took leadership roles within their communities or business networks.</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-gray-100 pt-2">
                    <ImpactMetric label="Taking leadership roles" value={80} />
                  </div>
                </article>
                <article className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-5">
                    <ImpactHighlight label="Knowledge increase" value={85} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Financial Literacy, Management and Record Keeping</h3>
                      <p className="text-gray-700 leading-relaxed">77 of 90 women were trained, representing 85%. Participants demonstrated an average 85% increase in financial literacy knowledge, 80% reported implementing changes in their businesses, and 90% now have organised financial records compared with less than 50% at the start of the project.</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-x-6 border-t border-gray-100 pt-2 sm:grid-cols-2">
                    <ImpactMetric label="Women trained" value={85} />
                    <ImpactMetric label="Business changes implemented" value={80} />
                    <ImpactMetric label="Organised financial records" value={90} />
                  </div>
                </article>
                <article className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-5">
                    <ImpactHighlight label="Products improved" value={70} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Product Development and Quality Control</h3>
                      <p className="text-gray-700 leading-relaxed">64 women entrepreneurs were trained against a target of 60. Quality improvements enhanced the competitiveness of women-led businesses, and 70% of participants successfully developed or improved existing products.</p>
                    </div>
                  </div>
                </article>
                <article className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex gap-5">
                    <ImpactHighlight label="Mentors trained" value={93} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Mentorship Programme</h3>
                      <p className="text-gray-700 leading-relaxed">28 of 30 targeted mentors were trained, representing 93%. Each mentor was assigned at least three mentees, and the programme assisted in business formalisation and improved the credibility of women-owned businesses.</p>
                    </div>
                  </div>
                </article>
              </div>

              <aside className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:sticky lg:top-6" aria-labelledby="reach-heading">
                <p className="text-primary-700 font-semibold uppercase tracking-[0.2em] text-xs mb-3">Nationwide network</p>
                <h3 id="reach-heading" className="text-2xl font-bold text-gray-900">Where We Reach</h3>
                <p className="mt-3 text-gray-700 leading-relaxed">NABW supports women business owners across Malawi, connecting members and communities in the Southern, Central and Northern regions.</p>
                <button
                  type="button"
                  ref={mapTriggerRef}
                  className="group relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-lg bg-primary-50 text-left outline-none ring-offset-2 transition focus-visible:ring-2 focus-visible:ring-primary-700"
                  onClick={() => setIsMapOpen(true)}
                  aria-label="Expand NABW reach map"
                  aria-haspopup="dialog"
                >
                  <Image
                    src={nabwMap}
                    alt="Map showing NABW's reach across Malawi"
                    fill
                    sizes="(min-width: 1280px) 29vw, (min-width: 640px) 70vw, 92vw"
                    className="object-contain p-3 transition duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-primary-800 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm transition group-hover:bg-primary-700">
                    <FiMaximize2 aria-hidden="true" className="h-3.5 w-3.5" />
                    View full map
                  </span>
                </button>
                <dl className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm">
                  <div><div className="mb-1.5 flex items-center justify-between gap-4"><dt className="flex items-center gap-2 font-medium text-gray-700"><span className="h-2.5 w-2.5 rounded-full bg-primary-700" />Southern Region</dt><dd className="font-bold text-primary-800">40%</dd></div><div className="h-1.5 overflow-hidden rounded-full bg-primary-100"><div className="h-full w-2/5 rounded-full bg-primary-700" /></div></div>
                  <div><div className="mb-1.5 flex items-center justify-between gap-4"><dt className="flex items-center gap-2 font-medium text-gray-700"><span className="h-2.5 w-2.5 rounded-full bg-primary-500" />Central Region</dt><dd className="font-bold text-primary-800">35%</dd></div><div className="h-1.5 overflow-hidden rounded-full bg-primary-100"><div className="h-full rounded-full bg-primary-500" style={{ width: '35%' }} /></div></div>
                  <div><div className="mb-1.5 flex items-center justify-between gap-4"><dt className="flex items-center gap-2 font-medium text-gray-700"><span className="h-2.5 w-2.5 rounded-full bg-secondary-500" />Northern Region</dt><dd className="font-bold text-primary-800">25%</dd></div><div className="h-1.5 overflow-hidden rounded-full bg-primary-100"><div className="h-full w-1/4 rounded-full bg-secondary-500" /></div></div>
                </dl>
              </aside>
            </div>
          </section>

          {isMapOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-8"
              role="presentation"
              onMouseDown={() => setIsMapOpen(false)}
            >
              <div
                ref={mapDialogRef}
                className="relative flex max-h-full w-full max-w-6xl flex-col rounded-xl bg-white p-4 shadow-2xl sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="map-modal-title"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 id="map-modal-title" className="text-lg font-bold text-gray-900">NABW reach across Malawi</h2>
                  <button
                    type="button"
                    ref={mapCloseButtonRef}
                    onClick={() => setIsMapOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2"
                    aria-label="Close map"
                  >
                    <FiX aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="relative min-h-0 flex-1 overflow-auto bg-primary-50">
                  <Image
                    src={nabwMap}
                    alt="Map showing NABW's reach across Malawi"
                    sizes="(min-width: 1280px) 1100px, 100vw"
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            {faqsLoading ? (
              <p className="text-center text-gray-600">Loading FAQs...</p>
            ) : faqs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {faqs.map((faq) => (
                  <div key={faq._id} className="bg-white rounded-xl shadow-lg p-6">
                    <FAQItem faq={faq} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">FAQs are currently being updated by the organisation.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
