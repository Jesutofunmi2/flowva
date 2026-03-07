import React from 'react'
import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../components/secondaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import ICONS from "../../../assets/svgIcons";

const SuperAdminDashboard = () => {
  return (
     <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Super Admin Dashboard"
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
                to={pathConstants.CREATE_SCHOOL}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Create School"}
                count={0}
                description={"Create School"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Exams"}
                count={0}
                description={"All Exams"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Schedule Exam"}
                count={0}
                description={"Schedule Exam"}
                ctaText="View"
              />

              <Card
                key={4}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Exam Settings"}
                count={0}
                description={"Exam Settings"}
                ctaText="View"
              />
        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  )
}

export default SuperAdminDashboard