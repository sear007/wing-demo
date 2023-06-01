import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleWare from 'redux-saga';
import userReducer from './../mouldes/Login/reducer';
import studentsReducer from './../mouldes/Students/reducer';
import userRootSaga from "../mouldes/Login/saga";
import studentsRootSaga from "../mouldes/Students/saga";

const reducer = combineReducers({
  user: userReducer,
  students: studentsReducer,
});

const sagaMiddleware = createSagaMiddleWare();
const middleware = [sagaMiddleware];
const store = createStore(
    reducer, 
    {}, 
    applyMiddleware(...middleware)
  );

sagaMiddleware.run(userRootSaga);
sagaMiddleware.run(studentsRootSaga);

export default store;