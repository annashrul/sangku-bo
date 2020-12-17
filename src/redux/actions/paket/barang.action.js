import axios from "axios"
import Swal from "sweetalert2";
import {BARANG, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: BARANG.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: BARANG.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: BARANG.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: BARANG.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: BARANG.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: BARANG.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: BARANG.FAILED,
        data
    }
}

export const fetchBarang = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'barang';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setData(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                dispatch(setLoading(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
            })

    }
};


