import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "components/Layout";
import Paginationq from "../../../helper";

import { FetchLogWa } from "../../../redux/actions/site.action";
import moment from "moment";
class Whatsapp extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(FetchLogWa(`page=1`));
  }

  render() {
    const { total, per_page, current_page, data } = this.props.data;
    return (
      <Layout page={"Laporan Log Whatsapp"}>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="dashboard-header-title mb-3">
              <h5 className="mb-0 font-weight-bold">Laporan Log Whatsapp</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover">
                  <tbody>
                    {typeof data === "object" ? (
                      data.length > 0 ? (
                        data.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <span className="text-black text-right">
                                  <i className="fa fa-phone" />
                                  &nbsp;{v.mobile_no}
                                </span>
                                <br />
                                {v.pesan}
                                <br />
                                <span
                                  className="text-black text-right"
                                  style={{ fontWeight: "normal!important" }}
                                >
                                  <i className="fa fa-clock-o" />
                                  &nbsp;
                                  {moment(v.created_at).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </span>
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
            callback={this.handlePage}
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
  };
};

export default connect(mapStateToProps)(Whatsapp);
