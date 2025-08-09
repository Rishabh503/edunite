import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import EduAI from "./pages/EduAI";
import "./App.css";
import HomePage from "./pages/HomePage";
import AssignmentUpload from "./pages/Assignment/AssignmentUpload";
import AssignmentSolver from "./pages/Assignment/AssignmentSolver";
import SolutionUpload from "./pages/AnswerChecker/SolutionUpload";
import AnswerEvaluator from "./pages/AnswerChecker/AnswerEvaluator";
import QuizUpload from "./pages/Quiz/QuizUpload";
import QuizResult from "./pages/Quiz/QuizResult";
import QuizPage from "./pages/Quiz/QuizPage";
import ChooseTopic from "./pages/explain/ChooseTopic";
import StoryNarrator from "./pages/explain/StoryNarrator";
import ChooseSubject from "./pages/oralTest/ChooseSubject";
import InterviewPlatform from "./pages/oralTest/InterviewPlatform";
import Result from "./pages/oralTest/Result";
import Register from "./pages/Register";
import CustomSignup from "./pages/CustomSignup";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

const AppLayout = () => {
  const location = useLocation();
  const hideNavAndFooter = [
    "/oral-test",
    "/result",
    "/oral-assess-choose-subject",
    "/register",
  ].includes(location.pathname);

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/eduai" element={<EduAI />} />
        <Route path="/assignment" element={<AssignmentUpload />} />
        <Route path="/solve-assignment" element={<AssignmentSolver />} />
        <Route path="/AnsCheck" element={<SolutionUpload />} />
        <Route path="/evaluate-answer" element={<AnswerEvaluator />} />
        <Route path="/quiz-generate" element={<QuizUpload />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/choose-topic" element={<ChooseTopic />} />
        <Route path="/story" element={<StoryNarrator />} />

        {/* Oral Test Routes without Navbar/Footer */}
        <Route path="/oral-assess-choose-subject" element={<ChooseSubject />} />
        <Route path="/oral-test" element={<InterviewPlatform />} />
        <Route path="/result" element={<Result />} />
        <Route path="/register" element={<CustomSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
