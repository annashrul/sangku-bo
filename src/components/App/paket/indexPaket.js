import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toRp} from "../../../helper";
import moment from "moment";
import {deletePaket, detailPaket, fetchPaket} from "../../../redux/actions/paket/paket.action";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import FormPaket from "../modals/paket/form_paket"
import Skeleton from 'react-loading-skeleton';
import * as Swal from "sweetalert2";
import {fetchBarang} from "../../../redux/actions/paket/barang.action";
import {fetchKategori} from "../../../redux/actions/kategori/kategori.action";

class IndexPaket extends Component{
    constructor(props){
        super(props);
        this.state={
            isShow:false,
            detail:{},
            status:"",
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD")
        };
        this.handleEvent    = this.handleEvent.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.handlePage     = this.handlePage.bind(this);
        this.handleSearch   = this.handleSearch.bind(this);
        this.handleModal      = this.handleModal.bind(this);
        this.handleDelete   = this.handleDelete.bind(this);

    }
    componentWillMount(){
        this.props.dispatch(fetchPaket(`page=1`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidate(){
        let where="";
        let page = localStorage.getItem("pagePaket");
        let dateFrom = this.state.dateFrom;
        let dateTo = this.state.dateTo;
        let status = this.state.status;
        let any = this.state.any;
        localStorage.setItem("dateFromPaket",`${dateFrom}`);
        localStorage.setItem("dateToPaket",`${dateTo}`);

        if(page!==null&&page!==undefined&&page!==""){
            where+=`page=${page}`;
        }else{
            where+="page=1";
        }
        if(dateFrom!==null&&dateFrom!==undefined&&dateFrom!==""){
            where+=`&datefrom=${dateFrom}&dateto=${dateTo}`;
        }
        if(status!==null&&status!==undefined&&status!==""){
            where+=`&status=${status}`;
        }
        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        return where;

    }

    handlePage(pageNumber){
        localStorage.setItem("pagePaket",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(fetchPaket(where));

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
        this.props.dispatch(fetchPaket(where));
    }

    handleModal(e,param){
        this.setState({isShow:true,detail:{id:param}});
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPaket"));
        // this.props.dispatch(fetchBarang("page=1"));
        this.props.dispatch(fetchKategori("barang_registrasi"));
        if(param!==''){
            this.props.dispatch(detailPaket(param));
        }
        // this.props.dispatch(fetchKategori("barang_registrasi"));

    }
    handleDelete(e,id){
        e.preventDefault();
        Swal.fire({
            title: 'Perhatian !!!',
            html:`anda yakin akan menghapus paket ini ??`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Oke, Hapus`,
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deletePaket(id));
                // let id = param['id'];
                // let data  = {"status":param['status'],'isadmin':0};
                // let where = this.handleValidate();
                // if(param['status']===1){
                //     this.props.dispatch(confirmUserMember({'isadmin':0},btoa(param['regist'].split("|")[0]),where));
                // }
                // else{
                //     this.props.dispatch(putUserMember(data,id,where));
                // }
            }
        })
    }


    render(){
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
        const headStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numberStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const stringStyle ={verticalAlign: "middle", textAlign: "left",whiteSpace: "nowrap"};
        let jmlBarang=0;
        let jmlPin=0;
        let jmlPV=0;
        return(
            <Layout page={"Paket"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Paket</h5>
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
                                            <label>Periode {this.props.isOpen}</label>
                                            <DateRangePicker
                                                autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                            </DateRangePicker>
                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-6 col-md-2">
                                        <div className="form-group">
                                            <label>Status</label>
                                            <select name="status" className="form-control form-control-lg" defaultValue={this.state.status} value={this.state.status} onChange={this.handleChange}>
                                                <option value="">All Status</option>
                                                <option value="0">Pending</option>
                                                <option value="1">Success</option>
                                                <option value="2">Cancel</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xs-12 col-md-3">
                                        <div className="form-group">
                                            <label>Type something here ..</label>
                                            <input type="text" className="form-control" name="any" placeholder={"search by amount,wallet address"} defaultValue={this.state.any} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
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
                                            <th className="text-black" style={headStyle}>Gambar</th>
                                            <th className="text-black" style={headStyle}>Title</th>
                                            <th className="text-black" style={headStyle}>Kategori</th>
                                            <th className="text-black" style={headStyle}>Jml Barang</th>
                                            <th className="text-black" style={headStyle}>Jml Pin</th>
                                            <th className="text-black" style={headStyle}>PV</th>
                                            <th className="text-black" style={headStyle}>Tipe</th>
                                            <th className="text-black" style={headStyle}>Status</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof data === 'object' ? data.length > 0 ?
                                                data.map((v, i) => {
                                                jmlBarang = jmlBarang+parseInt(v.jumlah_barang);
                                                jmlPin = jmlPin+parseInt(v.jumlah_pin);
                                                jmlPV = jmlPV+parseInt(v.point_volume);
                                                    return (
                                                        <tr key={i}>
                                                            <td style={headStyle}>
                                                                <span className="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={headStyle}>
                                                                <button style={{marginRight:"5px"}} className={"btn btn-danger btn-sm"} onClick={(e)=>this.handleDelete(e,v.id)}><i className={"fa fa-trash"}/></button>
                                                                <button style={{marginRight:"5px"}} className={"btn btn-info btn-sm"} onClick={(e)=>this.handleModal(e,v.id)}><i className={"fa fa-pencil"}/></button>
                                                            </td>
                                                            <td style={headStyle}>
                                                                <img className="img-fluid" src={v.foto} style={{height:"30px",width:"30px"}} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="member image"/>

                                                                {/*<img className="img-fluid" style={{height:"30px",width:"30px"}} src={NOTIF_ALERT.NO_DATA}/>*/}
                                                            </td>
                                                            <td style={headStyle}>{v.title}</td>
                                                            <td style={headStyle}>{v.kategori}</td>
                                                            <td style={numberStyle}>{v.jumlah_barang}</td>
                                                            <td style={numberStyle}>{toRp(v.jumlah_pin)}</td>
                                                            <td style={numberStyle}>{v.point_volume}</td>
                                                            <td style={numberStyle}>{v.type}</td>
                                                            <td style={headStyle}>{statusQ(v.status)}</td>
                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={12} style={headStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
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
                                                            </tr>
                                                        )
                                                    }
                                                    return container;
                                                })()
                                        }
                                        </tbody>
                                        <tfoot style={{backgroundColor:"#EEEEEE"}}>
                                        <tr>
                                            <th colSpan={5}>TOTAL PERPAGE</th>
                                            <th colSpan={1} style={numberStyle}>{toRp(jmlBarang)}</th>
                                            <th colSpan={1} style={numberStyle}>{toRp(jmlPin)}</th>
                                            <th colSpan={1} style={numberStyle}>{toRp(jmlPV)}</th>
                                            <th colSpan={2}/>
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
                    this.props.isOpen===true?<FormPaket
                        detail={this.state.detail}
                        paketDetail={this.props.dataDetail}
                        // barang={this.props.barang}
                        kategori={this.props.kategori}
                    />:null
                }
                {/*<FormPaket/>*/}
            </Layout>
        );



    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.paketReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.paketReducer.data,
        dataDetail:state.paketReducer.detail,
        kategori:state.kategoriReducer.data,
        // barang:state.barangReducer.data,
    }
}


export default connect(mapStateToProps)(IndexPaket);