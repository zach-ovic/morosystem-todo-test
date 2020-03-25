import { NotesState } from './notes/types'
import { ThunkAction } from 'redux-thunk'
import { IServerApi } from '../serverApi'
import { AsyncTasksState } from './async/types'
import { AnyAction } from 'redux'
import { UIState } from './ui/types'

export type ApplicationThunkResult<R> = ThunkAction<R, ApplicationState, IServerApi, AnyAction>

// Global application state
export interface ApplicationState {
    // Could be replaced by single array of Notes, but this is ready for scaling
    notes: NotesState
    async: AsyncTasksState
    ui: UIState
}
