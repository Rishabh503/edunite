import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h5 className="text-xl font-bold mb-2">
            Edu<span className="text-yellow-300">Assist</span>
          </h5>
          <p className="text-sm">
            AI-powered teacher assistant that automates grading and provides
            personalized feedback to support educators and enhance student
            learning.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-yellow-300">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-yellow-300">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/grading" className="hover:text-yellow-300">
                Auto Grading
              </Link>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h5 className="text-lg font-semibold mb-2">Features</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-yellow-300">
                Assignment Grading
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Student Feedback
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Analytics Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-300">
                Rubric Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-lg font-semibold mb-2">Educator Newsletter</h5>
          <p className="text-sm">
            Subscribe for teaching tips, product updates, and education
            research.
          </p>
          <form className="mt-4">
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="px-3 py-2 w-full rounded-l bg-white text-black text-sm outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-300 text-purple-900 px-4 py-2 text-sm font-semibold rounded-r hover:bg-yellow-400"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center py-4 border-t border-purple-700 text-sm">
        © 2025 EduniteX. All Rights Reserved. Supporting Quality Education
        Worldwide.
      </div>
    </footer>
  );
};

export default Footer;
