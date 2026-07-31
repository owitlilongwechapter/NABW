import { FiStar } from 'react-icons/fi';

export default function TestimonialCard({ testimonial }) {
  const renderRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        ) : (
          <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center mr-4">
            <span className="text-primary-700 font-bold text-lg">
              {testimonial.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          {testimonial.title && (
            <p className="text-sm text-gray-600">{testimonial.title}</p>
          )}
          {testimonial.organization && (
            <p className="text-xs text-gray-500">{testimonial.organization}</p>
          )}
        </div>
      </div>

      {testimonial.rating && (
        <div className="flex items-center mb-3">
          {renderRating(testimonial.rating)}
        </div>
      )}

      <p className="text-gray-700 text-sm italic mb-4 flex-1">
        "{testimonial.content}"
      </p>
    </div>
  );
}
