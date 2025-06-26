import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Users,
  BookOpen,
  Star,
  Award,
  TrendingUp,
  Play,
  ChevronRight,
  Zap,
  Globe,
} from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const navigate = useNavigate();

  const skills = [
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "Data Science",
    "Photography",
    "Music Production",
  ];

  useEffect(() => {
    // GSAP animations
    const gsap = window.gsap;

    if (gsap) {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Features animation on scroll
      gsap.fromTo(
        featuresRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        statsRef.current?.children || [],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating animation for cards
      gsap.to(".floating-card", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }

    // Skill rotation
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* GSAP CDN */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

      <div className="min-h-screen bg-white text-gray-900">
        {/* Hero Section */}
        <section className="pt-20 pb-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto">
            <div ref={heroRef} className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gray-900">Learn</span>
                <span className="text-blue-600"> Skills</span>
                <span className="text-gray-900">,</span>
                <br />
                <span className="text-gray-900">Share</span>
                <span className="text-blue-600"> Knowledge</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
                India's premier peer-to-peer learning platform. Master
                <span className="text-blue-600 font-semibold mx-2 px-3 py-1 bg-blue-100 rounded-full inline-block transition-all duration-500">
                  {skills[currentSkill]}
                </span>
                from experts and share your expertise with others.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button onClick={()=>navigate('/explore')} className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                  Start Learning Today
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              >
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    10K+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Active Learners
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    5K+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Expert Teachers
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    100+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Skills Available
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    4.9★
                  </div>
                  <div className="text-gray-600 font-medium">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It <span className="text-blue-600">Works</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to start your learning or teaching journey
              </p>
            </div>

            <div ref={featuresRef} className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-all transform group-hover:scale-110">
                  <BookOpen size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Discover Skills
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse through our extensive catalog of skills and find
                  exactly what you want to learn or teach
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all transform group-hover:scale-110">
                  <Users size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Connect & Match
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get matched with verified experts or eager learners based on
                  your preferences and location
                </p>
              </div>

              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-all transform group-hover:scale-110">
                  <Award size={32} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Learn & Grow
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Start your sessions, track progress, and build your skill
                  portfolio while earning or learning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-blue-600">SkillShare</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Instant Matching
                </h3>
                <p className="text-gray-600">
                  Advanced algorithm matches you with the perfect teacher or
                  student in minutes
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Learn Anywhere
                </h3>
                <p className="text-gray-600">
                  Flexible online and offline learning options to fit your
                  schedule
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Verified Experts
                </h3>
                <p className="text-gray-600">
                  All teachers are verified professionals with proven track
                  records
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Track Progress
                </h3>
                <p className="text-gray-600">
                  Monitor your learning journey with detailed analytics and
                  milestones
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="text-pink-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Quality Assured
                </h3>
                <p className="text-gray-600">
                  Rating system and reviews ensure high-quality learning
                  experiences
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all floating-card">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  Community
                </h3>
                <p className="text-gray-600">
                  Join a vibrant community of learners and teachers across India
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of learners and teachers who are already building
              skills together. Your next skill is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={()=>navigate('/explore')} className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                Join as Learner
                <BookOpen
                  className="ml-2 group-hover:rotate-12 transition-transform"
                  size={20}
                />
              </button>
              <button onClick={()=>navigate('/add-skill')} className="group px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 flex items-center justify-center">
                Start Teaching
                <TrendingUp
                  className="ml-2 group-hover:scale-110 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold mb-4 text-blue-400">
                  SkillShare
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Empowering peer-to-peer learning across India. Building
                  skills, one connection at a time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-lg">Platform</h4>
                <div className="space-y-3 text-gray-400">
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Browse Skills
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Find Teachers
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Become Teacher
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Community
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-lg">Support</h4>
                <div className="space-y-3 text-gray-400">
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Help Center
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Contact Us
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Safety Guidelines
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-lg">Company</h4>
                <div className="space-y-3 text-gray-400">
                  <div className="hover:text-white transition-colors cursor-pointer">
                    About Us
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Careers
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Press Kit
                  </div>
                  <div className="hover:text-white transition-colors cursor-pointer">
                    Blog
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              © 2025 SkillShare. Made with ❤️ in India. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
