import { ApplicationThunkResult } from '../types'
import { SetErrorAction, SET_ERROR, FilterType, SetFilterAction, SET_FILTER } from './types'

const defaultErrorDisplayTime = 3000

function setErrorInternal (error: string | undefined): SetErrorAction {
  return {
    type: SET_ERROR,
    payload: error
  }
}

let lastTimeout : NodeJS.Timeout | undefined

export function setError (error: string, displayTime: number = defaultErrorDisplayTime): ApplicationThunkResult<void> {
  return async (dispatch) => {
    dispatch(setErrorInternal(error))

    if (lastTimeout !== undefined) {
      clearTimeout(lastTimeout)
    }

    // Clear error after some time
    lastTimeout = setTimeout(() => {
      dispatch(setErrorInternal(undefined))
      lastTimeout = undefined
    }, displayTime)
  }
}

/**
 * Toggles filter to the next one.
 */
export function toggleFilter (): ApplicationThunkResult<void> {
  return (dispatch, getState) => {
    let newFilter = FilterType.All
    if (getState().ui.filter === FilterType.All) {
      newFilter = FilterType.Completed
    } else if (getState().ui.filter === FilterType.Completed) {
      newFilter = FilterType.Incomplete
    }

    dispatch({
      type: SET_FILTER,
      payload: newFilter
    } as SetFilterAction)
  }
}
