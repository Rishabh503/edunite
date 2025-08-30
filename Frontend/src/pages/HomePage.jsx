import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Bot,
  MessageCircle,
  TrendingUp,
  Check,
  Quote,
} from "lucide-react";
import FeaturesGrid from "../components/FeaturesGrid";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Empowering Educators with AI",
      subtitle:
        "Reduce teacher workload while providing personalized feedback to every student",
      buttonText: "Get Started",
      buttonLink: "/register",
    },
    {
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Automated Assignment Grading",
      subtitle:
        "Save hours of grading time with our AI-powered assessment system",
      buttonText: "Learn More",
      buttonLink: "/ansCheck",
    },
    {
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Personalized Student Feedback",
      subtitle:
        "AI-generated, individualized feedback to help each student improve",
      buttonText: "See Examples",
      buttonLink: "/choose-topic",
    },
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === carouselItems.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? carouselItems.length - 1 : currentSlide - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] ">
      {/* Hero Carousel - Full Screen */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white p-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
                  {item.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl animate-fade-in-up animation-delay-300">
                  {item.subtitle}
                </p>
                <Link
                  to={item.buttonLink}
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-600"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all duration-300 transform hover:scale-110 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-70 transition-all duration-300 transform hover:scale-110 z-10"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
           <div id="features" className="features">
            <FeaturesGrid/> 
           </div>
      {/* Features Section */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-4">
              How EduniteX Helps
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform transforms education by supporting
              overworked teachers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className=" rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300  bg-[#1e293b] p-6 text-white hover:shadow-lg ">

              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold  mb-4">
                  Automated Grading
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  AI that grades assignments, tests, and essays with human-level
                  accuracy, saving teachers countless hours.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
          <div className=" rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300  bg-[#1e293b] p-6 text-white hover:shadow-lg ">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Personalized Feedback
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tailored feedback for each student's work, highlighting
                  strengths and areas for improvement.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
              <div className=" rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300  bg-[#1e293b] p-6 text-white hover:shadow-lg ">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Performance Analytics
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Detailed insights into class and individual student
                  performance to guide instruction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Section */}
      {/* <section className="py-20 bg-gradient-to-r from-gray-900 to-[#0f172a] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <img
                src="/sdg-4-1024x1024.png"
                alt="SDG 4: Quality Education"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8">
                Supporting UN Sustainable Development Goal 4
              </h2>
              <p className="text-xl mb-10 leading-relaxed">
                EduniteX aligns with SDG 4: Quality Education by helping ensure
                inclusive and equitable quality education through:
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Reducing teacher workload in under-resourced schools",
                  "Providing personalized learning experiences for all students",
                  "Enabling teachers to focus more on teaching and mentoring",
                  "Making quality feedback accessible regardless of class size",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check
                      className="mt-1 mr-4 flex-shrink-0 text-green-400"
                      size={20}
                    />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="/about"
                className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Learn About Our Mission
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      {/* <section className="py-20 ">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-4">
              What Educators Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by teachers and schools worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "EduniteX has cut my grading time by 70%, allowing me to focus on creating better lessons and giving more one-on-one attention to students who need it most.",
                name: "Sarah Johnson",
                role: "High School English Teacher",
                image: "https://randomuser.me/api/portraits/women/45.jpg",
              },
              {
                quote:
                  "The personalized feedback our students receive has dramatically improved their performance and engagement. It's like having a teaching assistant for every student.",
                name: "Michael Chen",
                role: "School Principal",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                quote:
                  "In our rural school with limited resources, EduniteX has been transformative. Our teachers are less stressed and our students are performing better than ever.",
                name: "Amina Diallo",
                role: "School Administrator",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="mb-6 text-blue-500">
                    <Quote size={32} />
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                      alt={testimonial.name}
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20  text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Classroom?
          </h2>
          <p className="text-xl mb-10 leading-relaxed">
            Join thousands of educators who are saving time and improving
            student outcomes with EduniteX.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/register"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Register Your School
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
