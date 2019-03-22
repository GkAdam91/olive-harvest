import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    harvests: [],
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_HARVESTS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_HARVESTS_SUCCESS:
            return updateObject(state, { harvests: action.harvests, loading: false });
        case actionTypes.FETCH_HARVESTS_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.ADD_HARVEST_START:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_HARVEST_SUCCESS:
            const newField = {
                ...action.fieldData,
                id: action.fieldId
            }
            const updatedState = {
                loading: false,
                harvests: state.harvests.concat(newField)
            }
            return updateObject(state, updatedState);
        case actionTypes.ADD_HARVEST_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.DELETE_HARVEST_START:
            return updateObject(state, { loading: true });
        case actionTypes.DELETE_HARVEST_SUCCESS:
            const updatedSt = {
                loading: false,
                harvests: state.harvests.splice(action.harvestId, 1)
            }
            return updateObject(state, updatedSt);
        case actionTypes.DELETE_HARVEST_FAIL:
            return updateObject(state, { loading: true });
        case actionTypes.UPDATE_HARVEST_START:
            return updateObject(state, { loading: true });
        case actionTypes.UPDATE_HARVEST_SUCCESS:
            console.log('UPDATE');
            // const updatedSt = {
            //     loading: false,
            //     harvests: state.harvests.splice(action.harvestId, 1)
            // }
            return updateObject(state, updatedSt);
        case actionTypes.UPDATE_HARVEST_FAIL:
            return updateObject(state, { loading: true });
        default:
            return state;
    }
}

export default reducer;