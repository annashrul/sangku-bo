import axios from "axios"
import Swal from "sweetalert2";
import {FAQ, HEADERS, NOTIF_ALERT} from "../_constants";
import {ModalToggle} from "../modal.action";


export function setLoading(load) {
    return {
        type: FAQ.LOADING,
        load
    }
}
export function setLoadingPost(load) {
    return {
        type: FAQ.LOADING_POST,
        load
    }
}
export function setIsError(load) {
    return {
        type: FAQ.IS_ERROR,
        load
    }
}

export function setFaq(data = []) {
    return {
        type: FAQ.SUCCESS,
        data
    }
}

export function setFaqEdit(data = []) {
    return {
        type: FAQ.EDIT,
        data
    }
}
export function setFaqDetail(data = []) {
    return {
        type: FAQ.DETAIL,
        data
    }
}

export function setFaqFailed(data = []) {
    return {
        type: FAQ.FAILED,
        data
    }
}

export const FetchFaq = (where) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        let url = 'faq';
        if(where){
            url+=`?${where}`;
        }

        axios.get(HEADERS.URL + `${url}`)
            .then(function (response) {
                const data = response.data;
                dispatch(setFaq(data));
                dispatch(setLoading(false));
            })
            .catch(function (error) {
                // handle error
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

export const storeFaq = (data) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `faq`;
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
                    dispatch(FetchFaq('page=1'));
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

export const putFaq = (data,id) => {
    return (dispatch) => {
        dispatch(setLoadingPost(true));
        const url = HEADERS.URL + `faq/${id}`;
        axios.put(url,data)
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
                    dispatch(FetchFaq('page=1'));
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
// export const deleteFaq = (id) => {
//     return (dispatch) => {
//         dispatch(setLoading(true));
//         const url = HEADERS.URL + `faq/${id}`;
//         axios.delete(url)
//             .then(function (response) {
//                 const data = (response.data);
//                 if (data.status === 'success') {
//                     Swal.fire({
//                         title: 'Success',
//                         icon: 'success',
//                         text: NOTIF_ALERT.SUCCESS,
//                     });
//                 } else {
//                     Swal.fire({
//                         title: 'failed',
//                         icon: 'error',
//                         text: NOTIF_ALERT.FAILED,
//                     });
//                 }
//                 dispatch(setLoading(false));
//                 dispatch(FetchFaq('page=1'));
//             })
//             .catch(function (error) {
//                 dispatch(setLoading(false));
//                 if (error.message === 'Network Error') {
//                     Swal.fire(
//                         'Network Failed!.',
//                         'Please check your connection',
//                         'error'
//                     );
//                 }
//                 else {
//                     Swal.fire({
//                         title: 'failed',
//                         icon: 'error',
//                         text: error.response.data.msg,
//                     });
//                     if (error.response) {
//
//                     }
//                 }
//
//             })
//     }
// }

export const deleteFaq = (id) => async dispatch =>{
    Swal.fire({
        title: 'Please Wait.',
        html: NOTIF_ALERT.CHECKING,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        onClose: () => {}
    })

    axios.delete(HEADERS.URL+`faq/${id}`)
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
                    } else {
                        Swal.fire({
                            title: 'failed',
                            icon: 'error',
                            text: NOTIF_ALERT.FAILED,
                        });
                    }
                    dispatch(setLoading(false));
                    dispatch(FetchFaq('page=1'));
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


