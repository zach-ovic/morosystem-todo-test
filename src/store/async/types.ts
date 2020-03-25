import { Dictionary } from '../../helpers'

export const createGroupAsyncTaskCompositeTag = (tag: string, id: string) => tag + id

export interface AsyncTasksState {
    tasks: Dictionary<string, boolean>
}

export const START_ASYNC_TASK = 'START_ASYNC_TASK'
export interface StartAsyncTask {
    type: typeof START_ASYNC_TASK
    payload: string
}

export const STOP_ASYNC_TASK = 'STOP_ASYNC_TASK'
export interface StopAsyncTask {
    type: typeof STOP_ASYNC_TASK
    payload: string
}

export type AsyncTasksAction = StartAsyncTask | StopAsyncTask
