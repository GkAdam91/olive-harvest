import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const deleteFieldSuccess = (id) => {
    return {
        type: actionTypes.DELETE_FIELD_SUCCESS,
        fieldId: id,
    }
}

export const deleteFieldStart = () => {
    return {
        type: actionTypes.DELETE_FIELD_START
    }
}

export const deleteFieldFail = (error) => {
    return {
        type: actionTypes.DELETE_FIELD_FAIL,
        error: error
    }
}

export const deleteField = (fieldData) => {
    console.log('Clicked Delete', fieldData)
    return dispatch => {
        dispatch(deleteFieldStart());
        const queryParams = '?orderBy="fieldId"&equalTo="' + fieldData.fieldId + '"';
        axios.delete('/fields/' +fieldData+'.json')
            .then(response => {
                console.log(response);
                dispatch(deleteFieldSuccess(fieldData.fieldId))
            })
            .catch(error => {
                console.log(error);
                dispatch(deleteFieldFail(error))
            })
    }
}

export const addFieldSuccess = (id, fieldData) => {
    return {
        type: actionTypes.ADD_FIELD_SUCCESS,
        fieldId: id,
        fieldData: fieldData
    }
}

export const addFieldFail = (error) => {
    return {
        type: actionTypes.ADD_FIELD_FAIL,
        error: error
    }
}

export const addFieldStart = () => {
    return {
        type: actionTypes.ADD_FIELD_START
    };
}

export const addField = (fieldData, token) => {
    return dispatch => {
        dispatch(addFieldStart());
        axios.post('/fields.json', fieldData)
            .then(response => {
                console.log('fieldData:', fieldData)
                dispatch(addFieldSuccess(response.data.name, fieldData))
            })
            .catch(error => {
                dispatch(addFieldFail(error))
            })
    }
}

export const addInit = () => {
    return {
        type: actionTypes.ADD_INIT
    }
}


export const fetchFieldsStart = () => {
    return {
        type: actionTypes.FETCH_FIELDS_START
    }
};

export const fetchFieldsSuccess = (fields) => {
    return {
        type: actionTypes.FETCH_FIELDS_SUCCESS,
        fields: fields
    }
};

export const fetchFieldsFail = (error) => {
    return {
        type: actionTypes.FETCH_FIELDS_FAIL,
        error: error
    }
};

export const fetchFields = (/*token, userId*/) => {
    return dispatch => {
        dispatch(fetchFieldsStart());
        //const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"';
        axios.get('/fields.json'/*  + queryParams */)
            .then(res => {
                const fetchedFields = [];
                for (let key in res.data) {
                    fetchedFields.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchFieldsSuccess(fetchedFields));
                // console.log('fetchedFields:', fetchedFields)
            })
            .catch(err => {
                dispatch(fetchFieldsFail(err));
            })

    }
}