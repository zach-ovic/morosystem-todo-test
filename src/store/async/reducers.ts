import { AsyncTasksAction, AsyncTasksState, START_ASYNC_TASK, STOP_ASYNC_TASK } from './types'

export const initialState: AsyncTasksState = {
  tasks: {}
}

export function asyncTasksReducer (state = initialState, action: AsyncTasksAction): AsyncTasksState {
  switch (action.type) {
    case START_ASYNC_TASK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload]: true
        }
      }

    case STOP_ASYNC_TASK:
      var cloneTasks = { ...state.tasks }
      delete cloneTasks[action.payload]
      return {
        ...state,
        tasks: cloneTasks
      }

    default:
      return state
  }
}
