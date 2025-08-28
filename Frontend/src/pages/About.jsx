import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faRobot,
  faCommentDots,
  faChalkboardTeacher,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            About EduniteX
          </h1>
          <p className="text-xl md:text-2xl animate-fade-in-up animation-delay-300">
            Revolutionizing education through AI-powered teacher support
          </p>
        </div>
      </section>

      {/* Our Story */}
      {/* <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-gray-400 mb-6">Our Story</h2>
              <p className="text-xl mb-4 text-gray-300">
                Born from the challenges faced by educators in overworked
                classrooms.
              </p>
              <p className="mb-4 text-gray-400 leading-relaxed">
                EduniteX was founded by 4 passionate college students who
                recognized the immense pressure teachers face in today's online
                educational landscape. With the shift to online learning,
                teachers found themselves overwhelmed with grading assignments
                and providing personalized feedback to students. This not only
                consumed their valuable time but also led to generic feedback
                that failed to address individual student needs.
              </p>
              <p className="mb-8 text-gray-400 leading-relaxed">
                Our mission began with a simple question: How can we use
                artificial intelligence to give teachers back their most
                valuable resource - time - while simultaneously improving the
                quality of feedback students receive?
              </p>
              <a
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Meet Our Team
              </a>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Teacher grading papers"
                className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Mission and Vision */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming education through technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300 bg-[#1e293b] p-6 text-white hover:shadow-lg">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faBullseye}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Our Mission
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  To empower educators by reducing their administrative workload
                  through AI, enabling them to focus on what matters most -
                  inspiring and guiding their students. We strive to make
                  quality, personalized feedback accessible to every student,
                  regardless of class size or school resources.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="rounded-2xl shadow-lg overflow-hidden h-full transform hover:scale-105 transition-all duration-300 bg-[#1e293b] p-6 text-white hover:shadow-lg">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Our Vision
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  We envision a world where every teacher has the tools and time
                  to nurture their students' potential, and where every student
                  receives the individualized attention they need to succeed. By
                  2030, we aim to support 1 million educators worldwide,
                  directly contributing to UN Sustainable Development Goal 4:
                  Quality Education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Stressed teacher"
                className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-8 text-gray-400">The Problem We Solve</h2>

              <div className="space-y-8">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h5 className="text-xl font-semibold mb-3 text-gray-300">
                    Teacher Overwork
                  </h5>
                  <p className="text-gray-400 leading-relaxed">
                    Teachers spend 7-8 hours per week grading assignments, with
                    English teachers spending up to 15 hours - time that could
                    be spent on lesson planning and student interaction.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h5 className="text-xl font-semibold mb-3 text-gray-300">
                    Generic Feedback
                  </h5>
                  <p className="text-gray-400 leading-relaxed">
                    Large class sizes force teachers to provide generic comments
                    that don't address individual student needs, missing
                    opportunities for meaningful learning growth.
                  </p>
                </div>

                <div className="border-l-4 border-cyan-600 pl-6">
                  <h5 className="text-xl font-semibold mb-3 text-gray-300">
                    Resource Inequality
                  </h5>
                  <p className="text-gray-400 leading-relaxed">
                    Under-resourced schools struggle most, with teacher-student
                    ratios as high as 1:50 in some regions, making personalized
                    attention nearly impossible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
  <section className="py-20 bg-gradient-to-br from-slate-800 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our AI-Powered Solution</h2>
            <p className="text-xl max-w-2xl mx-auto">
              How EduniteX transforms the teaching experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl h-full transform hover:scale-105 transition-all duration-300">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-4">Advanced AI Grading</h4>
                <p className="leading-relaxed">
                  Our proprietary algorithms grade assignments with human-level
                  accuracy across multiple subjects and formats, from math
                  problems to essay questions.
                </p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl h-full transform hover:scale-105 transition-all duration-300">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-4">
                  Personalized Feedback Engine
                </h4>
                <p className="leading-relaxed">
                  The system generates customized feedback for each student,
                  identifying specific strengths and areas for improvement based
                  on their work.
                </p>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl h-full transform hover:scale-105 transition-all duration-300">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-4">
                  Teacher Oversight Tools
                </h4>
                <p className="leading-relaxed">
                  Educators can review, edit, and supplement all AI-generated
                  feedback, maintaining their professional judgment while saving
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      {/* <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming classrooms around the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-[#1e293b] p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-4">72%</div>
              <p className="text-gray-400 leading-relaxed">
                Reduction in grading time reported by teachers
              </p>
            </div>
            <div className="bg-[#1e293b] p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-4">2.5M+</div>
              <p className="text-gray-400 leading-relaxed">Assignments graded by our system</p>
            </div>
            <div className="bg-[#1e293b] p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">89%</div>
              <p className="text-gray-400 leading-relaxed">
                Of teachers report improved student engagement
              </p>
            </div>
            <div className="bg-[#1e293b] p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">15K+</div>
              <p className="text-gray-400 leading-relaxed">
                Educators using our platform worldwide
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-400 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Educators, technologists, and innovators united by a common
              purpose
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-700 p-4"
              />
              <h5 className="text-xl font-bold mb-2 text-white">Mukul Sharma</h5>
              <p className="text-gray-400 mb-3">Team Leader</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-700 p-4"
              />
              <h5 className="text-xl font-bold mb-2 text-white">Anagh Miglani</h5>
              <p className="text-gray-400 mb-3">Team Member</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-cyan-700 p-4"
              />
              <h5 className="text-xl font-bold mb-2 text-white">Rishabh Tripathi</h5>
              <p className="text-gray-400 mb-3">Team Member</p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-700 p-4"
              />
              <h5 className="text-xl font-bold mb-2 text-white">Niyati Chugh</h5>
              <p className="text-gray-400 mb-3">Team Member</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>

      {/* SDG Commitment */}
      <section className="py-20 bg-[#0f172a]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/sdg-4-1024x1024.png"
                alt="SDG 4"
                className="max-w-xs transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-8 text-gray-400">
                Our Commitment to SDG 4
              </h2>
              <p className="mb-8 text-gray-400 leading-relaxed text-lg">
                EduniteX is proud to align with United Nations Sustainable
                Development Goal 4: Quality Education. We believe that by
                supporting teachers and improving feedback quality, we can help:
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-blue-400 mt-1 mr-4 flex-shrink-0 text-lg"
                  />
                  <span className="text-gray-400 leading-relaxed">Ensure inclusive and equitable quality education</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-400 mt-1 mr-4 flex-shrink-0 text-lg"
                  />
                  <span className="text-gray-400 leading-relaxed">Promote lifelong learning opportunities for all</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-cyan-400 mt-1 mr-4 flex-shrink-0 text-lg"
                  />
                  <span className="text-gray-400 leading-relaxed">
                    Support teachers in developing countries through our
                    nonprofit program
                  </span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-purple-400 mt-1 mr-4 flex-shrink-0 text-lg"
                  />
                  <span className="text-gray-400 leading-relaxed">
                    Bridge the education technology gap in under-resourced
                    schools
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Learn About Our SDG Initiatives
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Education Revolution?
          </h2>
          <p className="text-xl mb-10 leading-relaxed">
            Discover how EduniteX can transform your school or classroom.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="/register"
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Register Your School
            </a>
            <a
              href="/contact"
              className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-lg"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
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

export default About;