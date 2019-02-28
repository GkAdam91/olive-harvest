import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fields: [],
    error: null,
    loading: false,
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FIELDS_START:
            return updateObject(state, { loading: true });
        case actionTypes.FETCH_FIELDS_SUCCESS:
            return updateObject(state, { fields: action.fields, loading: false });
        case actionTypes.FETCH_FIELDS_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.ADD_FIELD_START:
            return updateObject(state, { loading: true });
        case actionTypes.ADD_FIELD_SUCCESS:
            const newField = {
                ...action.fieldData,
                id: action.fieldId
            }
            const updatedState = {
                loading: false,
                fields: state.fields.concat(newField)
            }
            return updateObject(state, updatedState);
        case actionTypes.ADD_FIELD_FAIL:
            return updateObject(state, { loading: false });
        case actionTypes.DELETE_FIELD_START:
            return updateObject(state, { loading: true });
        case actionTypes.DELETE_FIELD_SUCCESS:
            const updatedSt = {
                loading: false,
                fields: state.fields.splice(action.id, 1)
            }
            return updateObject(state, updatedSt);
        case actionTypes.DELETE_FIELD_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

export default reducer;