import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const deleteAllHarvestsSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ALL_HARVESTS_SUCCESS,
        harvestsIds: id,
    }
}

export const deleteAllHarvestsStart = () => {
    return {
        type: actionTypes.DELETE_ALL_HARVESTS_START
    }
}

export const deleteAllHarvestsFail = (error) => {
    return {
        type: actionTypes.DELETE_ALL_HARVESTS_FAIL,
        error: error
    }
}

export const deleteAllHarvests = (harvestsData) => {
    console.log('harvestsData:', harvestsData);
    return dispatch => {
        dispatch(deleteHarvestStart());
        const queryParams = '?orderBy="fieldName"&equalTo="' + harvestsData+'"';
        axios.delete('/harvests.json'+queryParams)
            .then(response => {
                dispatch(deleteHarvestSuccess(response.data.name))
            })
            .catch(error => {
                dispatch(deleteHarvestFail(error))
            })
    }
}

export const deleteHarvestSuccess = (id) => {
    return {
        type: actionTypes.DELETE_HARVEST_SUCCESS,
        harvestId: id,
    }
}

export const deleteHarvestStart = () => {
    return {
        type: actionTypes.DELETE_HARVEST_START
    }
}

export const deleteHarvestFail = (error) => {
    return {
        type: actionTypes.DELETE_HARVEST_FAIL,
        error: error
    }
}

export const deleteHarvest = (harvestData) => {
    console.log('Clicked Delete')
    return dispatch => {
        dispatch(deleteHarvestStart());
        axios.delete('/harvests.json', harvestData)
            .then(response => {
                dispatch(deleteHarvestSuccess(response.data.name))
            })
            .catch(error => {
                dispatch(deleteHarvestFail(error))
            })
    }
}

export const addHarvestSuccess = (id, harvestData) => {
    return {
        type: actionTypes.ADD_HARVEST_SUCCESS,
        harvestId: id,
        harvestData: harvestData
    }
}

export const addHarvestFail = (error) => {
    return {
        type: actionTypes.ADD_HARVEST_FAIL,
        error: error
    }
}

export const addHarvestStart = () => {
    return {
        type: actionTypes.ADD_HARVEST_START
    };
}

export const addHarvest = (harvestData, token) => {
    return dispatch => {
        dispatch(addHarvestStart());
        axios.post('/harvests.json', harvestData)
            .then(response => {
                console.log('response.data:', response.data)
                dispatch(addHarvestSuccess(response.data.name, harvestData))
            })
            .catch(error => {
                dispatch(addHarvestFail(error))
            })
    }
}

export const addHarvestInit = () => {
    return {
        type: actionTypes.ADD_HARVEST_INIT
    }
}


export const fetchHarvestsStart = () => {
    return {
        type: actionTypes.FETCH_HARVESTS_START
    }
};

export const fetchHarvestsSuccess = (harvests) => {
    return {
        type: actionTypes.FETCH_HARVESTS_SUCCESS,
        harvests: harvests
    }
};

export const fetchHarvestsFail = (error) => {
    return {
        type: actionTypes.FETCH_HARVESTS_FAIL,
        error: error
    }
};

export const fetchHarvests = (/*token, userId*/) => {
    return dispatch => {
        dispatch(fetchHarvestsStart());
        //const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+'"';
        axios.get('/harvests.json'/*  + queryParams */)
            .then(res => {
                const fetchedHarvests = [];
                for (let key in res.data) {
                    fetchedHarvests.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchHarvestsSuccess(fetchedHarvests));
                // console.log('fetchedHarvests:', fetchedHarvests)
            })
            .catch(err => {
                dispatch(fetchHarvestsFail(err));
            })

    }
}