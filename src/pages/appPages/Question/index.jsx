import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../components/secondaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import { useQuestion } from "./useQuestion";
import ICONS from "../../../assets/svgIcons";

const Question = () => {
  const { loading } = useQuestion();

  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Question"
      description="View all dashboard activities and statistics on Redeemer Teap International School,."
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
          
            
              <Card
                key={1}
                to={pathConstants.ALL_QUESTION}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Question"}
                count={0}
                description={"assessment"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.QUESTION_CATEGORIES}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Question Categories"}
                count={0}
                description={"assessment"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.QUESTION_TYPE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Question Type"}
                count={0}
                description={"assessment"}
                ctaText="View"
              />
        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
};

export default Question;
