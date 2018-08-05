export const handleResponse = (dispatch, type, done) => {
  return (response) => {
    dispatch({type, payload: response.data})
    done && done()
  }
}

export const handleError = (dispatch, type, done) => {
  return (error) => {
    if (error.response && error.response.data) {
      dispatch({type, payload: error.response.data.error})
    } else {
      dispatch({type, payload: error.message})
    }
    done && done()
  }
}
