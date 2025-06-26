import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addSkill } from "../store/actions/skillsAction";
import { useNavigate } from "react-router-dom";

const AddSkill = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const skillHandler = (skillData) => {
    skillData.id = nanoid();
    skillData.ownerId = user.id;
    skillData.username = user.name;
    dispatch(addSkill(skillData));
    navigate("/explore");
  };

  const watchedDescription = watch("description", "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Add New Skill
          </h2>
          
          <form onSubmit={handleSubmit(skillHandler)} className="space-y-6">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your skill name"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                {...register("name", {
                  required: "Skill name is required",
                  minLength: {
                    value: 2,
                    message: "Skill name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Skill name must be less than 50 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white ${
                  errors.category
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                {...register("category", {
                  required: "Please select a category",
                })}
              >
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your skill (optional)"
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100 resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
                rows={4}
                {...register("description", {
                  maxLength: {
                    value: 300,
                    message: "Description must be less than 300 characters",
                  },
                })}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <span>⚠️</span>
                    {errors.description.message}
                  </p>
                )}
                <span className="text-sm text-gray-400 ml-auto">
                  {watchedDescription.length}/300
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-[1.02]"
            >
              Add Skill
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;