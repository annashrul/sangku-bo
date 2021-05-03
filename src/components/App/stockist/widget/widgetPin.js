import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, {
  categoryPin,
  generateNo,
  toCurrency,
} from "../../../../helper";
import { ModalToggle, ModalType } from "../../../../redux/actions/modal.action";
import GeneratePin from "../../modals/pin/generate_pin";
import { getLogPin } from "../../../../redux/actions/paket/pin.action";
import moment from "moment";
import MutasiPin from "../../modals/pin/mutasiPin";
import Preloader from "../../../../Preloader";

class WidgetPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      section: 0,
      isModalMutasi: false,
      isModalForm: false,
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleMutasi = this.handleMutasi.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  componentWillUnmount() {
    this.setState({
      detail: {},
      isModalMutasi: false,
      isModalForm: false,
    });
  }
  componentWillMount() {
    this.props.dispatch(getLogPin(`page=1`));
  }

  handleAdd(e) {
    this.setState({ isModalForm: true });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("generatePin"));
  }
  handleMutasi(e, i) {
    this.setState({
      isModalMutasi: true,
      detail: {
        id: this.props.dataPin[i].id_paket,
        q: `jenis_transaksi=ORDER&id_paket=${this.props.dataPin[i].id_paket}`,
      },
    });
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
    this.props.dispatch(ModalType("mutasiPin"));
  }
  handlePage(page) {
    this.props.dispatch(getLogPin(`page=${page}`));
  }
  handleOnChange(event, i) {
    event.preventDefault();
    this.setState({ section: i });
    this.props.handleOnchange(i);
  }

  render() {
    // return props
    // (array)    this.props.dataKategori
    // (array)    this.props.dataPin
    // (string)   this.props.logo
    // (function) this.props.handleOnchange
    // (object)   this.props.pagin

    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const { total, per_page, current_page, data } = this.props.data;
    const { section } = this.state;
    console.log(this.state.section);
    return (
      <Layout page={"PIN"}>
        {this.props.isLoadingWidget ? <Preloader /> : null}
        <div className="row">
          <div className="col-2 col-xs-2 col-md-2">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={(e) => this.handleAdd(e)}
            >
              <i className="fa fa-plus" /> Generate PIN
            </button>
            <div className="card">
              <div className="card-body">
                <div className="nav flex-column nav-pills">
                  {this.props.dataKategori.length > 0
                    ? this.props.dataKategori.map((v, i) => {
                        return (
                          <a
                            className={
                              section === i ? "nav-link active" : "nav-link"
                            }
                            onClick={(event) => {
                              this.handleOnChange(event, i);
                            }}
                            style={{ marginBottom: "10px" }}
                            href="#"
                            key={i}
                          >
                            {v.title}
                          </a>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <div className="card">
              <div className="card-body">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead className="bg-light">
                      <tr>
                        <th
                          className={`text-black ${
                            section === 0
                              ? "gray"
                              : section === 1
                              ? "yellow1"
                              : "baseColor1"
                          }`}
                          style={columnStyle}
                        >
                          <div>
                            <img
                              style={{ height: "30px" }}
                              src={this.props.logo}
                              alt=""
                            />
                          </div>
                        </th>

                        <th
                          className="text-white text-right baseColor"
                          style={columnStyle}
                        >
                          Jumlah Awal
                        </th>
                        <th
                          className="text-white text-right baseColor"
                          style={columnStyle}
                        >
                          Total Beli
                        </th>
                        <th
                          className="text-white text-right baseColor"
                          style={columnStyle}
                        >
                          Total Diaktivasi
                        </th>
                        <th
                          className="text-white text-right baseColor"
                          style={columnStyle}
                        >
                          Belum Diaktivasi
                        </th>
                        <th
                          className="text-white text-right yellow"
                          style={columnStyle}
                        >
                          Sisa PIN
                        </th>
                        <th
                          className="text-white baseColor"
                          style={columnStyle}
                        >
                          #
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.dataPin.length > 0 ? (
                        this.props.dataPin.map((v, i) => {
                          return (
                            <tr
                              key={i}
                              style={{
                                backgroundColor:
                                  i % 2 === 0
                                    ? "rgb(231,230,230)"
                                    : "rgb(217,225,242)",
                              }}
                            >
                              <td style={columnStyle} className="text-left">
                                {v.paket}
                              </td>
                              <td
                                style={columnStyle}
                                className="text-right text-danger"
                              >
                                {toCurrency(parseInt(v.jumlah_awal, 10))}
                              </td>
                              <td
                                style={columnStyle}
                                className="text-right text-danger"
                              >
                                {toCurrency(parseInt(v.total_beli, 10))}
                              </td>
                              <td
                                style={columnStyle}
                                className="text-right text-danger"
                              >
                                {toCurrency(parseInt(v.total_aktivasi, 10))}
                              </td>
                              <td
                                style={columnStyle}
                                className="text-right text-danger"
                              >
                                {toCurrency(
                                  parseInt(v.total_belum_aktivasi, 10)
                                )}
                              </td>
                              <td
                                style={columnStyle}
                                className="text-right text-danger"
                              >
                                {toCurrency(parseInt(v.sisa, 10))}
                              </td>
                              <td style={columnStyle}>
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={(e) => this.handleMutasi(e, i)}
                                >
                                  <i className="fa fa-eye" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={7}>No Data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-2"></div>
        </div>
        <br />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">LOG GENERATE PIN</div>
              <div className="card-body">
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-hover">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-black" style={columnStyle}>
                          No
                        </th>
                        <th
                          className="text-black text-left"
                          style={columnStyle}
                        >
                          Operator
                        </th>
                        <th
                          className="text-black text-left"
                          style={columnStyle}
                        >
                          Paket
                        </th>
                        <th
                          className="text-black text-left"
                          style={columnStyle}
                        >
                          Kategori
                        </th>
                        <th
                          className="text-black text-right"
                          style={columnStyle}
                        >
                          Jumlah
                        </th>
                        <th className="text-black" style={columnStyle}>
                          Tipe
                        </th>
                        <th
                          className="text-black text-left"
                          style={columnStyle}
                        >
                          Waktu
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {typeof data === "object" ? (
                        data.length > 0 ? (
                          data.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td style={columnStyle}>
                                  {generateNo(i, current_page)}
                                </td>
                                <td style={columnStyle} className="text-left">
                                  {v.name}
                                </td>
                                <td style={columnStyle} className="text-left">
                                  {v.title}
                                </td>
                                <td style={columnStyle} className="text-left">
                                  {v.kategori}
                                </td>
                                <td
                                  style={columnStyle}
                                  className="text-right text-danger"
                                >
                                  {toCurrency(parseInt(v.jumlah, 10))}
                                </td>
                                <td style={columnStyle}>
                                  {categoryPin(v.type)}
                                </td>
                                <td style={columnStyle} className="text-left">
                                  {moment(v.created_at).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={7}>No Data</td>
                          </tr>
                        )
                      ) : (
                        <tr>
                          <td colSpan={7}>No Data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
                callback={this.handlePage.bind(this)}
              />
            </div>
          </div>
        </div>
        {this.state.isModalMutasi ? (
          <MutasiPin detail={this.state.detail} />
        ) : null}

        {this.state.isModalForm ? <GeneratePin /> : null}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    isLoading: state.pinReducer.isLoadingLog,
    data: state.pinReducer.dataLog,
  };
};

export default connect(mapStateToProps)(WidgetPin);
