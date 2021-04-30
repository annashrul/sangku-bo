import React, { Component } from "react";
import { connect } from "react-redux";
import { getKategoriPin } from "../../../../../../redux/actions/paket/pin.action";

class WidgetDetailPinMember extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(
      getKategoriPin(
        `id_member=${this.props.detail.id}&type=${this.props.detail.type}`
      )
    );
  }

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      whiteSpace: "nowrap",
    };
    return (
      <div style={{ overflowX: "auto" }}>
        <table className="table table-hover">
          <thead className="bg-light">
            <tr>
              <td style={columnStyle} className="text-center">
                #
              </td>
              <td style={columnStyle} className="text-left">
                Paket
              </td>
              <td style={columnStyle} className="text-right">
                Jumlah
              </td>
            </tr>
          </thead>
          <tbody>
            {typeof this.props.dataKategori === "object" ? (
              this.props.dataKategori.length > 0 ? (
                this.props.dataKategori.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td style={columnStyle} className="text-center">
                        <img src={v.badge} style={{ height: "50px" }} />
                      </td>
                      <td style={columnStyle} className="text-left">
                        {v.title}
                      </td>
                      <td
                        style={columnStyle}
                        className="text-right text-danger"
                      >
                        {v.jumlah}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Data</td>
                </tr>
              )
            ) : (
              <tr>
                <td>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoadingKategori: state.pinReducer.isLoadingKategori,
    dataKategori: state.pinReducer.kategori,
  };
};
export default connect(mapStateToProps)(WidgetDetailPinMember);
