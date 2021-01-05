import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {paketReducer} from "./paket/paket.reducer";
import {barangReducer} from "./paket/barang.reducer";
import {kategoriReducer} from "./kategori/kategori.reducer";
import {pinReducer} from "./paket/pin.reducer";
import {memberReducer} from "./masterdata/member.reducer";
import {alamatReducer} from "./masterdata/alamat.reducer";
import {bankReducer} from "./masterdata/bank.reducer";
import {contentReducer} from "./konten/konten.reducer";
import {userListReducer} from "./masterdata/user_list.reducer";
import {userLevelReducer} from "./masterdata/user_level.reducer";

export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    paketReducer,
    barangReducer,
    pinReducer,
    memberReducer,
    alamatReducer,
    bankReducer,
    userListReducer,
    userLevelReducer,
    kategoriReducer,
    contentReducer,
    auth: authReducer,
    errors : errorsReducer
});