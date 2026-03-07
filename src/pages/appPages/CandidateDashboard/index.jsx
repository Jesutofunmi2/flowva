import React from 'react'
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import { useCandidateDashboard } from './useCandidateDashboard';
import SecondaryComponents from '../../../components/secondaryComponents';
import LoaderHelper from '../../../components/secondaryComponents/LoaderHelper';
import useAuthUser from '../../../hooks/useAuthUser';

const CandidateDashboard = () => {
    const { loading  } = useCandidateDashboard();
     const { candidate, displayName, user, profileImageUrl } = useAuthUser();
  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Candidate Dashboard"
      description="View all dashboard activities on Test Engine / Assessment Platform Solution,"
    >
      <LoaderHelper
        isLoading={loading}
        classNames={globalStyles.pagePaddings}
        action="fetching Dashboard..."
      >
      {/* <h1>{candidate}</h1> */}
      <p>Welcome to your dashboard, {displayName}!</p>
      
      </LoaderHelper>
      </SecondaryComponents.MetaSetter>
  )
}

export default CandidateDashboard