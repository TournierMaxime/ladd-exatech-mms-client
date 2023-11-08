const initialState = {
  data: {
    machinesStatesHistory: [],
    items: null,
    results: null,
    page: null,
    totalPages: null
  },
  loading: true,
  error: null,
}

const searchMachinesStatesHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_MACHINES_STATES_HISTORY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      }

    case "SEARCH_MACHINES_STATES_HISTORY_SUCCESS":
      return {
        ...state,
        data: {
          ...state.data,
          machinesStatesHistory: action.payload.machinesStatesHistory,
          items: action.payload.items,
          results: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages
        },
        loading: false,
      }

    case "SEARCH_MACHINES_STATES_HISTORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case "SEARCH_MACHINES_STATES_HISTORY_RESET":
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export { searchMachinesStatesHistoryReducer }
