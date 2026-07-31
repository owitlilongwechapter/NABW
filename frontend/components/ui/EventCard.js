import Link from 'next/link';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

export default function EventCard({ event, isPast = false }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        {event.featuredImage ? (
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-secondary-200 to-secondary-400 flex items-center justify-center">
            <span className="text-secondary-700 font-bold text-xl">{event.title}</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPast ? 'bg-gray-100 text-gray-800' : 'bg-accent-100 text-accent-800'
          }`}>
            {isPast ? 'Past' : 'Upcoming'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="w-4 h-4 mr-2 text-primary-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          {event.time && (
            <div className="flex items-center">
              <FiClock className="w-4 h-4 mr-2 text-primary-500" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center">
            <FiMapPin className="w-4 h-4 mr-2 text-primary-500" />
            <span>{event.venue}</span>
          </div>
        </div>

        {event.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {event.shortDescription}
          </p>
        )}

        {event.registrationOpen && !isPast && event.registrationLink && (
          <Link
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center text-sm"
          >
            Register Now
          </Link>
        )}

        {event.slug && (
          <Link
            href={`/events/${event.slug}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 block text-center"
          >
            View Details →
          </Link>
        )}
      </div>
    </div>
  );
}
