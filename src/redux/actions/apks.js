import { SearchAPKs, GetOneAPK } from "../../services/apks"

const searchAPKs = (filters) => async (dispatch) => {
  try {
    dispatch({type: "SEARCH_APKS_REQUEST"})
    const response = await SearchAPKs(filters)
    dispatch({ type: "SEARCH_APKS_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "SEARCH_APKS_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const getOneAPK = (apkId) => async (dispatch) => {
  try {
    dispatch({type: "GET_ONE_APK_REQUEST"})
    const response = await GetOneAPK(apkId)
    dispatch({ type: "GET_ONE_APK_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "GET_ONE_APK_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

  const resetSearchAPKs = () => ({
  type: "RESET_SEARCH_APKS",
});

export { searchAPKs, getOneAPK, resetSearchAPKs }
