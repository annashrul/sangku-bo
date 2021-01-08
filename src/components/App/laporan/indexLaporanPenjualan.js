import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toCurrency, toRp} from "../../../helper";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import DetailAlamat from "../modals/masterdata/member/detail_alamat"
import DetailBank from "../modals/masterdata/member/detail_bank"
import {getMember, putMember} from "../../../redux/actions/masterdata/member.action";
import Image1 from '../../../assets/dollar.svg';
import Image2 from '../../../assets/pack_delivery.svg';
import Image3 from '../../../assets/truck.svg';
import Image4 from '../../../assets/truck_clock.svg';
import Image5 from '../../../assets/pack_delivered.svg';
import {getLaporanPenjualan} from "../../../redux/actions/laporan/laporan_penjualan.action";
import ReactToPrint from "react-to-print";
import Link from "react-router-dom/es/Link";

class IndexLaporanPenjualan extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            isCheckedPrintAll:false,
            isLoading:true,
            dataPenjualan:[],
            dataTrx:[],
            kdTrx:''
        };
        this.handleEvent    = this.handleEvent.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.handlePage     = this.handlePage.bind(this);
        this.handleSearch   = this.handleSearch.bind(this);
        this.handlePrint   = this.handlePrint.bind(this);
    }
    componentWillUnmount(){
        // localStorage.removeItem('kode_trx_penjualan');
        // this.setState({dataTrx:[]});
    }

    componentDidMount(){
        localStorage.removeItem('kode_trx_penjualan');
        this.setState({dataTrx:[]});
    }
    componentWillMount(){
        localStorage.removeItem('kode_trx_penjualan');
        this.setState({dataTrx:[]});
        this.props.dispatch(getLaporanPenjualan());
    }

    componentWillReceiveProps(nextProps){
        let isLoading=true;
        let data=[];
        if(typeof nextProps.data.data === 'object'){
            if(nextProps.data.data.length>0){
                for(let i=0;i<nextProps.data.data.length;i++){
                    data.push(Object.assign(nextProps.data.data[i],{isChecked:false,resi_no:''}));
                }
                isLoading=false;
            }
        }
        this.setState({isLoading:isLoading,dataPenjualan:data});
    }
    removeItem(arr, value) {
        var b = '';
        for (b in arr) {
            if (arr[b] === value) {
                arr.splice(b, 1);
                break;
            }
        }
        return arr;
    }
    handleChange = (e,i=null) => {
        let column = e.target.name;
        let value = e.target.value;
        let checked = e.target.checked;
        let dataPenjualan = [...this.state.dataPenjualan];
        let kdTrx='';
        let dataTrx=this.state.dataTrx;
        if(column==='isCheckedPrintAll'){

            // if(checked===false){
            //     this.removeItem(dataTrx,dataPenjualan);
            //     // localStorage.removeItem('kode_trx_penjualan');
            // }
            // else{
            //     // dataPenjualan.map((v,i)=>{
            //     //     if(checked===true){
            //     //         v.isChecked=true;
            //     //         dataTrx.push(v.kd_trx);
            //     //     }else{
            //     //         v.isChecked=false;
            //     //         this.removeItem(dataPenjualan,v.kd_trx);
            //     //     }
            //     //
            //     //     // kdTrx+= (i>0 ? ",":"") + v.kd_trx;
            //     //
            //     //     // if(v.isChecked===false){
            //     //     //     this.removeItem(dataPenjualan,v.kd_trx);
            //     //     // }
            //     //
            //     // });
            //     // localStorage.setItem("kode_trx_penjualan",dataTrx.toString());
            // }
            dataPenjualan.map((v,i)=>{
                if(checked===true){
                    v.isChecked=true;
                    dataTrx.push(v.kd_trx);
                }else{
                    v.isChecked=false;
                    this.removeItem(dataTrx,v.kd_trx);
                    localStorage.removeItem('kode_trx_penjualan');
                }

                // kdTrx+= (i>0 ? ",":"") + v.kd_trx;

                // if(v.isChecked===false){
                //     this.removeItem(dataPenjualan,v.kd_trx);
                // }

            });
            localStorage.setItem("kode_trx_penjualan",dataTrx.toString());
            // console.log(dataTrx);
            this.setState({[column]:checked,dataPenjualan:dataPenjualan,kdTrx:dataTrx.toString()});
            return;
        }
        if(column==='isChecked'){
            dataPenjualan[i] = {...dataPenjualan[i], [column]: checked};
            if(dataPenjualan[i].isChecked===true){
                dataTrx.push(dataPenjualan[i].kd_trx);
                this.setState({isCheckedPrintAll:true});
            }
            else{

                this.removeItem(dataTrx,dataPenjualan[i].kd_trx);
                if(dataTrx.length===0){
                    this.setState({isCheckedPrintAll:false});
                }
                console.log(dataTrx.length);
            }
            localStorage.setItem("kode_trx_penjualan",dataTrx.toString());
            // console.log(dataTrx);
            this.setState({dataPenjualan:dataPenjualan,kdTrx:dataTrx.toString()});
            return;
        }
        dataPenjualan[i] = {...dataPenjualan[i], [column]: value};
        this.setState({dataPenjualan:dataPenjualan});
        // this.setState({dataPenjualan:dataPenjualan});


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
    handlePrint() {
        var content = document.getElementById('printarea');
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }


    render(){
        console.log("DATA TRX",this.state.dataTrx);
        const headStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numberStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const stringStyle ={verticalAlign: "middle", textAlign: "left",whiteSpace: "nowrap"};
        const lnr ={borderBottom: '1px dashed #ddd',paddingBottom:'5px',marginBottom:'15px'};
        const trStatus={
            width:'50px',
            height:'50px',
            display:'inlineBlock',
            borderRadius:'50%',
            marginRight:'6px',
            marginBottom:'6px',
            textAlign:'center',
            paddingTop:'8px',
            border:'2px solid #34b471',
            // backgroundColor:'#34b471',
            float:'left'
        };
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
            <Layout page={"Laporan Penjualan"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Laporan Penjualan</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card" style={{zoom:"90%"}}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-2">
                                        <div className="form-group">
                                            <label>Periode </label>
                                            <DateRangePicker
                                                autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                            </DateRangePicker>
                                        </div>
                                    </div>

                                    <div className="col-6 col-xs-6 col-md-3">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <input type="text" className="form-control" name="any" placeholder={"cari disini"} defaultValue={this.state.any} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'red'}}>
                                            <div className="card-body">
                                                <center><i style={{fontSize:'60px',color:'white'}} className={"fa fa-files-o"}/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>SEMUA</h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'purple'}}>
                                            <div className="card-body">
                                                <center>
                                                    <img style={{height:'60px'}} src="https://thaibah.com/admin/public/icon/pack_delivery2.svg" alt=""/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>DIPROSES</h4>

                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'#ffd600'}}>
                                            <div className="card-body">
                                                <center><i style={{fontSize:'60px',color:'white'}} className={"fa fa-file-text"}/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>BELUM ADA RESI</h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'blue'}}>
                                            <div className="card-body">
                                                <center><i style={{fontSize:'60px',color:'white'}} className={"fa fa-search"}/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>BELUM DILACAK</h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'#00bcd4'}}>
                                            <div className="card-body">
                                                <center>
                                                    <img style={{height:'60px'}} src="https://thaibah.com/admin/public/icon/truck-2.svg" alt=""/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>DIKIRIM</h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-2 box-margin">
                                        <div className="card" style={{backgroundColor:'green'}}>
                                            <div className="card-body">
                                                <center>
                                                    <img style={{height:'60px'}} src="https://thaibah.com/admin/public/icon/pack_delivered2.svg" alt=""/><br/><br/>
                                                    <h4 style={{fontSize:'14px',color:'white'}}>DITERIMA</h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-10 col-xs-10 col-md-11">
                                        {
                                            this.state.dataTrx.length>0?(
                                                <Link to='/print_laporan_penjualan' style={{pointerEvents:this.state.isCheckedPrintAll===false?'none':''}}>
                                                    <button className={"btn btn-info btn-block"} style={{letterSpacing:'3px'}}> <i className={'fa fa-print'}/> PRINT LABEL PENGIRIMAN</button>
                                                </Link>
                                            ):(
                                                <button className={"btn btn-info btn-block"} style={{letterSpacing:'3px'}}> <i className={'fa fa-print'}/> PRINT LABEL PENGIRIMAN</button>
                                            )
                                        }

                                    </div>
                                    <div className="col-2 col-xs-2 col-md-1">
                                        <input style={{height:'35px',width:'35px'}} name={"isCheckedPrintAll"} checked={this.state.isCheckedPrintAll} type="checkbox" onChange={(e)=>this.handleChange(e,null)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="vertical-timeline" className="vertical-container light--timeline">

                        {
                            this.state.isLoading===false?this.state.dataPenjualan.length>0?this.state.dataPenjualan.map((v,i)=>{
                                let sts = v.status;
                                let col='';
                                if(this.state.isCheckedPrintAll&&v.isChecked){
                                    col='5px solid green'
                                }
                                if(v.isChecked===false){
                                   col='';
                                }
                                return(

                                    <div key={i} className="vertical-timeline-block" style={{zoom:'90%'}}>
                                        <div className="vertical-timeline-icon bg-info btn-floating pulse">
                                           <span style={{marginLeft:"-3px",marginTop:"-5px"}} className={"circle"}>
                                               {i+1 + (10 * (parseInt(current_page,10)-1))}
                                           </span>
                                        </div>
                                        <div className="vertical-timeline-content card" style={{border:col}}>
                                            <div id={'printarea'}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <h4 style={lnr}>
                                                                {v.kd_trx}
                                                            </h4>
                                                            <small>Dikirim Kepada</small>
                                                            <p style={lnr}><span>{v.full_name}</span></p>
                                                            <p style={lnr}><small>Tgl Pemesanan</small><br/>{moment(v.created_at).format('LLLL')}</p>
                                                            <small>Alamat</small>
                                                            <p style={lnr}><span>{v.main_address}</span></p>
                                                            <small>Telepon</small>
                                                            <p style={lnr}><span>{v.no_hp}</span></p>

                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="scrollbar"  style={{height:'390px',maxHeight:'100%',overflowY:'auto'}}>
                                                                <div style={lnr}><small>Produk</small><br/>
                                                                    {
                                                                        v.detail.length>0?v.detail.map((val,key)=>{
                                                                            return(
                                                                                <div key={key} className="media" style={{backgroundColor:'#cfd8dc',borderRadius:'10px',marginBottom:'5px'}}>
                                                                                    <img style={{backgroungSize:'cover'}} src={val.foto} className="mr-3 media-thumb" alt="..."/>
                                                                                    <div className="media-body text-danger" style={{paddingRight:'10px'}}>
                                                                                        <h5 className="font-17 text-success" style={{marginTop:'8px'}}>{val.paket}</h5>
                                                                                        <small style={{float:'left'}}>Rp {toCurrency(val.price)} .-</small>
                                                                                        <small style={{float:'right'}}>{val.qty} barang</small>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }):''
                                                                    }
                                                                </div>
                                                                <p style={lnr}><small>Ongkir</small><br/>Rp {toCurrency(v.ongkir)} .-</p>
                                                                <p style={lnr}><small>Ongkir</small><br/>Rp {toCurrency(v.ongkir)} .-</p>
                                                                <p style={lnr}><small>Metode Pembayaran</small><br/>{v.metode_pembayaran}</p>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="alert alert-success">
                                                                <center>
                                                                    <p style={{color:'white',letterSpacing:'3px'}}>TOTAL PEMBAYARAN</p>
                                                                    <hr/>
                                                                    <h5 className="med" data-toggle="tooltip" data-placement="top" title="sudah bayar">
                                                                        <span style={{color:'white',letterSpacing:'5px'}}>Rp {toCurrency(v.grand_total)} .-</span>
                                                                    </h5>
                                                                    <hr/>
                                                                </center>

                                                            </div>
                                                            <button className={"btn btn-block btn-outline-primary"}>
                                                                <i className={"fa fa-upload"}/><br/>
                                                                Upload Bukti Transfer
                                                            </button>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <p className="mbtm-10">Status Transaksi</p>
                                                            <div className="tr-status" style={{display: 'flex', alignItems: 'flex-start'}}>
                                                                <ul style={{listStyle:'none',padding:'0',marginBottom:'20px'}}>
                                                                    <li className="done" data-toggle="tooltip" data-placement="top" title={'Menunggu Pembayaran'} data-original-title={'Menunggu Pembayaran'}>
                                                                        <img style={{maxWidth:'30px', maxHeight:'30px'}} id="dollar" className="svg icon" src={Image1}/>
                                                                    </li>
                                                                    <li className={sts===1||sts>1?'done':'undone'} data-toggle="tooltip" data-placement="top" title={'Dikemas'} data-original-title={'Dikemas'}>
                                                                        <img style={{maxWidth:'30px', maxHeight:'30px'}} id="dollar" className="svg icon" src={Image2}/>
                                                                    </li>
                                                                    <li className={sts===2||sts>2?'done':'undone'} data-toggle="tooltip" data-placement="top" title={'Dikirim'} data-original-title={'Dikirim'}>
                                                                        <img style={{maxWidth:'30px', maxHeight:'30px'}} id="dollar" className="svg icon" src={Image3}/>
                                                                    </li>
                                                                    <li className={sts===3||sts>3?'done':'undone'} data-toggle="tooltip" data-placement="top" title={'Selesai'} data-original-title={'Selesai'}>
                                                                        <img style={{maxWidth:'30px', maxHeight:'30px'}} id="dollar" className="svg icon" src={Image4}/>
                                                                    </li>
                                                                    <li className={sts===4||sts>4?'done':'undone'} data-toggle="tooltip" data-placement="top" title={'Dibatalkan'} data-original-title={'Dibatalkan'}>
                                                                        <img style={{maxWidth:'30px', maxHeight:'30px'}} id="dollar" className="svg icon" src={Image5}/>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <small>Expedisi</small>
                                                            <p style={lnr}><span>{v.layanan_pengiriman}</span></p>
                                                            <small>No.Resi</small>
                                                            <p>
                                                                <span style={{float:'left'}}>{v.resi}</span>
                                                                {
                                                                    v.resi!=='-'?(
                                                                        <span style={{float:'right'}}>
                                                                    <a href={''}>Lacak Resi</a>
                                                                </span>
                                                                    ):''
                                                                }
                                                            </p>
                                                            <p style={lnr}/>
                                                            <div className="form-group">
                                                                <div className="input-group mb-2">
                                                                    <input disabled={v.resi!=='-'} type="text" className="form-control" name="resi_no" placeholder={"masukan no resi disini ....."} value={v.resi_no} onChange={(e)=>this.handleChange(e,i)}/>
                                                                    <div className="input-group-prepend">
                                                                        <button disabled={v.resi!=='-'} className="btn btn-primary" onClick={(event)=>this.handleSearch(event)}>
                                                                            <i className="fa fa-send"/>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <input name={"isChecked"} checked={v.isChecked} type="checkbox" onChange={(e)=>this.handleChange(e,i)} />
                                                            <Link to='/print_laporan_penjualan' style={{pointerEvents:v.isChecked===false?'none':''}}>
                                                                <button className="btn btn-sm btn-info" style={{marginLeft:'10px'}}>
                                                                    <span className="fa fa-print"/> PRINT LABEL PENGIRIMAN
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );
                            }):'':(()=>{
                                let container =[];
                                for(let i=0; i<1; i++){
                                    container.push(
                                        <div key={i} className="card" style={{zoom:'90%',marginBottom:'10px'}}>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h4 style={lnr}><Skeleton/></h4>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <p style={lnr}><small><Skeleton/></small><br/><Skeleton/></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4 style={lnr}><Skeleton/></h4>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <p style={lnr}><small><Skeleton/></small><br/><Skeleton/></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4 style={lnr}><Skeleton/></h4>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <p style={lnr}><small><Skeleton/></small><br/><Skeleton/></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h4 style={lnr}><Skeleton/></h4>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <p style={lnr}><small><Skeleton/></small><br/><Skeleton/></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                        <small><Skeleton/></small>
                                                        <p style={lnr}><span><Skeleton/></span></p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }
                                return container;
                            })()
                        }
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
        isLoading: state.laporanPenjualanReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.laporanPenjualanReducer.data,
    }
}


export default connect(mapStateToProps)(IndexLaporanPenjualan);