import AdminDashboard from "./AdminDashboard"; 
import CandidateDashboard from "./CandidateDashboard";
import RewardHub from "./RewardHub"; 
import CreateAssessment from "./CreateAssessment"; 
import Question from "./AdminDashboard/Question";
import Exams from "./AdminDashboard/Exams";
import CandidateConfig from "./AdminDashboard/Student";
import Result from "./Results";
import CreateCandidate from "./AdminDashboard/Student/CreateStudent";
import SuperAdminDashboard from "./SuperAdminDashboard";
import CreateSchool from "./SuperAdminDashboard/CreateSchool";
import SuperAdminUser from "./SuperAdminDashboard/User";
import ClassManagement from "./AdminDashboard/Classes";
import SubjectManagement from "./AdminDashboard/Subjects";
import CreateClass from "./AdminDashboard/Classes/CreateClass";
import AllClasses from "./AdminDashboard/Classes/AllClasses/allClasses";
import useAllClasses from "./AdminDashboard/Classes/AllClasses/useAllClasses";
import UpdateClass from "./AdminDashboard/Classes/UpdateClass";
import CreateSubject from "./AdminDashboard/Subjects/CreateSubject";
import AllSubjects from "./AdminDashboard/Subjects/AllSubjects/allSubject";
import useAllSubjects from "./AdminDashboard/Subjects/AllSubjects/useAllSubject";
import UpdateSubject from "./AdminDashboard/Subjects/UpdateSubject";
import EditStudent from "./AdminDashboard/Student/EditStudent";
import AllStudents from "./AdminDashboard/Student/AllStudent/allStudent";
import useAllStudents from "./AdminDashboard/Student/AllStudent/useAllStudents";
import AddQuestion from "./AdminDashboard/Question/AddQuestion";

const appPages = {
  AdminDashboard,
  CandidateDashboard,
  RewardHub,
  CreateAssessment,
  Question,
  Exams,
  CandidateConfig,
  Result,
  SuperAdminDashboard,
  CreateCandidate,
  CreateSchool,
  SuperAdminUser,
  ClassManagement,
  SubjectManagement,
  CreateClass,
  AllClasses,
  useAllClasses,
  UpdateClass,
  CreateSubject,
  AllSubjects,
  useAllSubjects,
  UpdateSubject,
  EditStudent,
  AllStudents,
  useAllStudents,
  AddQuestion,
};

export default appPages;