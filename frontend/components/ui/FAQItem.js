import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-4 px-2 text-gray-900 font-medium hover:text-primary-700 transition-colors"
      >
        <span>{faq.question}</span>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0 ml-2" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <div className="px-2 text-gray-600 text-sm">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
