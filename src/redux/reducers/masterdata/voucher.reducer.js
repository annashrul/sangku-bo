

import {VOUCHER} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingDetail: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const voucherReducer = (state = initialState, action) => {
    switch (action.type) {
        case VOUCHER.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case VOUCHER.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case VOUCHER.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case VOUCHER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case VOUCHER.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case VOUCHER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case VOUCHER.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}