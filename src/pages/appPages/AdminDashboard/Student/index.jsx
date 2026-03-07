import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../../components/secondaryComponents/Card";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { pathConstants } from "../../../../routes/pathContants";
import ICONS from "../../../../assets/svgIcons";
import useAllStudents from "./AllStudent/useAllStudents";


 const CandidateConfig = () => {
  const { students } = useAllStudents();
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
                title={"Add Student"}
                description={"Create Student for the exam"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.ALL_CANDIDATES}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Students"}
                count={students?.length || 0}
                description={"View All Student"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Assign Students to Class"}
                description={"Assign Students to Class"}
                ctaText="View"
              />
              

        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
}

export default CandidateConfig;