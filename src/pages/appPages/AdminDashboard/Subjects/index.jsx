import React from 'react'
import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../../components/secondaryComponents/Card";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { pathConstants } from "../../../../routes/pathContants";
import ICONS from "../../../../assets/svgIcons";

const SubjectManagement = () => {
  return (
     <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Subject Management"
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
                title={"Create Subject"}
                count={0}
                description={"Create Subject"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Subjects"}
                count={0}
                description={"All Subjects"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Schedule Subject"}
                count={0}
                description={"Schedule Subject"}
                ctaText="View"
              />

              <Card
                key={4}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Subject Settings"}
                count={0}
                description={"Subject Settings"}
                ctaText="View"
              />
        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  )
}

export default SubjectManagement