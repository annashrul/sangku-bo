import axios from "axios"
import Swal from "sweetalert2";
import {DEPOSIT, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: DEPOSIT.LOADING,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: DEPOSIT.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: DEPOSIT.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: DEPOSIT.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: DEPOSIT.SUCCESS,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: DEPOSIT.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: DEPOSIT.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: DEPOSIT.FAILED,
        data
    }
}

export const getDeposit = (where='') => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'transaction/deposit';
        if(where!==''){
            url+=`?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                console.log("RESPONSE DEPOSIT",data);
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


export const postDeposit = (data,id) => async dispatch =>{
    Swal.fire({
        title: 'Please Wait.',
        html: NOTIF_ALERT.CHECKING,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        onClose: () => {}
    });
    const url = HEADERS.URL + `transaction/deposit/${id}`;

    axios.post(url,data)
        .then(response=>{
            setTimeout(
                function () {
                    Swal.close() ;
                    const data = (response.data);
                    if (data.status === 'success') {
                        Swal.fire({
                            title: 'Success',
                            icon: 'success',
                            text: NOTIF_ALERT.SUCCESS,
                        });
                        dispatch(setIsError(true));
                        dispatch(ModalToggle(false));
                        dispatch(getDeposit('page=1'));
                    }
                    else {
                        Swal.fire({
                            title: 'failed',
                            icon: 'error',
                            text: NOTIF_ALERT.FAILED,
                        });
                        dispatch(setIsError(false));
                        dispatch(ModalToggle(true));
                    }
                    dispatch(setLoadingPost(false));
                },800)

        }).catch(error =>{
        Swal.close()
        dispatch(setLoading(false));
        if (error.message === 'Network Error') {
            Swal.fire(
                'Network Failed!.',
                'Please check your connection',
                'error'
            );
        }
        else {
            Swal.fire({
                title: 'failed',
                icon: 'error',
                text: error.response.data.msg,
            });
            if (error.response) {

            }
        }

    });
}
