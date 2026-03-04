import { pathConstants } from "../routes/pathContants";
import {
  HomeIcon,
  SettingIcon,
  DiscoverIcon,
  LibraryIcon,
  TechStackIcon,
  RewardIcon,
} from "../assets/svgIcons";

export const adminSidebarItems = [
  {
    name: "Home",
    key: 0,
    icon: (active = false) => (
      <HomeIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.ADMIN_DASHBOARD,
  },
  {
    name: "Exam Management",
    key: 2,
    icon: (active = false) => (
      <DiscoverIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.EXAMS,
  },
  {
    name: "Question Bank",
    key: 3,
    icon: (active = false) => (
      <LibraryIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.QUESTION,
  },
  {
    name: "Candidates",
    key: 4,
    icon: (active = false) => (
      <TechStackIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.CANDIDATE,
  },
  {
    name: "Results & Reports",
    key: 6,
    icon: (active = false) => (
      <RewardIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.RESULT,
  },
  {
    name: "Roles & Permissions",
    key: 7,
    icon: (active = false) => (
      <SettingIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.REWARDS,
  },

  {
    name: "System Settings",
    key: 8,
    icon: (active = false) => (
      <SettingIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.SETTINGS,
  },
];

export const candidateSidebarItems = [
  {
    name: "Dashboard",
    key: 10,
    icon: (active = false) => (
      <HomeIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.CANDIDATE_DASHBOARD,
  },

  {
    name: "My Exams",
    key: 11,
    icon: (active = false) => (
      <TechStackIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.CANDIDATE_EXAM,
  },

  {
    name: "My Results",
    key: 12,
    icon: (active = false) => (
      <TechStackIcon strokeColor={active ? "#FFD700" : "#000"} />
    ),
    routePath: pathConstants.CANDIDATE_RESULT,
  },
];
