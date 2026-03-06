import AdminDashboard from "./AdminDashboard"; 
import CandidateDashboard from "./CandidateDashboard";
import RewardHub from "./RewardHub"; 
import CreateAssessment from "./CreateAssessment"; 
import Question from "./Question";
import Exams from "./Exams";
import CandidateConfig from "./AdminDashboard/CandidateConfig";
import Result from "./Results";
import CreateCandidate from "./AdminDashboard/CandidateConfig/CreateCandidate";
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
};

export default appPages;