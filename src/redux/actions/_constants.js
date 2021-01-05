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
let prefPaket='PAKET';
export const PAKET = {
    LOADING: `SET_${prefPaket}_LOADING`,
    LOADING_POST: `SET_${prefPaket}_LOADING_POST`,
    LOADING_DETAIL: `SET_${prefPaket}_LOADING_DETAIL`,
    IS_ERROR: `SET_${prefPaket}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefPaket}`,
    FAILED: `FAILED_${prefPaket}`,
    DETAIL: `DETAIL_${prefPaket}`,
}
/****************
 BARANG
 *****************/
let prefBarang='BARANG';
export const BARANG = {
    LOADING: `SET_${prefBarang}_LOADING`,
    LOADING_POST: `SET_${prefBarang}_LOADING_POST`,
    IS_ERROR: `SET_${prefBarang}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefBarang}`,
    FAILED: `FAILED_${prefBarang}`,
    DETAIL: `DETAIL_${prefBarang}`,
    EDIT: `EDIT_${prefBarang}`
}

/****************
 KATEGORI
 *****************/
let prefKategori='KATEGORI';
export const KATEGORI = {
    LOADING: `SET_${prefKategori}_LOADING`,
    LOADING_TESTIMONI: `SET_${prefKategori}_LOADING_TESTIMONI`,
    LOADING_POST: `SET_${prefKategori}_LOADING_POST`,
    IS_ERROR: `SET_${prefKategori}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefKategori}`,
    SUCCESS_TESTIMONI: `SUCCESS_${prefKategori}_TESTIMONI`,
    FAILED: `FAILED_${prefKategori}`,
    DETAIL: `DETAIL_${prefKategori}`,
    EDIT: `EDIT_${prefKategori}`
}
/****************
 PIN
 *****************/
let prefPin='PIN';
export const PIN = {
    LOADING: `SET_${prefPin}_LOADING`,
    LOADING_POST: `SET_${prefPin}_LOADING_POST`,
    IS_ERROR: `SET_${prefPin}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefPin}`,
    FAILED: `FAILED_${prefPin}`,
    DETAIL: `DETAIL_${prefPin}`,
    EDIT: `EDIT_${prefPin}`
}
/****************
 MEMBER
 *****************/
let prefMember='MEMBER';
export const MEMBER = {
    LOADING: `SET_${prefMember}_LOADING`,
    LOADING_DETAIL: `SET_${prefMember}_LOADING_DETAIL`,
    LOADING_POST: `SET_${prefMember}_LOADING_POST`,
    IS_ERROR: `SET_${prefMember}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefMember}`,
    FAILED: `FAILED_${prefMember}`,
    DETAIL: `DETAIL_${prefMember}`,
    EDIT: `EDIT_${prefMember}`
}
/****************
 ALAMAT
 *****************/
let prefAlamat='ALAMAT';
export const ALAMAT = {
    LOADING_DETAIL: `SET_${prefAlamat}_LOADING_DETAIL`,
    DETAIL: `DETAIL_${prefAlamat}`,
}
/****************
 ALAMAT
 *****************/
let prefBank='BANK';
export const BANK = {
    LOADING_DETAIL: `SET_${prefBank}_LOADING_DETAIL`,
    DETAIL: `DETAIL_${prefBank}`,
}
/****************
 CONTENT
 *****************/
let prefContent='CONTENT';
export const CONTENT = {
    LOADING: `SET_${prefContent}_LOADING`,
    LOADING_DETAIL: `SET_${prefContent}_LOADING_DETAIL`,
    LOADING_POST: `SET_${prefContent}_LOADING_POST`,
    IS_ERROR: `SET_${prefContent}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefContent}`,
    FAILED: `FAILED_${prefContent}`,
    DETAIL: `DETAIL_${prefContent}`,
    EDIT: `EDIT_${prefContent}`
}
/****************
 USER_LIST
 *****************/
let prefUserList='USER_LIST';
export const USER_LIST = {
    LOADING: `SET_${prefUserList}_LOADING`,
    LOADING_DETAIL: `SET_${prefUserList}_LOADING_DETAIL`,
    LOADING_POST: `SET_${prefUserList}_LOADING_POST`,
    IS_ERROR: `SET_${prefUserList}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefUserList}`,
    FAILED: `FAILED_${prefUserList}`,
    DETAIL: `DETAIL_${prefUserList}`,
    EDIT: `EDIT_${prefUserList}`
}
/****************
 USER_LEVEL
 *****************/
let prefUserLevel='USER_LEVEL';
export const USER_LEVEL = {
    LOADING: `SET_${prefUserLevel}_LOADING`,
    LOADING_DETAIL: `SET_${prefUserLevel}_LOADING_DETAIL`,
    LOADING_POST: `SET_${prefUserLevel}_LOADING_POST`,
    IS_ERROR: `SET_${prefUserLevel}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefUserLevel}`,
    FAILED: `FAILED_${prefUserLevel}`,
    DETAIL: `DETAIL_${prefUserLevel}`,
    EDIT: `EDIT_${prefUserLevel}`
}
/****************
 LAPORAN PENJUALAN
 *****************/
let prefPenjualan='PENJUALAN';
export const PENJUALAN = {
    LOADING: `SET_${prefPenjualan}_LOADING`,
    LOADING_DETAIL: `SET_${prefPenjualan}_LOADING_DETAIL`,
    LOADING_POST: `SET_${prefPenjualan}_LOADING_POST`,
    IS_ERROR: `SET_${prefPenjualan}_IS_ERROR`,
    SUCCESS: `SUCCESS_${prefPenjualan}`,
    FAILED: `FAILED_${prefPenjualan}`,
    DETAIL: `DETAIL_${prefPenjualan}`,
    EDIT: `EDIT_${prefPenjualan}`
}