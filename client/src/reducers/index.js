import { combineReducers } from 'redux';
import drillHolesReducer from './drillHolesReducer';

export default combineReducers({
	drillholes: drillHolesReducer
});