import { ApplicationState } from '..'
import { Dictionary } from '../../helpers'
import { createSelector } from 'reselect'

const asyncTasks = (state: ApplicationState) => state.asyncTasks.tasks

export const isAsyncTaskRunning = (tag: string) =>
  createSelector(asyncTasks, (asyncTasks) => asyncTasks[tag] === true)

// Returns dictionary/map where key is the id of single task
// in specific group task and value determines if the task is currently running.
export const groupAsyncTaskDictionary = (tag: string) =>
  createSelector(
    asyncTasks,
    (asyncTasks) =>
      Object.keys(asyncTasks)
        .filter(task => task.startsWith(tag))
        .reduce((accumulator, current) => {
          const id = current.substring(tag.length)
          accumulator[id] = asyncTasks[current]
          return accumulator
        }, {} as Dictionary<string, boolean>)
  )
