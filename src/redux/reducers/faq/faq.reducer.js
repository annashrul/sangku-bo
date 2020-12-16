

import {FAQ} from "../../actions/_constants";

const initialState = {
    isLoading: true,
    isLoadingPost: false,
    isError: false,
    status: "",
    msg: "",
    data: [],
    edit:[],
    detail:[]
}

export const faqReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAQ.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });
        case FAQ.EDIT:
            return Object.assign({}, state, {
                edit: action.data.result,
            });
        case FAQ.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case FAQ.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case FAQ.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case FAQ.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case FAQ.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}