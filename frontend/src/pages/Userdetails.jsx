import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/apiconfig";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../store/actions/requestAction";
import { nanoid } from "nanoid";

const Userdetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);

  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingSkillId, setProcessingSkillId] = useState(null);

  useEffect(() => {
    const fetchUserAndSkills = async () => {
      try {
        const [userRes, skillRes] = await Promise.all([
          axios.get(`/user/${id}`),
          axios.get(`/skills?ownerId=${id}`),
        ]);

        setUser(userRes.data);
        setSkills(skillRes.data);
      } catch (error) {
        console.error("Error fetching user or skills:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSkills();
  }, [id]);

  const handleRequest = async (skillId) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.id === id) return;

    setProcessingSkillId(skillId);

    const request = {
      fromUserId: currentUser.id,
      toUserId: id,
      id: nanoid(),
      skillId,
      status: "pending",
    };

    const response = await dispatch(addRequest(request));

    if (response?.payload?.message) {
      alert(response.payload.message);
    }

    setProcessingSkillId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600 font-medium">Loading user profile...</p>
            </div>
          </div>
        ) : user ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                    {user.bio || "Welcome to my profile! I'm excited to share my skills and connect with others."}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="px-8 py-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></span>
                  Skills & Expertise
                </h2>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {skills.length} {skills.length === 1 ? 'skill' : 'skills'}
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="grid gap-4">
                  {skills.map((skill, index) => (
                    <div
                      key={skill.id}
                      className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                              {skill.name}
                            </h3>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                              {skill.category}
                            </span>
                          </div>
                        </div>

                        {currentUser?.id !== user.id && (
                          <button
                            onClick={() => handleRequest(skill.id)}
                            disabled={processingSkillId === skill.id}
                            className={`ml-6 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                              processingSkillId === skill.id
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-300"
                            }`}
                          >
                            {processingSkillId === skill.id ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                <span>Sending...</span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span>Send Request</span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Skills Added Yet</h3>
                  <p className="text-gray-500">This user hasn't added any skills to their profile.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">User Not Found</h2>
            <p className="text-gray-500">The user you're looking for doesn't exist or has been removed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userdetails;