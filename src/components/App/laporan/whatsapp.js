import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq, { generateNo, toCurrency } from "../../../helper";
import {
  fetchGeneral,
  updateGeneral,
} from "../../../redux/actions/setting/general.action";

import { FetchLogWa } from "../../../redux/actions/site.action";
import moment from "moment";
class Whatsapp extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(fetchGeneral("page=1"));
    this.props.dispatch(FetchLogWa(`page=1`));
  }
  handlePage(page) {
    this.props.dispatch(FetchLogWa(`page=${page}`));
  }

  render() {
    console.log(this.props.dataGeneral);
    const { total, per_page, current_page, data } = this.props.data;
    return (
      <Layout page={"Laporan Log Whatsapp"}>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="dashboard-header-title mb-3">
              <h5 className="mb-0 font-weight-bold">Laporan Log Whatsapp</h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="dashboard-header-title mb-3 text-right">
              <small>Kredit WhatsApp</small>
              <h5 className="mb-0 font-weight-bold">
                {this.props.dataGeneral.length > 0
                  ? toCurrency(
                      parseInt(this.props.dataGeneral[0].kredit_wa, 10)
                    )
                  : 0}
              </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th>No</th>
                      <th>Telepon</th>
                      <th>Tipe</th>
                      <th>penyedia</th>
                      <th>Pesan</th>
                      <th>Waktu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeof data === "object" ? (
                      data.length > 0 ? (
                        data.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>{generateNo(i, current_page)}</td>
                              <td>{v.mobile_no}</td>
                              <td>{v.type}</td>
                              <td>{v.penyedia}</td>
                              <td>{v.pesan}</td>
                              <td>
                                {moment(v.created_at).format(
                                  "YYYY/MM/DD HH:mm:ss"
                                )}
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
      </Layout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    isLoading: state.siteReducer.isLoadingWa,
    data: state.siteReducer.dataWa,
    dataGeneral: state.generalReducer.data,
  };
};

export default connect(mapStateToProps)(Whatsapp);
