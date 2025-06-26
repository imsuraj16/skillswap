import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editProfile } from "../store/actions/userActions";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userProfile = useSelector((state) => state.user.user);
  const skills = useSelector((state) => state.skill.skill);
  const filteredSkills = skills.filter((s) => s.ownerId === userProfile?.id);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const editProfileHandler = (data) => {
    dispatch(editProfile(data, userProfile.id));
    setEdit(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Frontend: 'bg-blue-100 text-blue-800 border-blue-200',
      Backend: 'bg-green-100 text-green-800 border-green-200',
      Design: 'bg-purple-100 text-purple-800 border-purple-200',
      Other: 'bg-gray-100 text-gray-800 border-gray-200'
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

  if (edit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border border-gray-100">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h2>
              <p className="text-gray-600">Update your information</p>
            </div>

            <form onSubmit={handleSubmit(editProfileHandler)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  {...register("name")}
                  defaultValue={userProfile.name}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  {...register("email")}
                  defaultValue={userProfile.email}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
                  {...register("password")}
                  defaultValue={userProfile.password}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows="4"
                  placeholder="Tell something about yourself"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 resize-none"
                  {...register("bio")}
                  defaultValue={userProfile.bio}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEdit(false)}
                  type="button"
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {userProfile?.name || 'User'}
                </h1>
                <p className="text-gray-600 text-lg">
                  {userProfile?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>

          {/* Bio Section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-600 leading-relaxed">
              {userProfile?.bio || "No bio available. Add a bio to tell others about yourself!"}
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Skills</h2>
              <p className="text-gray-600">
                {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} shared
              </p>
            </div>
            <Link
              to="/add-skill"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Skill
            </Link>
          </div>

          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {skill.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                      {skill.level && (
                        <p className="text-sm text-gray-500 capitalize">{skill.level}</p>
                      )}
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(skill.category)}`}>
                    <span>{getCategoryIcon(skill.category)}</span>
                    {skill.category}
                  </span>
                  
                  {skill.description && (
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                      {skill.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Skills Added Yet</h3>
              <p className="text-gray-600 mb-6">
                Start building your profile by adding your first skill!
              </p>
              <Link
                to="/add-skill"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Your First Skill
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;