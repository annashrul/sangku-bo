import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import { DateRangePicker } from "react-bootstrap-daterangepicker";
import Paginationq, {
  rangeDate,
  noImage,
  rmComma,
  ToastQ,
  toCurrency,
  toRp,
  toExcel,
  generateNo,
} from "../../../helper";
import { NOTIF_ALERT } from "../../../redux/actions/_constants";
import { ModalToggle, ModalType } from "../../../redux/actions/modal.action";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import FormPenarikanBonus from "../modals/laporan/form_penarikan_bonus";
import {
  getDeposit,
  postDeposit,
} from "../../../redux/actions/ewallet/deposit.action";
import Select from "react-select";
import * as Swal from "sweetalert2";
import {
  getExcelPenarikan,
  getPenarikan,
  postPenarikan,
} from "../../../redux/actions/ewallet/penarikan.action";

class IndexPenarikan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      any: "",
      dateFrom: moment(new Date()).format("yyyy-MM-DD"),
      dateTo: moment(new Date()).format("yyyy-MM-DD"),
      status_data: [
        { value: "kd_trx", label: "KODE TRX" },
        { value: "full_name", label: "NAMA" },
        { value: "status", label: "STATUS" },
      ],
      status: "",
      data: [],
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleApproval = this.handleApproval.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  handleValidate() {
    this.setState({
      isLoading: true,
    });
    let where = "perpage=10";
    let page = localStorage.getItem("pagePenarikan");
    let dateFrom = this.state.dateFrom;
    let dateTo = this.state.dateTo;
    let status = this.state.status;
    let any = this.state.any;
    localStorage.setItem("dateFromPenarikan", `${dateFrom}`);
    localStorage.setItem("dateToPenarikan", `${dateTo}`);
    if (page !== null && page !== undefined && page !== "") {
      where += `&page=${page}`;
    } else {
      where += `&page=1`;
    }
    if (dateFrom !== null && dateFrom !== undefined && dateFrom !== "") {
      where += `&datefrom=${dateFrom}&dateto=${dateTo}`;
    }
    if (status !== null && status !== undefined && status !== "") {
      where += `&searchby=${status}`;
    }
    if (any !== null && any !== undefined && any !== "") {
      where += `&q=${any}`;
    }
    // console.log(where);
    return where;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentWillMount() {
    // let where=this.handleValidate();
    this.props.dispatch(
      getPenarikan(
        `page=1&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`
      )
    );
  }

  handleSearch(e) {
    e.preventDefault();
    // this.state.isLoading=true;
    let where = this.handleValidate();
    this.props.dispatch(getPenarikan(where));
    // this.state.isLoading=false;
  }
  handlePage(num) {
    localStorage.setItem("pagePenarikan", num);
    let where = this.handleValidate();
    this.props.dispatch(getPenarikan(where));
  }
  handleChangeStatus(val) {
    this.setState({
      status: val.value,
    });
  }
  handleEvent = (event, picker) => {
    event.preventDefault();
    const from = moment(picker.startDate._d).format("YYYY-MM-DD");
    const to = moment(picker.endDate._d).format("YYYY-MM-DD");
    this.setState({
      dateFrom: from,
      dateTo: to,
    });
  };

  handleApproval(e, id, status) {
    // console.log(btoa(id));
    e.preventDefault();
    Swal.fire({
      title: "Perhatian !!!",
      text: `anda yakin akan ${
        status === 1 ? "menerima" : "membatalkan"
      } penarikan ini ??`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Oke, ${
        status === 1 ? "terima" : "batalkan"
      } sekarang!`,
      cancelButtonText: "keluar",
    }).then((result) => {
      if (result.value) {
        let parsedata = { status: status };
        // let where = this.handleValidate();
        this.props.dispatch(postPenarikan(parsedata, btoa(id)));
      }
    });
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
        console.log(props.dataExcel.data);
        props.dataExcel.data.map((v, i) => {
          content.push([
            v.kd_trx,
            v.full_name,
            v.bank_name,
            v.acc_name,
            v.acc_no,
            parseInt(v.charge, 10),
            parseInt(v.bank_charge, 10),

            parseInt(v.amount, 10),
            v.status === 0 ? "PENDING" : v.status === 1 ? "SUCCESS" : "GAGAL",
          ]);
        });
        toExcel(
          "LAPORAN PENARIKAN",
          `PERIODE ${moment(this.state.dateFrom).format(
            "YYYY/MM/DD"
          )} - ${moment(this.state.dateTo).format("YYYY/MM/DD")}`,
          [
            "KODE TRX",
            "NAMA",
            "BANK",
            "ATAS NAMA",
            "NO REKENING",
            "ADMIN BANK",
            "BIAYA ADMIN",
            "JUMLAH",
            "STATUS",
          ],
          content
        );
      }
    }
  }
  printDocumentXLsx(e, param) {
    e.preventDefault();
    let where = this.handleValidate();
    this.props.dispatch(getExcelPenarikan(`perpage=${param}&${where}`));
  }

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const numStyle = {
      verticalAlign: "middle",
      textAlign: "right",
      whiteSpace: "nowrap",
    };
    // const data = this.state.data;
    let totAmount = 0;
    const {
      total,
      per_page,
      offset,
      to,
      last_page,
      current_page,
      from,
      data,
    } = this.props.data;
    // console.log("DATA",data);
    return (
      <Layout page={"Penarikan"}>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="dashboard-header-title mb-3">
              <h5 className="mb-0 font-weight-bold">Penarikan</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 box-margin">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-xs-12 col-md-10">
                    <div className="row">
                      <div className="col-6 col-xs-6 col-md-3">
                        <div className="form-group">
                          <label>Periode </label>
                          <DateRangePicker
                            autoUpdateInput={true}
                            showDropdowns={true}
                            style={{ display: "unset" }}
                            ranges={rangeDate}
                            alwaysShowCalendars={true}
                            onApply={this.handleEvent}
                          >
                            <input
                              type="text"
                              readOnly={true}
                              className="form-control"
                              value={`${this.state.dateFrom} to ${this.state.dateTo}`}
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                      <div className="col-6 col-xs-6 col-md-3">
                        <div className="form-group">
                          <label>Kolom</label>
                          <Select
                            options={this.state.status_data}
                            placeholder="Pilih"
                            onChange={this.handleChangeStatus}
                            value={this.state.status_data.find((op) => {
                              return op.value === this.state.status;
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-6 col-xs-6 col-md-3">
                        <div className="form-group">
                          <label>Cari</label>
                          <input
                            type="text"
                            className="form-control"
                            name="any"
                            placeholder={"cari disini"}
                            defaultValue={this.state.any}
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
                  <div className="col-2 col-xs-2 col-md-2">
                    <div className="form-group text-right">
                      <button
                        style={{ marginTop: "28px" }}
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => this.handleSearch(e)}
                      >
                        <i className="fa fa-search" />
                      </button>

                      <button
                        style={{ marginTop: "28px", marginLeft: "5px" }}
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
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover table-bordered">
                    <thead className="bg-light">
                      <tr>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          NO
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          #
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          KODE TRX
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          NAMA
                        </th>
                        <th
                          className="text-black"
                          colSpan="3"
                          style={columnStyle}
                        >
                          BANK
                        </th>
                        <th
                          className="text-black"
                          colSpan="2"
                          style={columnStyle}
                        >
                          biaya
                        </th>

                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          JUMLAH
                        </th>
                        <th
                          className="text-black"
                          rowSpan="2"
                          style={columnStyle}
                        >
                          STATUS
                        </th>
                      </tr>
                      <tr>
                        <th className="text-black" style={columnStyle}>
                          NAMA
                        </th>
                        <th className="text-black" style={columnStyle}>
                          AKUN
                        </th>
                        <th className="text-black" style={columnStyle}>
                          REKENING
                        </th>
                        <th className="text-black" style={columnStyle}>
                          ADMIN
                        </th>
                        <th className="text-black" style={columnStyle}>
                          BANK
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!this.props.isLoading ? (
                        typeof data === "object" ? (
                          data.length > 0 ? (
                            data.map((v, i) => {
                              totAmount = totAmount + parseInt(v.amount);
                              let badge = "";
                              let txt = "";
                              if (v.status === 0) {
                                badge = "btn-warning";
                                txt = "Pending";
                              }
                              if (v.status === 1) {
                                badge = "btn-success";
                                txt = "Success";
                              }
                              if (v.status === 2) {
                                badge = "btn-danger";
                                txt = "Cancel";
                              }

                              return (
                                <tr key={i}>
                                  <td style={columnStyle}>
                                    {generateNo(i, current_page)}
                                  </td>
                                  <td style={columnStyle}>
                                    <button
                                      style={{ marginRight: "5px" }}
                                      className={"btn btn-primary btn-sm"}
                                      disabled={
                                        v.status === 1 || v.status === 2
                                      }
                                      onClick={(e) =>
                                        this.handleApproval(e, v.id, 1)
                                      }
                                    >
                                      <i className={"fa fa-check"} />
                                    </button>
                                    <button
                                      style={{ marginRight: "5px" }}
                                      className={"btn btn-danger btn-sm"}
                                      disabled={
                                        v.status === 1 || v.status === 2
                                      }
                                      onClick={(e) =>
                                        this.handleApproval(e, v.id, 2)
                                      }
                                    >
                                      <i className={"fa fa-close"} />
                                    </button>
                                  </td>
                                  <td style={columnStyle}>{v.kd_trx}</td>
                                  <td style={columnStyle}>{v.full_name}</td>
                                  <td style={columnStyle}>{v.bank_name}</td>
                                  <td style={columnStyle}>{v.acc_name}</td>
                                  <td style={columnStyle}>{v.acc_no}</td>
                                  <td style={numStyle}>
                                    Rp{" "}
                                    {v.charge === null ||
                                    parseInt(v.charge) === 0
                                      ? 0
                                      : toCurrency(parseInt(v.charge))}{" "}
                                    .-
                                  </td>
                                  <td style={numStyle}>
                                    Rp{" "}
                                    {v.bank_charge === null ||
                                    parseInt(v.bank_charge) === 0
                                      ? 0
                                      : toCurrency(
                                          parseInt(v.bank_charge)
                                        )}{" "}
                                    .-
                                  </td>
                                  <td style={numStyle}>
                                    Rp{" "}
                                    {parseInt(v.amount) === 0
                                      ? 0
                                      : toCurrency(parseInt(v.amount))}{" "}
                                    .-
                                  </td>
                                  <td style={columnStyle}>
                                    <button className={`btn ${badge} btn-sm`}>
                                      {txt}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={11} style={columnStyle}>
                                <img src={NOTIF_ALERT.NO_DATA} />
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan={11} style={columnStyle}>
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
                                <td style={columnStyle}>
                                  {
                                    <Skeleton
                                      circle={true}
                                      height={40}
                                      width={40}
                                    />
                                  }
                                </td>
                                <td style={columnStyle}>
                                  <Skeleton height={30} width={30} />
                                </td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                                <td style={columnStyle}>{<Skeleton />}</td>
                              </tr>
                            );
                          }
                          return container;
                        })()
                      )}
                    </tbody>
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
        {/*{*/}
        {/*this.props.isOpen===true?<FormPenarikanBonus*/}
        {/*detail={this.state.detail}*/}
        {/*/>:null*/}
        {/*}*/}
        {/*<FormPaket/>*/}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.penarikanReducer.isLoading,
    isOpen: state.modalReducer,
    data: state.penarikanReducer.data,
    dataExcel: state.penarikanReducer.dataExcel,
    isLoadingExcel: state.penarikanReducer.isLoadingExcel,
  };
};

export default connect(mapStateToProps)(IndexPenarikan);
