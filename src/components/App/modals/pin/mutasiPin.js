import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../_wrapper.modal";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ModalToggle } from "../../../../redux/actions/modal.action";
import Paginationq, {
  categoryPin,
  generateNo,
  ToastQ,
  toCurrency,
} from "../../../../helper";
import Select from "react-select";
import {
  generatePin,
  getDetailPin,
} from "../../../../redux/actions/paket/pin.action";
import { fetchPaket } from "../../../../redux/actions/paket/paket.action";
import moment from "moment";

class MutasiPin extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }

  getProps(props) {
    console.log(props);
  }
  componentWillMount() {
    this.getProps(this.props);
    this.props.dispatch(getDetailPin(`id_paket=${this.props.detail.id}`));
  }
  componentWillReceiveProps(nextProps) {
    this.getProps(nextProps);
  }

  toggle = (e) => {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };
  handlePage(page) {
    this.props.dispatch(
      getDetailPin(`id_paket=${this.props.detail.id}&page=${page}`)
    );
  }
  render() {
    const columnStyle = {
      verticalAlign: "middle",
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const { total, per_page, current_page, data } = this.props.data;
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "mutasiPin"}
        size="lg"
      >
        <ModalHeader toggle={this.toggle}>Order Pin</ModalHeader>
        <ModalBody>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover">
              <thead className="bg-light">
                <tr>
                  <th className="text-black" style={columnStyle}>
                    No
                  </th>
                  <th className="text-black text-left" style={columnStyle}>
                    Operator
                  </th>
                  <th className="text-black text-left" style={columnStyle}>
                    Paket
                  </th>
                  <th className="text-black text-left" style={columnStyle}>
                    Kategori
                  </th>
                  <th className="text-black" style={columnStyle}>
                    Tipe
                  </th>
                  <th className="text-black text-right" style={columnStyle}>
                    Jumlah
                  </th>
                  <th className="text-black text-left" style={columnStyle}>
                    Catatan
                  </th>
                  <th className="text-black text-left" style={columnStyle}>
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
                            {v.full_name}
                          </td>
                          <td style={columnStyle} className="text-left">
                            {v.paket}
                          </td>
                          <td style={columnStyle} className="text-left">
                            {v.jenis_pin}
                          </td>
                          <td style={columnStyle} className="text-left">
                            {categoryPin(v.tipe)}
                          </td>
                          <td
                            style={columnStyle}
                            className="text-right text-danger"
                          >
                            {toCurrency(parseInt(v.jumlah, 10))}
                          </td>
                          <td style={columnStyle}>{v.note}</td>
                          <td style={columnStyle} className="text-left">
                            {moment(v.created_at).format("YYYY-MM-DD HH:mm")}
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
        </ModalBody>
      </WrapperModal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
    isLoading: state.pinReducer.isLoadingDetail,
    data: state.pinReducer.dataDetail,
  };
};
export default connect(mapStateToProps)(MutasiPin);
