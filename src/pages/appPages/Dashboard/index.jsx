import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import useDashboard from "./useDashboard";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import { ICONS } from "../../../assets/svgIcons";


const Dashboard = () => {
  const { loading, cards } = useDashboard();

  return (
    <LoaderHelper isLoading={loading} classNames={globalStyles.pagePaddings} action="fetching Dashboard...">
      <div
        className={globalStyles.gridDetailsView}
        style={{ marginTop: "-30px" }}
      >
        {cards.map((c) => {
          const Icon = ICONS[c.icon] || ICONS.LibraryIcon;
          return (
            <Card
              key={c?.id}
              to={c?.route}
              Icon={Icon}
              iconBg="#E9D4FF"
              iconColor="#9013FE"
              title={c?.title}
              count={c?.count}
              description={c?.description}
              ctaText="View"
            />
          );
        })}
      </div>
    </LoaderHelper>
  );
};

export default Dashboard;
