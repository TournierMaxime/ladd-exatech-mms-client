import { configureStore } from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import {
  searchMachinesReducer,
  getOneMachineReducer,
  createMachineReducer,
  updateMachineReducer,
  deleteMachineReducer,
} from "../redux/reducers/machines"
import { searchMachinesStatesHistoryReducer } from "../redux/reducers/machinesStatesHistory"
import {
  searchTicketsReducer,
  createTicketReducer,
  getOneTicketReducer,
  updateTicketReducer,
  deleteTicketReducer,
} from "../redux/reducers/tickets"
import {
  searchCommentsReducer,
  createCommentReducer,
  getOneCommentReducer,
  updateCommentReducer,
  deleteCommentReducer,
} from "../redux/reducers/comments"
import {
  searchFAQReducer,
  createFAQReducer,
  getOneFAQReducer,
  updateFAQReducer,
  deleteFAQReducer,
} from "../redux/reducers/faq"
import {
  searchFAQCategoryReducer,
  createFAQCategoryReducer,
  getOneFAQCategoryReducer,
  updateFAQCategoryReducer,
  deleteFAQCategoryReducer,
} from "../redux/reducers/faqCategory"
import {
  searchInterventionsReducer,
  createInterventionReducer,
  getOneInterventionReducer,
  updateInterventionReducer,
  deleteInterventionReducer,
} from "../redux/reducers/interventions"
import { searchAPKsReducer, getOneAPKReducer } from "../redux/reducers/apks"

const rootReducer = {
  searchMachines: searchMachinesReducer,
  getOneMachine: getOneMachineReducer,
  createMachine: createMachineReducer,
  updateMachine: updateMachineReducer,
  deleteMachine: deleteMachineReducer,
  searchMachinesStatesHistory: searchMachinesStatesHistoryReducer,
  searchTickets: searchTicketsReducer,
  createTicket: createTicketReducer,
  getOneTicket: getOneTicketReducer,
  updateTicket: updateTicketReducer,
  deleteTicket: deleteTicketReducer,
  searchComments: searchCommentsReducer,
  createComment: createCommentReducer,
  getOneComment: getOneCommentReducer,
  updateComment: updateCommentReducer,
  deleteComment: deleteCommentReducer,
  searchFAQ: searchFAQReducer,
  createFAQ: createFAQReducer,
  getOneFAQ: getOneFAQReducer,
  updateFAQ: updateFAQReducer,
  deleteFAQ: deleteFAQReducer,
  searchFAQCategory: searchFAQCategoryReducer,
  createFAQCategory: createFAQCategoryReducer,
  getOneFAQCategory: getOneFAQCategoryReducer,
  updateFAQCategory: updateFAQCategoryReducer,
  deleteFAQCategory: deleteFAQCategoryReducer,
  searchInterventions: searchInterventionsReducer,
  createIntervention: createInterventionReducer,
  getOneIntervention: getOneInterventionReducer,
  updateIntervention: updateInterventionReducer,
  deleteIntervention: deleteInterventionReducer,
  searchAPKs: searchAPKsReducer,
  getOneAPK: getOneAPKReducer,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(thunkMiddleware),
})
export default store
