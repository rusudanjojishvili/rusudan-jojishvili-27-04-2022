import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import RootReducer from './reducers'

export default function configureAppStore(preloadedState){
    const middlewareEnhancer = applyMiddleware(thunk)
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)
    const store = configureStore({reducer: RootReducer, preloadedState, composedEnhancers})

    return store
}