import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";
import NotFound from "../common/notfound";

import Login from "../App/Auth/Login/Login";
import Dashboard from "../App/Dashboard/Dashboard";
import Paket from "../App/paket/indexPaket";
import Barang from "../App/paket/indexBarang";
import BarangRedeem from "../App/paket/indexBarangRedeem";
import BarangReward from "../App/paket/indexBarangReward";
import PinAktivasi from "../App/stockist/pin-aktivasi";
import PinRo from "../App/stockist/pin-ro";
import Member from "../App/masterdata/member";
import Member_approval from "../App/masterdata/member_approval";
import Voucher from "../App/masterdata/voucher/indexVoucher";
import UserList from "../App/masterdata/indexUserList";
import UserLevel from "../App/masterdata/indexUserLevel";
import Berita from "../App/konten/indexBerita";
import Testimoni from "../App/konten/indexTestimoni";
import Penjualan from "../App/order";
import ReportRedeem from "../App/order/redeem/report_redeem";
import ReportReward from "../App/order/reward/indexReportReward";
import ReportBarang from "../App/laporan/indexReportBarang";
import Whatsapp from "../App/laporan/whatsapp";
import Claim from "../App/order/claim";
import Bonus from "../App/laporan/indexBonus";
import Deposit from "../App/ewallet/indexDeposit";
import Penarikan from "../App/ewallet/indexPenarikan";
import Saldo from "../App/laporan/indexSaldo";
import Setting from "../App/setting/umum";
import Website from "../App/setting/website";
import Bank from "../App/setting/bank";
import Ppob from "../App/setting/ppob";
import PrintLaporanPenjualan from "../App/print/print_laporan_penjualan";

const Routes = (
  <div>
    <Switch>
      <Route path="/login" exact strict component={Login} />

      {/* DASHBOARD SECTION START */}
      <PrivateRoute path="/" exact strict component={Dashboard} />
      {/* DASHBOARD SECTION END */}
      {/* PAKET SECTION START */}
      <PrivateRoute
        path="/manajemen-paket/paket"
        exact
        strict
        component={Paket}
      />
      <PrivateRoute
        path="/manajemen-paket/barang"
        exact
        strict
        component={Barang}
      />
      <PrivateRoute
        path="/manajemen-paket/redeem"
        exact
        strict
        component={BarangRedeem}
      />
      <PrivateRoute
        path="/manajemen-paket/reward"
        exact
        strict
        component={BarangReward}
      />
      <PrivateRoute
        path="/stockist/pin-aktivasi"
        exact
        strict
        component={PinAktivasi}
      />
      <PrivateRoute path="/stockist/pin-ro" exact strict component={PinRo} />
      {/* PAKET SECTION END */}
      {/* MASTERDATA SECTION START */}
      <PrivateRoute
        path="/manajemen-user/user-list"
        exact
        strict
        component={UserList}
      />
      <PrivateRoute
        path="/manajemen-user/user-level"
        exact
        strict
        component={UserLevel}
      />
      {/* MASTERDATA SECTION END */}
      {/* MANAGEMENT CONTENT SECTION START */}
      <PrivateRoute
        path="/member/member-list"
        exact
        strict
        component={Member}
      />
      <PrivateRoute
        path="/member/approval-ktp"
        exact
        strict
        component={Member_approval}
      />
      <PrivateRoute path="/voucher" exact strict component={Voucher} />
      <PrivateRoute
        path="/manajemen-konten/berita"
        exact
        strict
        component={Berita}
      />
      <PrivateRoute
        path="/manajemen-konten/testimoni"
        exact
        strict
        component={Testimoni}
      />
      {/* MANAGEMENT CONTENT SECTION END */}
      {/* LAPORAN SECTION START */}
      <PrivateRoute path="/ewallet/bonus" exact strict component={Bonus} />
      <PrivateRoute
        path="/report_redeem"
        exact
        strict
        component={ReportRedeem}
      />
      <PrivateRoute
        path="/report_reward"
        exact
        strict
        component={ReportReward}
      />
      <PrivateRoute
        path="/order/redeem-poin"
        exact
        strict
        component={ReportRedeem}
      />
      <PrivateRoute
        path="/laporan/penjualan-paket"
        exact
        strict
        component={ReportBarang}
      />
      <PrivateRoute path="/order/claim-reward" exact strict component={Claim} />
      {/* LAPORAN SECTION END */}
      {/* E-WALLET SECTION START */}
      <PrivateRoute path="/ewallet/deposit" exact strict component={Deposit} />
      <PrivateRoute
        path="/laporan/transaksi-member"
        exact
        strict
        component={Saldo}
      />
      <PrivateRoute
        path="/ewallet/penarikan"
        exact
        strict
        component={Penarikan}
      />
      <PrivateRoute path="/order/paket" exact strict component={Penjualan} />

      {/* E-WALLET SECTION END */}

      <PrivateRoute path="/pengaturan/umum" exact strict component={Setting} />
      <PrivateRoute
        path="/pengaturan/website"
        exact
        strict
        component={Website}
      />
      <PrivateRoute path="/pengaturan/bank" exact strict component={Bank} />
      <PrivateRoute path="/pengaturan/ppob" exact strict component={Ppob} />
      <PrivateRoute
        path="/laporan/whatsapp"
        exact
        strict
        component={Whatsapp}
      />

      {/* PRINT SECTION START */}
      <PrivateRoute
        path="/print_laporan_penjualan"
        exact
        strict
        component={PrintLaporanPenjualan}
      />
      {/* PRINT SECTION END */}
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Routes;
