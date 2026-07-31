import { FiUsers, FiGlobe, FiAward, FiTrendingUp, FiHeart, FiBriefcase } from 'react-icons/fi';

const iconMap = {
  users: FiUsers,
  globe: FiGlobe,
  award: FiAward,
  trend: FiTrendingUp,
  heart: FiHeart,
  briefcase: FiBriefcase,
};

export default function ImpactStatCard({ stat }) {
  const IconComponent = iconMap[stat.icon] || FiAward;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
        <IconComponent className="w-8 h-8 text-primary-600" />
      </div>
      <div className="text-3xl font-bold text-primary-700 mb-2">{stat.value}</div>
      <h3 className="font-bold text-gray-900 mb-2">{stat.title}</h3>
      {stat.description && (
        <p className="text-sm text-gray-600">{stat.description}</p>
      )}
    </div>
  );
}
