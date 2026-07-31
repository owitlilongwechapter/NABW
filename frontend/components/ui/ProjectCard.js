import Link from 'next/link';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
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

  return (
    <div className="card group">
      <div className="relative overflow-hidden">
        {project.featuredImage ? (
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
            <span className="text-primary-700 font-bold text-xl">{project.title}</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <FiMapPin className="w-4 h-4 mr-1" />
          <span>{project.location}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FiCalendar className="w-4 h-4 mr-1" />
          <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="btn-primary w-full text-center text-sm"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
