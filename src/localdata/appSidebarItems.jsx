import { pathConstants } from "../routes/pathContants";
import {
  HomeIcon,
  SettingIcon,
  DiscoverIcon,
  LibraryIcon,
  TechStackIcon,
  SubscriptionIcon,
  RewardIcon,
} from "../assets/svgIcons";

export const appSidebarItems = [
  {
    name: "Home",
    key: 0,
    icon: (active = false) => (
      <HomeIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.DASHBOARD,
  },
  {
    name: "Discover",
    key: 2,
    icon: (active = false) => (
      <DiscoverIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.DISCOVER,
  },
  {
    name: "Library",
    key: 3,
    icon: (active = false) => (
      <LibraryIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.LIBRARY,
  },
  {
    name: "Tech Stack",
    key: 4,
    icon: (active = false) => (
      <TechStackIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.TECH_STACK,
  },
  {
    name: "Subscriptions",
    key: 5,
    icon: (active = false) => (
      <SubscriptionIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.SUBSCRIPTIONS,
  },
  {
    name: "Rewards",
    key: 6,
    icon: (active = false) => (
      <RewardIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.REWARDS,
  },
  {
    name: "Settings",
    key: 7,
    icon: (active = false) => (
      <SettingIcon strokeColor={active ? "#9013FE" : "#000"} />
    ),
    routePath: pathConstants.SETTINGS,
  },
];
