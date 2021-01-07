import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {rangeDate,noImage, rmComma, ToastQ, toCurrency, toRp} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import {getPin} from "../../../redux/actions/paket/pin.action";
import moment from "moment";
import GeneratePin from "../modals/pin/generate_pin"
import {getBonus, postPenarikan} from "../../../redux/actions/laporan/bonus.action";


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
        this.handleChange   = this.handleChange.bind(this);
        this.handleSubmit      = this.handleSubmit.bind(this);

    }
    componentWillMount(){
        this.props.dispatch(getBonus(`page=1`));
    }
    componentWillReceiveProps(nextProps){
        let isLoading=true;
        let data=[];
        if(nextProps.data.length>0){
           for(let i=0;i<nextProps.data.length;i++){
               data.push(Object.assign(nextProps.data[i],{amount:'0'}));
               isLoading=false;
           }
        }
        this.setState({isLoading:isLoading,data:data});
    }

    handleChange = (e,i=null) => {
        let column = e.target.name;
        let value = e.target.value;
        let checked = e.target.checked;
        let data = [...this.state.data];
        if(column === 'checked'){
            data[i] = {...data[i], [column]: checked};
        }
        else{
            data[i] = {...data[i], [column]: value};
            this.setState({data:data});
        }
    }



    handleSubmit(e,i){
        e.preventDefault();
        if(this.state.data[i].amount===''||this.state.data[i].amount==='0'){
            ToastQ.fire({icon:'error',title:`silahkan masukan nominal yang akan ditarik`});
            return;
        }
        else{
            this.props.dispatch(postPenarikan({
                "kode":this.state.data[i].kode,
                "amount":rmComma(this.state.data[i].amount)
            }));
        }
    }


    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        // const data = this.state.data;

        return(
            <Layout page={"PIN"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">PIN</h5>
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
                                            <button style={{marginTop:"27px",marginLeft:"5px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleAdd(e)}><i className="fa fa-plus"/></button>
                                        </div>
                                    </div>
                                </div>
                                <div style={{overflowX: "auto",zoom:"80%"}}>
                                    <table className="table table-hover">
                                        <thead className="bg-light">
                                        <tr>
                                            <th className="text-black" style={columnStyle}>No</th>
                                            <th className="text-black" style={columnStyle}>Penarikan</th>
                                            <th className="text-black" style={columnStyle}>Kode</th>
                                            <th className="text-black" style={columnStyle}>Trx In</th>
                                            <th className="text-black" style={columnStyle}>Trx In</th>
                                            <th className="text-black" style={columnStyle}>Total</th>
                                            <th className="text-black" style={columnStyle}>Catatan</th>
                                            <th className="text-black" style={columnStyle}>Persentase</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.isLoading===false ? this.state.data.length > 0 ?
                                                this.state.data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td style={columnStyle}>
                                                                <span className="circle">{i+1}</span>
                                                            </td>
                                                            <td>
                                                                <div className="input-group mb-2">
                                                                    <input type="text" className="form-control" name="amount" placeholder={"masukan nominal yang akan ditarik"} value={toCurrency(v.amount)} onChange={(e)=>this.handleChange(e,i)}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSubmit(event,i);}}} />
                                                                    <div className="input-group-prepend">
                                                                        <button className="btn btn-primary" onClick={(event)=>this.handleSubmit(event,i)}>
                                                                            <i className="fa fa-send"/>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style={columnStyle}>{v.kode}</td>
                                                            <td style={columnStyle}>Rp {parseInt(v.trx_in)===0?0:toCurrency(parseInt(v.trx_in))} .-</td>
                                                            <td style={columnStyle}>Rp {parseInt(v.trx_out)===0?0:toCurrency(parseInt(v.trx_out))} .-</td>
                                                            <td style={columnStyle}>Rp {parseInt(v.v)===0?0:toCurrency(parseInt(v.total))} .-</td>
                                                            <td style={columnStyle}>{v.note}</td>
                                                            <td style={columnStyle}>{v.percentage}</td>
                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={7} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
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
                                                            </tr>
                                                        )
                                                    }
                                                    return container;
                                                })()

                                        }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isOpen===true?<GeneratePin
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