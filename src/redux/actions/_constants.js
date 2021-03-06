/*****************
 * isLading
 *****************/
export const LOADING = {
  IS_LOADING: "IS_LOADING",
};

/****************
      TOKEN
*****************/
export const TOKEN = {
  GET: "GET_TOKEN",
};

export const NOTIF_ALERT = {
  SUCCESS: "Data Berhasil Disimpan",
  FAILED: "Data Gagal Disimpan",
  CHECKING: "Pengecekan Data",
  NO_DATA: "https://www.mediseller.com/front_assets/img/search.png",
};

export const HEADERS = {
  // URL: "http://192.168.100.10:3010/",
  URL: "https://api.sangqu.id/",
  // URL: 'http://ptnetindo.com:6701/',
  TOKEN:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwY2RiN2M5OC0wNWNmLTQ4NDgtOGM3Yy0yZTFiYTczZGUwNmYiLCJpYXQiOjE1NzAxNzM0ODYsImV4cCI6MTU3MDc3ODI4Nn0.1NiWtt2luG83am8FJSvWpL5p35Oxd8GSJJTwhFmAdgw",
  USERNAME: "netindo",
  PASSWORD: "$2b$08$hLMU6rEvNILCMaQbthARK.iCmDRO7jNbUB8CcvyRStqsHD4UQxjDO",
};

/****************
      PASSWORD MODAL ADD LOCATION
*****************/
export const LOC_VERIF = {
  password: "bmV0aW4xMjM0YSE=",
};

/****************
      MODAL
*****************/
export const MODALS = {
  IS_MODAL_OPEN: "IS_MODAL_OPEN",
  MODAL_TYPE: "MODAL_TYPE",
};

/****************
      AUTH
*****************/
export const AUTH = {
  FETCH_DATAS: "FETCH_DATAS",
  GET_ERRORS: "GET_ERRORS",
  TEST_DISPATCH: "TEST_DISPATCH",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_LOGGED_USER: "SET_LOGGED_USER",
};

/****************
 DASHBOARD
 *****************/
export const DASHBOARD = {
  LOADING: "SET_DASHBOARD_LOADING",
  SUCCESS: "SET_DASHBOARD_SUCCESS",
  SUCCESS_NEWEST: "SET_DASHBOARD_SUCCESS_NEWEST",
  FAILED: "SET_DASHBOARD_FAILED",
  DETAIL: "SET_DASHBOARD_DETAIL",
  POST_LOADING: "SET_DASHBOARD_POST_LOADING",
};

/****************
 SITE SECTION
 *****************/
export const SITE = {
  LOADING_WA: "SET_SITE_LOADING_WA",
  DATA_WA: "SET_SITE_DATA_WA",
  LOADING: "SET_SITE_LOADING",
  SUCCESS: "SET_SITE_SUCCESS",
  SUCCESS_LIST: "SET_SITE_SUCCESS_LIST",
  SUCCESS_FOLDER: "SET_SITE_SUCCESS_FOLDER",
  SUCCESS_TABLES: "SET_SITE_SUCCESS_TABLES",
  FAILED: "SET_SITE_FAILED",
  DETAIL: "SET_SITE_DETAIL",
  SUCCESS_CHECK: "SET_SITE_SUCCESS_CHECK",
  TRIGGER_ECAPS: "SET_TRIGGER_ECAPS",
  DOWNLOAD_TXT: "SET_DOWNLOAD_TXT",
  TRIGGER_MOBILE_ECAPS: "SET_TRIGGER_MOBILE_ECAPS",
};

/****************
 PAKET
 *****************/
let prefPaket = "PAKET";
export const PAKET = {
  LOADING: `SET_${prefPaket}_LOADING`,
  LOADING_POST: `SET_${prefPaket}_LOADING_POST`,
  LOADING_DETAIL: `SET_${prefPaket}_LOADING_DETAIL`,
  IS_ERROR: `SET_${prefPaket}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPaket}`,
  FAILED: `FAILED_${prefPaket}`,
  DETAIL: `DETAIL_${prefPaket}`,
};
/****************
 BARANG
 *****************/
