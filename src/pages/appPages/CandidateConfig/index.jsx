import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../components/secondaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import ICONS from "../../../assets/svgIcons";


 const CandidateConfig = () => {
  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Candidate"
      description="View all dashboard activities and statistics on Redeemer Teap International School,."
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
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Add Candidate"}
                count={0}
                description={"Add Candidate"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.QUESTION_CATEGORIES}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Candidates"}
                count={0}
                description={"All Candidates"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.QUESTION_TYPE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Candidate Performance"}
                count={0}
                description={"Candidate Performance"}
                ctaText="View"
              />

              <Card
                key={4}
                to={pathConstants.QUESTION_TYPE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Candidate Profiles"}
                count={0}
                description={"Candidate Profiles"}
                ctaText="View"
              />
        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
}

export default CandidateConfig;