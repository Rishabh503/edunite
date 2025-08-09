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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About EduniteX
          </h1>
          <p className="text-xl md:text-2xl">
            Revolutionizing education through AI-powered teacher support
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-xl mb-4">
                Born from the challenges faced by educators in overworked
                classrooms.
              </p>
              <p className="mb-4">
                EduniteX was founded by 4 passionate college students who
                recognized the immense pressure teachers face in today's online
                educational landscape. With the shift to online learning,
                teachers found themselves overwhelmed with grading assignments
                and providing personalized feedback to students. This not only
                consumed their valuable time but also led to generic feedback
                that failed to address individual student needs.
              </p>
              <p className="mb-6">
                Our mission began with a simple question: How can we use
                artificial intelligence to give teachers back their most
                valuable resource - time - while simultaneously improving the
                quality of feedback students receive?
              </p>
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Meet Our Team
              </a>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Teacher grading papers"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-gray-600">
              Transforming education through technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faBullseye}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h4>
                <p className="text-gray-600">
                  To empower educators by reducing their administrative workload
                  through AI, enabling them to focus on what matters most -
                  inspiring and guiding their students. We strive to make
                  quality, personalized feedback accessible to every student,
                  regardless of class size or school resources.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-white text-2xl"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h4>
                <p className="text-gray-600">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Stressed teacher"
                className="w-full rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="text-xl font-semibold mb-2">
                    Teacher Overwork
                  </h5>
                  <p className="text-gray-600">
                    Teachers spend 7-8 hours per week grading assignments, with
                    English teachers spending up to 15 hours - time that could
                    be spent on lesson planning and student interaction.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="text-xl font-semibold mb-2">
                    Generic Feedback
                  </h5>
                  <p className="text-gray-600">
                    Large class sizes force teachers to provide generic comments
                    that don't address individual student needs, missing
                    opportunities for meaningful learning growth.
                  </p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h5 className="text-xl font-semibold mb-2">
                    Resource Inequality
                  </h5>
                  <p className="text-gray-600">
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
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our AI-Powered Solution</h2>
            <p className="text-xl">
              How EduniteX transforms the teaching experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl h-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-blue-600 text-2xl"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">Advanced AI Grading</h4>
                <p>
                  Our proprietary algorithms grade assignments with human-level
                  accuracy across multiple subjects and formats, from math
                  problems to essay questions.
                </p>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl h-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="text-blue-600 text-2xl"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">
                  Personalized Feedback Engine
                </h4>
                <p>
                  The system generates customized feedback for each student,
                  identifying specific strengths and areas for improvement based
                  on their work.
                </p>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-xl h-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="text-blue-600 text-2xl"
                  />
                </div>
                <h4 className="text-xl font-bold mb-4">
                  Teacher Oversight Tools
                </h4>
                <p>
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Transforming classrooms around the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">72%</div>
              <p className="text-gray-600">
                Reduction in grading time reported by teachers
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2.5M+</div>
              <p className="text-gray-600">Assignments graded by our system</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">89%</div>
              <p className="text-gray-600">
                Of teachers report improved student engagement
              </p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15K+</div>
              <p className="text-gray-600">
                Educators using our platform worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Team</h2>
            <p className="text-xl text-gray-600">
              Educators, technologists, and innovators united by a common
              purpose
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h5 className="text-xl font-bold mb-1">Mukul Sharma</h5>
              <p className="text-gray-500 mb-3">Team Leader</p>
              <p className="text-gray-600"></p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h5 className="text-xl font-bold mb-1">Anagh Miglani</h5>
              <p className="text-gray-500 mb-3">Team Member</p>
              <p className="text-gray-600"></p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h5 className="text-xl font-bold mb-1">Rishabh Tripathi</h5>
              <p className="text-gray-500 mb-3">Team Member</p>
              <p className="text-gray-600"></p>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                alt="Team member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h5 className="text-xl font-bold mb-1">Niyati Chugh</h5>
              <p className="text-gray-500 mb-3">Team Member</p>
              <p className="text-gray-600"></p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/contact"
              className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-colors"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>

      {/* SDG Commitment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 flex justify-center">
              <img
                src="/sdg-4-1024x1024.png"
                alt="SDG 4"
                className="max-w-xs"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Our Commitment to SDG 4
              </h2>
              <p className="mb-6">
                EduniteX is proud to align with United Nations Sustainable
                Development Goal 4: Quality Education. We believe that by
                supporting teachers and improving feedback quality, we can help:
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <span>Ensure inclusive and equitable quality education</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <span>Promote lifelong learning opportunities for all</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <span>
                    Support teachers in developing countries through our
                    nonprofit program
                  </span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-blue-600 mt-1 mr-3 flex-shrink-0"
                  />
                  <span>
                    Bridge the education technology gap in under-resourced
                    schools
                  </span>
                </li>
              </ul>
              <a
                href="#"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Learn About Our SDG Initiatives
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Education Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover how EduniteX can transform your school or classroom.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/register"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Register Your School
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-gray-900 rounded-lg font-semibold"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
