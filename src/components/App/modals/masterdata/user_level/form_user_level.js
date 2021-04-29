import React, { Component } from "react";
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import Switch from "react-switch";
import { ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { ToastQ } from "../../../../../helper";
import {
  postUserLevel,
  putUserLevel,
} from "../../../../../redux/actions/masterdata/user_level.action";
import Preloader from "../../../../../Preloader";

class FormUserLevel extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeToggle = this.handleChangeToggle.bind(this);
    this.state = {
      menu: [
        {
          id: 100,
          label: "member",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-address-book-o",
          sub: [
            {
              id: 101,
              label: "daftar member",
              path: "/member/member-list",
              parent: "member",
              isChecked: false,
            },
            {
              id: 102,
              label: "approval ktp member",
              path: "/member/approval-ktp",
              parent: "member",
              isChecked: false,
            },
          ],
        },
        {
          id: 200,
          label: "stockist",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-tasks",
          sub: [
            {
              id: 201,
              label: "pin aktivasi",
              path: "/stockist/pin-aktivasi",
              parent: "stockist",
              isChecked: false,
            },
            {
              id: 202,
              label: "pin ro",
              path: "/stockist/pin-ro",
              parent: "stockist",
              isChecked: false,
            },
          ],
        },
        {
          id: 300,
          label: "order",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-shopping-basket",
          sub: [
            {
              id: 301,
              label: "order paket",
              path: "/order/paket",
              parent: "order",
              isChecked: false,
            },
            {
              id: 302,
              label: "redeem poin",
              path: "/order/redeem-poin",
              parent: "order",
              isChecked: false,
            },
            {
              id: 303,
              label: "claim reward",
              path: "/order/claim-reward",
              parent: "order",
              isChecked: false,
            },
          ],
        },
        {
          id: 400,
          label: "ewallet",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-google-wallet",
          sub: [
            {
              id: 401,
              label: "deposit",
              path: "/ewallet/deposit",
              parent: "ewallet",
              isChecked: false,
            },
            {
              id: 402,
              label: "penarikan",
              path: "/ewallet/penarikan",
              parent: "ewallet",
              isChecked: false,
            },
            {
              id: 403,
              label: "bonus",
              path: "/ewallet/bonus",
              parent: "ewallet",
              isChecked: false,
            },
          ],
        },
        {
          id: 500,
          label: "manjamen-paket",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-folder-o",
          sub: [
            {
              id: 501,
              label: "paket",
              path: "/manajemen-paket/paket",
              parent: "manjamen-paket",
              isChecked: false,
            },
            {
              id: 502,
              label: "barang",
              path: "/manajemen-paket/barang",
              parent: "manjamen-paket",
              isChecked: false,
            },
            {
              id: 503,
              label: "redeem",
              path: "/manajemen-paket/redeem",
              parent: "manjamen-paket",
              isChecked: false,
            },
            {
              id: 504,
              label: "reward",
              path: "/manajemen-paket/reward",
              parent: "manjamen-paket",
              isChecked: false,
            },
          ],
        },
        {
          id: 600,
          label: "manjamen-konten",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-list",
          sub: [
            {
              id: 601,
              label: "berita",
              path: "/manajemen-konten/berita",
              parent: "manjamen-konten",
              isChecked: false,
            },
            {
              id: 602,
              label: "testimoni",
              path: "/manajemen-konten/testimoni",
              parent: "manjamen-konten",
              isChecked: false,
            },
          ],
        },
        {
          id: 700,
          label: "voucher",
          path: "/voucher",
          isChecked: false,
          isToggle: false,
          sub: undefined,
          icons: "fa fa-code",
        },
        {
          id: 800,
          label: "laporan",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-file-text",
          sub: [
            {
              id: 801,
              label: "transaksi member",
              path: "/laporan/transaksi-member",
              parent: "laporan",
              isChecked: false,
            },
            {
              id: 802,
              label: "penjualan paket",
              path: "/laporan/penjualan-paket",
              parent: "laporan",
              isChecked: false,
            },
          ],
        },
        {
          id: 900,
          label: "manajemen-user",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-user",
          sub: [
            {
              id: 901,
              label: "daftar user",
              path: "/manajemen-user/user-list",
              parent: "manajemen-user",
              isChecked: false,
            },
            {
              id: 902,
              label: "level user",
              path: "/manajemen-user/user-level",
              parent: "manajemen-user",
              isChecked: false,
            },
          ],
        },
        {
          id: 1000,
          label: "pengaturan",
          path: "",
          isChecked: false,
          isToggle: false,
          icons: "fa fa-cogs",
          sub: [
            {
              id: 1001,
              label: "umum",
              path: "/pengaturan/umum",
              parent: "pengaturan",
              isChecked: false,
            },
            {
              id: 1002,
              label: "website",
              path: "/pengaturan/website",
              parent: "pengaturan",
              isChecked: false,
            },
            {
              id: 1003,
              label: "ppob",
              path: "/pengaturan/ppob",
              parent: "pengaturan",
              isChecked: false,
            },
            {
              id: 1004,
              label: "bank",
              path: "/pengaturan/bank",
              parent: "pengaturan",
              isChecked: false,
            },
          ],
        },
      ],
      lvl: "",
      checked: false,
    };
  }

  getProps(param) {
    if (param.detail.id !== "") {
      //   this.setState({ lvl: param.detail.lvl, menu: param.detail.access });
      this.setState({ lvl: param.detail.lvl, menu: this.state.menu });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.getProps(nextProps);
  }
  componentWillMount() {
    this.getProps(this.props);
  }
  toggle(e) {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  }
  handleAllChecked(event, param) {
    let menu = this.state.menu;
    menu.forEach((val) => {
      if (param === val.id) {
        val.isChecked = event;
      }
      if (val.sub !== undefined) {
        val.sub.forEach((row) => {
          if (param === val.id || param === row.id) {
            row.isChecked = event;
          }
          if (row.sub !== undefined) {
            row.sub.forEach((res) => {
              if (param === val.id || param === row.id || param === res.id) {
                res.isChecked = event;
              }
            });
          }
        });
      }
    });
    this.setState({ menu: menu });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleChangeToggle(e, val) {
    this.setState({ checked: val });
  }
  handleSubmit(e) {
    e.preventDefault();
    let parseData = {};
    parseData["level"] = this.state.lvl;
    parseData["access_level"] = JSON.stringify(this.state.menu);
    if (parseData["level"] === "" || parseData["level"] === undefined) {
      ToastQ.fire({
        icon: "error",
        title: `silahkan beri nama untuk akses pengguna ini`,
      });
      return;
    }
    if (this.props.detail.id === "") {
      this.props.dispatch(postUserLevel(parseData));
    } else {
      this.props.dispatch(putUserLevel(parseData, this.props.detail.id));
    }
  }
  render() {
    const { menu } = this.state;
    console.log(menu);
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "formUserLevel"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>
          {this.props.detail.id === "" ? "Tambah" : "Ubah"} Akses Pengguna
        </ModalHeader>
        {this.props.isLoadingPost ? <Preloader /> : null}
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label> Nama Akses </label>
                <input
                  type="text"
                  className="form-control"
                  name="lvl"
                  value={this.state.lvl}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
            </div>

            {menu.map((val, key) => {
              return val.sub === undefined ? (
                <div style={{ zoom: "80%" }} className="col-md-12" key={key}>
                  <div className="form-group">
                    <label htmlFor="">
                      <b style={{ letterSpacing: "2px" }}>
                        {val.label.replace("_", " ").toUpperCase()}
                      </b>
                    </label>
                    <br />
                    <Switch
                      onChange={(e) => this.handleAllChecked(e, val.id)}
                      checked={val.isChecked}
                    />
                  </div>
                  <hr />
                </div>
              ) : (
                <div style={{ zoom: "80%" }} className="col-md-12" key={key}>
                  <div className="form-group">
                    <label htmlFor="">
                      <b style={{ letterSpacing: "2px" }}>
                        {val.label.replace("_", " ").toUpperCase()}
                      </b>
                    </label>
                    <br />
                    <Switch
                      onChange={(e) => this.handleAllChecked(e, val.id)}
                      checked={val.isChecked}
                    />
                  </div>
                  <div className="row">
                    {val.sub.map((row, idx) => {
                      return (
                        <div
                          className={`${
                            row.sub !== undefined ? "col-md-12" : "col-md-3"
                          }`}
                          key={idx}
                        >
                          <div className="form-group">
                            <label htmlFor="">
                              <b
                                style={{
                                  color: "#D4AF37",
                                  letterSpacing: "2px",
                                }}
                              >
                                {row.label.replace("_", " ").toUpperCase()}
                              </b>
                            </label>
                            <br />
                            <Switch
                              onChange={(e) => this.handleAllChecked(e, row.id)}
                              checked={row.isChecked}
                            />
                          </div>
                          <div className="row">
                            {(() => {
                              let child = [];
                              if (row.sub !== undefined) {
                                row.sub.forEach((res, i) => {
                                  child.push(
                                    <div className="col-md-3" key={i}>
                                      <div className="form-group">
                                        <label htmlFor="">
                                          <b
                                            style={{
                                              color: "orange",
                                              letterSpacing: "2px",
                                            }}
                                          >
                                            {res.label
                                              .replace("_", " ")
                                              .toUpperCase()}
                                          </b>
                                        </label>
                                        <br />
                                        <Switch
                                          onChange={(e) =>
                                            this.handleAllChecked(e, res.id)
                                          }
                                          checked={res.isChecked}
                                        />
                                      </div>
                                    </div>
                                  );
                                });
                              }
                              return child;
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="form-group" style={{ textAlign: "right" }}>
            <button
              style={{ color: "white" }}
              type="button"
              className="btn btn-warning mb-2 mr-2"
              onClick={this.toggle}
            >
              <i className="ti-close" /> Keluar
            </button>
            <button
              type="submit"
              className="btn btn-primary mb-2 mr-2"
              onClick={this.handleSubmit}
            >
              <i className="ti-save" /> Simpan
            </button>
          </div>
        </ModalFooter>
      </WrapperModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
    isLoadingPost: state.userLevelReducer.isLoadingPost,
    isError: state.userLevelReducer.isError,
  };
};

export default connect(mapStateToProps)(FormUserLevel);
