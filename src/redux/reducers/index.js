import { combineReducers } from 'redux';
import { modalReducer, modalTypeReducer } from './modal.reducer';
import { dashboardReducer } from './dashboard/dashboard.reducer'
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import {siteReducer} from './site.reducer';
import {paketReducer} from "./paket/paket.reducer";
import {barangReducer} from "./paket/barang.reducer";
import {kategoriReducer} from "./kategori/kategori.reducer";

export default combineReducers({
    modalReducer,
    modalTypeReducer,
    dashboardReducer,
    siteReducer,
    paketReducer,
    barangReducer,
    kategoriReducer,
    auth: authReducer,
    errors : errorsReducer
});