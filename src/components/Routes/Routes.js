import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import NotFound from '../common/notfound'

import Login from '../App/Auth/Login/Login';
import Dashboard from '../App/Dashboard/Dashboard';
import Paket from '../App/paket/indexPaket';
import Barang from '../App/paket/indexBarang';
import Pin from '../App/paket/indexPin';
import Member from '../App/masterdata/indexMember';
import Berita from '../App/konten/indexBerita';

const Routes = (
    <div>
        <Switch>
            <Route path="/login" exact strict component={Login} />
           
            {/* DASHBOARD SECTION START */}
            <PrivateRoute path="/" exact strict component={Dashboard} />
            {/* DASHBOARD SECTION END */}
            {/* PAKET SECTION START */}
            <PrivateRoute path="/paket" exact strict component={Paket} />
            <PrivateRoute path="/barang" exact strict component={Barang} />
            <PrivateRoute path="/pin" exact strict component={Pin} />
            {/* PAKET SECTION END */}
            {/* MASTERDATA SECTION START */}
            <PrivateRoute path="/member" exact strict component={Member} />
            {/* MASTERDATA SECTION END */}
            {/* MANAGEMENT CONTENT SECTION START */}
            <PrivateRoute path="/berita" exact strict component={Berita} />
            {/* MANAGEMENT CONTENT SECTION END */}
            <Route component={NotFound}/>

        </Switch>
    </div>
)

export default Routes;