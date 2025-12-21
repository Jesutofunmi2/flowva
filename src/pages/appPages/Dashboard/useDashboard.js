import useAuthUser from "../../../hooks/useAuthUser"


const useDashboard = () => {
const { loading, displayName } = useAuthUser();

  return {
    loading,
    displayName
  }
}

export default useDashboard