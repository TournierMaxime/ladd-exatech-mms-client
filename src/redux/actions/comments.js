import { SearchComments, CreateComment, GetOneComment, UpdateComment, DeleteComment } from "../../services/comments"

const searchComments = (ticketId, filters) => async (dispatch) => {
  try {
    dispatch({type: "SEARCH_COMMENTS_REQUEST"})
    const response = await SearchComments(ticketId, filters)
    dispatch({ type: "SEARCH_COMMENTS_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "SEARCH_COMMENTS_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const createComment = (data) => async (dispatch) => {
  try {
    const response = await CreateComment(data)
    dispatch({ type: "CREATE_COMMENT_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "CREATE_COMMENT_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const getOneComment = (commentId) => async (dispatch) => {
  try {
    dispatch({type: "GET_ONE_COMMENT_REQUEST"})
    const response = await GetOneComment(commentId)
    dispatch({ type: "GET_ONE_COMMENT_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "GET_ONE_COMMENT_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const updateComment = (commentId, data) => async (dispatch) => {
  try {
    const response = await UpdateComment(commentId, data)
    dispatch({ type: "UPDATE_COMMENT_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "UPDATE_COMMENT_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

const deleteComment = (commentId) => async (dispatch) => {
  try {
    const response = await DeleteComment(commentId)
    dispatch({ type: "DELETE_COMMENT_SUCCESS", payload: response.data })
    return response.data
  } catch (error) {
    dispatch({ type: "DELETE_COMMENT_FAILURE", payload: error.message })
    console.log(error)
    throw error
  }
}

  const resetSearchComments = () => ({
  type: "RESET_SEARCH_COMMENTS",
});


export { searchComments, createComment, getOneComment, updateComment, deleteComment, resetSearchComments }
