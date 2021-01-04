import axios from "axios"
import Swal from "sweetalert2";
import {KATEGORI, HEADERS} from "../_constants";


export function setLoading(load) {
    return {
        type: KATEGORI.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: KATEGORI.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: KATEGORI.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: KATEGORI.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: KATEGORI.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: KATEGORI.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: KATEGORI.FAILED,
        data
    }
}

export const fetchKategori = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url =  `category/${where}`;
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


