import React,{Component} from 'react';
import Layout from 'components/Layout';
import Info from "../Dashboard/src/Info";
import connect from "react-redux/es/connect/connect";
import Paginationq, {copyTxt, isFloatFix, rangeDate, ToastQ} from "../../../helper";
import moment from "moment";
import Skeleton from 'react-loading-skeleton';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {FetchDetailTransaction, FetchTransaction} from "../../../redux/actions/transaction/transaction.action";
import DetailTransaction from "../../App/modals/transaction/detail_transaction";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {BrowserView, MobileView} from "react-device-detect";

class Transaction extends Component{
    constructor(props){
        super(props);
        this.handleEvent    = this.handleEvent.bind(this);
        this.handleChange   = this.handleChange.bind(this);
        this.handleSearch   = this.handleSearch.bind(this);
        this.handleDetail   = this.handleDetail.bind(this);
        this.state={
            dataDetail:{},
            any:"",
            dateFrom:moment(new Date()).format("yyyy-MM-DD"),
            dateTo:moment(new Date()).format("yyyy-MM-DD"),
            id:""
        }
    }
    componentWillMount(){
        let sessDateFrom=localStorage.dateFromTransaction!==undefined?localStorage.dateFromPenarikan:this.state.dateFrom;
        let sessDateTo=localStorage.dateToTransaction!==undefined?localStorage.dateToPenarikan:this.state.dateTo;
        this.setState({
            dateFrom:sessDateFrom,
            dateTo:sessDateTo,
        });
        this.props.dispatch(FetchTransaction(`page=1&datefrom=${sessDateFrom}&dateto=${sessDateTo}`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handlePageChange(pageNumber){
        localStorage.setItem("pageTransaction",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(FetchTransaction(where));
    }
    handleEvent = (event, picker) => {
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');

        this.setState({
            dateFrom:from,
            dateTo:to
        });

    };
    handleValidate(){
        let where="";
        let page = localStorage.getItem("pageTransaction");
        let dateFrom = this.state.dateFrom;
        let dateTo = this.state.dateTo;
        let any = this.state.any;
        localStorage.setItem("dateFromTransaction",`${dateFrom}`);
        localStorage.setItem("dateToTransaction",`${dateTo}`);

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
    handleSearch(e){
        e.preventDefault();
        localStorage.removeItem("pageTransaction");
        let where = this.handleValidate();
        this.props.dispatch(FetchTransaction(where));
    }
    handleDetail(e,id,name){
        this.setState({dataDetail:{id:id,name:name}});
        // this.props.dispatch(FetchDetailTransaction(id));
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("detailTransaction"));
    }

    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const rightStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const {total,per_page, current_page,data,total_amount} = this.props.data;
        let totPerIn=0;
        let totPerOut=0;
        let totPerSaldoAwal=0;
        let totPerSaldoAkhir=0;
        return (
            <Layout page={"Transaction"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Transaction</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    <Info handleSubmit={this.handleSubmit}/>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">

                            <div className="card-body" style={{zoom:"90%"}}>
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-sm-4 col-md-2">
                                        <div className="form-group">
                                            <label>Periode </label>
                                            <DateRangePicker
                                                autoUpdateInput={true} showDropdowns={true} style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onApply={this.handleEvent}>
                                                <input type="text" readOnly={true} className="form-control" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>
                                            </DateRangePicker>
                                            {/*<DateRangePicker style={{display:'unset'}} ranges={rangeDate} alwaysShowCalendars={true} onEvent={this.handleEvent}>*/}
                                                {/*<input type="text" readOnly={true} className="form-control" name="date_sale_report" value={`${this.state.dateFrom} to ${this.state.dateTo}`}/>*/}
                                            {/*</DateRangePicker>*/}
                                        </div>
                                    </div>
                                    <div className="col-6 col-xs-6 col-sm-4 col-md-3">
                                        <div className="form-group">
                                            <label>Type something here ..</label>
                                            <input type="text" className="form-control" name="any" placeholder={"search by wallet address, name, email"} defaultValue={this.state.any} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xs-12 col-sm-4 col-md-4">
                                        <BrowserView>
                                            <div className="form-group">
                                                {
                                                    !this.props.isLoading?(
                                                        <button style={{marginTop:"27px"}} type="submit" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                                    ):(
                                                        <button style={{marginTop:"27px"}} type="button" className="btn btn-primary"><i className="fa fa-circle-o-notch fa-spin"/></button>
                                                    )
                                                }
                                            </div>
                                        </BrowserView>
                                        <MobileView>
                                            <div className="form-group">
                                                {
                                                    !this.props.isLoading?(
                                                        <button type="button" className="btn btn-primary btn-fixed-bottom" onClick={(e)=>this.handleSearch(e)}><i style={{fontSize:"30px"}} className="fa fa-search"/></button>
                                                    ):(
                                                        <button type="button" className="btn btn-primary btn-fixed-bottom"><i style={{fontSize:"30px"}} className="fa fa-circle-o-notch fa-spin"/></button>
                                                    )
                                                }
                                            </div>
                                        </MobileView>
                                    </div>
                                </div>
                                <div style={{overflowX: "auto"}}>
                                    <table className="table table-hover">
                                        <thead className="bg-light">
                                        <tr>
                                            <th className="text-black" style={columnStyle}>No</th>
                                            <th className="text-black" style={columnStyle}>#</th>
                                            <th className="text-black" style={columnStyle}>Wallet Address</th>
                                            <th className="text-black" style={columnStyle}>Kd Referral</th>
                                            <th className="text-black" style={columnStyle}>Name</th>
                                            <th className="text-black" style={columnStyle}>Email</th>
                                            <th className="text-black" style={columnStyle}>Beginning Balance</th>
                                            <th className="text-black" style={columnStyle}>Trx In</th>
                                            <th className="text-black" style={columnStyle}>Trx Out</th>
                                            <th className="text-black" style={columnStyle}>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof data === 'object' ? data.length>0?
                                                data.map((v,i)=>{
                                                    totPerIn = totPerIn+parseFloat(v.amount_in);
                                                    totPerOut = totPerOut+parseFloat(v.amount_out);
                                                    totPerSaldoAwal = totPerSaldoAwal+parseFloat(v.saldo_awal);
                                                    totPerSaldoAkhir = totPerSaldoAkhir+parseFloat(v.saldo_akhr);
                                                    return(
                                                        <tr key={i}>
                                                            <td style={columnStyle}>
                                                                <span class="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={columnStyle}>
                                                                <button className={"btn btn-success btn-sm"} onClick={(e)=>this.handleDetail(e,v.id,v.name)}><i className={"fa fa-eye"}/></button>
                                                            </td>
                                                            <td style={columnStyle}>{copyTxt(v.wallet)}</td>
                                                            <td style={columnStyle}>{copyTxt(v.kd_referral)}</td>
                                                            <td style={columnStyle}>{v.name}</td>
                                                            <td style={columnStyle}>{v.email}</td>
                                                            <td style={rightStyle}>{parseFloat(v.saldo_awal).toFixed(8)}</td>
                                                            <td style={rightStyle}>{copyTxt(parseFloat(v.amount_in).toFixed(8))}</td>
                                                            <td style={rightStyle}>{copyTxt(parseFloat(v.amount_out).toFixed(8))}</td>
                                                            <td style={rightStyle}>{parseFloat(v.saldo_akhr).toFixed(8)}</td>

                                                        </tr>
                                                    )
                                                })
                                                : <tr><td colSpan={10} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td></tr>
                                            : (()=>{
                                                    let container =[];
                                                    for(let x=0; x<10; x++){
                                                        container.push(
                                                            <tr key={x}>
                                                                <td style={columnStyle}>{<Skeleton circle={true} height={40} width={40}/>}</td>
                                                                <td style={columnStyle}><Skeleton height={30} width={30}/></td>
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


                                        <tfoot>
                                        <tr style={{backgroundColor:this.props.isLoading?"white":"#EEEEEE"}}>
                                            <th className="text-black" colspan={6}>TOTAL PERPAGE</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:totPerSaldoAwal.toFixed(8)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:totPerIn.toFixed(8)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:totPerOut.toFixed(8)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:totPerSaldoAkhir.toFixed(8)}</th>
                                        </tr>
                                        <tr style={{backgroundColor:this.props.isLoading?"white":"#EEEEEE"}}>
                                            <th className="text-black" colspan={6}>TOTAL ALLPAGE</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:total_amount===undefined?0:isFloatFix(total_amount.saldo_awal)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:total_amount===undefined?0:isFloatFix(total_amount.amount_in)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:total_amount===undefined?0:isFloatFix(total_amount.amount_out)}</th>
                                            <th className="text-black" style={rightStyle} colspan={1}>{this.props.isLoading?<Skeleton/>:total_amount===undefined?0:isFloatFix(total_amount.saldo_akhir)}</th>
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
                <DetailTransaction dataDetail={this.state.dataDetail}/>

            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.transactionReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.transactionReducer.data,
        // detail:state.transactionReducer.detail
    }
}


export default connect(mapStateToProps)(Transaction);