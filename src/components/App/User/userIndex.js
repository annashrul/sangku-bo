import React,{Component} from 'react';
import Layout from 'components/Layout';
import Info from "../Dashboard/src/Info";
import connect from "react-redux/es/connect/connect";
import FormUser from "../../App/modals/user/form_user";
import DetailUser from "../../App/modals/user/detail_user";
import Paginationq, {copyTxt, statusQ} from "../../../helper";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import * as Swal from "sweetalert2";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {BrowserView, MobileView} from "react-device-detect";
import {
    confirmUserMember, FetchAllUserMember, FetchUserMember, putUserMember,
    setUserListAll
} from "../../../redux/actions/user/userMember.action";

class User extends Component{
    constructor(props){
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.handleIsActive = this.handleIsActive.bind(this);
        this.handleZoom = this.handleZoom.bind(this);
        this.handleSendEmail = this.handleSendEmail.bind(this);
        this.state={
            detail:{},
            detail_:{},
            dataEmail:[],
            status:"",
            formatEmail:"",
            email:"",
            any:"",
        }
    }
    getProps(param){
        let data = [];let data1=[];
        if(param.dataAll!==undefined){
            // this.launchEmail();
            if(param.dataAll.data!==undefined){
                if(param.dataAll.data.length>0){
                    param.dataAll.data.map((v,i)=>{
                        data.push(v.email);
                        // hasId = true;
                        // return;
                        // exit;
                    });
                    // if(data!==[]){
                    //     window.location = `mailto:${data.toString()}`;
                    //     // return;
                    // }
                    // this.setState({dataEmail:data});
                }
                // this.launcEmail();
            }

        }
        if(data!==[]){
            if(data.toString()!==''){
                window.location = `mailto:${data.toString()}`;
            }
            this.props.dispatch(setUserListAll([]));
        }
        // return data;
    }

