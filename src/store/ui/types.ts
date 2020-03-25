export interface UIState {
    error: string | undefined,
    filter: FilterType
}

export const SET_ERROR = 'SET_ERROR'
export interface SetErrorAction {
    type: typeof SET_ERROR
    payload: string | undefined
}

export const SET_FILTER = 'SET_FILTER'
export interface SetFilterAction {
    type: typeof SET_FILTER
    payload: FilterType
}

export type UIActionTypes = SetErrorAction | SetFilterAction

export enum FilterType {
    All,
    Completed,
    Incomplete
}
