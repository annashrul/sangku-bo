import axios from "axios"
import Swal from "sweetalert2";
import {PPOB, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";
import {ToastQ} from "helper"

export function setLoading(load) {
    return {
        type: PPOB.LOADING,
        load
    }
}
export function setIsError(load) {
    return {
        type: PPOB.IS_ERROR,
        load
    }
}

export function setProduk(data = []) {
    return {
        type: PPOB.PRODUK,
        data
    }
}

export function setOperator(data = []) {
    return {
        type: PPOB.OPERATOR,
        data
    }
}

export function setKategori(data = []) {
    return {
        type: PPOB.KATEGORI,
        data
    }
}




export function setDataEdit(data = []) {
    return {
        type: PPOB.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: PPOB.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: PPOB.FAILED,
        data
    }
}

export const fetchProduk = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/produk/list?${where}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setProduk(data));
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

export const fetchOperator = (id) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/produk/operator?kategori=${id}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setOperator(data));
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
export const fetchKategori = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        axios.get(HEADERS.URL + `transaction/produk/kategori`)
            .then(function (response) {
                const data = response.data;
                dispatch(setKategori(data));
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