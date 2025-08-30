import { useEffect, useState } from "react";
import { User, Upload, Users, BookOpen, MessageSquare, CheckCircle, Clock, FileText, Phone, Mail, GraduationCap } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const TeacherDashboard = () => {
  const [teacherId, setTeacherId] = useState("");
  const [authId, setAuthId] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [syllabusPDF, setSyllabusPDF] = useState(null);
  const [notesPDF, setNotesPDF] = useState(null);
  const [extractedSyllabus, setExtractedSyllabus] = useState("");
  const [meetings, setMeetings] = useState([]);
  const [teacherDetails, setTeacherDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const storedTeacherId = localStorage.getItem("eduassist_teacher_id");

    supabase.auth.getUser().then(async (res) => {
      if (res.data?.user?.id) {
        setAuthId(res.data.user.id);

        const { data: teacherData, error } = await supabase
          .from("teachers")
          .select("id, teacher_id, name, email, phone, subjects")
          .eq("auth_id", res.data.user.id)
          .single();

        if (error) {
          console.error("Error fetching teacher:", error);
        } else {
          const correctTeacherId = teacherData?.teacher_id || storedTeacherId;
          const teacherRecordId = teacherData?.id;

          setTeacherId(correctTeacherId?.trim());
          setTeacherDetails({
            id: teacherRecordId,
            name: teacherData?.name,
            email: teacherData?.email,
            phone: teacherData?.phone,
            subjects: teacherData?.subjects
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    if (teacherId) {
      fetchStudents(teacherId);
      console.log("Fetching students for Teacher ID:", teacherId);
    }
  }, [teacherId]);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      if (!teacherId) return;
      const { data, error } = await supabase
        .from("teachers")
        .select("name, email, subject, class")
        .eq("teacher_id", teacherId)
        .single();

      if (error) {
        console.error("Error fetching teacher details:", error.message);
      } else {
        setTeacherDetails(data);
      }
    };

    fetchTeacherDetails();
  }, [teacherId]);

  const fetchStudents = async (tId) => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .contains("teacher_ids", [tId.trim()]);

    console.log("Filtered students:", data);

    if (error) {
      console.error("Error fetching students:", error.message);
    } else {
      setStudents(data);
    }
  };

  const fetchMeetings = async (teacherId) => {
    const { data, error } = await supabase
      .from("meetings")
      .select("*")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching meetings:", error);
      return [];
    }

    return data;
  };

  const parseDoubts = (meetings) => {
    return meetings.map((meeting) => ({
      ...meeting,
      students_doubts: meeting.students_doubts || [],
      total_doubts: meeting.students_doubts?.length || 0,
    }));
  };

  useEffect(() => {
    if (teacherId) {
      fetchMeetings(teacherId).then((res) => {
        setMeetings(parseDoubts(res));
      });
    }
  }, [teacherId]);

  const handleUpload = async () => {
    if (!subject || !className || !syllabusPDF || !notesPDF)
      return alert("Please fill all fields and upload both PDFs.");

    setIsUploading(true);

    try {
      // 1. Extract text from syllabus PDF
      const syllabusForm = new FormData();
      syllabusForm.append("pdf", syllabusPDF);
      const syllabusRes = await fetch(
        "http://localhost:5000/extract-text-pdf",
        {
          method: 'POST',
          body: syllabusForm
        }
      );
      const syllabusData = await syllabusRes.json();
      const syllabusText = syllabusData.text;
      setExtractedSyllabus(syllabusText);

      // 2. Extract text from notes PDF
      const notesForm = new FormData();
      notesForm.append("pdf", notesPDF);
      const notesRes = await fetch(
        "http://localhost:5000/extract-text-pdf",
        {
          method: 'POST',
          body: notesForm
        }
      );
      const notesData = await notesRes.json();
      const notesText = notesData.text;

      // 3. Save to Supabase DB (simulation)
      // const { error } = await supabase.from("subject_materials").insert([
      //   {
      //     subject,
      //     class: className,
      //     syllabus: syllabusText,
      //     notes: [notesText],
      //     policy: "Public",
      //     teacher_id: teacherId,
      //     auth_id: authId,
      //   },
      // ]);

      // if (error) throw error;
      alert("✅ Materials uploaded and extracted successfully!");
    } catch (err) {
      console.error("❌ Upload failed:", err.message);
      alert("Failed to upload or extract materials.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSolve = async (meetingId, doubtIndex, solution) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.meeting_id === meetingId
          ? {
              ...meeting,
              students_doubts: meeting.students_doubts.map((d, i) =>
                i === doubtIndex ? { ...d, solve: solution } : d
              ),
            }
          : meeting
      )
    );

    const updatedMeeting = meetings.find((m) => m.meeting_id === meetingId);
    if (!updatedMeeting) return;

    const updatedDoubts = updatedMeeting.students_doubts.map((d, i) =>
      i === doubtIndex ? { ...d, solve: solution } : d
    );

    const { error } = await supabase
      .from("meetings")
      .update({ students_doubts: updatedDoubts })
      .eq("meeting_id", meetingId);

    if (error) {
      console.error("Error updating solve:", error.message);
    } else {
      console.log("Solution saved successfully!");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-[#0f172a] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex justify-center items-center gap-3 mb-4">
            <GraduationCap className="text-blue-400" />
            Teacher Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your students, materials, and resolve doubts efficiently
          </p>
        </div>

        {/* Teacher Info Card */}
        {teacherDetails && (
          <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg mb-8 border border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500 p-3 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome, {teacherDetails.name}</h2>
                <p className="text-gray-400">Your Profile Information</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-white font-medium">{teacherDetails.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{teacherDetails.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white font-medium">{teacherDetails.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Subjects</p>
                  <p className="text-white font-medium">{teacherDetails.subjects?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg mb-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-500 p-3 rounded-full">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Upload Study Materials</h3>
              <p className="text-gray-400">Upload syllabus and notes in PDF format</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Subject Name</label>
              <input
                type="text"
                placeholder="e.g., Mathematics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Class</label>
              <input
                type="text"
                placeholder="e.g., 10th Grade"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Syllabus PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSyllabusPDF(e.target.files[0])}
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Notes PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setNotesPDF(e.target.files[0])}
                className="w-full px-4 py-3 bg-[#0f172a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Uploading Materials...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5" />
                Upload & Save Materials
              </>
            )}
          </button>
        </div>

        {/* Students Section */}
        <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg mb-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-500 p-3 rounded-full">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Assigned Students</h3>
              <p className="text-gray-400">{students.length} students under your guidance</p>
            </div>
          </div>

          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Class</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-700 hover:bg-[#0f172a] transition-colors">
                      <td className="py-3 px-4 text-white">{student.name}</td>
                      <td className="py-3 px-4 text-gray-300">{student.email}</td>
                      <td className="py-3 px-4 text-gray-300">{student.class}</td>
                      <td className="py-3 px-4 text-gray-300">{student.roll_no}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No students assigned to you yet.</p>
            </div>
          )}
        </div>

        {/* Meetings & Doubts Section */}
        <div className="bg-[#1e293b] rounded-lg p-8 shadow-lg border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Student Doubts & Solutions</h3>
              <p className="text-gray-400">Resolve student queries from meetings</p>
            </div>
          </div>

          {meetings.filter((meeting) => meeting.total_doubts > 0).length > 0 ? (
            <div className="space-y-6">
              {meetings
                .filter((meeting) => meeting.total_doubts > 0)
                .map((meeting) => (
                  <div key={meeting.meeting_id} className="bg-[#0f172a] rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{meeting.subject}</h4>
                        <p className="text-gray-400">Teacher: {meeting.teacher_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                          {meeting.total_doubts} doubts
                        </div>
                        <Clock className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2 text-gray-300 font-medium">Student</th>
                            <th className="text-left py-2 text-gray-300 font-medium">Doubt</th>
                            <th className="text-left py-2 text-gray-300 font-medium">Solution</th>
                          </tr>
                        </thead>
                        <tbody>
                          {meeting.students_doubts.map((d, i) => (
                            <tr key={i} className="border-b border-gray-800">
                              <td className="py-3 text-white font-medium">{d.student_name}</td>
                              <td className="py-3 text-gray-300">{d.doubt}</td>
                              <td className="py-3">
                                {d.solve ? (
                                  <div className="flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                    <span className="text-gray-300">{d.solve}</span>
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    placeholder="Enter solution..."
                                    className="w-full px-3 py-2 bg-[#1e293b] border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    onBlur={(e) => handleSolve(meeting.meeting_id, i, e.target.value)}
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No student doubts to resolve at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;