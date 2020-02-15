import axios from 'axios';
import { FETCH_DRILLHOLES } from './types';
import { FETCH_DRILLHOLE } from './types';


export const fetchDrillHoles = () => async dispatch => {
	const res = await axios.get('/api/drillholes');
	
	dispatch({ type: FETCH_DRILLHOLES, payload: res.data });
};

export const fetchDrillHole = (id) => async dispatch => {
	const res = await axios.get('/api/drillholes/' + id);
	
	dispatch({ type: FETCH_DRILLHOLE, payload: res.data });
	console.log(res.data);
};