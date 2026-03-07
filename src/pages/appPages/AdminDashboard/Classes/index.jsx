import React from 'react'
import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../../components/secondaryComponents/Card";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { pathConstants } from "../../../../routes/pathContants";
import ICONS from "../../../../assets/svgIcons";
import useAllClasses from './AllClasses/useAllClasses';

const ClassManagement = () => {
    const { classes } = useAllClasses();
  return (
   <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Class Management"
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
                to={pathConstants.CREATE_CLASS}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Create Class"}
                description={"Create Class"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.ALL_CLASSES}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Classes"}
                count={classes?.length || 0}
                description={"All Classes"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Assign Subjects"}
                count={0}
                description={"Assign Subjects to Class"}
                ctaText="View"
              />

              <Card
                key={4}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Teacher Assignment"}
                count={0}
                description={"Assign Teachers to Class"}
                ctaText="View"
              />


        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  )
}

export default ClassManagement