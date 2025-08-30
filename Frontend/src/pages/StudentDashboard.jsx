import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { BadgeCheck, Flame, Info, User, GraduationCap, Mail, Phone, Calendar, Users, Brain, Target } from "lucide-react";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const StudentDashboard = () => {
  const [traits, setTraits] = useState({ strengths: [], weaknesses: [] });
  const [student, setStudent] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("eduassist_user_email");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!email) {
        setError("No email found in localStorage");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch student data
        const { data: studentData, error: studentError } = await supabase
          .from("students")
          .select("id, name, email, phone, class, roll_no, teacher_ids, created_at, auth_id")
          .eq("email", email)
          .single();

        if (studentError) {
          console.error("Error fetching student:", studentError);
          setError("Failed to fetch student data: " + studentError.message);
          setLoading(false);
          return;
        }

        if (!studentData) {
          setError("No student found with this email");
          setLoading(false);
          return;
        }

        setStudent(studentData);

        // Fetch student traits
        const { data: traitsData, error: traitsError } = await supabase
          .from("student_traits")
          .select("strengths, weaknesses")
          .eq("student_id", studentData.id)
          .single();

        if (traitsError && traitsError.code !== 'PGRST116') { // PGRST116 is "not found" error
          console.error("Error fetching traits:", traitsError);
        }

        setTraits({
          strengths: traitsData?.strengths || [],
          weaknesses: traitsData?.weaknesses || [],
        });

        // Fetch meetings where this student has doubts
        const { data: meetingsData, error: meetingsError } = await supabase
          .from("meetings")
          .select("meeting_id, subject, teacher_name, teacher_id, students_doubts, created_at")
          .order("created_at", { ascending: false });

        if (meetingsError) {
          console.error("Error fetching meetings:", meetingsError);
        } else {
          // Filter meetings that contain doubts from this student
          const studentMeetings = meetingsData.filter(meeting => {
            if (!meeting.students_doubts) return false;
            
            // Handle both array and object formats of students_doubts
            const doubts = Array.isArray(meeting.students_doubts) 
              ? meeting.students_doubts 
              : [meeting.students_doubts];
              
            return doubts.some(doubt => 
              doubt && (
                doubt.student_id === studentData.id || 
                doubt.student_id === studentData.id.toString()
              )
            );
          });
          
          setMeetings(studentMeetings);
        }

      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [email]);

  const handleWeaknessQuiz = () => {
    const weaknessTopics = traits.weaknesses.join(". ");
    console.log("Navigating to quiz with topics:", weaknessTopics);
    alert(`Would navigate to quiz-generate with topics: ${weaknessTopics}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen mt- bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mt-10 bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500 p-4 rounded-full w-fit mx-auto mb-4">
            <Info className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen mt-10 bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Student Profile Found</h2>
          <p className="text-gray-400">Please contact your administrator to set up your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-[#0f172a] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-3 mb-4">
            <GraduationCap className="text-blue-400" />
            Welcome, <span className="text-blue-400">{student.name}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Track your academic progress and improve your weak areas
          </p>
        </div>

        {/* Student Profile Card */}
        <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg mb-8 border border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-500 p-3 rounded-full">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Your Profile</h2>
              <p className="text-gray-400">Complete student information</p>
            </div>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-medium">{student.email}</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white font-medium">{student.phone || "—"}</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-sm text-gray-400">Class</p>
                <p className="text-white font-medium">{student.class || "—"}</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Roll No</p>
                <p className="text-white font-medium">{student.roll_no || "—"}</p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-sm text-gray-400">Registered On</p>
                <p className="text-white font-medium">
                  {student.created_at ? new Date(student.created_at).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>
           
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-pink-400" />
              <div>
                <p className="text-sm text-gray-400">Assigned Teachers</p>
                <p className="text-white font-medium">
                  {student.teacher_ids?.length ? student.teacher_ids.join(", ") : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Performance Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         
          {/* Strengths Card */}
          <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-500 p-3 rounded-full">
                <BadgeCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Your Strengths</h2>
                <p className="text-gray-400">Areas where you excel</p>
              </div>
            </div>
           
            {traits.strengths.length ? (
              <div className="space-y-3">
                {traits.strengths.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <BadgeCheck className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Brain className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No strengths data found yet.</p>
                <p className="text-gray-500 text-sm mt-1">Your teacher will add this after assessment.</p>
              </div>
            )}
          </div>

          {/* Weaknesses Card */}
          <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500 p-3 rounded-full">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Areas for Improvement</h2>
                <p className="text-gray-400">Focus areas to work on</p>
              </div>
            </div>
           
            {traits.weaknesses.length ? (
              <div className="space-y-3 mb-6">
                {traits.weaknesses.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <Flame className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 mb-6">
                <Brain className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No weaknesses recorded yet.</p>
                <p className="text-gray-500 text-sm mt-1">Your teacher will add this after assessment.</p>
              </div>
            )}
           
            {traits.weaknesses.length > 0 && (
              <button
                onClick={handleWeaknessQuiz}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Target className="h-5 w-5" />
                Work on Your Weaknesses
              </button>
            )}
          </div>
        </div>

        {/* Meetings & Doubts Section */}
        <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 p-3 rounded-full">
              <Info className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Doubts in Meetings</h2>
              <p className="text-gray-400">Track your questions and their solutions</p>
            </div>
          </div>

          {meetings.length ? (
            <div className="space-y-6">
              {meetings.map((meeting) => {
                // Handle both array and object formats
                const allDoubts = Array.isArray(meeting.students_doubts) 
                  ? meeting.students_doubts 
                  : [meeting.students_doubts];
                
                const studentDoubts = allDoubts.filter(
                  d => d && (d.student_id === student.id || d.student_id === student.id.toString())
                );

                return (
                  <div
                    key={meeting.meeting_id}
                    className="bg-[#0f172a] rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-purple-400">
                          {meeting.subject}
                        </h3>
                        <p className="text-gray-400">
                          Teacher: {meeting.teacher_name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {new Date(meeting.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                   
                    <div className="space-y-4">
                      {studentDoubts.map((d, i) => (
                        <div key={i} className="bg-[#1e293b] rounded-lg p-4 border border-gray-700">
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Your Question:</h4>
                            <p className="text-white">{d.doubt}</p>
                          </div>
                         
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Solution:</h4>
                            {d.solve ? (
                              <div className="flex items-start gap-2">
                                <BadgeCheck className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                                <p className="text-gray-300">{d.solve}</p>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-yellow-400">
                                <div className="animate-pulse h-2 w-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-sm">Awaiting teacher's response...</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Info className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No doubts recorded in your meetings yet.</p>
              <p className="text-gray-500 text-sm mt-2">
                Your questions from future meetings will appear here
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#1e293b] rounded-lg p-6 shadow-lg border border-gray-700 text-center">
            <div className="bg-green-500 p-3 rounded-full w-fit mx-auto mb-3">
              <BadgeCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{traits.strengths.length}</h3>
            <p className="text-gray-400">Identified Strengths</p>
          </div>
         
          <div className="bg-[#1e293b] rounded-lg p-6 shadow-lg border border-gray-700 text-center">
            <div className="bg-red-500 p-3 rounded-full w-fit mx-auto mb-3">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{traits.weaknesses.length}</h3>
            <p className="text-gray-400">Areas to Improve</p>
          </div>
         
          <div className="bg-[#1e293b] rounded-lg p-6 shadow-lg border border-gray-700 text-center">
            <div className="bg-purple-500 p-3 rounded-full w-fit mx-auto mb-3">
              <Info className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {meetings.reduce((acc, m) => {
                const allDoubts = Array.isArray(m.students_doubts) ? m.students_doubts : [m.students_doubts];
                return acc + allDoubts.filter(d => d && (d.student_id === student?.id || d.student_id === student?.id.toString())).length;
              }, 0)}
            </h3>
            <p className="text-gray-400">Total Doubts Asked</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;