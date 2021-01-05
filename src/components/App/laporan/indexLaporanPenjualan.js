import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toCurrency, toRp} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import DetailAlamat from "../modals/masterdata/member/detail_alamat"
import DetailBank from "../modals/masterdata/member/detail_bank"
import {getMember, putMember} from "../../../redux/actions/masterdata/member.action";
import UncontrolledButtonDropdown from "reactstrap/es/UncontrolledButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import {getDetailAlamat} from "../../../redux/actions/masterdata/alamat.action";
import {getDetailBank} from "../../../redux/actions/masterdata/bank.action";
import * as Swal from "sweetalert2";


class IndexLaporanPenjualan extends Component{
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
    }

    componentWillMount(){
        this.props.dispatch(getMember(`page=1`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidate(){
        let where="";
        let page = localStorage.getItem("pageMember");
        let dateFrom = this.state.dateFrom;
        let dateTo = this.state.dateTo;
        let any = this.state.any;
        localStorage.setItem("dateFromMember",`${dateFrom}`);
        localStorage.setItem("dateToMember",`${dateTo}`);

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
        localStorage.setItem("pageMember",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(getMember(where));

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
        this.props.dispatch(getMember(where));
    }



    render(){
        const headStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numberStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const stringStyle ={verticalAlign: "middle", textAlign: "left",whiteSpace: "nowrap"};
        const {
            total,
            per_page,
            offset,
            to,
            last_page,
            current_page,
            from,
            data
        } = this.props.data;

        let totSaldo=0;
        let totPenarikan=0;
        return(
            <Layout page={"Member"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Member</h5>
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
                                            <th className="text-black" style={headStyle}>No</th>
                                            <th className="text-black" style={headStyle}>#</th>
                                            <th className="text-black" style={headStyle}>Foto</th>
                                            <th className="text-black" style={headStyle}>Nama</th>
                                            <th className="text-black" style={headStyle}>Telepon</th>
                                            <th className="text-black" style={headStyle}>Saldo</th>
                                            <th className="text-black" style={headStyle}>Penarikan</th>
                                            <th className="text-black" style={headStyle}>Sponsor</th>
                                            <th className="text-black" style={headStyle}>PIN</th>
                                            <th className="text-black" style={headStyle}>Kaki Kanan</th>
                                            <th className="text-black" style={headStyle}>Kaki Kiri</th>
                                            <th className="text-black" style={headStyle}>Status Member</th>
                                            <th className="text-black" style={headStyle}>Kode Referral</th>
                                            <th className="text-black" style={headStyle}>Status Aktif</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof data === 'object' ? data.length > 0 ?
                                                data.map((v, i) => {
                                                    totSaldo = totSaldo+parseInt(v.saldo,10);
                                                    totPenarikan = totPenarikan+parseInt(v.total_payment,10);
                                                    return (
                                                        <tr key={i}>
                                                            <td style={headStyle}>
                                                                <span className="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={headStyle}>
                                                                <div className="btn-group">
                                                                    <UncontrolledButtonDropdown>
                                                                        <DropdownToggle caret>
                                                                            Aksi
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem onClick={(e)=>this.handleAlamat(e,v.id)}>Alamat</DropdownItem>
                                                                            <DropdownItem onClick={(e)=>this.handleBank(e,v.id)}>Bank</DropdownItem>
                                                                            <DropdownItem onClick={(e)=>this.handleUpdate(e,v.id,v.full_name,v.status===0?1:0)}>Ubah Status</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledButtonDropdown>
                                                                </div>
                                                            </td>
                                                            <td style={headStyle}>
                                                                <img style={{width:'30px'}} src={v.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="member image"/>
                                                            </td>
                                                            <td style={headStyle}>{v.full_name}</td>
                                                            <td style={headStyle}>{v.mobile_no}</td>
                                                            <td style={numberStyle}>Rp {v.saldo==='0'?0:toCurrency(parseInt(v.saldo,10))} .-</td>
                                                            <td style={numberStyle}>Rp {v.total_payment==='0'?0:toCurrency(parseInt(v.total_payment,10))} .-</td>
                                                            <td style={numberStyle}>{v.sponsor}</td>
                                                            <td style={numberStyle}>{v.pin}</td>
                                                            <td style={numberStyle}>{v.left_pv}</td>
                                                            <td style={numberStyle}>{v.right_pv}</td>
                                                            <td style={headStyle}>{v.membership}</td>
                                                            <td style={headStyle}>{v.referral_code}</td>
                                                            <td style={headStyle}>{statusQ(v.status)}</td>

                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={14} style={headStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
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
                                        <tfoot style={{backgroundColor:"#EEEEEE"}}>
                                        <tr>
                                            <td colSpan={5}>TOTAL PERPAGE</td>
                                            <td style={numberStyle}>Rp {totSaldo===0?0:toCurrency(totSaldo)} .-</td>
                                            <td style={numberStyle}>Rp {totPenarikan===0?0:toCurrency(totPenarikan)} .-</td>
                                            <td colSpan={7}/>

                                        </tr>
                                        </tfoot>
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
                    localStorage.isAlamat === "true" ? <DetailAlamat
                        detail={this.props.detailAlamat}
                    /> : null
                }
                {
                    localStorage.isBank === "true"?<DetailBank
                        detail={this.props.detailBank}
                    />:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.memberReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.memberReducer.data,
        detailAlamat:state.alamatReducer.data,
        detailBank:state.bankReducer.data
    }
}


export default connect(mapStateToProps)(IndexLaporanPenjualan);