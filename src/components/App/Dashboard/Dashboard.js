import React, { Component } from 'react';
import {connect} from 'react-redux';
import Layout from 'components/Layout';
import moment from 'moment';
import {toRp} from "helper";
import {FetchStock} from 'redux/actions/dashboard/dashboard.action'
import 'bootstrap-daterangepicker/daterangepicker.css';
// import socketIOClient from "socket.io-client";
import {HEADERS} from 'redux/actions/_constants'


import Cards from './src/Cards'
import Filter from './src/Filter'
import Info from './src/Info'
import Chart from './src/charts'
import Clock from "../../common/clock";
// import {CheckDaily, storeDailyProfit} from "../../../redux/actions/transaction/transaction.action";
// const socket = socketIOClient(HEADERS.URL);

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate:moment(new Date()).format("yyyy-MM-DD"),
            endDate:moment(new Date()).format("yyyy-MM-DD"),
            totalBalance:"0",
            totalInvest:"0",
            totalWD:"0",
            totalMember:"0",
            location_data:[],
            location:"-",
            penjualan_pin:{
                series: [
                    {
                        name: 'PIN AKTIVASI',
                        data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                            min: 10,
                            max: 60
                        })
                    },
                    {
                        name: 'PIN REPEAT ORDER',
                        data: this.generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                            min: 10,
                            max: 20
                        })
                    }
                ],
                options: {
                    chart: {
                        type: 'area',
                        height: 350,
                        stacked: true,
                        events: {
                            selection: function (chart, e) {
                            }
                        },
                    },
                    colors: ['#008FFB', '#00E396'],
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            opacityFrom: 0.6,
                            opacityTo: 1.0,
                        }
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left'
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                },
            },
            platform_pendaftaran:{
                series: [44, 55, 13, 43, 22],
                options: {
                    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                },
            }
        };

        // socket.on('refresh_dashboard',(data)=>{
        //     this.refreshData();
        // })
        
        // socket.on("set_dashboard", (data) => {
        //     this.setState({
        //         series:data.series,
        //         totalBalance:data.total_balance,
        //         totalInvest:data.total_invest,
        //         totalWD:data.total_wd,
        //         totalMember:data.total_member,
        //     })
        // });
        this.HandleChangeLokasi = this.HandleChangeLokasi.bind(this);
    }
    generateDayWiseTimeSeries(baseval, count, yrange) {
        let i = 0;
        let series = [];
        while (i < count) {
            let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            series.push([baseval, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }


    componentWillReceiveProps = (nextProps) => {
     
        if (nextProps.auth.user) {
          let lk = [{
              value: "-",
              label: "Semua Lokasi"
          }]
          let loc = nextProps.auth.user.lokasi;
          if(loc!==undefined){
              loc.map((i) => {
                lk.push({
                  value: i.kode,
                  label: i.nama
                });
                return null;
              })
              
              this.setState({
                location_data: lk,
                userid: nextProps.auth.user.id
              })
          }
        }
      }

    refreshData(start=null,end=null){
        // socket.emit('get_dashboard', {
        //     datefrom: start!==null?start:this.state.startDate,
        //     dateto: end!==null?end:this.state.endDate,
        // })
    }

    componentWillMount(){
        this.refreshData();
        // this.props.dispatch(CheckDaily());
    }

    componentWillUnmount(){
        localStorage.removeItem('startDateProduct');
        localStorage.removeItem('endDateDashboard');

    }

    onChange = date => this.setState({ date })

    handleEvent = (event, picker) => {
        // end:  2020-07-02T16:59:59.999Z
        const awal = picker.startDate._d.toISOString().substring(0,10);
        const akhir = picker.endDate._d.toISOString().substring(0,10);
        this.setState({
            startDate:awal,
            endDate:akhir
        });
        this.refreshData(awal,akhir);
    };

    handleDailyProfit(e){
        e.preventDefault();
        // this.props.dispatch(storeDailyProfit());
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.refreshData();
    }

    HandleChangeLokasi(lk) {
        let err = Object.assign({}, this.state.error, {
            location: ""
        });
        this.setState({
            location: lk.value,
            error: err
        })
        this.refreshData(null, null)
    }

    render() {
        return (
            <Layout page="Dashboard">
                <div className="row align-items-center" style={{zoom:"80%"}}>
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                        <h5 className="mb-0 font-weight-bold">Dashboard</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    <div className="col-6">
                        <div className="dashboard-infor-mation d-flex flex-wrap align-items-center mb-3">
                            <div className="dashboard-clock">
                                <div id="dashboardDate">{moment().format("dddd, Do MMM YYYY")}</div>
                                <Clock/>
                            </div>
                            <div className="dashboard-btn-group d-flex align-items-center">
                                <button type="button" onClick={(e)=>this.handleSubmit(e)} className="btn btn-primary ml-1 float-right"><i className="fa fa-refresh"></i></button>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-12">
                        <Filter
                            className="mb-3"
                            handleEvent={this.handleEvent}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            location_data={this.state.location_data}
                            HandleChangeLokasi={this.HandleChangeLokasi}
                            location={this.state.location}
                            handleDailyProfit={this.handleDailyProfit.bind(this)}
                            isDaily={this.state.isDaily}
                            isLoadingDaily={this.props.isLoadingCheck}
                        />
                    </div>

                    <div className="col-md-12">
                        {/* Dashboard Widget Area */}
                        <div className="row">
                            <Cards title="TOTAL SALDO MEMBER" data={this.state.totalInvest} icon="fa fa-money text-primary"/>
                            <Cards title="TOTAL PENARIKAN" data={this.state.totalBalance} icon="fa fa-dollar text-primary"/>
                            <Cards title="TOTAL PENJUALAN" data={this.state.totalWD} icon="fa fa-shopping-cart text-primary"/>
                            <Cards title="MEMBER AKTIF" data={this.state.totalMember} icon="fa fa-users text-primary"/>
                        </div>
                        {/* Dashboard Widget Area */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 box-margin">
                        <Chart
                        data={this.state.penjualan_pin}
                        title="Penjualan PIN"
                        type="area"
                        height={300} />
                    </div>
                    <div className="col-md-5 col-xl-5 box-margin">
                        <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.platform_pendaftaran}
                        title="Membership Status"
                        type="pie"
                        height={300} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 col-xl-5 box-margin">
                        <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.platform_pendaftaran}
                        title="Jenjang Karir Member"
                        type="pie"
                        height={300} />
                    </div>
                    <div className="col-md-7 box-margin">
                        <Chart
                        data={this.state.penjualan_pin}
                        title="Penjualan Paket"
                        type="area"
                        height={300} />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3 col-xl-3 box-margin">
                        <div className="card">
                            <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">Member Baru</h5>
                            </div>
                            <div className="card-body" style={{overflowX: 'auto', height: '340px'}}>
                                <ul className="total-earnings-list">
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-2.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Ajoy Das</h6>
                                        <p className="mb-0">Product Designer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-3.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Niloy Disk</h6>
                                        <p className="mb-0">Web Developer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-3.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Niloy Disk</h6>
                                        <p className="mb-0">Web Developer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-1.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Nazrul Islam</h6>
                                        <p className="mb-0">Visual Designer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-4.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Wiltor Delton</h6>
                                        <p className="mb-0">Project Manager</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-5.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Nick Stone</h6>
                                        <p className="mb-0">Visual Designer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                </ul>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-xl-4 box-margin">
                        <div className="card">
                            <div className="card-header bg-transparent user-area d-flex align-items-center justify-content-between">
                            <h5 className="card-title mb-0">10 Sponsor terbaik</h5>
                            </div>
                            <div className="card-body" style={{overflowX: 'auto', height: '340px'}}>
                                <ul className="total-earnings-list">
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-2.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Ajoy Das</h6>
                                        <p className="mb-0">Zircon</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">100 sponsor</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-3.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Niloy Disk</h6>
                                        <p className="mb-0">Web Developer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-3.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Niloy Disk</h6>
                                        <p className="mb-0">Web Developer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-1.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Nazrul Islam</h6>
                                        <p className="mb-0">Visual Designer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-4.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Wiltor Delton</h6>
                                        <p className="mb-0">Project Manager</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                    <li>
                                    <div className="author-info d-flex align-items-center">
                                        <div className="author-img mr-3">
                                        <img src="img/member-img/team-5.jpg" alt="" />
                                        </div>
                                        <div className="author-text">
                                        <h6 className="mb-0">Nick Stone</h6>
                                        <p className="mb-0">Visual Designer</p>
                                        </div>
                                    </div>
                                    <a href="#" className="badge badge-primary">Follow</a>
                                    </li>
                                </ul>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-5 col-xl-5 box-margin">
                        <Chart
                        style={{marginTop:'30px'}}
                        data={this.state.platform_pendaftaran}
                        title="Platform Pendaftaran"
                        type="pie"
                        height={300} />
                    </div>
                </div>


        </Layout>
       
        );
    }
}
// Dashboard.propTypes = {
//     auth: PropTypes.object
// }

const mapStateToProps = (state) =>{
     return{
       auth: state.auth,
       stock: state.dashboardReducer.data,
        // skipped: state.transactionReducer.skipped,
        // isLoadingCheck: state.transactionReducer.isLoadingCheck,
     }
}
export default connect(mapStateToProps)(Dashboard);