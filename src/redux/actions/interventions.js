import { SearchInterventions, CreateIntervention, GetOneIntervention, UpdateIntervention, DeleteIntervention } from "../../services/interventions"

const searchInterventions = (machineId, filters) => async (dispatch) => {
  try {
    dispatch({type: "SEARCH_INTERVENTIONS_REQUEST"})
    const response = await SearchInterventions(machineId, filters)
    dispatch({ type: "SEARCH_INTERVENTIONS_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "SEARCH_INTERVENTIONS_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const createIntervention = (data) => async (dispatch) => {
  try {
    dispatch({type: "CREATE_INTERVENTION_REQUEST"})
    const response = await CreateIntervention(data)
    dispatch({ type: "CREATE_INTERVENTION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "CREATE_INTERVENTION_FAILURE", payload: error.response.data.errMsg })
    console.log(error)
    throw error.response.data.errMsg
  }
}

const getOneIntervention = (interventionId) => async (dispatch) => {
  try {
    dispatch({type: "GET_ONE_INTERVENTION_REQUEST"})
    const response = await GetOneIntervention(interventionId)
    dispatch({ type: "GET_ONE_INTERVENTION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "GET_ONE_INTERVENTION_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const updateIntervention = (interventionId, data) => async (dispatch) => {
  try {
    const response = await UpdateIntervention(interventionId, data)
    dispatch({ type: "UPDATE_INTERVENTION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "UPDATE_INTERVENTION_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const deleteIntervention = (interventionId) => async (dispatch) => {
  try {
    const response = await DeleteIntervention(interventionId)
    dispatch({ type: "DELETE_INTERVENTION_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "DELETE_INTERVENTION_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

  const resetInterventions = () => ({
  type: "RESET_INTERVENTIONS",
});

export { searchInterventions, getOneIntervention, createIntervention, updateIntervention, deleteIntervention, resetInterventions }
