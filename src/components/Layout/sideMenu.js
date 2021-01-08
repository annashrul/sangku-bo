import React, { Component } from 'react';
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom"
import { logoutUser } from "redux/actions/authActions";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class SideMenu extends Component {
    constructor(props){
        super(props);
        this.state ={
            isPaket:false,
            isMasterdata:false,
            isContent:false,
            isReport:false,
            isEwallet:false,
        }
        this.changeMenu = this.changeMenu.bind(this);
    }


    changeMenu(e,param){
        e.preventDefault();
        if(param === 'isPaket'){
            this.setState({
                isPaket : !this.state.isPaket,
                isMasterdata:false,
                isContent:false,
                isReport:false,
                isEwallet:false,
            });
        }
        if(param === 'isMasterdata'){
            this.setState({
                isPaket:false,
                isMasterdata : !this.state.isMasterdata,
                isContent:false,
                isReport:false,
                isEwallet:false,

            });
        }
        if(param === 'isContent'){
            this.setState({
                isPaket:false,
                isMasterdata : false,
                isContent:!this.state.isContent,
                isReport:false,
                isEwallet:false,

            });
        }
        if(param === 'isReport'){
            this.setState({
                isPaket:false,
                isMasterdata : false,
                isContent:false,
                isReport:!this.state.isReport,
                isEwallet:false,

            });
        }
        if(param === 'isEwallet'){
            this.setState({
                isPaket:false,
                isMasterdata : false,
                isContent:false,
                isReport:false,
                isEwallet:!this.state.isEwallet,
            });
        }

        this.forceUpdate();

    }
    getProps(param){
        if (param.auth.user) {
            let akses = param.auth.user.access;
        }
    }
    componentDidMount(){
        this.getProps(this.props);
        const path = this.props.location.pathname;
        if(path==='/paket' || path==='/barang'){
            this.setState({
                isPaket:true
            })
        }
        if(path==='/user_list'||path==='/user_level'){
            this.setState({
                isMasterdata:true
            })
        }
        if(path==='/berita'||path==='/testimoni'){
            this.setState({
                isContent:true
            })
        }
        if(path==='/penjualan'||path==='/bonus'){
            this.setState({
                isReport:true
            })
        }
        if(path==='/deposit'){
            this.setState({
                isEwallet:true
            })
        }

    }
    componentWillReceiveProps = (nextProps) => {
        this.getProps(nextProps);
        if (this.props.activePath !== nextProps.activePath) {
            this.setState({
              activePath: nextProps.activePath
            })
        }
    }
    getSortByClass(){
    setTimeout(() => {
        return 'none';
        }, 500);
    }
    handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Apakah anda yakin akan logout aplikasi?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.value) {
                this.props.logoutUser();
            }
        })
    };
    render() {
        const path = this.props.location.pathname;
        return (
            <nav>
                <ul className="sidebar-menu" data-widget="tree">
                    {/* DASHBOARD MODUL START */}
                    <li  className={path==='/'?"active":''}><Link to="/"> <i className="fa fa-area-chart" /><span> Dashboard</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* PIN MODUL START */}
                    <li  className={path==='/pin'?"active":''}><Link to="/pin"> <i className="fa fa-area-chart" /><span> PIN</span></Link></li>
                    {/* PIN MODUL END */}
                    {/* PIN MODUL START */}
                    <li  className={path==='/member'?"active":''}><Link to="/member"> <i className="fa fa-area-chart" /><span> Member</span></Link></li>
                    {/* PIN MODUL END */}
                    {/* PAKET MODUL START */}
                    <li className={"treeview" +(this.state.isPaket===true || path==='/paket' || path==='/barang' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isPaket')}><i className="fa fa-list" /> <span>Paket</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isPaket===true?"block":"none"}}>
                            <li className={path==='/paket'?"active":''}><Link to="/paket" style={{width:'fit-content'}}> Paket</Link></li>
                            <li className={path==='/barang'?"active":''}><Link to="/barang" style={{width:'fit-content'}}> Barang</Link></li>
                        </ul>
                    </li>
                    {/* PAKET MODUL END */}
                    {/* MASTERDATA MODUL START */}
                    <li className={"treeview" +(this.state.isMasterdata===true || path==='/user_list' || path==='/user_level' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isMasterdata')}><i className="fa fa-list" /> <span>Masterdata</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isMasterdata===true?"block":"none"}}>
                            <li className={path==='/user_list'?"active":''}><Link to="/user_list" style={{width:'fit-content'}}> User List</Link></li>
                            <li className={path==='/user_level'?"active":''}><Link to="/user_level" style={{width:'fit-content'}}> User Level</Link></li>
                        </ul>
                    </li>
                    {/* MASTERDATA MODUL END */}
                    {/* MASTERDATA MODUL START */}
                    <li className={"treeview" +(this.state.isContent===true || path==='/berita'|| path==='/testimoni' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isContent')}><i className="fa fa-list" /> <span>Menejemen Konten</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isContent===true?"block":"none"}}>
                            <li className={path==='/berita'?"active":''}><Link to="/berita" style={{width:'fit-content'}}> Berita</Link></li>
                            <li className={path==='/testimoni'?"active":''}><Link to="/testimoni" style={{width:'fit-content'}}> Testimoni</Link></li>
                            {/*<li className={path==='/bank'?"active":''}><Link to="/bank" style={{width:'fit-content'}}> Bank</Link></li>*/}
                            {/*<li className={path==='/konten'?"active":''}><Link to="/konten" style={{width:'fit-content'}}> Konten</Link></li>*/}
                        </ul>
                    </li>
                    {/* MASTERDATA MODUL END */}
                    {/* E-WALLET MODUL START */}
                    <li className={"treeview" +(this.state.isEwallet===true || path==='/deposit'?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isEwallet')}><i className="fa fa-list" /> <span>E-Wallet</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isEwallet===true?"block":"none"}}>
                            <li className={path==='/deposit'?"active":''}><Link to="/deposit" style={{width:'fit-content'}}> Deposit</Link></li>
                        </ul>
                    </li>
                    {/* E-WALLET MODUL END */}
                    {/* REPORT MODUL START */}
                    <li className={"treeview" +(this.state.isReport===true || path==='/penjualan' || path==='/bonus'?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isReport')}><i className="fa fa-list" /> <span>Laporan</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isReport===true?"block":"none"}}>
                            <li className={path==='/penjualan'?"active":''}><Link to="/penjualan" style={{width:'fit-content'}}> Penjualan</Link></li>
                            <li className={path==='/bonus'?"active":''}><Link to="/bonus" style={{width:'fit-content'}}> Bonus</Link></li>
                        </ul>
                    </li>
                    {/* REPORT MODUL END */}

                    {/* LOGOUT MODUL START */}
                    <li><a href={null} style={{cursor:'pointer',color:'#a6b6d0'}} onClick={(event)=>this.handleLogout(event)}> <i className="fa fa-sign-out" /><span> Logout</span></a></li>
                    {/* LOGOUT MODUL END */}
                </ul>
            </nav>
        )
    }
}
SideMenu.propTypes = {
    logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser})(SideMenu))