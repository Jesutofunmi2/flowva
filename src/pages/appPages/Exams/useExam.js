import React from 'react'
import useAuthUser from '../../../hooks/useAuthUser';

export const useExam = () => {
       const { loading: authLoading, displayName, user } = useAuthUser();
  return {
     authLoading,
     displayName,
     user,
  }
}