let prefBarang = "BARANG";
export const BARANG = {
  LOADING: `SET_${prefBarang}_LOADING`,
  LOADING_POST: `SET_${prefBarang}_LOADING_POST`,
  IS_ERROR: `SET_${prefBarang}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefBarang}`,
  FAILED: `FAILED_${prefBarang}`,
  DETAIL: `DETAIL_${prefBarang}`,
  EDIT: `EDIT_${prefBarang}`,
};
/****************
 BARANG_REDEEM
 *****************/
let prefBarangRedeem = "BARANG_REDEEM";
export const BARANG_REDEEM = {
  LOADING: `SET_${prefBarangRedeem}_LOADING`,
  LOADING_POST: `SET_${prefBarangRedeem}_LOADING_POST`,
  IS_ERROR: `SET_${prefBarangRedeem}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefBarangRedeem}`,
  FAILED: `FAILED_${prefBarangRedeem}`,
  DETAIL: `DETAIL_${prefBarangRedeem}`,
  EDIT: `EDIT_${prefBarangRedeem}`,
};
/****************
 BARANG_REWARD
 *****************/
let prefBarangReward = "BARANG_REWARD";
export const BARANG_REWARD = {
  LOADING: `SET_${prefBarangReward}_LOADING`,
  LOADING_POST: `SET_${prefBarangReward}_LOADING_POST`,
  IS_ERROR: `SET_${prefBarangReward}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefBarangReward}`,
  FAILED: `FAILED_${prefBarangReward}`,
  DETAIL: `DETAIL_${prefBarangReward}`,
  EDIT: `EDIT_${prefBarangReward}`,
};

/****************
 KATEGORI
 *****************/
let prefKategori = "KATEGORI";
export const KATEGORI = {
  LOADING: `SET_${prefKategori}_LOADING`,
  LOADING_TESTIMONI: `SET_${prefKategori}_LOADING_TESTIMONI`,
  LOADING_POST: `SET_${prefKategori}_LOADING_POST`,
  IS_ERROR: `SET_${prefKategori}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefKategori}`,
  SUCCESS_TESTIMONI: `SUCCESS_${prefKategori}_TESTIMONI`,
  FAILED: `FAILED_${prefKategori}`,
  DETAIL: `DETAIL_${prefKategori}`,
  EDIT: `EDIT_${prefKategori}`,
};
/****************
 PIN
 *****************/
let prefPin = "PIN";
export const PIN = {
  SET_PIN_AKTIVASI: `SET_PIN_AKTIVASI`,
  SET_PIN_RO: `SET_PIN_RO`,

  LOADING_PIN_AKTIVASI: `LOADING_PIN_AKTIVASI`,
  LOADING_PIN_RO: `LOADING_PIN_RO`,

  SET_LOG_PIN: `SET_LOG_PIN`,
  LOADING_LOG_PIN: `LOADING_LOG_PIN`,

  SET_DETAIL_PIN: `SET_DETAIL_PIN`,
  LOADING_DETAIL_PIN: `LOADING_DETAIL_PIN`,

  LOADING_KATEGORI: `SET_${prefPin}_LOADING_KATEGORI`,
  KATEGORI: `SET_${prefPin}_KATEGORI`,

  LOADING: `SET_${prefPin}_LOADING`,
  LOADING_POST: `SET_${prefPin}_LOADING_POST`,
  IS_ERROR: `SET_${prefPin}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPin}`,
};
/****************
 MEMBER
 *****************/
let prefMember = "MEMBER";
export const MEMBER = {
  LOADING: `SET_${prefMember}_LOADING`,
  LOADING_DETAIL: `SET_${prefMember}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefMember}_LOADING_POST`,
  IS_ERROR: `SET_${prefMember}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefMember}`,
  APPROVAL: `APPROVAL_${prefMember}`,
  FAILED: `FAILED_${prefMember}`,
  DETAIL: `DETAIL_${prefMember}`,
  EDIT: `EDIT_${prefMember}`,
  LOADING_EXCEL: `SET_${prefMember}_LOADING_EXCEL`,
  EXCEL: `EXCEL_${prefMember}`,
};
/****************
 VOUCHER
 *****************/
