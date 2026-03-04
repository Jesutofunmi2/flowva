import React from 'react'
import globalStyles from "../../../assets/styles/base/globalPage.module.scss";
import { useCandidateDashboard } from './useCandidateDashboard';
import SecondaryComponents from '../../../components/secondaryComponents';
import LoaderHelper from '../../../components/secondaryComponents/LoaderHelper';

const CandidateDashboard = () => {
    const { loading  } = useCandidateDashboard();
  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Candidate Dashboard"
      description="View all dashboard activities on Redeemer Teap International School,"
    >
      <LoaderHelper
        isLoading={loading}
        classNames={globalStyles.pagePaddings}
        action="fetching Dashboard..."
      >
      <h1>Kool</h1>
      </LoaderHelper>
      </SecondaryComponents.MetaSetter>
  )
}

export default CandidateDashboard