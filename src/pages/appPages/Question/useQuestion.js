import React, {useState} from 'react'

export const useQuestion = () => {
      const [loading, setLocalLoading] = useState(false);
  return {
     loading,
     setLocalLoading
  }
}
