import axios from "axios"
import Swal from "sweetalert2";
import {SALDO, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: SALDO.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: SALDO.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: SALDO.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: SALDO.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: SALDO.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: SALDO.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: SALDO.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: SALDO.FAILED,
        data
    }
}

export const getLaporanSaldo = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/history';
        if(where!==''){
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

