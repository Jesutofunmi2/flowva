import React, { useState }  from 'react'

export const useCandidateDashboard = () => {
     const [loading, setLocalLoading] = useState(false);
  return {
    loading,
    setLocalLoading
  }
}
