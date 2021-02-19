import React, { Component } from 'react'
import {connect} from 'react-redux'
import { logoutUser } from "redux/actions/authActions";
// import { updateContact } from "redux/actions/i";
import PropTypes from "prop-types";
import {setEcaps} from 'redux/actions/site.action'
import {setMobileEcaps} from 'redux/actions/site.action'
import { Link } from 'react-router-dom';
import isMobile from 'react-device-detect';
import moment from "moment";
import Swal from "sweetalert2";
import {toRp} from "helper";
import {HEADERS} from "redux/actions/_constants"
import {
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle, Button, UncontrolledCollapse
} from 'reactstrap';
import Default from 'assets/default.png';
// import socketIOClient from "socket.io-client";


// const socket = socketIOClient(HEADERS.URL);

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleEcaps=this.handleEcaps.bind(this)
        this.handleMobileEcaps=this.handleMobileEcaps.bind(this)
        this.handleToggleMobileNav=this.handleToggleMobileNav.bind(this)
        this.handleNotif=this.handleNotif.bind(this)
        this.handleSetHeight=this.handleSetHeight.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.state = {
            toggleMobileNav:false,
            isShowNotif:false,
            isDay:7,
            tanggal_tempo:"",
            server_price:"",
            acc_name:"",
            acc_number:"",
            invest:[],
            withdraw:[],
            user:[],
            contact:[],
            isSetHeightInvest:false,
            isSetHeightWithdraw:false,
            isSetHeightUser:false,
            isSetHeightContact:false,
            isNotif:false,

        }
      
    }

    handleSetHeight(e,param){
    
    }

    refreshData(){
        // socket.emit('get_notif', {})
        // this.forceUpdate();
    }
    componentDidMount(){
        this.refreshData();

    }
    //
    // componentDidMount() {
    //
    // }
    // componentWillMount(){
    //     this.refreshData();
    // }
    handleLogout = () => {
        this.props.logoutUser();
    };

    handleEcaps=()=>{
        const bool = !this.props.triggerEcaps;
        this.props.setEcaps(bool);
    }
    handleMobileEcaps=()=>{
        const bool = !this.props.triggerMobileEcaps;
        this.props.setMobileEcaps(bool);
    }
    handleToggleMobileNav=()=>{
        this.setState({
            toggleMobileNav:!this.state.toggleMobileNav
        })
    }
    componentWillMount(){
    }

    handleUpdate=(e,id,param)=>{
        e.preventDefault();
        this.props.putInbox({status:1},id);
        this.refreshData();
        this.setState({});
        // this.props.updateContact({status:1},id);

        // this.props.dispatch(putInbox({status:1},id));
        // this.props.dispatch(putInbox({status:1},id));
    }

    handleNotif(e){
        e.preventDefault();
        Swal.fire({
            title: 'Informasi Pembayaran.',
            html:`<div class="card"><div class="card-header"><h6 class="text-left">Silahkan lakukan pembayaran ke akun dibawah ini</h6></div><div class="card-body"><table class="table table-bordered table-hover"><thead><tr><th>Harga Server</th><th>No. Rekening</th><th>Atas Nama</th></tr></thead><tbody><tr><td>${toRp(parseInt(this.state.server_price,10))}</td><td>${this.state.acc_number}</td><td>${this.state.acc_name}</td></tr></tbody></table></div></div>`,
            icon: 'info',
            confirmButtonColor: '#ff9800',
            confirmButtonText: 'Oke',
        }).then((result) => {

        })
    }
    render() {
        const columnStyle ={verticalAlign: "middle", textAlign: "left",whiteSpace: "nowrap"};

        const {isShowNotif,isDay,isNotif} = this.state;
        return (
            // <!-- Top Header Area -->
            <header className="top-header-area d-flex align-items-center justify-content-between" style={{backgroundColor:(!isMobile?'':'#242939')}} >
                <div className="left-side-content-area d-flex align-items-center">
                    {/* Mobile Logo */}
                    <div className="mobile-logo mr-3 mr-sm-4">
                        <Link to={'./'} ><img src={localStorage.getItem("logos")} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}}  alt="Mobile Logo"/></Link>
                    </div>
                    {/* <!-- Triggers --> */}
                    <div className="ecaps-triggers mr-1 mr-sm-3">
                        <div className="menu-collasped" id="menuCollasped" onClick={(e)=>{e.preventDefault();this.handleEcaps();}}>
                            <i className="zmdi zmdi-menu"/>
                        </div>
                        <div className="mobile-menu-open" id="mobileMenuOpen" onClick={(e)=>{e.preventDefault();this.handleMobileEcaps();}}>
                            <i className="zmdi zmdi-menu"/>
                        </div>
                    </div>

                    {/* <!-- Left Side Nav --> */}
                    <ul className="left-side-navbar d-flex align-items-center">

                    </ul>
                </div>
              

                <div className="right-side-navbar d-flex align-items-center justify-content-end">
                    {/* <!-- Mobile AREAAAAAA --> */}
                    <div className="right-side-trigger" style={{width:'unset',height:'unset',marginRight:'unset'}} >
                        <div className="nav-item dropdown" style={{listStyleType:'none'}}>
                            <UncontrolledButtonDropdown nav >
                                <DropdownToggle caret  className="nohover">
                                    <i className="fa fa-bell-o"/>
                                    <span className="badge badge-xs badge-pill badge-primary inbox">
                                        {
                                            (
                                                this.state.invest.length+
                                                this.state.withdraw.length+
                                                this.state.user.length+
                                                this.state.contact.length
                                            )
                                        }
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <div className="top-message-area">
                                        <div className="top-message-heading">
                                            <div className="heading-title">
                                                <h6>Notification</h6>
                                            </div>
                                            <span>{
                                                (
                                                    this.state.invest.length+
                                                    this.state.withdraw.length+
                                                    this.state.user.length+
                                                    this.state.contact.length
                                                )
                                            } New</span>
                                        </div>
                                        <br/>
                                        <div className="row" id="toggleInvestM" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'invest')}>
                                            <div className="col-10 col-xs-10 col-md-10" onClick={(e)=>this.handleSetHeight(e,'invest')}>
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>INVESTEMENT <span className="badge badge-danger">{this.state.invest.length}</span></h6>
                                            </div>
                                            <div className="col-2 col-xs-2 col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <UncontrolledCollapse toggler="#toggleInvestM" style={{marginLeft:"5px",marginRight:"5px",overflowY: "auto",height:`${this.state.isSetHeightInvest===false?"0px":(this.state.invest.length>4?(this.state.isSetHeightInvest===false?"0px":"200px"):"auto")}`}}>
                                            {
                                                this.state.invest.map((v,i)=>{
                                                    return (
                                                        <table className="table table-hover" key={i}>
                                                            <thead>
                                                            <tr>
                                                                <td className="text-black" style={columnStyle}>
                                                                    {v.name} -
                                                                    &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                    <small style={{color:"green"}}>{v.kd_trx}</small><br/>
                                                                    <small style={{color:"black"}}>{parseFloat(v.amount).toFixed(8)}</small>
                                                                </td>
                                                            </tr>
                                                            </thead>
                                                        </table>


                                                    );
                                                })
                                            }
                                        </UncontrolledCollapse>

                                        <div className="row" id="toggleWithdrawM" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'withdraw')}>
                                            <div className="col-10 col-xs-10 col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>WITHDRAW <span className="badge badge-danger">{this.state.withdraw.length}</span></h6>
                                            </div>
                                            <div className="col-2 col-xs-2 col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <UncontrolledCollapse toggler="#toggleWithdrawM" style={{overflowY: "auto",height:`${this.state.isSetHeightWithdraw===false?"0px":(this.state.withdraw.length>4?(this.state.isSetHeightWithdraw===false?"0px":"200px"):"auto")}`}}>

                                            {/*<div style={{overflowY: "auto",height:`${this.state.isSetHeightWithdraw===false?"0px":(this.state.withdraw.length>4?(this.state.isSetHeightWithdraw===false?"0px":"200px"):"auto")}`}}>*/}

                                            {
                                                this.state.withdraw.map((v,i)=>{
                                                    return (
                                                        <table className="table table-hover" key={i}>
                                                            <thead>
                                                            <tr>
                                                                <td className="text-black" style={columnStyle}>
                                                                    {v.users} -
                                                                    &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/><small style={{color:"green"}}>{v.kd_trx}</small><br/><small style={{color:"black"}}>{parseFloat(v.amount).toFixed(8)}</small></td>
                                                            </tr>
                                                            </thead>
                                                        </table>


                                                    );
                                                })
                                            }
                                            {/*</div>*/}
                                        </UncontrolledCollapse>


                                        <div className="row" id="toggleUserM" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'user')}>
                                            <div className="col-10 col-xs-10 col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>USER <span className="badge badge-danger">{this.state.user.length}</span></h6>
                                            </div>
                                            <div className="col-2 col-xs-2 col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <UncontrolledCollapse toggler="#toggleUserM" style={{overflowY: "auto",height:`${this.state.isSetHeightUser===false?"auto":"200px"}`}}>
                                            {
                                                this.state.user.map((v,i)=>{
                                                    return (
                                                        <table className="table table-hover" key={i}>
                                                            <thead>
                                                            <tr>
                                                                <td className="text-black" style={columnStyle}>
                                                                    <Link to={`/user`}>
                                                                        {v.name.length>20?v.name.substr(0,20)+"..":v.name} -
                                                                        &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                        <small style={{color:"green"}}>{v.email}</small>
                                                                    </Link>
                                                                </td>
                                                                {/*<td className="text-black" style={columnStyle}>{v.name.length>20?v.name.substr(0,20)+"..":v.name} - <small>{moment(v.created_at).fromNow()}</small><br/><small style={{color:"green"}}>{v.email}</small></td>*/}
                                                            </tr>
                                                            </thead>
                                                        </table>

                                                    );
                                                })
                                            }
                                        </UncontrolledCollapse>

                                        <div className="row" id="toggleContactM" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'contact')}>
                                            <div className="col-10 col-xs-10 col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>CONTACT <span className="badge badge-danger">{this.state.contact.length}</span></h6>
                                            </div>
                                            <div className="col-2 col-xs-2 col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <UncontrolledCollapse toggler="#toggleContactM" style={{overflowY: "auto",height:`${this.state.isSetHeightContact===false?"0px":(this.state.contact.length>4?(this.state.isSetHeightContact===false?"0px":"200px"):"auto")}`}} >

                                            {
                                                this.state.contact.map((v,i)=>{
                                                    return (
                                                        <table className="table table-hover"key={i}>
                                                            <thead>
                                                            <tr onClick={(e)=>this.handleUpdate(e,v.id,'contact')}>
                                                                <Link to={`/contact/${v.id}`}>
                                                                    <td className="text-black" style={columnStyle}>
                                                                        {v.name.length>20?v.name.substr(0,20)+"..":v.name} -
                                                                        &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                        <small style={{color:"green"}}>{v.title}</small>
                                                                    </td>
                                                                </Link>
                                                            </tr>
                                                            </thead>
                                                        </table>


                                                    );
                                                })
                                            }
                                        </UncontrolledCollapse>
                                    </div>

                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>
                    </div>

                    {/* <!-- END Mobile AREAAAAAA --> */}

                    {/* <!-- Top Bar Nav --> */}
                    <ul className={"right-side-content d-flex align-items-center " + (this.state.toggleMobileNav === true? "active":"")}>
                        <div className="nav-item dropdown">
                            <UncontrolledButtonDropdown nav>
                                <DropdownToggle caret className="nohover">
                                    <i className="fa fa-bell-o"/>
                                    <span className="badge badge-pill badge-primary inbox ml-0">
                                        {
                                            (
                                                this.state.invest.length+
                                                this.state.withdraw.length+
                                                this.state.user.length+
                                                this.state.contact.length
                                            )
                                        }
                                    </span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <div className="top-message-area">
                                        <div className="top-message-heading">
                                            <div className="heading-title">
                                                <h6>Notification</h6>
                                            </div>
                                            <span>{
                                                (
                                                    this.state.invest.length+
                                                    this.state.withdraw.length+
                                                    this.state.user.length+
                                                    this.state.contact.length
                                                )
                                            } New</span>
                                        </div>
                                        <br/>
                                        <div className="row" id="toggleInvest" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'invest')}>
                                            <div className="col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>INVESTEMENT <span className="badge badge-danger">{this.state.invest.length}</span></h6>
                                            </div>
                                            <div className="col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <div style={{overflowY: "auto",height:`${this.state.isSetHeightInvest===false?"0px":(this.state.invest.length>4?"200px":"auto")}`}}>

                                        {/*<h6 style={{textAlign:"left",marginLeft:"5px",color:"#5d78ff"}} id="toggleInvest">Investment</h6>*/}
                                        {
                                            this.state.invest.map((v,i)=>{
                                               return (
                                                   <UncontrolledCollapse toggler="#toggleInvest" key={i}>
                                                       <table className="table table-hover">
                                                           <thead>
                                                           <tr>
                                                               <Link to={`/investment/${v.id}/${btoa(moment(v.created_at).format("yyyy-MM-DD"))}`}>
                                                               <td className="text-black" style={columnStyle}>
                                                                   {v.name} -
                                                                   &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                   <small style={{color:"green"}}>{v.kd_trx}</small><br/>
                                                                   <small style={{color:"black"}}>{parseFloat(v.amount).toFixed(8)}</small>
                                                               </td>
                                                               </Link>
                                                           </tr>
                                                           </thead>
                                                       </table>
                                                   </UncontrolledCollapse>
                                               );
                                            })
                                        }
                                        </div>
                                        <div className="row" id="toggleWithdraw" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'withdraw')}>
                                            <div className="col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>WITHDRAW <span className="badge badge-danger">{this.state.withdraw.length}</span></h6>
                                            </div>
                                            <div className="col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <div style={{overflowY: "auto",height:`${this.state.isSetHeightWithdraw===false?"0px":(this.state.withdraw.length>4?"200px":"auto")}`}}>

                                        {
                                            this.state.withdraw.map((v,i)=>{
                                                return (
                                                    <UncontrolledCollapse toggler="#toggleWithdraw" key={i}>
                                                        <table className="table table-hover">
                                                            <thead>
                                                            <tr>
                                                                <Link to={`/withdraw/${v.id}/${btoa(moment(v.created_at).format("yyyy-MM-DD"))}`}>
                                                                    <td className="text-black" style={columnStyle}>
                                                                        {v.users} -
                                                                        &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                        <small style={{color:"green"}}>{v.kd_trx}</small><br/>
                                                                        <small style={{color:"black"}}>{parseFloat(v.amount).toFixed(8)}</small>
                                                                    </td>
                                                                </Link>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </UncontrolledCollapse>

                                                );
                                            })
                                        }
                                        </div>


                                        <div className="row" id="toggleUser" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'user')}>
                                            <div className="col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>USER <span className="badge badge-danger">{this.state.user.length}</span></h6>
                                            </div>
                                            <div className="col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <div style={{overflowY: "auto",height:`${this.state.isSetHeightUser===false?"0px":(this.state.user.length>4?"200px":"auto")}`}}>
                                        {
                                            this.state.user.map((v,i)=>{
                                                return (

                                                    <UncontrolledCollapse toggler="#toggleUser" key={i}>
                                                        <table className="table table-hover">
                                                            <thead>
                                                            <tr>
                                                                <Link to={`/user/${v.id}`}>
                                                                    <td className="text-black" style={columnStyle}>
                                                                        {v.name.length>20?v.name.substr(0,20)+"..":v.name} -
                                                                        &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                        <small style={{color:"green"}}>{v.email}</small>
                                                                    </td>
                                                                </Link>

                                                                {/*<td className="text-black" style={columnStyle}>{v.name.length>20?v.name.substr(0,20)+"..":v.name} - <small>{moment(v.created_at).fromNow()}</small><br/><small style={{color:"green"}}>{v.email}</small></td>*/}
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </UncontrolledCollapse>

                                                );
                                            })
                                        }
                                        </div>

                                        <div className="row" id="toggleContact" style={{cursor:"pointer"}} onClick={(e)=>this.handleSetHeight(e,'contact')}>
                                            <div className="col-md-10">
                                                <h6 style={{textAlign:"left",marginLeft:"5px",color:"green"}}>CONTACT <span className="badge badge-danger">{this.state.contact.length}</span></h6>
                                            </div>
                                            <div className="col-md-2">
                                                <i className="fa fa-sort-down"/>
                                            </div>
                                        </div>
                                        <div style={{overflowY: "auto",height:`${this.state.isSetHeightContact===false?"0px":(this.state.contact.length>4?"200px":"auto")}`}}>

                                        {
                                            this.state.contact.map((v,i)=>{
                                                return (
                                                    <UncontrolledCollapse toggler="#toggleContact" key={i}>
                                                        <table className="table table-hover">
                                                            <thead>
                                                            <tr onClick={(e)=>this.handleUpdate(e,v.id,'contact')}>
                                                                <Link to={`/contact/${v.id}`}>
                                                                    <td className="text-black" style={columnStyle}>
                                                                        {v.name.length>20?v.name.substr(0,20)+"..":v.name} -
                                                                        &nbsp;<small style={{color:"#FC8213"}}>{moment(v.created_at).fromNow()}</small><br/>
                                                                        <small style={{color:"green"}}>{v.title}</small>
                                                                    </td>
                                                                </Link>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </UncontrolledCollapse>
                                                );
                                            })
                                        }
                                        </div>

                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>

                        <div className="nav-item dropdown">
                            <UncontrolledButtonDropdown nav >
                                <DropdownToggle caret  className="nohover">
                                    <div className="user-name">
                                        <table>
                                            <thead>
                                            <tr>
                                                <td className="fs1">
                                                    <p>{this.props.auth.user.name}</p>
                                                    <span>{this.props.auth.user.email}</span>

                                                </td>
                                                <td className="fs1"  style={{paddingLeft:'10px'}}>
                                                    <p>
                                                        <i className="fa fa-angle-down lnr"/>
                                                    </p>

                                                </td>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <div className="user-profile-area">
                                        <div className="user-profile-heading">
                                            <div className="profile-img">
                                                {/* <img className="chat-img mr-2" src={this.props.auth.user.foto} onError={(e)=>{e.target.onerror = null; e.target.src=`${Default}`}}  alt=""/> */}
                                            </div>
                                            <div className="profile-text">
                                                <h6>{this.props.auth.user.name}</h6>
                                                <span>{this.props.auth.user.email}</span>
                                            </div>
                                        </div>
                                        <DropdownItem  onClick={this.handleLogout}>
                                            <i className="fa fa-chain-broken profile-icon bg-warning" aria-hidden="true"/> Sign-out
                                        </DropdownItem>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>
                        </div>

                    </ul>
                </div>
            </header>
        );
    }
}
Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    setEcaps: PropTypes.func.isRequired,
    setMobileEcaps: PropTypes.func.isRequired,
    auth: PropTypes.object,
    triggerEcaps: PropTypes.bool,
    triggerMobileEcaps: PropTypes.bool,
};

const mapStateToProps = ({auth,siteReducer}) =>{
    return{
        auth: auth,
        triggerEcaps: siteReducer.triggerEcaps,
        triggerMobileEcaps: siteReducer.triggerMobileEcaps

    }
}


export default connect(mapStateToProps,{logoutUser,setEcaps,setMobileEcaps})(Header);