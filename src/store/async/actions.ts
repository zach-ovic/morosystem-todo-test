import { AsyncTasksAction, START_ASYNC_TASK, STOP_ASYNC_TASK } from './types'

export function startAsyncTask (tag: string): AsyncTasksAction {
  return {
    type: START_ASYNC_TASK,
    payload: tag
  }
}

export function stopAsyncTask (tag: string): AsyncTasksAction {
  return {
    type: STOP_ASYNC_TASK,
    payload: tag
  }
}
