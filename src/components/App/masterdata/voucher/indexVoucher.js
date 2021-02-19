import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toCurrency, toRp} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import DetailAlamat from "../../modals/masterdata/member/detail_alamat"
import DetailBank from "../../modals/masterdata/member/detail_bank"
import DetailTransaksi from "../../modals/masterdata/member/detail_transaksi"
import {getMember, putMember} from "redux/actions/masterdata/member.action";
import UncontrolledButtonDropdown from "reactstrap/es/UncontrolledButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import {getDetailAlamat} from "redux/actions/masterdata/alamat.action";
import {getDetailBank} from "redux/actions/masterdata/bank.action";
import * as Swal from "sweetalert2";
import {deleteVoucher, getVoucher} from "../../../../redux/actions/masterdata/voucher.action";


class IndexVoucher extends Component{
    constructor(props){
        super(props);
        this.state={
            any:'',
            detail:{},
            status:'',

        };
        this.handleChange   = this.handleChange.bind(this);
        this.handleModal      = this.handleModal.bind(this);
        this.handleDelete      = this.handleDelete.bind(this);
        this.handleSearch      = this.handleSearch.bind(this);
        this.handlePage      = this.handlePage.bind(this);
    }


    handlePage(num){
        let where = this.handleValidate();
        where+=`&page=${num}`;
        this.props.dispatch(getVoucher(where));
    }
    handleValidate(){
        this.setState({
            isLoading:true
        });
        let where=`perpage=8`;
        let any = this.state.any;
        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        return where;

    }
    componentWillMount(){
        let where = this.handleValidate();
        this.props.dispatch(getVoucher(where));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleModal(e,i){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBarangReward"));
        if(i!==''){
            this.setState({detail:{
                id:this.props.data.data[i].id,
                title:this.props.data.data[i].title,
                caption:this.props.data.data[i].caption,
                id_karir:this.props.data.data[i].id_karir,
                gambar:this.props.data.data[i].gambar,

            }});
        }
        else{
            this.setState({detail:{id:''}});

        }
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
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteVoucher(id));

            }
        })
    }
    handleSearch(e){
        e.preventDefault();
        let where = this.handleValidate();
        this.props.dispatch(getVoucher(where));
    }



    render(){
        const {
            total,
            per_page,
            current_page,
            data
        } = this.props.data;

        return(
            <Layout page={"Voucher"}>
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Voucher <small className={"txtRed"} style={{float:"right"}}>( Badge warna biru <b className={"text-info"}>Tidak Aktif</b> dan hijau <b className={"text-success"}>Aktif</b> )</small></h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-12 col-xs-12 col-md-3">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <input type="text" className="form-control" name="any" placeholder={"cari disini"} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>
                                    <div className="col-2 col-xs-2 col-md-4">
                                        <div className="form-group">
                                            <button style={{marginTop:"27px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            {
                                !this.props.isLoading?typeof data==='object'?data.length>0?data.map((v,i)=>{
                                        let color='';

                                        if(v.status===0){
                                            color='ribbon-info';
                                        }else{
                                            color='ribbon-success';
                                        }
                                    return(
                                        <div key={i} className="col-md-3 col-lg-3 col-xl-3 box-margin">
                                            <div className="ribbon-wrapper card">
                                                <div className={`ribbon ribbon-bookmark ${color}`}>{v.title} <span>( {v.disc} % )</span></div>
                                                <span>Kode Voucher <span style={{float:"right"}} className={"txtGreen"}>{v.kode}</span></span>
                                                <span>Dari <span style={{float:"right"}} className={"txtRed"}>{moment(v.periode_start).format('lll')}</span></span>
                                                <span>Sampai <span style={{float:"right"}} className={"txtRed"}>{moment(v.periode_end).format('lll')}</span></span>
                                                <hr style={{borderStyle:"dotted"}}/>
                                                <span>{v.deskripsi}</span>
                                            </div>
                                        </div>
                                    );
                                    }): <div className="row align-items-center"><img src={NOTIF_ALERT.NO_DATA} alt=""/></div>: <div className="row align-items-center"><img className={"text-center"} src={NOTIF_ALERT.NO_DATA} alt=""/></div>:
                                    (()=>{
                                        let container =[];
                                        for(let i=0; i<8; i++){
                                            container.push(
                                                <div key={i} className="col-md-3 col-lg-3 col-xl-3 box-margin">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <p className="ribbon-content"><Skeleton/></p>
                                                            <p className="ribbon-content"><Skeleton/></p>
                                                            <p className="ribbon-content"><Skeleton/></p>
                                                            <p className="ribbon-content"><Skeleton/></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return container;
                                    })()
                            }
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

            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.voucherReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.voucherReducer.data,
    }
}


export default connect(mapStateToProps)(IndexVoucher);