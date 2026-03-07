import React from 'react'
import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import Card from "../../../../components/secondaryComponents/Card";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { pathConstants } from "../../../../routes/pathContants";
import ICONS from "../../../../assets/svgIcons";
import useAllSubject from './AllSubjects/useAllSubject';

const SubjectManagement = () => {
  const { subjects } = useAllSubject();
  return (
     <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Subject Management"
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
                to={pathConstants.CREATE_SUBJECT}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"Create Subject"}
                description={"Create Subject"}
                ctaText="View"
              />

              <Card
                key={2}
                to={pathConstants.ALL_SUBJECTS}
                Icon={ICONS.DiscoverIcon}
                iconBg="#E9D4FF"
                iconColor="#9013FE"
                title={"All Subjects"}
                count={subjects?.length}
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