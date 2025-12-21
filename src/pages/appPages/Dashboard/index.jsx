import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import useDashboard from "./useDashboard";

const Dashboard = () => {
  const { loading, displayName } = useDashboard();

  return (
    <LoaderHelper isLoading={loading}>
      {displayName ? `Dashboard — ${displayName}` : "Dashboard"}
    </LoaderHelper>
  );
};

export default Dashboard;
