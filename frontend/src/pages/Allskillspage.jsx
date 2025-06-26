import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Allskillspage = () => {
  const skills = useSelector(state => state.skill.skill);
  const user = useSelector(state => state.user.user);

  const filteredSkill = skills.filter((skill) => skill.ownerId !== user?.id);

  const getCategoryColor = (category) => {
    const colors = {
      Frontend: 'bg-blue-50 border-blue-200 text-blue-800',
      Backend: 'bg-green-50 border-green-200 text-green-800',
      Design: 'bg-purple-50 border-purple-200 text-purple-800',
      Other: 'bg-gray-50 border-gray-200 text-gray-800'
    };
    return colors[category] || colors.Other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Frontend: '🎨',
      Backend: '⚙️',
      Design: '🎯',
      Other: '🔧'
    };
    return icons[category] || icons.Other;
  };

  if (filteredSkill.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Skills Available</h2>
            <p className="text-gray-600">There are currently no skills to explore. Check back later!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Skills
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing skills from our community
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {filteredSkill.length} skills available
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkill.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] group"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {skill.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        by {skill.username}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(skill.category)}`}>
                    <span>{getCategoryIcon(skill.category)}</span>
                    {skill.category}
                  </span>
                </div>

                {/* Description */}
                {skill.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {skill.description}
                  </p>
                )}

                {/* Skill Level */}
                {skill.level && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Level:</span>
                      <span className="text-xs font-semibold text-blue-600 capitalize">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {skill.availability && (
                      <span className="capitalize">{skill.availability} availability</span>
                    )}
                  </div>
                  <Link
                    to={`/user/${skill.ownerId}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Details
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allskillspage;