let prefVoucher = "VOUCHER";
export const VOUCHER = {
  LOADING: `SET_${prefVoucher}_LOADING`,
  LOADING_DETAIL: `SET_${prefVoucher}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefVoucher}_LOADING_POST`,
  IS_ERROR: `SET_${prefVoucher}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefVoucher}`,
  FAILED: `FAILED_${prefVoucher}`,
  DETAIL: `DETAIL_${prefVoucher}`,
  EDIT: `EDIT_${prefVoucher}`,
};
/****************
 ALAMAT
 *****************/
let prefAlamat = "ALAMAT";
export const ALAMAT = {
  LOADING_DETAIL: `SET_${prefAlamat}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefAlamat}`,
};
/****************
 BANK
 *****************/
let prefBank = "BANK";
export const BANK = {
  LOADING_DETAIL: `SET_${prefBank}_LOADING_DETAIL`,
  DETAIL: `DETAIL_${prefBank}`,
};
/****************
 CONTENT
 *****************/
let prefContent = "CONTENT";
export const CONTENT = {
  LOADING: `SET_${prefContent}_LOADING`,
  LOADING_DETAIL: `SET_${prefContent}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefContent}_LOADING_POST`,
  IS_ERROR: `SET_${prefContent}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefContent}`,
  FAILED: `FAILED_${prefContent}`,
  DETAIL: `DETAIL_${prefContent}`,
  EDIT: `EDIT_${prefContent}`,
};

/****************
 USER_LIST
 *****************/
let prefUserList = "USER_LIST";
export const USER_LIST = {
  LOADING: `SET_${prefUserList}_LOADING`,
  LOADING_DETAIL: `SET_${prefUserList}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefUserList}_LOADING_POST`,
  IS_ERROR: `SET_${prefUserList}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefUserList}`,
  FAILED: `FAILED_${prefUserList}`,
  DETAIL: `DETAIL_${prefUserList}`,
  EDIT: `EDIT_${prefUserList}`,
};
/****************
 USER_LEVEL
 *****************/
let prefUserLevel = "USER_LEVEL";
export const USER_LEVEL = {
  LOADING: `SET_${prefUserLevel}_LOADING`,
  LOADING_DETAIL: `SET_${prefUserLevel}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefUserLevel}_LOADING_POST`,
  IS_ERROR: `SET_${prefUserLevel}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefUserLevel}`,
  FAILED: `FAILED_${prefUserLevel}`,
  DETAIL: `DETAIL_${prefUserLevel}`,
  EDIT: `EDIT_${prefUserLevel}`,
};
/****************
 LAPORAN PENJUALAN
 *****************/
let prefPenjualan = "PENJUALAN";
export const PENJUALAN = {
  LOADING: `SET_${prefPenjualan}_LOADING`,
  LOADING_DETAIL: `SET_${prefPenjualan}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefPenjualan}_LOADING_POST`,
  IS_ERROR: `SET_${prefPenjualan}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPenjualan}`,
  FAILED: `FAILED_${prefPenjualan}`,
  DETAIL: `DETAIL_${prefPenjualan}`,
  EDIT: `EDIT_${prefPenjualan}`,
};
/****************
 REPORT REDEEM
 *****************/
let prefReportRedeem = "REPORT_REDEEM";
export const REPORT_REDEEM = {
  LOADING: `SET_${prefReportRedeem}_LOADING`,
  LOADING_DETAIL: `SET_${prefReportRedeem}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefReportRedeem}_LOADING_POST`,
  IS_ERROR: `SET_${prefReportRedeem}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefReportRedeem}`,
  FAILED: `FAILED_${prefReportRedeem}`,
  DETAIL: `DETAIL_${prefReportRedeem}`,
  EDIT: `EDIT_${prefReportRedeem}`,
};
/****************
 REPORT_REWARD
 *****************/
let prefReportReward = "REPORT_REWARD";
export const REPORT_REWARD = {
  LOADING: `SET_${prefReportReward}_LOADING`,
  LOADING_DETAIL: `SET_${prefReportReward}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefReportReward}_LOADING_POST`,
  IS_ERROR: `SET_${prefReportReward}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefReportReward}`,
  FAILED: `FAILED_${prefReportReward}`,
  DETAIL: `DETAIL_${prefReportReward}`,
  EDIT: `EDIT_${prefReportReward}`,
};

/****************
 DEPOSIT
 *****************/
