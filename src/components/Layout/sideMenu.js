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
            isAdmin:false,
            isUser:false,
            isLog:false,
            isLogActivity:false,
            isLogAuth:false,
            isLogTransaction:false,

        }
        this.changeMenu = this.changeMenu.bind(this);
    }


    changeMenu(e,param){
        e.preventDefault();

        if(param === 'isPaket'){
            this.setState({
                isPaket : !this.state.isPaket,
            });
        }
        if(param === 'isLog'){
            this.setState({
                isLog : !this.state.isLog,
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

                    {/* USER MODUL START */}
                    <li className={"treeview" +(this.state.isPaket===true || path==='/paket' || path==='/barang' ?" active menu-open" : "")}>
                        <a href="!#" onClick={(e) => this.changeMenu(e,'isPaket')}><i className="fa fa-list" /> <span>Paket</span> <i className="fa fa-angle-right" /></a>
                        <ul className={"treeview-menu"} style={{display:this.state.isPaket===true?"block":"none"}}>
                            <li className={path==='/paket'?"active":''}><Link to="/paket" style={{width:'fit-content'}}> Paket</Link></li>
                            <li className={path==='/barang'?"active":''}><Link to="/barang" style={{width:'fit-content'}}> Barang</Link></li>
                        </ul>
                    </li>
                    {/* USER MODUL END */}

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