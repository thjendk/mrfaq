import combinedReducer from './combined.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	combined: combinedReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
