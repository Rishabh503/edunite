import { 
  Bot, 
  CheckCircle, 
  BookOpen, 
  FileText, 
  Brain, 
  Youtube, 
  MessageCircle, 
  Video, 
  Workflow,
  GraduationCap,
  Users,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturesGrid = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "EduAI",
      description: "AI-powered educational assistant for personalized learning",
      icon: Bot,
      path: "/EduAI",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Video Calling",
      description: "Connect with teachers and students virtually",
      icon: Video,
      path: "https://eduassist-video-platform.onrender.com/",
      color: "bg-teal-500",
      hoverColor: "hover:bg-teal-600",
      external: true
    },
    {
      title: "Workflow",
      description: "Manage and track your educational workflow",
      icon: Workflow,
      path: "https://workhack.vercel.app/",
      color: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-600",
      external: true
    },
    {
      title: "YouTube Analyzer",
      description: "Analyze and extract insights from educational videos",
      icon: Youtube,
      path: "/youtube-analyzer",
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600"
    },
   
    {
      title: "QuizGenerate",
      description: "Generate custom quizzes and assessments",
      icon: BookOpen,
      path: "/quiz-generate",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    },
    {
      title: "Assignment",
      description: "Create and manage assignments efficiently",
      icon: FileText,
      path: "/assignment",
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600"
    },
    {
      title: "EasyLearn",
      description: "Interactive learning modules for all subjects",
      icon: Brain,
      path: "/choose-topic",
      color: "bg-pink-500",
      hoverColor: "hover:bg-pink-600"
    },
    
    {
      title: "AI Teacher Convo",
      description: "Interactive conversations with AI teachers",
      icon: MessageCircle,
      path: "/oral-assess-choose-subject",
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600"
    },
     {
      title: "AnsCheck",
      description: "Automated answer checking and grading system",
      icon: CheckCircle,
      path: "/ansCheck",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    // {
    //   title: "Video Calling",
    //   description: "Connect with teachers and students virtually",
    //   icon: Video,
    //   path: "https://eduassist-video-platform.onrender.com/",
    //   color: "bg-teal-500",
    //   hoverColor: "hover:bg-teal-600",
    //   external: true
    // },
    
    // {
    //   title: "Teacher Dashboard",
    //   description: "Comprehensive dashboard for educators",
    //   icon: GraduationCap,
    //   path: "/teacher-dashboard",
    //   color: "bg-amber-500",
    //   hoverColor: "hover:bg-amber-600"
    // },
    // {
    //   title: "Student Dashboard",
    //   description: "Track your learning progress and achievements",
    //   icon: Users,
    //   path: "/student-dashboard",
    //   color: "bg-emerald-500",
    //   hoverColor: "hover:bg-emerald-600"
    // }
  ];

  
  const handleFeatureClick = (feature) => {
    if (feature.external) {
      window.open(feature.path, "_blank", "noopener,noreferrer");
    } else {
      navigate(feature.path); // ✅ now internal links will work
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-blue-600">Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful educational tools designed to enhance your learning and teaching experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${feature.color} ${feature.hoverColor} p-4 rounded-xl transition-colors duration-300 group-hover:scale-110 transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
       
      </div>
    </div>
  );
};

export default FeaturesGrid;