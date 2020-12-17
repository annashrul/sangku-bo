/*****************
 * isLading
*****************/
export const LOADING = {
  IS_LOADING: "IS_LOADING"
}

/****************
      TOKEN
*****************/
export const TOKEN = {
  GET: "GET_TOKEN"
}

export const NOTIF_ALERT = {
    SUCCESS: "Data Berhasil Disimpan",
    FAILED: "Data Gagal Disimpan",
    CHECKING : "Pengecekan Data",
    NO_DATA: "https://www.mediseller.com/front_assets/img/search.png"
}

export const HEADERS ={
  // URL: atob(document.getElementById("hellyeah").value),
  URL       : "http://192.168.100.10:3010/",
  // URL       : "https://kahvebit.com:2096/",
  TOKEN     : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwY2RiN2M5OC0wNWNmLTQ4NDgtOGM3Yy0yZTFiYTczZGUwNmYiLCJpYXQiOjE1NzAxNzM0ODYsImV4cCI6MTU3MDc3ODI4Nn0.1NiWtt2luG83am8FJSvWpL5p35Oxd8GSJJTwhFmAdgw",
  USERNAME  : "netindo",
  PASSWORD  : "$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO"
}

/****************
      PASSWORD MODAL ADD LOCATION
*****************/
export const LOC_VERIF ={
  password: "bmV0aW4xMjM0YSE="
}

/****************
      MODAL
*****************/
export const MODALS = {
  IS_MODAL_OPEN: 'IS_MODAL_OPEN',
  MODAL_TYPE : 'MODAL_TYPE'
}

/****************
      AUTH
*****************/
export const AUTH = {
  FETCH_DATAS:'FETCH_DATAS',
  GET_ERRORS:'GET_ERRORS',
  TEST_DISPATCH:'TEST_DISPATCH',
  SET_CURRENT_USER:'SET_CURRENT_USER',
  SET_LOGGED_USER:'SET_LOGGED_USER'
}


/****************
 DASHBOARD
 *****************/
export const DASHBOARD = {
  LOADING: 'SET_DASHBOARD_LOADING',
  SUCCESS: 'SET_DASHBOARD_SUCCESS',
  SUCCESS_NEWEST: 'SET_DASHBOARD_SUCCESS_NEWEST',
  FAILED: 'SET_DASHBOARD_FAILED',
  DETAIL: 'SET_DASHBOARD_DETAIL',
  POST_LOADING: 'SET_DASHBOARD_POST_LOADING'
}


/****************
 SITE SECTION
 *****************/
export const SITE = {
  LOADING: 'SET_SITE_LOADING',
  SUCCESS: 'SET_SITE_SUCCESS',
  SUCCESS_LIST: 'SET_SITE_SUCCESS_LIST',
  SUCCESS_FOLDER: 'SET_SITE_SUCCESS_FOLDER',
  SUCCESS_TABLES: 'SET_SITE_SUCCESS_TABLES',
  FAILED: 'SET_SITE_FAILED',
  DETAIL: 'SET_SITE_DETAIL',
  SUCCESS_CHECK: 'SET_SITE_SUCCESS_CHECK',
  TRIGGER_ECAPS: 'SET_TRIGGER_ECAPS',
  DOWNLOAD_TXT: 'SET_DOWNLOAD_TXT',
  TRIGGER_MOBILE_ECAPS: 'SET_TRIGGER_MOBILE_ECAPS'
}

/****************
 PAKET
 *****************/
export const PAKET = {
    LOADING: 'SET_PAKET_LOADING',
    LOADING_POST: 'SET_PAKET_LOADING_POST',
    LOADING_DETAIL: 'SET_PAKET_LOADING_DETAIL',
    IS_ERROR: 'SET_PAKET_IS_ERROR',
    SUCCESS: 'SUCCESS_PAKET',
    FAILED: 'FAILED_PAKET',
    DETAIL: 'DETAIL_PAKET',
}
/****************
 BARANG
 *****************/
export const BARANG = {
    LOADING: 'SET_BARANG_LOADING',
    LOADING_POST: 'SET_BARANG_LOADING_POST',
    IS_ERROR: 'SET_BARANG_IS_ERROR',
    SUCCESS: 'SUCCESS_BARANG',
    FAILED: 'FAILED_BARANG',
    DETAIL: 'DETAIL_BARANG',
    EDIT: 'EDIT_BARANG'
}

/****************
 KATEGORI
 *****************/
export const KATEGORI = {
    LOADING: 'SET_KATEGORI_LOADING',
    LOADING_POST: 'SET_KATEGORI_LOADING_POST',
    IS_ERROR: 'SET_KATEGORI_IS_ERROR',
    SUCCESS: 'SUCCESS_KATEGORI',
    FAILED: 'FAILED_KATEGORI',
    DETAIL: 'DETAIL_KATEGORI',
    EDIT: 'EDIT_KATEGORI'
}