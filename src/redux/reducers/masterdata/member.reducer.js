

import {MEMBER} from "../../actions/_constants";

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

export const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEMBER.SUCCESS:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.result,
            });

        case MEMBER.DETAIL:
            return Object.assign({}, state, {
                detail: action.data.result,
            });
        case MEMBER.FAILED:
            return Object.assign({}, state, {
                status: action.data.status,
                msg: action.data.msg,
                data: action.data.data,
            });
        case MEMBER.LOADING:
            return Object.assign({}, state, {
                isLoading: action.load
            });
        case MEMBER.LOADING_DETAIL:
            return Object.assign({}, state, {
                isLoadingDetail: action.load
            });
        case MEMBER.LOADING_POST:
            return Object.assign({}, state, {
                isLoadingPost: action.load
            });
        case MEMBER.IS_ERROR:
            return Object.assign({}, state, {
                isError: action.load
            });
        default:
            return state
    }
}