import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toCurrency, toRp} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import FormBank from "../../modals/setting/bank.modal"
import * as Swal from "sweetalert2";
import {deleteBankList, getBankList,fetchDataBank} from "redux/actions/setting/bank.action";


class Bank extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD")
        };
        this.handleEvent    = this.handleEvent.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.handlePage     = this.handlePage.bind(this);
        this.handleSearch   = this.handleSearch.bind(this);
        this.handleDelete   = this.handleDelete.bind(this);
        this.handleModal   = this.handleModal.bind(this);

    }

    componentWillMount(){
        this.props.dispatch(getBankList(`page=1`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidate(){
        let where="";
        let page = localStorage.getItem("pageUserList");
        let dateFrom = this.state.dateFrom;
        let dateTo = this.state.dateTo;
        let any = this.state.any;
        localStorage.setItem("dateFromUserList",`${dateFrom}`);
        localStorage.setItem("dateToUserList",`${dateTo}`);

        if(page!==null&&page!==undefined&&page!==""){
            where+=`page=${page}`;
        }else{
            where+="page=1";
        }
        if(dateFrom!==null&&dateFrom!==undefined&&dateFrom!==""){
            where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        }

        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        return where;

    }

    handlePage(pageNumber){
        localStorage.setItem("pageUserList",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(getBankList(where));

    }
    handleEvent = (event, picker) => {
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        this.setState({
            dateFrom:from,
            dateTo:to
        });
    };
    handleSearch(e){
        e.preventDefault();
        let where = this.handleValidate();
        this.props.dispatch(getBankList(where));
    }
    handleModal(e,par){
        if(par!==''){
            this.setState({
                detail:{
                    id:this.props.data.data[par].id,
                    bank_name:this.props.data.data[par].bank_name,
                    acc_name:this.props.data.data[par].acc_name,
                    acc_no:this.props.data.data[par].acc_no,
                    tf_code:this.props.data.data[par].tf_code
                }
            })
        }
        else{
            this.setState({
                detail:{}
            })
        }
        this.props.dispatch(fetchDataBank());
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBankPerusahaan"));
    }

    handleDelete(e,id){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            html:`anda yakin akan menghapus data ini ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, Hapus`,
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteBankList(id));
            }
        })
    }


    render(){
        const headStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const {
            total,
            per_page,
            current_page,
            data
        } = this.props.data;
        return(
            <Layout page={"Bank Perusahaan"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Bank Perusahaan</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-6 col-xs-6 col-md-2">
                                        <div className="form-group">
                                            <label>Periode </label>
                                            <DateRangePicker
                                                autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                            </DateRangePicker>
                                        </div>
                                    </div>

                                    <div className="col-12 col-xs-12 col-md-3">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <input type="text" className="form-control" name="any" placeholder={"cari disini"} defaultValue={this.state.any} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>
                                    <div className="col-2 col-xs-2 col-md-4">
                                        <div className="form-group">
                                            <button style={{marginTop:"27px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                            <button style={{marginTop:"27px",marginLeft:"5px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleModal(e,'')}><i className="fa fa-plus"/></button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{overflowX: "auto",zoom:"80%"}}>
                                    <table className="table table-hover">
                                        <thead className="bg-light">
                                        <tr>
                                            <th className="text-black" style={headStyle}>NO</th>
                                            <th className="text-black" style={headStyle}>#</th>
                                            <th className="text-black" style={headStyle}>Bank</th>
                                            <th className="text-black" style={headStyle}>Atas Nama</th>
                                            <th className="text-black" style={headStyle}>No. Rekening</th>
                                            <th className="text-black" style={headStyle}>Dibuat pada</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof data === 'object' ? data.length > 0 ?
                                                data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td style={headStyle}>
                                                                <span className="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={headStyle}>
                                                                <button onClick={(e)=>this.handleModal(e,i)} className={"btn btn-secondary btn-sm"} style={{marginRight:"10px"}}><i className={"fa fa-pencil"}/></button>
                                                                <button onClick={(e)=>this.handleDelete(e,v.id)} className={"btn btn-danger btn-sm"}><i className={"fa fa-close"}/></button>
                                                            </td>
                                                            <td style={headStyle}>{v.bank_name}</td>
                                                            <td style={headStyle}>{v.acc_name}</td>
                                                            <td style={headStyle}>{v.acc_no}</td>
                                                            <td style={headStyle}>{moment(v.created_at).locale('id').format("ddd, Do MMM YYYY hh:mm:ss")}</td>
                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={7} style={headStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
                                                </tr>
                                                :(()=>{
                                                    let container =[];
                                                    for(let x=0; x<10; x++){
                                                        container.push(
                                                            <tr key={x}>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                                <td>{<Skeleton/>}</td>
                                                            </tr>
                                                        )
                                                    }
                                                    return container;
                                                })()

                                        }
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                                    <Paginationq
                                        current_page={current_page}
                                        per_page={per_page}
                                        total={total}
                                        callback={this.handlePage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isOpen===true?<FormBank data={this.state.detail}/>:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.banksReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.banksReducer.data,
    }
}


export default connect(mapStateToProps)(Bank);