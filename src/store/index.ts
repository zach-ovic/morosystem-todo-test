import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, Middleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { notesReducer } from './notes/reducers'
import { asyncTasksReducer } from './async/reducers'
import serverApi from '../serverApi'
import { UIReducer } from './ui/reducers'

const rootReducer = combineReducers({
  notes: notesReducer,
  asyncTasks: asyncTasksReducer,
  ui: UIReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export function configureStore () {
  let middleware: Middleware[] = [
    // Add server API as extra argument to all thunks
    thunkMiddleware.withExtraArgument(serverApi)
  ]
  if (process.env.NODE_ENV !== 'production') {
    // Add debug middleware
    middleware = [...middleware, logger]
  }

  const store = createStore(rootReducer, applyMiddleware(...middleware))
  return store
}
