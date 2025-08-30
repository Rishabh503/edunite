import { useState, useEffect, useRef } from "react";
import { Menu, X, User, ChevronDown, Home, BookOpen, MessageCircle, LayoutDashboard, Workflow, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load user data from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("eduassist_user_email");
    const teacherFlag = localStorage.getItem("eduassist_is_teacher");
    const studentFlag = localStorage.getItem("eduassist_is_student");

    if (storedEmail) setUserEmail(storedEmail);
    if (teacherFlag === "true") setIsTeacher(true);
    if (studentFlag === "true") setIsStudent(true);
  }, []);

  const getInitials = (email) => {
    if (!email) return "U";
    return email[0].toUpperCase();
  };

  const handleNavClick = (path, external = false) => {
    if (external) {
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      navigate(path); // ✅ proper navigation
    }
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: Home, show: true },
    { name: "Features", path: "/#features", icon: BookOpen, show: true },
    { name: "AI Teacher", path: "/oral-assess-choose-subject", icon: MessageCircle, show: true },
  ];

  const conditionalLinks = [
    { name: "Teacher Dashboard", path: "/teacher-dashboard", icon: LayoutDashboard, show: isTeacher },
    { name: "Student Dashboard", path: "/student-dashboard", icon: LayoutDashboard, show: isStudent },
  ];

  const externalLinks = [
    { 
      name: "Workflow", 
      path: `https://workhack.vercel.app/?email=${encodeURIComponent(userEmail || "")}`, 
      icon: Workflow 
    },
    { name: "Video Call", path: "https://eduassist-video-platform.onrender.com/", icon: Video },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white z-50 shadow-lg">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Text Only */}
          <div 
            onClick={() => handleNavClick("/")}
            className="cursor-pointer"
          >
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">Edu</span>
              <span className="text-blue-400">niteX</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation */}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return link.show && (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {/* Conditional Links */}
            {conditionalLinks.map((link) => {
              const Icon = link.icon;
              return link.show && (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <Icon size={16} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            {/* External Links */}
            <div className="flex items-center space-x-1 pl-4 ml-4 border-l border-gray-600">
              {externalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path, true)}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white hover:text-yellow-300 hover:bg-white/10 rounded-lg transition-all duration-200"
                  >
                    <Icon size={16} />
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {userEmail ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {getInitials(userEmail)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {userEmail.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isTeacher ? 'Teacher' : isStudent ? 'Student' : 'User'}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-gray-600" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                      <p className="text-xs text-blue-600 font-medium mt-1">
                        {isTeacher ? 'Teacher Account' : isStudent ? 'Student Account' : 'User Account'}
                      </p>
                    </div>
                    {/* 🔴 Removed Sign Out button */}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleNavClick("/login")}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick("/register")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-600 py-4">
            <div className="space-y-2">
              {/* Main Navigation */}
              {navLinks.map((link) => {
                const Icon = link.icon;
                return link.show && (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-yellow-300 rounded-lg transition-colors text-left"
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </button>
                );
              })}

              {/* Conditional Links */}
              {conditionalLinks.map((link) => {
                const Icon = link.icon;
                return link.show && (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-yellow-300 rounded-lg transition-colors text-left"
                  >
                    <Icon size={18} />
                    <span>{link.name}</span>
                  </button>
                );
              })}

              {/* External Links */}
              <div className="border-t border-gray-600 pt-3 mt-3">
                {externalLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path, true)}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium text-white hover:bg-white/10 hover:text-yellow-300 rounded-lg transition-colors text-left"
                    >
                      <Icon size={18} />
                      <span>{link.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* User Section */}
              {userEmail ? (
                <div className="pt-3 border-t border-gray-600">
                  <div className="px-3 py-3 bg-white/5 rounded-lg mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-300 text-purple-900 font-bold rounded-full flex items-center justify-center">
                        <span className="font-medium">
                          {getInitials(userEmail)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{userEmail}</p>
                        <p className="text-xs text-yellow-300 font-medium">
                          {isTeacher ? 'Teacher Account' : isStudent ? 'Student Account' : 'User Account'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 🔴 Removed Sign Out button */}
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-600 space-y-3">
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="w-full px-3 py-3 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors text-center border border-gray-600"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick("/register")}
                    className="w-full px-3 py-3 bg-blue-500/80 text-white text-sm font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 text-center"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