    componentDidUpdate(prevProps,nextProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.forceUpdate();
            this.props.dispatch(FetchUserMember("page=1&q="+this.props.match.params.id));
        }
        if(prevProps.dataAll!==undefined){
            this.getProps(prevProps);
        }
    }

    componentWillMount(){
        if(this.props.match.params.id!==undefined){
            this.props.dispatch(FetchUserMember("page=1&q="+this.props.match.params.id));
            this.forceUpdate();
        }
        else{
            this.props.dispatch(FetchUserMember('page=1'));
        }
    }

    handleModal(e,param) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formUser"));
        this.props.dispatch(setUserListAll([]));
        if(param!==''){
            const {data}=this.props.data;
            let where = this.handleValidate();
            this.setState({
                detail:{
                    id:data[param].id,
                    name:data[param].name,
                    email:data[param].email,
                    status:data[param].status,
                    password:data[param].password,
                    conf_password:data[param].password,
                    id_card:data[param].id_card,
                    selfie:data[param].selfie,
                    foto:data[param].foto,
                    isAdmin:0,
                    where:where
                }
            });
        }
        else{
            this.setState({detail:undefined})
        }
    }

    componentWillUnmount(){
        this.props.dispatch(setUserListAll([]));
    }



    handleDetail(e,param) {
        e.preventDefault();
        this.props.dispatch(setUserListAll([]));
        // this.props.dispatch(FetchDetailUser(param));
        this.setState({detail_:{id:param.id,name:param.name}});
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailUser"));
    }
    handleIsActive(e,param){
        e.preventDefault();
        Swal.fire({
            title: 'Warning !!!',
            html:`You are sure ${param['status']===1?'approve':'block'} <b style="color:red">${param['nama']}</b> ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, ${param['status']===1?'approve':'block'} now!`,
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                let id = param['id'];
                let data  = {"status":param['status'],'isadmin':0};
                let where = this.handleValidate();
                if(param['status']===1){
                    this.props.dispatch(confirmUserMember({'isadmin':0},btoa(param['regist'].split("|")[0]),where));
                }
                else{
                    this.props.dispatch(putUserMember(data,id,where));
                }
            }
        })
    }
    handleZoom(e,param){
        e.preventDefault();
        Swal.fire({
            showClass   : {popup: 'animate__animated animate__fadeInDown'},
            hideClass   : {popup: 'animate__animated animate__fadeOutUp'},
            imageUrl    : param,
            imageAlt    : 'gambar tidak tersedia'
        })
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        let err = Object.assign({}, this.state.error, {
            [event.target.name]: ""
        });
        this.setState({
            error: err
        });
    }
    handlePageChange(pageNumber){
        localStorage.setItem("pagePengguna",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(FetchUserMember(where));
    }
    handleValidate(){
        this.props.dispatch(setUserListAll([]));
        let where="";
        let page = localStorage.getItem("pagePengguna");
        let any = this.state.any;
        let status = this.state.status;

        if(page!==null&&page!==undefined&&page!==""){
            where+=`&page=${page}`;
        }else{
            where+="&page=1";
        }
        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        if(status!==null&&status!==undefined&&status!==""){
            where+=`&status=${status}`;
        }
        return where;
    }
    handleSearch(e){
        e.preventDefault();
        this.props.history.push('/user');
        let where = this.handleValidate();
        this.props.dispatch(FetchUserMember(where));
    }
    handleSendEmail(e,perpage,lastpage){
        e.preventDefault();
        this.props.dispatch(FetchAllUserMember(`page=1&perpage=${perpage*lastpage}`));
    }



    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const rightStyle = {verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const {
            total,
            last_page,
            per_page,
            current_page,
            data
        } = this.props.data;
        let totalPerInvestment=0;
        let totalPerActiveBalance=0;
        let totalPerActiveSlot=0;
        let totalPerPayment=0;
        let totalPerRef=0;
        let totalPerRemaining=0;
        return (
            <Layout page={"member"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Member {this.state.dataEmail.toString()}</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    <Info handleSubmit={this.handleSubmit}/>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-xs-12 col-md-2">
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select name="status" className="form-control form-control-lg" defaultValue={this.state.status} value={this.state.status} onChange={this.handleChange}>
                                                <option value="">All Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">In Active</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-10 col-xs-10 col-md-3">
                                        <div className="form-group">
                                            <label>Write something here ..</label>

                                            <input type="text" className="form-control" name="any" placeholder={"search by wallet address,name,email"} value={this.state.any} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>

                                    <div className="col-1 col-xs-1 col-md-4">
                                        <BrowserView>
                                            <div className="form-group">
                                                {
                                                    !this.props.isLoading?(
                                                        <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                                    ):(
                                                        <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" className="btn btn-primary"><i className="fa fa-circle-o-notch fa-spin"/></button>

                                                    )
                                                }
                                                {
                                                    this.props.isLoadingSend?(

                                                        <button disabled={true} style={{marginTop:"27px",marginRight:"2px"}} type="button" className="btn btn-primary"><i className="fa fa-circle-o-notch fa-spin"/> Loading ..</button>
                                                    ):(
                                                        <button style={{marginTop:"27px",marginRight:"2px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleSendEmail(e,per_page,last_page)}><i className={"fa fa-send"}/> Send to all</button>
                                                    )
                                                }
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="form-group">
                                                <button style={{marginTop:"27px",marginRight:"2px"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                                {
                                                    this.props.isLoadingSend?(
                                                        <button disabled={true} style={{marginTop:"27px",marginRight:"2px"}} type="button" className="btn btn-primary btn-fixed-bottom"><i style={{fontSize:"20px"}} className="fa fa-circle-o-notch fa-spin"/> Loading ..</button>
                                                    ):(
                                                        <button style={{marginTop:"27px",marginRight:"2px"}} type="button" className="btn btn-primary btn-fixed-bottom" onClick={(e)=>this.handleSendEmail(e,per_page,last_page)}><i style={{fontSize:"20px"}} className={"fa fa-send"}/> Send to all</button>
                                                    )
                                                }
                                            </div>
                                        </MobileView>

                                    </div>
                                </div>
                                <div style={{overflowX: "auto",zoom:"90%"}}>
                                    <table className="table table-hover">
                                        <thead className="bg-light">
                                        <tr>
                                            <th className="text-black" style={columnStyle}>No</th>
                                            <th className="text-black" style={columnStyle}>#</th>
                                            <th className="text-black" style={columnStyle}>Wallet Address</th>
                                            <th className="text-black" style={columnStyle}>Name</th>
                                            <th className="text-black" style={columnStyle}>Email</th>
                                            <th className="text-black" style={columnStyle}>Investment</th>
                                            <th className="text-black" style={columnStyle}>Active Balance</th>
                                            <th className="text-black" style={columnStyle}>Active Slot</th>
                                            <th className="text-black" style={columnStyle}>Payment</th>
                                            <th className="text-black" style={columnStyle}>Remaining</th>
                                            <th className="text-black" style={columnStyle}>Total Ref</th>
                                            <th className="text-black" style={columnStyle}>BEP</th>
                                            <th className="text-black" style={columnStyle}>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {

                                                    typeof data === 'object' ? data.length>0?
                                                        data.map((v,i)=>{
                                                            totalPerInvestment = totalPerInvestment+parseFloat(v.investment);
                                                            totalPerActiveBalance = totalPerActiveBalance+parseFloat(v.active_balance);
                                                            totalPerActiveSlot = totalPerActiveSlot+parseFloat(v.active_slot);
                                                            totalPerPayment = totalPerPayment+parseFloat(v.payment);
                                                            totalPerRef = totalPerRef+parseFloat(v.reff);
                                                            totalPerRemaining = totalPerRemaining+parseFloat(v.investment-v.payment);
                                                            let faIsActive="";
                                                            let isStatus=0;
                                                            let isColor;
                                                            let bep;
                                                            let address=v.address;
                                                            if(v.status===2){
                                                                faIsActive="fa-check";
                                                                isStatus=1;
                                                                isColor="btn-warning";
                                                            }
                                                            if(v.status===1){
                                                                faIsActive="fa-ban";
                                                                isStatus=2;
                                                                isColor="btn-danger";
                                                            }
                                                            if(v.status===0){
                                                                faIsActive="fa-check";
                                                                isStatus=1;
                                                                isColor="btn-info";
                                                            }
                                                            if(v.bep===true){
                                                                bep = 1;
                                                            }else{
                                                                bep = 0;
                                                            }

                                                            return(
                                                                <tr key={i} style={{backgroundColor:this.props.match.params.id===v.id?"#eeeeee":""}}>
                                                                    <td style={columnStyle}>
                                                                        <span class="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                                    </td>
                                                                    <td style={columnStyle}>
                                                                        <button style={{marginRight:"5px"}} className={"btn btn-success btn-sm"} onClick={(e)=>this.handleDetail(e,{"id":v.id,"name":v.name})}><i className={"fa fa-eye"}/></button>
                                                                        <button style={{marginRight:"5px"}} className={`btn ${isColor} btn-sm`} onClick={(e)=>this.handleIsActive(e,{"status":isStatus,"id":v.id,"nama":v.name,"regist":v.regist_token})}><i className={`fa ${faIsActive}`} style={{color:"white"}}/></button>
                                                                        <a style={{marginRight:"5px"}} href={`mailto:${v.email}`} className="btn btn-primary btn-sm"><i className="fa fa-send"/></a>

                                                                    </td>
                                                                    <td style={columnStyle}>
                                                                        {copyTxt(address?address:'-')}
                                                                    </td>
                                                                    <td style={columnStyle}>{v.name}</td>
                                                                    <td style={columnStyle}>{v.email}</td>
                                                                    <td style={rightStyle}>{parseFloat(v.investment).toFixed(8)}</td>
                                                                    <td style={rightStyle}>{parseFloat(v.active_balance).toFixed(8)}</td>
                                                                    <td style={rightStyle}>{v.active_slot}</td>
                                                                    <td style={rightStyle}>{parseFloat(v.payment).toFixed(8)}</td>
                                                                    <td style={rightStyle}>{parseFloat(v.investment-v.payment).toFixed(8)}</td>
                                                                    <td style={rightStyle}>{parseFloat(v.reff)}</td>
                                                                    <td style={columnStyle}>{statusQ(bep)}</td>
                                                                    <td style={columnStyle}>{statusQ(v.status)}</td>

                                                                </tr>
                                                            )
                                                        })
                                                        : <tr><td colSpan={13} style={columnStyle}><img className="img-fluid" src={NOTIF_ALERT.NO_DATA}/></td></tr>
                                                    : (()=>{
                                                            let container =[];
                                                            for(let x=0; x<10; x++){
                                                                container.push(
                                                                    <tr key={x}>
                                                                        <td style={columnStyle}>{<Skeleton circle={true} height={40} width={40}/>}</td>
                                                                        <td style={columnStyle}>
                                                                            <div className="row">
                                                                                <div className="col-md-2">{<Skeleton height={30} width={30}/>}</div>
                                                                                <div className="col-md-2">{<Skeleton height={30} width={30}/>}</div>
                                                                                <div className="col-md-2">{<Skeleton height={30} width={30}/>}</div>
                                                                            </div>
                                                                        </td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton circle={true} height={30} width={30}/>}</td>
                                                                        <td style={columnStyle}>{<Skeleton circle={true} height={30} width={30}/>}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                            return container;
                                                        })()

                                        }
                                        </tbody>

                                        <tfoot>
                                            <tr style={{backgroundColor:"#eeeeee"}}>
                                                <th className="text-black" colspan={5}>TOTAL PERPAGE</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerInvestment.toFixed(8)}</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerActiveBalance.toFixed(8)}</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerActiveSlot}</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerPayment.toFixed(8)}</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerRemaining.toFixed(8)}</th>
                                                <th className="text-black" style={rightStyle} colspan={1}>{totalPerRef}</th>
                                                <th className="text-black" colspan={2}/>
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>
                                <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                                    <Paginationq
                                        current_page={current_page}
                                        per_page={per_page}
                                        total={total}
                                        callback={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FormUser detail={this.state.detail} isAdmin={0}/>
                <DetailUser detailUser={this.state.detail_}/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.userMemberReducer.isLoading,
        isLoadingDetail: state.userMemberReducer.isLoadingDetail,
        isLoadingSend: state.userMemberReducer.isLoadingSend,
        isOpen:state.modalReducer,
        data:state.userMemberReducer.data,
        dataAll:state.userMemberReducer.dataAll,
        detail:state.userMemberReducer.detail
    }
}


export default connect(mapStateToProps)(User);