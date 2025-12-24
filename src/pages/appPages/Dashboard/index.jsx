import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import useDashboard from "./useDashboard";
import { LibraryIcon } from "../../../assets/svgIcons";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";

const Dashboard = () => {
  const { loading } = useDashboard();

  return (
    <LoaderHelper isLoading={loading}>
    <div className={globalStyles.gridDetailsView} style={{ marginTop: "-30px" }}>
      <Card
        to="/dashboard/library"
        Icon={LibraryIcon}
        iconBg="#E9D4FF"
        iconColor="#9013FE"
        title="My Tools"
        count={1}
        description="All tools in your personal library"
        ctaText="View tools"
      />
        <Card
        to="/dashboard/library"
        Icon={LibraryIcon}
        iconBg="#E9D4FF"
        iconColor="#9013FE"
        title="My Tools"
        count={1}
        description="All tools in your personal library"
        ctaText="View tools"
      />

       <Card
        to="/dashboard/library"
        Icon={LibraryIcon}
        iconBg="#E9D4FF"
        iconColor="#9013FE"
        title="My Tools"
        count={1}
        description="All tools in your personal library"
        ctaText="View tools"
      />
       <Card
        to="/dashboard/library"
        Icon={LibraryIcon}
        iconBg="#E9D4FF"
        iconColor="#9013FE"
        title="My Tools"
        count={1}
        description="All tools in your personal library"
        ctaText="View tools"
      />
      </div>
    </LoaderHelper>
  );
};

export default Dashboard;
