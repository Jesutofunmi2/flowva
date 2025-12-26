import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import useDashboard from "./useDashboard";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import { ICONS } from "../../../assets/svgIcons";
import SecondaryComponents from "../../../components/secondaryComponents";

const Dashboard = () => {
  const { loading, cards, total } = useDashboard();

  return (
    <SecondaryComponents.MetaSetter
      title="Flowva Hub | Dashboard"
      description="View all dashboard activities and statistics on Flowva Hub."
    >
      <LoaderHelper
        isLoading={loading}
        classNames={globalStyles.pagePaddings}
        action="fetching Dashboard..."
      >
        <div
          className={globalStyles.gridDetailsView}
          style={{ marginTop: "-30px" }}
        >
          {cards.map((c) => {
            const Icon = ICONS[c.icon] || ICONS.LibraryIcon;
            const isRewards =
              c.key === "rewards" ||
              (c.title || "").toLowerCase().includes("reward");
            const countValue = isRewards ? total ?? 0 : c.count ?? 0;
            return (
              <Card
                key={c?.id}
                to={c?.route}
                Icon={Icon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={c?.title}
                count={countValue}
                description={c?.description}
                ctaText="View"
              />
            );
          })}
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
};

export default Dashboard;