let prefDeposit = "DEPOSIT";
export const DEPOSIT = {
  LOADING: `SET_${prefDeposit}_LOADING_EXCEL`,
  LOADING_EXCEL: `SET_${prefDeposit}_LOADING`,
  LOADING_DETAIL: `SET_${prefDeposit}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefDeposit}_LOADING_POST`,
  IS_ERROR: `SET_${prefDeposit}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefDeposit}`,
  SUCCESS_EXCEL: `SUCCESS_${prefDeposit}_EXCEL`,
  FAILED: `FAILED_${prefDeposit}`,
  DETAIL: `DETAIL_${prefDeposit}`,
  EDIT: `EDIT_${prefDeposit}`,
};
/****************
 PENARIKAN
 *****************/
let prefPenarikan = "PENARIKAN";
export const PENARIKAN = {
  LOADING: `SET_${prefPenarikan}_LOADING`,
  LOADING_EXCEL: `SET_${prefPenarikan}_LOADING_EXCEL`,
  LOADING_DETAIL: `SET_${prefPenarikan}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefPenarikan}_LOADING_POST`,
  IS_ERROR: `SET_${prefPenarikan}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefPenarikan}`,
  SUCCESS_EXCEL: `SUCCESS_${prefPenarikan}_EXCEL`,
  FAILED: `FAILED_${prefPenarikan}`,
  DETAIL: `DETAIL_${prefPenarikan}`,
  EDIT: `EDIT_${prefPenarikan}`,
};
/****************
 REPORT_BARANG
 *****************/
let prefReportBarang = "REPORT_BARANG";
export const REPORT_BARANG = {
  LOADING: `SET_${prefReportBarang}_LOADING`,
  LOADING_DETAIL: `SET_${prefReportBarang}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefReportBarang}_LOADING_POST`,
  IS_ERROR: `SET_${prefReportBarang}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefReportBarang}`,
  FAILED: `FAILED_${prefReportBarang}`,
  DETAIL: `DETAIL_${prefReportBarang}`,
  EDIT: `EDIT_${prefReportBarang}`,
  EXCEL: `EXCEL_${prefReportBarang}`,
  LOADING_EXCEL: `SET_${prefReportBarang}_LOADING_EXCEL`,
  DETAIL_EXCEL: `DETAIL_EXCEL_${prefReportBarang}`,
  LOADING_DETAIL_EXCEL: `SET_${prefReportBarang}_LOADING_DETAIL_EXCEL`,
};
/****************
 BONUS
 *****************/
let prefBonus = "BONUS";
export const BONUS = {
  LOADING: `SET_${prefBonus}_LOADING`,
  LOADING_EXCEL: `SET_${prefBonus}_LOADING_EXCEL`,
  LOADING_DETAIL: `SET_${prefBonus}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefBonus}_LOADING_POST`,
  IS_ERROR: `SET_${prefBonus}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefBonus}`,
  SUCCESS_EXCEL: `SUCCESS_${prefBonus}_EXCEL`,
  FAILED: `FAILED_${prefBonus}`,
  DETAIL: `DETAIL_${prefBonus}`,
  EDIT: `EDIT_${prefBonus}`,
};
/****************
 SALDO
 *****************/
let prefSaldo = "SALDO";
export const SALDO = {
  LOADING: `SET_${prefSaldo}_LOADING`,
  LOADING_DETAIL: `SET_${prefSaldo}_LOADING_DETAIL`,
  LOADING_POST: `SET_${prefSaldo}_LOADING_POST`,
  IS_ERROR: `SET_${prefSaldo}_IS_ERROR`,
  SUCCESS: `SUCCESS_${prefSaldo}`,
  FAILED: `FAILED_${prefSaldo}`,
  DETAIL: `DETAIL_${prefSaldo}`,
  EDIT: `EDIT_${prefSaldo}`,
  EXCEL: `EXCEL_${prefSaldo}`,
  LOADING_EXCEL: `SET_${prefSaldo}_LOADING_EXCEL`,
};
/****************
 SETTING
 *****************/
