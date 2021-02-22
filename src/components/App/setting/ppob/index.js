import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {noImage, rangeDate, statusQ, toCurrency, toRp} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import FormVoucher from "../../modals/masterdata/voucher/form_voucher"
import {fetchKategori, fetchProduk,fetchOperator} from "redux/actions/setting/ppob.action";
import * as Swal from "sweetalert2";
import Select from 'react-select';

class PPOB extends Component{
    constructor(props){
        super(props);
        this.state={
            any:'',
            data_kategori:[],
            kategori:'',
            data_operator:[],
            operator:'',
            status:'',

        };
        this.handleChange   = this.handleChange.bind(this);
        this.handlePage     = this.handlePage.bind(this);
        this.handleChangeKategori = this.handleChangeKategori.bind(this);
        this.handleChangeOperator = this.handleChangeOperator.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.kategori !== undefined && props.kategori.length !== 0) {
            if (props.kategori !== state.prevkategoriProps) {
                const datum=[]
                for (var key of Object.keys(props.kategori)) {
                    props.kategori[key].map(i=>{
                        datum.push({
                            label: i.title,
                            value: i.code,
                        })
                    })
                }
                return {
                    prevkategoriProps: props.kategori,
                    data_kategori: datum
                };
            }
        }

        if (props.operator !== undefined && props.operator.length !== 0) {
            if (props.operator !== state.prevoperatorProps) {
                const datum = []
                props.operator.data.map(i => {
                    datum.push({
                        label: i.title,
                        value: i.op_id,
                    })
                })
                return {
                    prevoperatorProps: props.operator,
                    data_operator: datum
                };
            }
        }
    }

    handlePage(num){
        let where = this.handleValidate();
        where+=`&page=${num}`;
        this.props.dispatch(fetchKategori(where));
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

    componentDidMount(){
        let where = this.handleValidate();
        this.props.dispatch(fetchKategori(where));
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeKategori(val) {
        this.props.dispatch(fetchProduk(`kategori=${val.value}`))
        this.setState({
            kategori: val.value,
            operator:''
        });
    }
    handleChangeOperator(val) {
        this.props.dispatch(fetchProduk(`operator=${val.value}`))
        this.setState({
            operator: val.value
        });
    }

    render(){
        console.log("object", this.props.produk);
        return(
            <Layout page={"Setting Margin PPOB"}>
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Setting Margin PPOB <small className={"txtRed"} style={{float:"right"}}>( Badge warna biru <b className={"text-info"}>Tidak Aktif</b> dan hijau <b className={"text-success"}>Aktif</b> )</small></h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-12 col-xs-12 col-md-3">
                                        <div className='form-group'>
                                                <label>Kategori</label>
                                                <Select
                                                    options={this.state.data_kategori}
                                                    placeholder="Pilih Kategori"
                                                    onChange={this.handleChangeKategori}
                                                    value={
                                                        this.state.data_kategori.find(op => {
                                                            return op.value === this.state.kategori
                                                        })
                                                    }

                                                />
                                        </div>
                                        {
                                            this.state.data_operator.length>0?(
                                                <div className='form-group'>
                                                    <label>Layanan</label>
                                                    <Select
                                                        options={this.state.data_operator}
                                                        placeholder="Pilih Layanan"
                                                        onChange={this.handleChangeOperator}
                                                        value={
                                                            this.state.data_operator.find(op => {
                                                                return op.value === this.state.operator
                                                            })
                                                        }

                                                    />
                                            </div>
                                            ):''
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Provider</th>
                                                        <th>Produk</th>
                                                        <th>HPP</th>
                                                        <th>Margin</th>
                                                        <th>Status</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.produk.data!==undefined && this.props.produk.data.length>0?
                                                            this.props.produk.data.map(i=>{
                                                                return (
                                                                    <tr>
                                                                        <td>No</td>
                                                                        <td>{i.provider}</td>
                                                                        <td>{i.note}</td>
                                                                        <td>{toCurrency(i.raw_price)}</td>
                                                                        <td><input type="number" className="form-control" value={i.margin}/></td>
                                                                        <td>{i.status===0?<span className="badge badge-danger">Tidak Aktif</span>:<span className="badge badge-success">Aktif</span>}</td>
                                                                        <td><button className="badge badge-success"><i className="fa fa-check"/></button></td>
                                                                    </tr>

                                                                )})
                                                            :''
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div style={{"marginTop":"20px","marginBottom":"20px","float":"right"}}>
                            {/* <Paginationq
                                current_page={current_page}
                                per_page={per_page}
                                total={total}
                                callback={this.handlePage}
                            /> */}
                        </div>

                    </div>
                </div>
                {
                    this.props.isOpen?<FormVoucher detail={this.state.detail}/>:null
                }
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.ppobReducer.isLoading,
        isOpen:state.modalReducer,
        kategori:state.ppobReducer.kategori,
        operator:state.ppobReducer.operator,
        produk:state.ppobReducer.produk,
    }
}


export default connect(mapStateToProps)(PPOB);