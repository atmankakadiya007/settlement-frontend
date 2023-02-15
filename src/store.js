import { createStore, applyMiddleware ,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';


function store () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)) ,
  );
}

//sagaMiddleware.run(rootSaga);

export default store