import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getKategoriPin,
  getPinAktivasi,
} from "../../../redux/actions/paket/pin.action";
import WidgetPin from "./widget/widgetPin";
import Preloader from "../../../Preloader";

class PinAktivasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 0,
      logo: "",
      dataPin: [],
      dataKategori: [],
    };
    this.handleOnchange = this.handleOnchange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let data = [];
    let kategori = [];
    if (nextProps.dataKategori !== undefined) {
      if (nextProps.dataKategori.length > 0) {
        kategori = nextProps.dataKategori;
      } else {
        kategori = [];
      }
    } else {
      kategori = [];
    }
    if (nextProps.data.data !== undefined) {
      this.setState({
        logo: this.props.dataKategori[this.state.section].badge,
      });
      if (typeof nextProps.data.data === "object") {
        if (nextProps.data.data.length > 0) {
          data = nextProps.data.data;
        } else {
          data = [];
        }
      } else {
        data = [];
      }
    } else {
      data = [];
    }

    this.setState({ dataPin: data, dataKategori: kategori });
  }
  componentWillMount() {
    this.props.dispatch(getKategoriPin(`page=1&type=aktivasi`));
    this.setState({ dataPin: [] });
  }

  handleOnchange(sct) {
    this.props.dispatch(
      getPinAktivasi(`category=${this.props.dataKategori[sct].id}`)
    );
    this.setState({
      section: sct,
      logo: this.props.dataKategori[sct].badge,
    });
  }

  render() {
    const { total, per_page, current_page, data } = this.props.data;

    return (
      <WidgetPin
        dataKategori={this.state.dataKategori}
        dataPin={this.state.dataPin}
        logo={this.state.logo}
        handleOnchange={(i) => {
          this.handleOnchange(i);
        }}
        pagin={{ per_page, total, current_page }}
        isLoadingWidget={this.props.isLoading}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    isLoading: state.pinReducer.isLoadingAktivasi,
    data: state.pinReducer.dataAktivasi,

    isLoadingKategori: state.pinReducer.isLoadingKategori,
    dataKategori: state.pinReducer.kategori,
  };
};

export default connect(mapStateToProps)(PinAktivasi);
