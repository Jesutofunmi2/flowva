import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../../components/secondaryComponents/Card";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { pathConstants } from "../../../../routes/pathContants";
import ICONS from "../../../../assets/svgIcons";

const Question = () => {

  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Question"
      description="View all dashboard activities and statistics on Test Engine / Assessment Platform Solution,."
    >
      <LoaderHelper
        isLoading={false}
        classNames={globalStyles.pagePaddings}
        action="fetching Dashboard..."
      >
        <div
          className={globalStyles.gridDetailsView}
          style={{ marginTop: "-30px" }}
        >
              <Card
                key={1}
                to={pathConstants.ADD_QUESTION}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Question"}
                count={0}
                description={"All Question"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.ADD_QUESTION}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Question Categories"}
                count={0}
                description={"Question Categories"}
                ctaText="View"
              />

              <Card
                key={3}
                to={"#"}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Question Type"}
                count={0}
                description={"Question Type"}
                ctaText="View"
              />

              <Card
                key={4}
                to={"#"}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Bulk Upload Questions"}
                count={0}
                description={"Bulk Upload Questions"}
                ctaText="View"
              />
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
};

export default Question;
