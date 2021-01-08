import axios from "axios"
import Swal from "sweetalert2";
import {PENJUALAN, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: PENJUALAN.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: PENJUALAN.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: PENJUALAN.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: PENJUALAN.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: PENJUALAN.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: PENJUALAN.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: PENJUALAN.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: PENJUALAN.FAILED,
        data
    }
}

export const getLaporanPenjualan = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/penjualan/report';
        if(where!==''){
            url+=`?${where}`;
        }
        console.log("URL PENJUALAN",url);

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

