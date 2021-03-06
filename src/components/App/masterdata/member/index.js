import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, {
  noImage,
  rangeDate,
  statusQ,
  toCurrency,
  toRp,
} from "helper";
import { NOTIF_ALERT } from "redux/actions/_constants";
import { ModalToggle, ModalType } from "redux/actions/modal.action";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import DetailAlamat from "../../modals/masterdata/member/detail_alamat";
import DetailTransaksi from "../../modals/masterdata/member/detail_transaksi";
import { getMember, putMember } from "redux/actions/masterdata/member.action";
import UncontrolledButtonDropdown from "reactstrap/es/UncontrolledButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import { getDetailAlamat } from "redux/actions/masterdata/alamat.action";
import { getDetailBank } from "redux/actions/masterdata/bank.action";
import * as Swal from "sweetalert2";
import { fetchKategori } from "../../../../redux/actions/kategori/kategori.action";
import Select from "react-select";
import { getExcelMember } from "../../../../redux/actions/masterdata/member.action";
import { generateNo, toExcel } from "../../../../helper";
import Membership from "../../../common/membership";
import JenjangKarir from "../../../common/jenjangKarir";
import FormMemberBank from "../../modals/masterdata/member/form_member_bank";
import DetailPinMember from "../../modals/masterdata/member/detail_pin_member";
import MutasiPin from "../../modals/pin/mutasiPin";

class IndexMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      searchBy: "full_name",
      searchByData: [
        { value: "full_name", label: "Nama" },
        { value: "referral_code", label: "User ID" },
        { value: "mobile_no", label: "Telepon" },
      ],
      membership: "",
      jenjangKarir: "",
      status: "",
      statusData: [
        { value: "-", label: "Semua" },
        { value: 0, label: "Tidak Aktif" },
        { value: 1, label: "Aktif" },
      ],
      isModalDetailPin: false,
      isModalMutasi: false,
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAlamat = this.handleAlamat.bind(this);
    this.handleBank = this.handleBank.bind(this);
    this.handleBankEdit = this.handleBankEdit.bind(this);
    this.handleDetailTrx = this.handleDetailTrx.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearchBy = this.handleSearchBy.bind(this);
    this.printDocumentXLsx = this.printDocumentXLsx.bind(this);
    this.handleKarir = this.handleKarir.bind(this);
    this.handleMembership = this.handleMembership.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleResetPin = this.handleResetPin.bind(this);
    this.handleMemberRename = this.handleMemberRename.bind(this);
    this.handleDetailPin = this.handleDetailPin.bind(this);
    this.handleMutasi = this.handleMutasi.bind(this);
  }
  componentWillUnmount() {
    this.setState({
      isModalDetailPin: false,
      isModalMutasi: false,
      detail: {},
    });
  }
  handleKarir(val) {
    this.setState({ jenjangKarir: val.label });
  }
  handleMembership(val) {
    this.setState({ membership: val.label });
  }
  handleStatus(val) {
    this.setState({ status: val.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataExcel.data !== this.props.dataExcel.data) {
      this.getExcel(this.props);
    }
  }
  getExcel(props) {
    if (props.dataExcel.data !== undefined) {
      if (props.dataExcel.data.length > 0) {
        let content = [];
        props.dataExcel.data.map((v, i) => {
          content.push([
            v.full_name,
            v.referral_code,
            v.membership,
            v.jenjang_karir,
            v.status === 0 ? "Tidak Aktif" : "Aktif",
            v.mobile_no,
            parseInt(v.saldo, 10),
            parseInt(v.total_payment, 10),
            parseInt(v.sponsor, 10),
            parseInt(v.pin),
            parseInt(v.left_pv, 10),
            parseInt(v.right_pv, 10),
            parseInt(v.left_reward_point, 10),
            parseInt(v.right_reward_point, 10),
            parseInt(v.plafon, 10),
            parseInt(v.point_ro, 10),
          ]);
        });
        toExcel(
          "LAPORAN MEMBER",
          `SEMUA PERIODE`,
          [
            "NAMA",
            "USER ID",
            "MEMBERSHIP",
            "JENJANG KARIR",
            "STATUS",
            "TELEPON",
            "SALDO",
            "PENARIKAN",
            "JUMLAH SPONSOR",
            "JUMLAH PIN",
            "PV KIRI",
            "PV KANAN",
            "REWARD KIRI",
            "REWARD KANAN",
            "PLAFON",
            "POIN RO",
          ],
          content
        );
      }
    }
  }
  printDocumentXLsx(e, param) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getExcelMember(`perpage=${param}&${where}`));
  }
  handleSearchBy(val) {
    // console.log(val.value);
    this.setState({
      searchBy: val.value,
    });
  }
  componentWillReceiveProps(nextProps) {
    let membership = [];
    if (nextProps.kategori.data !== undefined) {
      if (nextProps.kategori.data.length > 0) {
        nextProps.kategori.data.map((v, i) => {
          membership.push({ value: v.title, label: v.title });
        });
      } else {
        membership = [];
      }
      this.setState({ membership_data: membership });
    }
  }
  componentWillMount() {
    localStorage.removeItem("isAlamat");
    localStorage.removeItem("isBank");
    localStorage.removeItem("isDetail");
    this.props.dispatch(getMember(`page=1`));
    this.props.dispatch(fetchKategori(`membership`));
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleValidate() {
    let where = "";
    let page = localStorage.getItem("pageMember");
    let dateFrom = this.state.dateFrom;
    let dateTo = this.state.dateTo;
    let any = this.state.any;
    let searchBy = this.state.searchBy;
    let membership = this.state.membership;
    let status = this.state.status;
    let jenjang_karir = this.state.jenjangKarir;
    localStorage.setItem("dateFromMember", `${dateFrom}`);
    localStorage.setItem("dateToMember", `${dateTo}`);
    if (page !== null && page !== undefined && page !== "") {
      where += `page=${page}`;
    } else {
      where += "page=1";
    }
    if (dateFrom !== null && dateFrom !== undefined && dateFrom !== "") {
      where += `&datefrom=${dateFrom}&dateto=${dateTo}`;
    }
    if (searchBy !== null && searchBy !== undefined && searchBy !== "") {
      where += `&searchby=${searchBy}`;
    }
    if (
      jenjang_karir !== null &&
      jenjang_karir !== undefined &&
      jenjang_karir !== "" &&
      jenjang_karir !== "Semua"
    ) {
      where += `&karir=${jenjang_karir}`;
    }
    if (
      membership !== null &&
      membership !== undefined &&
      membership !== "" &&
      membership !== "Semua"
    ) {
      where += `&membership=${membership}`;
    }
    if (
      status !== null &&
      status !== undefined &&
      status !== "" &&
      status !== "-"
    ) {
      where += `&status=${status}`;
    }
    if (any !== null && any !== undefined && any !== "") {
      where += "&page=1";

      where += `&q=${any}`;
    }

    return where;
  }
  handlePage(pageNumber) {
    localStorage.setItem("pageMember", pageNumber);
    let where = this.handleValidate();
    this.props.dispatch(getMember(where));
  }
  handleEvent = (event, picker) => {
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
  };
  handleSearch(e) {
    e.preventDefault();
    let where = this.handleValidate();
    // console.log(where);
    this.props.dispatch(getMember(where));
  }
  handleBankEdit(e, par, name) {
    e.preventDefault();
    localStorage.setItem("isBankEdit", "true");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("formMemberBank"));
    this.setState({ detail: { id: par, member_name: name } });
    this.props.dispatch(getDetailBank(par));
  }
  handleBank(e, par) {
    e.preventDefault();
    localStorage.setItem("isBank", "true");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailBank"));
    this.setState({ detail: { idUser: par } });
    this.props.dispatch(getDetailBank(par));
  }
  handleAlamat(e, par) {
    e.preventDefault();
    localStorage.setItem("isAlamat", "true");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailAlamat"));
    this.props.dispatch(getDetailAlamat(par));
    // this.setState({detail:{idUser:par}});
  }
  handleDetailTrx(e, par) {
    e.preventDefault();
    localStorage.setItem("isDetail", "true");
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailTransaksi"));
    this.props.dispatch(getDetailAlamat(par));
    // this.setState({detail:{idUser:par}});
  }
  handleUpdate(e, id, nama, type, val) {
    e.preventDefault();
    if (type == "status") {
      const status = val;
      Swal.fire({
        title: "Perhatian !!!",
        html: `anda yakin akan ${
          status == 0 ? "Menonaktifkan" : "Mengaktifkan"
        } ${nama} ??`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Oke, ${status == 0 ? "Nonaktifkan" : "Aktifkan"}`,
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.value) {
          this.props.dispatch(putMember({ status: status }, id));
        }
      });
    } else if (type == "stokis") {
      Swal.fire({
        title: "Perhatian !!!",
        html: `anda yakin akan merubah keanggotaan member atas nama ${nama} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Ya!`,
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.value) {
          this.props.dispatch(
            putMember(
              {
                is_stockist: val,
              },
              id
            )
          );
        }
      });
    }
  }
  handleResetPin(e, id) {
    e.preventDefault();
    let proping = this.props;
    Swal.fire({
      title: "Reset PIN?",
      focusConfirm: true,
      html:
        '<input class="form-control form-control-lg font-18 py-4" id="pinModal" maxlength="6"" type="password" placeholder="Masukan 6 digit angka PIN baru" />' +
        '<small class="text-danger d-none" id="pinModalErr">Error</small>',
      type: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Reset!",
      allowOutsideClick: true,
      allowOutsideClick: false,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve(document.getElementById("pinModal").value);
        });
      },
      onOpen: function () {
        // $('#swal-input1').focus()
        document.getElementById("pinModal").focus();
      },
    })
      .then(function (result) {
        if (result.isConfirmed) {
          if (!result) return null;
          if (result.value === "") {
            return Swal.fire({
              title: "PIN tidak boleh kosong!",
              type: "danger",
            });
          } else if (String(result.value).length < 6) {
            return Swal.fire({
              title: "PIN tidak boleh kurang dari 6 digit!",
              type: "danger",
            });
          } else if (isNaN(String(result.value).replace(/[0-9]/g, ""))) {
            return Swal.fire({
              title: "PIN harus berupa angka saja!",
              type: "danger",
            });
          }
          // alert(JSON.stringify(result))
          proping.dispatch(putMember({ pin: result.value }, id));
        }
      })
      .catch(Swal.noop);
    //   inputValidator: (value) => {
    //     if (!value) {
    //       return 'You need to write something!'
    //     }
    //   }
  }
  handleMemberRename(e, id, name_old) {
    e.preventDefault();
    let proping = this.props;
    Swal.fire({
      title: "Ubah Nama Member",
      focusConfirm: true,
      html:
        '<input class="form-control form-control-lg font-18 py-4" id="nameModal" value="' +
        name_old +
        '" type="text" />',
      type: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Ubah!",
      allowOutsideClick: true,
      allowOutsideClick: false,
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve(document.getElementById("nameModal").value);
        });
      },
      onOpen: function () {
        // $('#swal-input1').focus()
        document.getElementById("nameModal").focus();
      },
    })
      .then(function (result) {
        if (result.isConfirmed) {
          if (!result) return null;
          if (result.value === "") {
            return Swal.fire({
              title: "Nama tidak boleh kosong!",
              type: "danger",
            });
          }
          // alert(JSON.stringify(result))
          proping.dispatch(putMember({ full_name: result.value }, id));
        }
      })
      .catch(Swal.noop);
    //   inputValidator: (value) => {
    //     if (!value) {
    //       return 'You need to write something!'
    //     }
    //   }
  }

  handleDetailPin(e, id) {
    e.preventDefault();
    this.setState({ isModalDetailPin: true, detail: { id: id } });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("detailPinMember"));
  }
  handleMutasi(e, id) {
    this.setState({
      isModalMutasi: true,
      detail: {
        id: id,
        q: `id_member=${id}`,
      },
    });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("mutasiPin"));
  }

  render() {
    const headStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numberStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    const { last_page, total, per_page, current_page, data } = this.props.data;

    let totSaldo = 0;
    let totPenarikan = 0;
    return (
      <Layout page={"Member"}>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="dashboard-header-title mb-3">
              <h5 className="mb-0 font-weight-bold">Member</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 box-margin">
            <div className="card">
              <div className="card-body">
                <div className="row" style={{ zoom: "85%" }}>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-12 col-xs-12 col-md-2">
                        <div className="form-group">
                          <label>Status</label>
                          <Select
                            options={this.state.statusData}
                            placeholder="Status"
                            onChange={this.handleStatus}
                            value={this.state.statusData.find((op) => {
                              return op.value === this.state.status;
                            })}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-xs-12 col-md-2">
                        <div className="form-group">
                          <label>Membership</label>
                          <Membership
                            handleChange={this.handleMembership}
                            id={"semua"}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xs-12 col-md-2">
                        <div className="form-group">
                          <label>Jenjang Karir</label>
                          <JenjangKarir
                            handleChange={this.handleKarir}
                            id={"semua"}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xs-12 col-md-2">
                        <div className="form-group">
                          <label htmlFor="">Kolom</label>
                          <Select
                            options={this.state.searchByData}
                            placeholder="Kolom"
                            onChange={this.handleSearchBy}
                            value={this.state.searchByData.find((op) => {
                              return op.value === this.state.searchBy;
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xs-12 col-md-4">
                        <div className="form-group">
                          <label>Tulis Pencarian Disini</label>
                          <input
                            type="text"
                            className="form-control"
                            name="any"
                            placeholder={"Tulis Pencarian Disini"}
                            value={this.state.any}
                            onChange={this.handleChange}
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                this.handleSearch(event);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-6 col-xs-6 col-md-2"
                    style={{ textAlign: "right" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <button
                            style={{ marginTop: "28px", marginRight: "5px" }}
                            className="btn btn-primary"
                            onClick={this.handleSearch}
                          >
                            <i className="fa fa-search" />
                          </button>
                          <button
                            style={{ marginTop: "28px" }}
                            className="btn btn-primary"
                            onClick={(e) =>
                              this.printDocumentXLsx(e, per_page * last_page)
                            }
                          >
                            {!this.props.isLoadingExcel ? (
                              <i className="fa fa-print" />
                            ) : (
                              <div
                                className="spinner-border  spinner-border-sm text-light"
                                role="status"
                              >
                                <span className="sr-only">Loading...</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover table-bordered">
                    <thead className="bg-light">
                      <tr>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          NO
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          #
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Auto WD
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Gambar
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Nama
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          USER ID
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Stokis
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Membership
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Karir
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Status
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Telepon
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Saldo
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Penarikan
                        </th>
                        <th
                          className="text-black"
                          colSpan="2"
                          style={headStyle}
                        >
                          Jumlah
                        </th>

                        <th
                          className="text-black"
                          colSpan="2"
                          style={headStyle}
                        >
                          PV
                        </th>
                        <th
                          className="text-black"
                          colSpan="2"
                          style={headStyle}
                        >
                          Reward
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Plafon
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={headStyle}
                        >
                          Poin
                          <br />
                          RO
                        </th>
                      </tr>
                      <tr>
                        <th className="text-black" style={headStyle}>
                          sponsor
                        </th>
                        <th className="text-black" style={headStyle}>
                          pin
                        </th>
                        <th className="text-black" style={headStyle}>
                          Kiri
                        </th>
                        <th className="text-black" style={headStyle}>
                          Kanan
                        </th>
                        <th className="text-black" style={headStyle}>
                          Kiri
                        </th>
                        <th className="text-black" style={headStyle}>
                          Kanan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!this.props.isLoading ? (
                        typeof data === "object" ? (
                          data.length > 0 ? (
                            data.map((v, i) => {
                              totSaldo = totSaldo + parseInt(v.saldo, 10);
                              totPenarikan =
                                totPenarikan + parseInt(v.total_payment, 10);
                              let stokisTxt = "";
                              let stokisCol = "";
                              let autoWDTxt = "";
                              let autoWDCol = "";
                              if (v.auto_wd === 0) {
                                autoWDTxt = "Tidak Aktif";
                                autoWDCol = "badge-danger";
                              } else {
                                autoWDTxt = "Aktif";
                                autoWDCol = "badge-success";
                              }
                              if (v.is_stockist === 0) {
                                stokisTxt = "Bukan Stokis";
                                stokisCol = "badge-danger";
                              } else if (v.is_stockist === 1) {
                                stokisTxt = "Master Stokis";
                                stokisCol = "badge-primary";
                              } else {
                                stokisTxt = "Stokis";
                                stokisCol = "badge-success";
                              }

                              return (
                                <tr
                                  key={i}
                                  style={{
                                    backgroundColor:
                                      i % 2 === 0 ? "#EEEEEE" : "white",
                                  }}
                                >
                                  <td style={headStyle}>
                                    {generateNo(i, current_page)}
                                  </td>
                                  <td style={headStyle}>
                                    <div className="btn-group">
                                      <UncontrolledButtonDropdown>
                                        <DropdownToggle caret>
                                          Aksi
                                        </DropdownToggle>
                                        <DropdownMenu>
                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleMutasi(e, v.id)
                                            }
                                          >
                                            Mutasi PIN
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleResetPin(e, v.id)
                                            }
                                          >
                                            Reset PIN
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleAlamat(e, v.id)
                                            }
                                          >
                                            Alamat
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleMemberRename(
                                                e,
                                                v.id,
                                                v.full_name
                                              )
                                            }
                                          >
                                            Edit Nama Member
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleBankEdit(
                                                e,
                                                v.id,
                                                v.full_name
                                              )
                                            }
                                          >
                                            Edit Bank
                                          </DropdownItem>

                                          <DropdownItem
                                            onClick={(e) =>
                                              this.handleUpdate(
                                                e,
                                                v.id,
                                                v.full_name,
                                                "status",
                                                v.status === 0 ? 1 : 0
                                              )
                                            }
                                          >
                                            {v.status === 0
                                              ? "Aktifkan"
                                              : "Non-aktifkan"}
                                          </DropdownItem>

                                          {v.is_stockist !== 1 ? (
                                            <DropdownItem
                                              onClick={(e) =>
                                                this.handleUpdate(
                                                  e,
                                                  v.id,
                                                  v.full_name,
                                                  "stokis",
                                                  1
                                                )
                                              }
                                            >
                                              Ubah Menjadi Master Stockis
                                            </DropdownItem>
                                          ) : (
                                            ""
                                          )}
                                          {v.is_stockist !== 2 ? (
                                            <DropdownItem
                                              onClick={(e) =>
                                                this.handleUpdate(
                                                  e,
                                                  v.id,
                                                  v.full_name,
                                                  "stokis",
                                                  2
                                                )
                                              }
                                            >
                                              Ubah Menjadi Stockis
                                            </DropdownItem>
                                          ) : (
                                            ""
                                          )}

                                          {v.is_stockist !== 0 ? (
                                            <DropdownItem
                                              onClick={(e) =>
                                                this.handleUpdate(
                                                  e,
                                                  v.id,
                                                  v.full_name,
                                                  "stokis",
                                                  0
                                                )
                                              }
                                            >
                                              Ubah Menjadi Member biasa/bukan
                                              stockis
                                            </DropdownItem>
                                          ) : (
                                            ""
                                          )}
                                        </DropdownMenu>
                                      </UncontrolledButtonDropdown>
                                    </div>
                                  </td>
                                  <td style={headStyle}>
                                    <span
                                      className={`badge ${autoWDCol}`}
                                      style={{ padding: "5px" }}
                                    >
                                      {autoWDTxt}
                                    </span>
                                  </td>
                                  <td style={headStyle}>
                                    <img
                                      style={{ width: "30px" }}
                                      src={v.picture}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `${noImage()}`;
                                      }}
                                      alt="member image"
                                    />
                                  </td>
                                  <td style={headStyle}>{v.full_name}</td>
                                  <td style={headStyle}>{v.referral_code}</td>
                                  <td style={headStyle}>
                                    <span
                                      className={`badge ${stokisCol}`}
                                      style={{ padding: "5px" }}
                                    >
                                      {stokisTxt}
                                    </span>
                                  </td>
                                  <td style={headStyle}>
                                    <img
                                      style={{ width: "30px" }}
                                      src={v.membership_badge}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `${noImage()}`;
                                      }}
                                      alt="member image"
                                    />
                                    <br />
                                    {v.membership}
                                  </td>
                                  <td style={headStyle}>
                                    <img
                                      style={{ width: "30px" }}
                                      src={v.jenjang_karir_badge}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `${noImage()}`;
                                      }}
                                      alt="member image"
                                    />
                                    <br />
                                    {v.jenjang_karir}
                                  </td>
                                  <td style={headStyle}>
                                    {v.status === 0 ? (
                                      <span
                                        className="badge badge-danger"
                                        style={{ padding: "5px" }}
                                      >
                                        Tidak Aktif
                                      </span>
                                    ) : (
                                      <span
                                        className="badge badge-success"
                                        style={{ padding: "5px" }}
                                      >
                                        Aktif
                                      </span>
                                    )}
                                  </td>
                                  <td style={headStyle}>{v.mobile_no}</td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    Rp
                                    {v.saldo === "0"
                                      ? 0
                                      : toCurrency(parseInt(v.saldo, 10))}
                                    .-
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    Rp
                                    {v.total_payment === "0"
                                      ? 0
                                      : toCurrency(
                                          parseInt(v.total_payment, 10)
                                        )}
                                    .-
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    {v.sponsor}
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                    onClick={(e) =>
                                      this.handleDetailPin(e, v.id)
                                    }
                                  >
                                    <u style={{ cursor: "pointer" }}>{v.pin}</u>
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    {v.left_pv}
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    {v.right_pv}
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    {v.left_reward_point}
                                  </td>
                                  <td
                                    style={numberStyle}
                                    className="text-danger"
                                  >
                                    {v.right_reward_point}
                                  </td>
                                  <td style={headStyle} className="text-danger">
                                    Rp
                                    {v.plafon === "0"
                                      ? 0
                                      : toCurrency(parseInt(v.plafon, 10))}
                                  </td>
                                  <td style={headStyle} className="text-danger">
                                    {v.point_ro}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={21} style={headStyle}>
                                <img src={NOTIF_ALERT.NO_DATA} />
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan={21} style={headStyle}>
                              <img src={NOTIF_ALERT.NO_DATA} />
                            </td>
                          </tr>
                        )
                      ) : (
                        (() => {
                          let container = [];
                          for (let x = 0; x < 10; x++) {
                            container.push(
                              <tr key={x}>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                                <td>{<Skeleton />}</td>
                              </tr>
                            );
                          }
                          return container;
                        })()
                      )}
                    </tbody>
                    {/* <tfoot style={{backgroundColor:"#EEEEEE"}}>
                                        <tr>
                                            <td colSpan={5}>TOTAL PERPAGE</td>
                                            <td style={numberStyle}>Rp {totSaldo===0?0:toCurrency(totSaldo)} .-</td>
                                            <td style={numberStyle}>Rp {totPenarikan===0?0:toCurrency(totPenarikan)} .-</td>
                                            <td colSpan={7}/>

                                        </tr>
                                        </tfoot> */}
                  </table>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    float: "right",
                  }}
                >
                  <Paginationq
                    current_page={current_page}
                    per_page={per_page}
                    total={total}
                    callback={this.handlePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {localStorage.isAlamat === "true" ? (
          <DetailAlamat detail={this.props.detailAlamat} />
        ) : null}
        {this.state.isModalDetailPin ? (
          <DetailPinMember detail={this.state.detail} />
        ) : null}
        {localStorage.isBankEdit === "true" ? (
          <FormMemberBank
            detail={this.state.detail}
            detailBank={this.props.detailBank}
            isLoadingDetail={this.props.isLoadingDetail}
          />
        ) : null}
        {localStorage.isDetail === "true" ? (
          <DetailTransaksi detail={this.props.detailAlamat} />
        ) : null}
        {this.state.isModalMutasi ? (
          <MutasiPin detail={this.state.detail} />
        ) : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.memberReducer.isLoading,
    isLoadingExcel: state.memberReducer.isLoadingExcel,
    isOpen: state.modalReducer,
    data: state.memberReducer.data,
    dataExcel: state.memberReducer.excel,
    detailAlamat: state.alamatReducer.data,
    detailBank: state.bankReducer.data,
    kategori: state.kategoriReducer.data,
    isLoadingDetail: state.bankReducer.isLoadingDetail,
  };
};

export default connect(mapStateToProps)(IndexMember);