let generalSetting = "GENERAL_SETTING";
export const GENERAL = {
  LOADING: `SET_${generalSetting}_LOADING`,
  LOADING_DETAIL: `SET_${generalSetting}_LOADING_DETAIL`,
  LOADING_POST: `SET_${generalSetting}_LOADING_POST`,
  IS_ERROR: `SET_${generalSetting}_IS_ERROR`,
  SUCCESS: `SUCCESS_${generalSetting}`,
  FAILED: `FAILED_${generalSetting}`,
  DETAIL: `DETAIL_${generalSetting}`,
  EDIT: `EDIT_${generalSetting}`,
  PLAFON: `PLAFON_${generalSetting}`,
  KARIR: `KARIR_${generalSetting}`,
  LANDING: `LANDING_${generalSetting}`,
};

let bonusSetting = "BONUS_SETTING";
export const BONUS_SETTING = {
  LOADING: `SET_${bonusSetting}_LOADING`,
  IS_ERROR: `SET_${bonusSetting}_IS_ERROR`,
  BONUS: `BONUS_${bonusSetting}`,
  BONUS_RO: `BONUS_RO_${bonusSetting}`,
  FAILED: `FAILED_${bonusSetting}`,
  DETAIL: `DETAIL_${bonusSetting}`,
  EDIT: `EDIT_${bonusSetting}`,
};
/****************
 POIN_KELIPATAN_RO
 *****************/
let poinKelipatanRoSetting = "POIN_KELIPATAN_RO";
export const POIN_KELIPATAN_RO = {
  LOADING: `SET_${poinKelipatanRoSetting}_LOADING`,
  IS_ERROR: `SET_${poinKelipatanRoSetting}_IS_ERROR`,
  SUCCESS: `BONUS_${poinKelipatanRoSetting}_SUCCESS`,
  FAILED: `FAILED_${poinKelipatanRoSetting}`,
  EDIT: `EDIT_${poinKelipatanRoSetting}`,
};
/****************
 KONFIGURASI_STOCKIST
 *****************/
let konfigurasiStockist = "KONFIGURASI_STOCKIST";
export const KONFIGURASI_STOCKIST = {
  LOADING: `SET_${konfigurasiStockist}_LOADING`,
  IS_ERROR: `SET_${konfigurasiStockist}_IS_ERROR`,
  SUCCESS: `BONUS_${konfigurasiStockist}_SUCCESS`,
  FAILED: `FAILED_${konfigurasiStockist}`,
  EDIT: `EDIT_${konfigurasiStockist}`,
};

/****************
 KURIR
 *****************/
let kurir = "KURIR";
export const KURIR = {
  LOADING: `SET_${kurir}_LOADING`,
  IS_ERROR: `SET_${kurir}_IS_ERROR`,
  SUCCESS: `SUCCESS_${kurir}`,
  KECAMATAN: `KECAMATAN_${kurir}`,
  KOTA: `KOTA_${kurir}`,
  PROVINSI: `PROVINSI_${kurir}`,
  FAILED: `FAILED_${kurir}`,
};
/****************
 KURIR
 *****************/
let mbank = "BANKS";
export const BANKS = {
  LOADING: `SET_${mbank}_LOADING`,
  IS_ERROR: `SET_${mbank}_IS_ERROR`,
  SUCCESS: `SUCCESS_${mbank}`,
  LISTBANK: `LISTBANK_${mbank}`,
  FAILED: `FAILED_${mbank}`,
};

/****************
 CLAIM REWARD
 *****************/
let claim_reward = "claim_reward";
export const CLAIM = {
  LOADING: `SET_${claim_reward}_LOADING`,
  IS_ERROR: `SET_${claim_reward}_IS_ERROR`,
  SUCCESS: `SUCCESS_${claim_reward}`,
  LISTBANK: `LISTBANK_${claim_reward}`,
  FAILED: `FAILED_${claim_reward}`,
};
/****************
 CLAIM REWARD
 *****************/
let PPOB_const = "PPOB";
export const PPOB = {
  LOADING: `SET_${PPOB_const}_LOADING`,
  IS_ERROR: `SET_${PPOB_const}_IS_ERROR`,
  SUCCESS: `SUCCESS_${PPOB_const}`,
  LISTBANK: `LISTBANK_${PPOB_const}`,
  FAILED: `FAILED_${PPOB_const}`,
  PRODUK: `PRODUK_${PPOB_const}`,
  OPERATOR: `OPERATOR_${PPOB_const}`,
  KATEGORI: `KATEGORI_${PPOB_const}`,
};
