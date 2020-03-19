import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, Middleware } from 'redux'
import { reducer } from './reducer'
import logger from 'redux-logger'

export function configureStore () {
  // TODO: Add server API
  // thunkMiddleware.withExtraArgument()

  let middleware: Middleware[] = [thunkMiddleware]
  if (process.env.NODE_ENV !== 'production') {
    // Add debug middleware
    middleware = [...middleware, logger]
  }

  const store = createStore(reducer, applyMiddleware(...middleware))
  return store
}
