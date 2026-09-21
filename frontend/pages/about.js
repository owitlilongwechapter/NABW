import { useEffect, useState } from 'react';
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
      } catch (error) {
        console.error('Failed to fetch about information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

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
  const leadership = about?.leadership || [];
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadership.length > 0 ? leadership.map((person) => (
                <div key={person.name || person.position} className="bg-white rounded-xl shadow-lg p-8">
                  <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-primary-700">
                    {(person.name || '').split(' ').map((part) => part[0]).slice(0, 2).join('') || 'NB'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-primary-700 font-semibold mb-3 text-sm">{person.position}</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{person.bio}</p>
                </div>
              )) : (
                <div className="text-center text-gray-600 py-8">Leadership information is being updated.</div>
              )}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Governance</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed mb-6">{about?.governance || 'NABW has a membership-led structure and a Board of Directors that guides the organisation.'}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
