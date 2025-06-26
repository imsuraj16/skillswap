import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/apiconfig";
import { getRequest } from "../store/actions/requestAction";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom"; 

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request.request);
  const currentUserId = useSelector((state) => state.user.user.id);

  const [allUsers, setAllUsers] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionProcessing, setActionProcessing] = useState(null);

  useEffect(() => {
    dispatch(getRequest());
    getUsersAndSkills();
  }, [dispatch]);

  const getUsersAndSkills = async () => {
    try {
      const [userRes, skillRes] = await Promise.all([
        axios.get("/user"),
        axios.get("/skills"),
      ]);
      setAllUsers(userRes.data);
      setAllSkills(skillRes.data);
    } catch (err) {
      console.error("Failed to load users or skills:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (id) =>
    allUsers.find((u) => u.id === id)?.name || "Unknown";

  const getSkillName = (id) =>
    allSkills.find((s) => s.id === id)?.name || "Unknown Skill";

  const handleAction = async (id, status) => {
    try {
      setActionProcessing(id + status);
      const update = { status };
      if (status === "accepted") {
        update.roomId = `room-${nanoid()}`;
      }
      await axios.patch(`/requests/${id}`, update);
      dispatch(getRequest());
    } catch (err) {
      console.error("Action failed:", err.message);
    } finally {
      setActionProcessing(null);
    }
  };

  const sent = requests.filter((r) => r.fromUserId === currentUserId);
  const received = requests.filter((r) => r.toUserId === currentUserId);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-lg text-gray-600">Loading requests...</p>
          </div>
        </div>
      </div>
    );
  }

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
        status === "pending"
          ? "bg-amber-100 text-amber-800 border border-amber-200"
          : status === "accepted"
          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
          : "bg-red-100 text-red-800 border border-red-200"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          status === "pending"
            ? "bg-amber-500"
            : status === "accepted"
            ? "bg-emerald-500"
            : "bg-red-500"
        }`}
      ></div>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const RequestCard = ({ req, type }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {(type === "sent" ? getUserName(req.toUserId) : getUserName(req.fromUserId))
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {type === "sent" ? "To: " : "From: "}
                  <span className="font-semibold">
                    {type === "sent" ? getUserName(req.toUserId) : getUserName(req.fromUserId)}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Skill: <span className="font-medium text-gray-700">{getSkillName(req.skillId)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 ml-4">
            {type === "received" && req.status === "pending" ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction(req.id, "accepted")}
                  disabled={actionProcessing === req.id + "accepted"}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {actionProcessing === req.id + "accepted" ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : null}
                  Accept
                </button>
                <button
                  onClick={() => handleAction(req.id, "rejected")}
                  disabled={actionProcessing === req.id + "rejected"}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {actionProcessing === req.id + "rejected" ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                  ) : null}
                  Reject
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <StatusBadge status={req.status} />
                {req.status === "accepted" && req.roomId && (
                  <Link
                    to={`/meeting/${req.roomId}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Join Room
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ type }) => (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {type} requests
      </h3>
      <p className="text-gray-500">
        {type === "sent" 
          ? "You haven't sent any requests yet." 
          : "You haven't received any requests yet."}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Requests</h1>
          <p className="text-lg text-gray-600">Manage your skill exchange requests</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sent Requests */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Sent Requests</h2>
                <p className="text-sm text-gray-500">{sent.length} request{sent.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="space-y-4">
              {sent.length ? (
                sent.map((req) => (
                  <RequestCard key={req.id} req={req} type="sent" />
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200">
                  <EmptyState type="sent" />
                </div>
              )}
            </div>
          </div>

          {/* Received Requests */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Received Requests</h2>
                <p className="text-sm text-gray-500">{received.length} request{received.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="space-y-4">
              {received.length ? (
                received.map((req) => (
                  <RequestCard key={req.id} req={req} type="received" />
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-200">
                  <EmptyState type="received" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;