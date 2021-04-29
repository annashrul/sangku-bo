import axios from "axios";
import Swal from "sweetalert2";
import { PIN, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";

export function setLoadingDetail(load) {
  return {
    type: PIN.LOADING_DETAIL_PIN,
    load,
  };
}
export function setLoadingLog(load) {
  return {
    type: PIN.LOADING_LOG_PIN,
    load,
  };
}
export function setLoadingAktivasi(load) {
  return {
    type: PIN.LOADING_PIN_AKTIVASI,
    load,
  };
}
export function setLoadingRo(load) {
  return {
    type: PIN.LOADING_PIN_RO,
    load,
  };
}
export function setDataDetail(data = []) {
  return {
    type: PIN.SET_DETAIL_PIN,
    data,
  };
}
export function setDataLog(data = []) {
  return {
    type: PIN.SET_LOG_PIN,
    data,
  };
}
export function setDataAktivasi(data = []) {
  return {
    type: PIN.SET_PIN_AKTIVASI,
    data,
  };
}
export function setDataRo(data = []) {
  return {
    type: PIN.SET_PIN_RO,
    data,
  };
}

export function setLoading(load) {
  return {
    type: PIN.LOADING,
    load,
  };
}

export function setLoadingKategori(load) {
  return {
    type: PIN.LOADING_KATEGORI,
    load,
  };
}
export function setLoadingPost(load) {
  return {
    type: PIN.LOADING_POST,
    load,
  };
}
export function setIsError(load) {
  return {
    type: PIN.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: PIN.SUCCESS,
    data,
  };
}
export function setDataKategori(data = []) {
  return {
    type: PIN.KATEGORI,
    data,
  };
}

export const getDetailPin = (where) => {
  return (dispatch) => {
    dispatch(setLoadingDetail(true));
    let url = "pin/mutasi?jenis_transaksi=ORDER";
    if (where) {
      url += `&${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataDetail(data));
        dispatch(setLoadingDetail(false));
      })
      .catch(function (error) {
        dispatch(setLoadingDetail(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};

export const getLogPin = (where) => {
  return (dispatch) => {
    dispatch(setLoadingLog(true));
    let url = "pin/log/generate";
    if (where) {
      url += `?${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataLog(data));
        dispatch(setLoadingLog(false));
      })
      .catch(function (error) {
        dispatch(setLoadingLog(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};

export const getPinAktivasi = (where) => {
  return (dispatch) => {
    dispatch(setLoadingAktivasi(true));
    let url = "pin/report";
    if (where) {
      url += `?${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataAktivasi(data));
        dispatch(setLoadingAktivasi(false));
      })
      .catch(function (error) {
        dispatch(setLoadingAktivasi(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};

export const getPinRo = (where) => {
  return (dispatch) => {
    dispatch(setLoadingRo(true));
    let url = "pin/report";
    if (where) {
      url += `?${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataRo(data));
        dispatch(setLoadingRo(false));
      })
      .catch(function (error) {
        dispatch(setLoadingRo(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};

export const getPin = (where) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let url = "pin/report";
    if (where) {
      url += `?${where}`;
    }
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        console.log(data);
        dispatch(setData(data));
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};
export const getKategoriPin = (where) => {
  return (dispatch) => {
    dispatch(setLoadingKategori(true));
    let url = "transaction/pin_available";
    if (where) {
      url += `?${where}`;
    }
    let exp = `${where}`.split("&");
    exp = `${exp}`.split("=");
    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataKategori(data));
        if (exp[2] === "aktivasi") {
          dispatch(getPinAktivasi("category=" + data.result[0].id));
        } else {
          dispatch(getPinRo("category=" + data.result[0].id));
        }
        dispatch(setLoadingKategori(false));
      })
      .catch(function (error) {
        dispatch(setLoadingKategori(false));
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        }
      });
  };
};

export const generatePin = (data) => {
  return (dispatch) => {
    dispatch(setLoadingPost(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `pin`;
    axios
      .post(url, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(ModalToggle(false));
          dispatch(getPin("page=1"));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
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
        if (error.message === "Network Error") {
          Swal.fire(
            "Network Failed!.",
            "Please check your connection",
            "error"
          );
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: error.response.data.msg,
          });

          if (error.response) {
          }
        }
      });
  };
};
