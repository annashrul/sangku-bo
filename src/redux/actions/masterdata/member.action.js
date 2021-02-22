import axios from "axios"
import Swal from "sweetalert2";
import {MEMBER, HEADERS,NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: MEMBER.LOADING,
        load
    }
}

export function setLoadingExcel(load) {
    return {
        type: MEMBER.LOADING_EXCEL,
        load
    }
}


export function setLoadingDetail(load) {
    return {
        type: MEMBER.LOADING_DETAIL,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: MEMBER.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: MEMBER.IS_ERROR,
        load
    }
}

export function setData(data = []) {
    return {
        type: MEMBER.SUCCESS,
        data
    }
}
export function setExcel(data = []) {
    return {
        type: MEMBER.EXCEL,
        data
    }
}

export function setDataEdit(data = []) {
    return {
        type: MEMBER.EDIT,
        data
    }
}
export function setDataDetail(data = []) {
    return {
        type: MEMBER.DETAIL,
        data
    }
}

export function setDataFailed(data = []) {
    return {
        type: MEMBER.FAILED,
        data
    }
}

export const getMember = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'member';
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
export const getExcelMember = (where) => {
    return (dispatch) => {
        dispatch(setLoadingExcel(true));
        let url = 'member';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setExcel(data));
                dispatch(setLoadingExcel(false));
            })
            .catch(function (error) {
                dispatch(setLoadingExcel(false));
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

export const putMember = (data,id) => {
    return (dispatch) => {
        Swal.fire({
            title: 'Tunggu sebentar.',
            html: NOTIF_ALERT.CHECKING,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {}
        })

        const url = HEADERS.URL + `member/${id}`;
        axios.put(url,data)
            .then(function (response) {
                const data = (response.data);
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
                            dispatch(getMember('page=1'));
                        } else {
                            Swal.fire({
                                title: 'failed',
                                icon: 'error',
                                text: NOTIF_ALERT.FAILED,
                            });
                        }
                        dispatch(getMember('page=1'));
                    },800)

            })
            .catch(function (error) {
                Swal.close();
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: error.response.data.msg,
                    });

                    if (error.response) {

                    }
                }

            })
    }
}

