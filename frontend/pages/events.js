import { useState, useEffect } from 'react';
import Hero from '../components/ui/Hero';
import EventCard from '../components/ui/EventCard';
import { eventsAPI } from '../lib/api';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, pastRes] = await Promise.allSettled([
          eventsAPI.getUpcoming(),
          eventsAPI.getPast(),
        ]);

        if (upcomingRes.status === 'fulfilled') setUpcomingEvents(upcomingRes.value.data.data);
        if (pastRes.status === 'fulfilled') setPastEvents(pastRes.value.data.data);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Hero
        title="Events"
        subtitle="Join us for upcoming events and explore our past activities."
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-md p-2 inline-flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Upcoming Events
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'past'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          {activeTab === 'upcoming' && (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
                  ))}
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No upcoming events at the moment. Please check back soon.</p>
                </div>
              )}
            </>
          )}

          {/* Past Events */}
          {activeTab === 'past' && (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-80"></div>
                  ))}
                </div>
              ) : pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event) => (
                    <EventCard key={event._id} event={event} isPast />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No past events found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
