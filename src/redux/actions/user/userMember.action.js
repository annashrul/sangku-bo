import axios from "axios"
import Swal from "sweetalert2";
import {USER_MEMBER, HEADERS, NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: USER_MEMBER.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: USER_MEMBER.LOADING_POST,
        load
    }
}
export function setLoadingSend(load) {
    return {
        type: USER_MEMBER.LOADING_SEND,
        load
    }
}
export function setLoadingDetail(load) {
    return {
        type: USER_MEMBER.LOADING_DETAIL,
        load
    }
}
export function setIsError(load) {
    return {
        type: USER_MEMBER.IS_ERROR,
        load
    }
}

export function setUserList(data = []) {
    return {
        type: USER_MEMBER.SUCCESS,
        data
    }
}

export function setUserListAll(data = []) {
    return {
        type: USER_MEMBER.SUCCESS_ALL,
        data
    }
}

export function setUserListEdit(data = []) {
    return {
        type: USER_MEMBER.EDIT,
        data
    }
}
export function setUserListDetail(data = []) {
    return {
        type: USER_MEMBER.DETAIL,
        data
    }
}

export function setUserListFailed(data = []) {
    return {
        type: USER_MEMBER.FAILED,
        data
    }
}

export const FetchUserMember = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'user';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setUserList(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );

                    dispatch(setLoading(false));
                }
            })

    }
};

export const FetchAllUserMember = (where) => {
    return (dispatch) => {
        dispatch(setLoadingSend(true));
        let url = 'user';
        if(where){
            url+=`?${where}`;
        }
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setUserListAll(data));
                dispatch(setLoadingSend(false));
            })
            .catch(function (error) {
                dispatch(setLoadingSend(false));
            })

    }
};


export const FetchDetailUserMember = (id) => {
    return (dispatch) => {
        dispatch(setLoadingDetail(true));
        let url = `user/${id}`;
        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setUserListDetail(data));
                dispatch(setLoadingDetail(false));
            })
            .catch(function (error) {
                // handle error
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );

                    dispatch(setLoadingDetail(false));
                }
            })

    }
};
export const storeUserMember = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `user`;
        axios.post(url,data)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                    dispatch(setIsError(true));
                    dispatch(ModalToggle(false));
                    dispatch(FetchUserMember('page=1'));

                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                    dispatch(setIsError(false));
                    dispatch(ModalToggle(true));
                }
                dispatch(setLoadingPost(false));


            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                if (error.message === 'Network Error') {
                    Swal.fire(
                        'Network Failed!.',
                        'Please check your connection',
                        'error'
                    );
                }
                else{
                    dispatch(setIsError(false));
                    dispatch(ModalToggle(true));
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
export const putUserMember = (data,id,where="") => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `user/${id}`;
        axios.put(url,{"status":data['status']})
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                    dispatch(setIsError(true));
                    dispatch(ModalToggle(false));
                    dispatch(FetchUserMember(where));

                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                    dispatch(setIsError(false));
                    dispatch(ModalToggle(true));
                }
                dispatch(setLoadingPost(false));


            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
                dispatch(ModalToggle(true));
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
export const confirmUserMember = (data,id,where="") => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `auth/confirm/${id}`;
        axios.post(url,{})
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                    dispatch(setIsError(true));
                    dispatch(ModalToggle(false));
                    dispatch(FetchUserMember(where));

                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                    dispatch(setIsError(false));
                    dispatch(ModalToggle(true));
                }
                dispatch(setLoadingPost(false));


            })
            .catch(function (error) {
                dispatch(setLoadingPost(false));
                dispatch(setIsError(false));
                dispatch(ModalToggle(true));
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
export const deleteUserMember = (id,where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        const url = HEADERS.URL + `user/${id}`;
        axios.delete(url)
            .then(function (response) {
                const data = (response.data);
                if (data.status === 'success') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: NOTIF_ALERT.SUCCESS,
                    });
                } else {
                    Swal.fire({
                        title: 'failed',
                        icon: 'error',
                        text: NOTIF_ALERT.FAILED,
                    });
                }
                dispatch(setLoading(false));

                dispatch(FetchUserMember(where));
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


