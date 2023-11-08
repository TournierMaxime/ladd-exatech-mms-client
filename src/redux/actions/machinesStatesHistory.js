import { SearchMachinesStatesHistory } from "../../services/machinesStatesHistory"

const searchMachinesStatesHistory =
  (machineId, filters) =>
  async (dispatch) => {
    try {
      dispatch({ type: "SEARCH_MACHINES_STATES_HISTORY_REQUEST" })
      const response = await SearchMachinesStatesHistory(
        machineId,
        filters
      )
      dispatch({
        type: "SEARCH_MACHINES_STATES_HISTORY_SUCCESS",
        payload: response.data
      })
      return response.data
    } catch (error) {
      dispatch({
        type: "SEARCH_MACHINES_STATES_HISTORY_FAILURE",
        payload: error.message
      })
      console.log(error)
      throw error
    }
  }

  const resetMachinesStatesHistory = () => ({
  type: "SEARCH_MACHINES_STATES_HISTORY_RESET",
});

export { searchMachinesStatesHistory, resetMachinesStatesHistory }
