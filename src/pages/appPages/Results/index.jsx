import React from 'react'
import LoaderHelper from "../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../components/secondaryComponents/Card";
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../components/secondaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import ICONS from "../../../assets/svgIcons";

const Result = () => {
  return (
       <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Result"
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
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Exam Results"}
                count={0}
                description={"Exam Results"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Export Results"}
                count={0}
                description={"Export Results (PDF/Excel)"}
                ctaText="View"
              />

              <Card
                key={3}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Analytics Dashboard"}
                count={0}
                description={"Analytics Dashboard"}
                ctaText="View"
              />

              <Card
                key={4}
                to={pathConstants.CREATE_CANDIDATE}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Result per candidate"}
                count={0}
                description={"Result per candidate"}
                ctaText="View"
              />
        
        
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  )
}

export default Result