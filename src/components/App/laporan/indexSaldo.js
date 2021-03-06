import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {rangeDate, noImage, rmComma, ToastQ, toCurrency, toRp, toExcel} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import DetailLaporanSaldo from '../modals/laporan/detail_laporan_saldo';
import {getExcelLaporanSaldo, getLaporanSaldo} from "../../../redux/actions/ewallet/saldo.action";
import XLSX from 'xlsx'
import {fetchKategori} from "../../../redux/actions/kategori/kategori.action";
import Select from 'react-select';

class IndexSaldo extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            data:[],
            isLoading:true,
            membership_data:[],
            membership:''
        };
        this.handleChange      = this.handleChange.bind(this);
        this.handlePage      = this.handlePage.bind(this);
        this.handleSearch      = this.handleSearch.bind(this);
        this.handleEvent      = this.handleEvent.bind(this);
        this.handleDetail      = this.handleDetail.bind(this);
        this.printDocumentXLsx      = this.printDocumentXLsx.bind(this);
        this.HandleChangeMembership      = this.HandleChangeMembership.bind(this);

    }
    handleValidate(){
        let page = localStorage.pageLaporanSaldo!==undefined?localStorage.pageLaporanSaldo:"1";
        let dateFrom=localStorage.dateFromLaporanSaldo!==undefined?localStorage.dateFromLaporanSaldo:this.state.dateFrom;
        let dateTo=localStorage.dateToLaporanSaldo!==undefined?localStorage.dateToLaporanSaldo:this.state.dateTo;
        let any = this.state.any;
        let membership = this.state.membership;
        let where=`page=${page}&perpage=10&datefrom=${dateFrom}&dateto=${dateTo}`;
        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        if(membership!==null&&membership!==undefined&&membership!==""){
            where+=`&membership=${membership}`;
        }
        return where;

    }
    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    componentWillUnmount(){
        localStorage.removeItem("dateFromLaporanSaldo");
        localStorage.removeItem("dateToLaporanSaldo");
        localStorage.removeItem("pageLaporanSaldo");
    }
    componentWillMount(){
        let where=this.handleValidate();
        this.props.dispatch(getLaporanSaldo(where));
        this.props.dispatch(fetchKategori(`membership`));

    }
    componentWillReceiveProps(nextProps){
        let membership=[];
        if(nextProps.kategori.data!==undefined){
            if(nextProps.kategori.data.length>0){
                nextProps.kategori.data.map((v,i)=>{
                    membership.push({value:v.title,label:v.title});
                })
            }else {
                membership = [];
            }
            this.setState({membership_data:membership});
        }
    }
    HandleChangeMembership(val){
        this.setState({
            membership:val.value
        })
    }
    handleSearch(e){
        e.preventDefault();
        localStorage.setItem("dateFromLaporanSaldo",`${this.state.dateFrom}`);
        localStorage.setItem("dateToLaporanSaldo",`${this.state.dateTo}`);
        localStorage.removeItem("pageLaporanSaldo");
        let where = this.handleValidate();
        this.props.dispatch(getLaporanSaldo(where));
    }
    handlePage(num){
        localStorage.setItem("pageLaporanSaldo",num);
        let where = this.handleValidate();
        this.props.dispatch(getLaporanSaldo(where));

    }
    handleEvent = (event, picker) => {
        event.preventDefault();
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        this.setState({
            dateFrom:from,
            dateTo:to
        });
    };
    handleDetail(e,id,nama){
        e.preventDefault();
        this.setState({detail:{"id":id,"nama":nama}});
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailLaporanSaldo"));
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.dataExcel.data!==this.props.dataExcel.data){
            this.getExcel(this.props);
        }
    }
    getExcel(props){
        if(props.dataExcel.data!==undefined){
            if(props.dataExcel.data.length>0){
                let content=[];
                props.dataExcel.data.map((v,i)=>{
                    content.push([
                        v.full_name,
                        v.membership,
                        parseInt(v.plafon,10),
                        parseInt(v.saldo_awal,10),
                        parseInt(v.trx_in,10),
                        parseInt(v.trx_out,10),
                        parseInt(v.saldo_akhir,10),
                    ]);
                });
                toExcel(
                    'LAPORAN TRASANSAKSI MEMBER',
                    `${this.state.dateFrom} - ${this.state.dateTo}`,
                    [
                        'NAMA',
                        'MEMBERSHIP',
                        'PLAFON',
                        'SALDO AWAL',
                        'SALDO MASUK',
                        'SALDO KELUAR',
                        'SALDO AKHIR',
                    ],
                    content,
                    [
                        [''],
                        [''],
                        [
                            'TOTAL',
                            '',
                            props.dataExcel.summary===undefined?0:parseInt(props.dataExcel.summary.plafon,10),
                            props.dataExcel.summary===undefined?0:parseInt(props.dataExcel.summary.saldo_awal,10),
                            props.dataExcel.summary===undefined?0:parseInt(props.dataExcel.summary.trx_in,10),
                            props.dataExcel.summary===undefined?0:parseInt(props.dataExcel.summary.trx_out,10),
                            props.dataExcel.summary===undefined?0:parseInt(props.dataExcel.summary.saldo_akhir,10)
                        ]
                    ]
                )
            }
        }
    }
    printDocumentXLsx = (e,param) => {
        e.preventDefault();
        let where=`perpage=${param}&datefrom=${this.state.dateFrom}&dateto=${this.state.dateTo}`;
        if(this.state.any!==null&&this.state.any!==undefined&&this.state.any!==""){
            where+=`&q=${this.state.any}`;
        }
        if(this.state.membership!==null&&this.state.membership!==undefined&&this.state.membership!==""){
            where+=`&membership=${this.state.membership}`;
        }
        this.props.dispatch(getExcelLaporanSaldo(where));
    }

    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        // const data = this.state.data;
        let totPlafon=0;
        let totSaldoAwal=0;
        let totSaldoAkhir=0;
        let totTrxIn=0;
        let totTrxOut=0;
        const {
            total,
            per_page,
            offset,
            to,
            last_page,
            current_page,
            from,
            data,
            summary
        } = this.props.data;
        return(
            <Layout page={"Laporan Saldo"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Laporan Saldo</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-6 col-xs-6 col-md-3">
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
                                                    <input type="text" className="form-control" name="any" placeholder={"cari disini"} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                                </div>
                                            </div>
                                            <div className="col-12 col-xs-12 col-md-3">
                                                <div className="form-group">
                                                    <label>Membership</label>
                                                    {
                                                        typeof this.props.kategori.data === 'object' ?
                                                            (
                                                                <Select
                                                                    options={this.state.membership_data}
                                                                    placeholder="Pilih Membership"
                                                                    onChange={this.HandleChangeMembership}
                                                                    value={
                                                                        this.state.membership_data.find(op => {
                                                                            return op.value === this.state.membership
                                                                        })
                                                                    }

                                                                />
                                                            )
                                                            : <Skeleton height={40}/>
                                                    }

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-6 col-md-2" style={{textAlign:"right"}}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary" onClick={this.handleSearch}>
                                                        <i className="fa fa-search"/>
                                                    </button>
                                                    <button style={{marginTop:"28px",marginRight:"5px"}} className="btn btn-primary"  onClick={(e => this.printDocumentXLsx(e,per_page*last_page))}>
                                                        <i className="fa fa-print"/> {!this.props.isLoadingExcel?'Export':'loading...'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{overflowX: "auto"}}>
                                    <table className="table table-hover table-bordered">
                                        <thead className="bg-light">
                                        <tr>
                                            <th className="text-black" rowSpan="2" style={columnStyle}>NO</th>
                                            <th className="text-black" rowSpan="2" style={columnStyle}>#</th>
                                            <th className="text-black" rowSpan="2" style={columnStyle}>NAMA</th>
                                            <th className="text-black" rowSpan="2" style={columnStyle}>MEMBERSHIP</th>
                                            <th className="text-black" rowSpan="2" style={columnStyle}>PLAFON</th>
                                            <th className="text-black" colSpan="4" style={columnStyle}>SALDO</th>
                                        </tr>
                                        <tr>
                                            <th className="text-black" style={columnStyle}>AWAL</th>
                                            <th className="text-black" style={columnStyle}>MASUK</th>
                                            <th className="text-black" style={columnStyle}>KELUAR</th>
                                            <th className="text-black" style={columnStyle}>AKHIR</th>
                                        </tr>


                                        </thead>
                                        <tbody>
                                        {

                                            !this.props.isLoading? typeof data==='object'? data.length > 0 ?
                                                data.map((v, i) => {
                                                    totPlafon=totPlafon+parseInt(v.plafon,10);
                                                    totSaldoAwal=totSaldoAwal+parseInt(v.saldo_awal,10);
                                                    totSaldoAkhir=totSaldoAkhir+parseInt(v.saldo_akhir,10);
                                                    totTrxIn=totTrxIn+parseInt(v.trx_in,10);
                                                    totTrxOut=totTrxOut+parseInt(v.trx_out,10);
                                                    return (
                                                        <tr key={i}>
                                                            <td style={columnStyle}>
                                                                <span className="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={columnStyle}>
                                                                <button className={"btn btn-primary btn-sm"} onClick={(e)=>this.handleDetail(e,v.id,v.full_name)}><i className={"fa fa-eye"}/></button>
                                                            </td>

                                                            <td style={columnStyle}>{v.full_name}</td>
                                                            <td style={columnStyle}>{v.membership}</td>
                                                            <td className={"txtRed"} style={numStyle}>Rp {parseInt(v.plafon,10)===0?0:toCurrency(v.plafon)} .-</td>
                                                            <td className={"txtRed"} style={numStyle}>Rp {parseInt(v.saldo_awal,10)===0?0:toCurrency(v.saldo_awal)} .-</td>
                                                            <td className={"txtRed"} style={numStyle}>Rp {parseInt(v.trx_in,10)===0?0:toCurrency(v.trx_in)} .-</td>
                                                            <td className={"txtRed"} style={numStyle}>Rp {parseInt(v.trx_out,10)===0?0:toCurrency(v.trx_out)} .-</td>
                                                            <td className={"txtRed"} style={numStyle}>Rp {parseInt(v.saldo_akhir,10)===0?0:toCurrency(v.saldo_akhir)} .-</td>

                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={9} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
                                                </tr>:
                                                <tr>
                                                    <td colSpan={9} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
                                                </tr> : (()=>{
                                                let container =[];
                                                for(let x=0; x<10; x++){
                                                    container.push(
                                                        <tr key={x}>
                                                            <td style={columnStyle}>{<Skeleton circle={true} height={40} width={40}/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                            <td style={columnStyle}>{<Skeleton/>}</td>
                                                        </tr>
                                                    )
                                                }
                                                return container;
                                            })()
                                        }
                                        </tbody>
                                        <tfoot style={{backgroundColor:"#EEEEEE"}}>
                                        <tr>
                                            <th colSpan={4}>TOTAL PERHALAMAN</th>
                                            <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {totPlafon===0?0:toCurrency(totPlafon)} .-</th>
                                            <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {totSaldoAwal===0?0:toCurrency(totSaldoAwal)} .-</th>
                                            <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {totTrxIn===0?0:toCurrency(totTrxIn)} .-</th>
                                            <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {totTrxOut===0?0:toCurrency(totTrxOut)} .-</th>
                                            <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {totSaldoAkhir===0?0:toCurrency(totSaldoAkhir)} .-</th>

                                        </tr>
                                        {

                                            !this.props.isLoading?summary!==undefined?(
                                                <tr>
                                                    <th colSpan={4}>TOTAL KESELURUHAN</th>
                                                    <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {parseInt(summary.plafon,10)===0?0:toCurrency(parseInt(summary.plafon,10))} .-</th>
                                                    <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {parseInt(summary.saldo_awal,10)===0?0:toCurrency(parseInt(summary.saldo_awal,10))} .-</th>
                                                    <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {parseInt(summary.trx_in,10)===0?0:toCurrency(parseInt(summary.trx_in,10))} .-</th>
                                                    <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {parseInt(summary.trx_out,10)===0?0:toCurrency(parseInt(summary.trx_out,10))} .-</th>
                                                    <th className={"txtRed"} colSpan={1} style={numStyle}>Rp {parseInt(summary.saldo_akhir,10)===0?0:toCurrency(parseInt(summary.saldo_akhir,10))} .-</th>

                                                </tr>
                                            ):null:null
                                        }

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
                    this.props.isOpen===true?<DetailLaporanSaldo detail={this.state.detail}/>:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.saldoReducer.isLoading,
        isLoadingExcel: state.saldoReducer.isLoadingExcel,
        isOpen:state.modalReducer,
        data:state.saldoReducer.data,
        dataExcel:state.saldoReducer.excel,
        kategori:state.kategoriReducer.data,

    }
}


export default connect(mapStateToProps)(IndexSaldo);