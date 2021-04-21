import axios from "axios";
import Swal from "sweetalert2";
import { BANKS, HEADERS, NOTIF_ALERT } from "../_constants";
import { ModalToggle } from "../modal.action";

export function setLoading(load) {
  return {
    type: BANKS.LOADING,
    load,
  };
}

export function setLoadingDetail(load) {
  return {
    type: BANKS.LOADING_DETAIL,
    load,
  };
}

export function setIsError(load) {
  return {
    type: BANKS.IS_ERROR,
    load,
  };
}

export function setData(data = []) {
  return {
    type: BANKS.SUCCESS,
    data,
  };
}
export function setDataBank(data = []) {
  return {
    type: BANKS.LISTBANK,
    data,
  };
}

export function setDataEdit(data = []) {
  return {
    type: BANKS.EDIT,
    data,
  };
}
export function setDataDetail(data = []) {
  return {
    type: BANKS.DETAIL,
    data,
  };
}

export function setDataFailed(data = []) {
  return {
    type: BANKS.FAILED,
    data,
  };
}

export const fetchDataBank = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let url = "bank/data";

    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
        dispatch(setDataBank(data));
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

export const getBankList = (where) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let url = "bank";
    if (where) {
      url += `?${where}`;
    }

    axios
      .get(HEADERS.URL + `${url}`)
      .then(function (response) {
        const data = response.data;
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

export const postBankList = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `bank`;
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
          dispatch(getBankList(`page=1`));
          dispatch(ModalToggle(false));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(ModalToggle(true));
          dispatch(setIsError(false));
        }
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        dispatch(setIsError(false));
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

export const putBankMember = (data, id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `bank_member/${id}`;
    axios
      .put(url, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(getBankList(`page=1`));
          dispatch(ModalToggle(false));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(ModalToggle(true));
          dispatch(setIsError(false));
        }
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        dispatch(setIsError(false));
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
export const postBankMember = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `bank_member`;
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
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(ModalToggle(true));
          dispatch(setIsError(false));
        }
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        dispatch(setIsError(false));
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
export const putBankList = (data, id) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setIsError(false));
    const url = HEADERS.URL + `bank/${id}`;
    axios
      .put(url, data)
      .then(function (response) {
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
          dispatch(setIsError(true));
          dispatch(getBankList(`page=1`));
          dispatch(ModalToggle(false));
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
          dispatch(ModalToggle(true));
          dispatch(setIsError(false));
        }
        dispatch(setLoading(false));
      })
      .catch(function (error) {
        dispatch(setLoading(false));
        dispatch(setIsError(false));
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

export const deleteBankList = (id) => async (dispatch) => {
  Swal.fire({
    title: "Tunggu sebentar.",
    html: NOTIF_ALERT.CHECKING,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });

  axios
    .delete(HEADERS.URL + `bank/${id}`)
    .then((response) => {
      setTimeout(function () {
        Swal.close();
        const data = response.data;
        if (data.status === "success") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: NOTIF_ALERT.SUCCESS,
          });
        } else {
          Swal.fire({
            title: "failed",
            icon: "error",
            text: NOTIF_ALERT.FAILED,
          });
        }
        dispatch(setLoading(false));
        dispatch(getBankList(`page=1`));
      }, 800);
    })
    .catch((error) => {
      Swal.close();
      dispatch(setLoading(false));
      if (error.message === "Network Error") {
        Swal.fire("Network Failed!.", "Please check your connection", "error");
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
