import { PIN } from "../../actions/_constants";

const initialState = {
  isLoadingKategori: true,
  isLoading: true,
  isLoadingPost: false,
  isError: false,
  status: "",
  msg: "",
  data: [],
  edit: [],
  kategori: [],

  isLoadingAktivasi: false,
  dataAktivasi: [],

  isLoadingRo: false,
  dataRo: [],

  isLoadingLog: true,
  dataLog: [],

  isLoadingDetail: true,
  dataDetail: [],
};

export const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case PIN.SET_LOG_PIN:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        dataLog: action.data.result,
      });
    case PIN.SET_PIN_AKTIVASI:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        dataAktivasi: action.data.result,
      });
    case PIN.SET_PIN_RO:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        dataRo: action.data.result,
      });
    case PIN.LOADING_PIN_AKTIVASI:
      return Object.assign({}, state, {
        isLoadingAktivasi: action.load,
      });

    case PIN.LOADING_PIN_RO:
      return Object.assign({}, state, {
        isLoadingRo: action.load,
      });
    case PIN.SUCCESS:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        data: action.data.result,
      });

    case PIN.KATEGORI:
      return Object.assign({}, state, {
        status: action.data.status,
        msg: action.data.msg,
        kategori: action.data.result,
      });

    case PIN.SET_DETAIL_PIN:
      return Object.assign({}, state, {
        dataDetail: action.data.result,
      });

    case PIN.LOADING_LOG_PIN:
      return Object.assign({}, state, {
        isLoadingLog: action.load,
      });
    case PIN.LOADING:
      return Object.assign({}, state, {
        isLoading: action.load,
      });
    case PIN.LOADING_KATEGORI:
      return Object.assign({}, state, {
        isLoadingKategori: action.load,
      });
    case PIN.LOADING_DETAIL_PIN:
      return Object.assign({}, state, {
        isLoadingDetail: action.load,
      });
    case PIN.LOADING_POST:
      return Object.assign({}, state, {
        isLoadingPost: action.load,
      });
    case PIN.IS_ERROR:
      return Object.assign({}, state, {
        isError: action.load,
      });
    default:
      return state;
  }
};
