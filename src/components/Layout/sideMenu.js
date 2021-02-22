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
            isPenjualan:false,
            isTrx:false,
            isStockist:false,
            isReport:false,
            isSetting:false,
        }
        this.changeMenu = this.changeMenu.bind(this);
    }


    changeMenu(e,param){
        e.preventDefault();
        const sts = {
                isPaket: false,
                isMasterdata: false,
                isContent: false,
                isPenjualan: false,
                isStockist: false,
                isTrx: false,
                isSetting: false,
                isReport: false

        };
        sts[param] = !this.state[param];
        this.setState(sts);

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
        if (path === '/pin/ro' || path === '/pin/aktivasi') {
            this.setState({
                isStockist:true
            })
        }
        if(path==='/paket' || path==='/barang'||path==='/barang_redeem'||path==='/barang_reward'){
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
        if(path==='/produk'||path==='/redeem'||path==='/claim'){
            this.setState({
                isPenjualan:true
            })
        }
        if(path==='/deposit'||path==='/penarikan'||path==='/bonus'){
            this.setState({
                isTrx:true
            })
        }
        if(path==='/saldo'){
            this.setState({
                isReport:true
            })
        }

        if (path === '/setting' || path === '/setting/website' || path === '/setting/bank') {
            this.setState({
                isSetting:true
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
                    <li  className={path==='/'?"active":''}><Link to="/"> <i className="fa fa-dashboard" /><span> Dashboard</span></Link></li>
                    {/* DASHBOARD MODUL END */}
                    {/* PIN MODUL START */}
                    <li  className={path==='/member'?"active":''}><Link to="/member"> <i className="fa fa-users" /><span> Member</span></Link></li>
                    <li  className={path==='/voucher'?"active":''}><Link to="/voucher"> <i className="fa fa-code" /><span> Voucher</span></Link></li>
                    {/* PIN MODUL END */}
                    {/* PIN MODUL START */}
                    <li className={"treeview" +(this.state.isStockist===true || path==='/pin/aktivasi' || path==='/pin/ro' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isStockist')}><i className="fa fa-tasks" /> <span>Stockist</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isStockist===true?"block":"none"}}>
                            <li className={path==='/pin/aktivasi'?"active":''}><Link to="/pin/aktivasi" style={{width:'fit-content'}}> PIN Aktivasi</Link></li>
                            <li className={path==='/pin/ro'?"active":''}><Link to="/pin/ro" style={{width:'fit-content'}}> PIN RO</Link></li>
                        </ul>
                    </li>
                    {/* PIN MODUL END */}
                     {/* PENJUALAN MODUL START */}
                    <li className={"treeview" +(this.state.isPenjualan===true || path==='/produk' || path==='/redeem' || path==='/claim'?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isPenjualan')}><i className="fa fa-shopping-basket" /> <span>Order</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isPenjualan===true?"block":"none"}}>
                            <li className={path==='/produk'?"active":''}><Link to="/produk" style={{width:'fit-content'}}> Order Paket</Link></li>
                            <li className={path==='/redeem'?"active":''}><Link to="/redeem" style={{width:'fit-content'}}> Redeem Point</Link></li>
                            <li className={path==='/claim'?"active":''}><Link to="/claim" style={{width:'fit-content'}}> Claim Reward</Link></li>

                        </ul>
                    </li>
                    {/* PENJUALAN MODUL END */}
                    <li className={"treeview" +(this.state.isTrx===true || path==='/deposit'|| path==='/penarikan'||path==='/bonus'?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isTrx')}><i className="fa fa-google-wallet" /> <span>E-Wallet</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isTrx===true?"block":"none"}}>
                            <li className={path==='/deposit'?"active":''}><Link to="/deposit" style={{width:'fit-content'}}> Deposit</Link></li>
                            <li className={path==='/penarikan'?"active":''}><Link to="/penarikan" style={{width:'fit-content'}}> Penarikan</Link></li>
                            <li className={path==='/bonus'?"active":''}><Link to="/bonus" style={{width:'fit-content'}}> Bonus</Link></li>

                        </ul>
                    </li>
                    {/* E-WALLET MODUL END */}
                   
                    {/* PAKET MODUL START */}
                    <li className={"treeview" +(this.state.isPaket===true || path==='/paket' || path==='/barang' || path==='/barang_redeem' || path==='/barang_reward'?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isPaket')}><i className="fa fa-folder-o	" /> <span>Paket</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isPaket===true?"block":"none"}}>
                            <li className={path==='/paket'?"active":''}><Link to="/paket" style={{width:'fit-content'}}> Paket</Link></li>
                            <li className={path==='/barang'?"active":''}><Link to="/barang" style={{width:'fit-content'}}> Barang</Link></li>
                            <li className={path==='/barang_redeem'?"active":''}><Link to="/barang_redeem" style={{width:'fit-content'}}> Barang Redeem</Link></li>
                            <li className={path==='/barang_reward'?"active":''}><Link to="/barang_reward" style={{width:'fit-content'}}> Barang Reward</Link></li>
                        </ul>
                    </li>
                    {/* PAKET MODUL END */}
                    
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

                     {/* Report MODUL START */}
                    <li className={"treeview" +(this.state.isReport===true || path==='/saldo' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isReport')}><i className="fa fa-file-text" /> <span>Laporan</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isReport===true?"block":"none"}}>
                            <li className={path==='/saldo'?"active":''}><Link to="/saldo" style={{width:'fit-content'}}> Transaksi Member</Link></li>
                        </ul>
                    </li>
                    {/* Report MODUL END */}

                     {/* MASTERDATA MODUL START */}
                    <li className={"treeview" +(this.state.isMasterdata===true || path==='/user_list' || path==='/user_level' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isMasterdata')}><i className="fa fa-user" /> <span>User</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isMasterdata===true?"block":"none"}}>
                            <li className={path==='/user_list'?"active":''}><Link to="/user_list" style={{width:'fit-content'}}> User List</Link></li>
                            <li className={path==='/user_level'?"active":''}><Link to="/user_level" style={{width:'fit-content'}}> User Level</Link></li>
                        </ul>
                    </li>
                    {/* MASTERDATA MODUL END */}

                    {/* Setting MODUL START */}
                    <li className={"treeview" +(this.state.isSetting===true || path==='/setting' || path==='/setting/website'  || path==='/setting/bank' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isSetting')}><i className="fa fa-cogs" /> <span>Pengaturan</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isSetting===true?"block":"none"}}>
                            <li className={path==='/setting'?"active":''}><Link to="/setting" style={{width:'fit-content'}}> Pengaturan Umum</Link></li>
                            <li className={path==='/setting/website'?"active":''}><Link to="/setting/website" style={{width:'fit-content'}}> Pengaturan Website</Link></li>
                            <li className={path==='/setting/bank'?"active":''}><Link to="/setting/bank" style={{width:'fit-content'}}> Pengaturan bank</Link></li>
                        </ul>
                    </li>
                    {/* Setting MODUL END */}
      

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