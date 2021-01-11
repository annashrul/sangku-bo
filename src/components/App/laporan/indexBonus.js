import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {rangeDate,noImage, rmComma, ToastQ, toCurrency, toRp} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import GeneratePin from "../modals/pin/generate_pin"
import {getBonus, postPenarikan} from "../../../redux/actions/laporan/bonus.action";
import FormPenarikanBonus from '../modals/laporan/form_penarikan_bonus';

class IndexBonus extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            data:[],
            isLoading:true
        };
        this.handleModal      = this.handleModal.bind(this);

    }
    componentWillMount(){
        this.props.dispatch(getBonus(`page=1`));
    }
    componentWillReceiveProps(nextProps){
        let isLoading=true;
        let data=[];
        if(nextProps.data.length>0){
           for(let i=0;i<nextProps.data.length;i++){
               data.push(nextProps.data[i]);
           }
           isLoading=false;
        }
        else{
            data=[];
        }
        this.setState({isLoading:isLoading,data:data});
    }



    handleModal(e,kode){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formPenarikanBonus"));
        this.setState({detail:{kode:kode}});
    }


    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        // const data = this.state.data;
        let totTrxIn=0;
        let totTrxOut=0;
        let totTrxSaldo=0;
        console.log(this.state.data.length);
        return(
            <Layout page={"Bonus"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Bonus</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.isLoading===false ? this.state.data.length > 0 ?
                            this.state.data.map((v, i) => {
                                totTrxIn = totTrxIn+parseInt(v.trx_in);
                                totTrxOut = totTrxIn+parseInt(v.trx_out);
                                totTrxSaldo = totTrxIn+parseInt(v.total);

                                return (
                                    <div className="col-md-6 col-xl-4 box-margin">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="bg-success p-3 text-center text-white font-20">{v.note.toUpperCase()}</div>
                                                <br/>
                                                <p className="d-flex align-items-center justify-content-between font-16">Persantase<span className="float-right font-12 success-text">{v.percentage} %</span></p>
                                                <hr style={{border:'1px dashed #ddd'}}/>
                                                <p className="d-flex align-items-center justify-content-between font-16">Transaksi Masuk<span className="float-right font-12 text-danger">Rp {parseInt(v.trx_in)===0?0:toCurrency(v.trx_in)} .-</span></p>
                                                <hr style={{border:'1px dashed #ddd'}}/>
                                                <p className="d-flex align-items-center justify-content-between font-16">Transaksi Keluar<span className="float-right font-12 text-danger">Rp {parseInt(v.trx_out)===0?0:toCurrency(v.trx_out)} .-</span></p>
                                                <hr style={{border:'1px dashed #ddd'}}/>
                                                <p className="d-flex align-items-center justify-content-between font-16">Saldo<span className="float-right font-12 text-danger">Rp {parseInt(v.total)===0?0:toCurrency(v.total)} .-</span></p>

                                                <button onClick={(e)=>this.handleModal(e,v.kode)} className={"btn btn-primary btn-block"}>
                                                    Penarikan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            : <tr>
                                <td colSpan={7} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
                            </tr>
                            :(()=>{
                                let container =[];
                                for(let x=0; x<10; x++){
                                    container.push(
                                        <div key={x} className="col-md-6 col-xl-4 box-margin">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="mb-30"><Skeleton/></h5>
                                                    <p className="d-flex align-items-center justify-content-between font-16"><Skeleton width={100}/><span className="float-right font-18 success-text"><Skeleton width={100}/></span></p>
                                                    <div className="progress h-8">
                                                        <div className="progress-bar bg-default" role="progressbar" style={{width:'100%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                                    </div>
                                                    <p className="mt-3 mb-0 font-16 d-block"><Skeleton/></p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return container;
                            })()

                    }
                </div>
                {
                    this.props.isOpen===true?<FormPenarikanBonus
                        detail={this.state.detail}
                    />:null
                }
                {/*<FormPaket/>*/}
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.pinReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.bonusReducer.data,
    }
}


export default connect(mapStateToProps)(IndexBonus);