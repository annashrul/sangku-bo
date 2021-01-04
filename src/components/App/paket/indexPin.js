import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import {DateRangePicker} from "react-bootstrap-daterangepicker";
import Paginationq, {rangeDate, toCurrency, toRp} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import {getPin} from "../../../redux/actions/paket/pin.action";
import moment from "moment";
import GeneratePin from "../modals/pin/generate_pin"


class IndexPin extends Component{
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
        this.handleAdd      = this.handleAdd.bind(this);

    }
    componentWillMount(){
        this.props.dispatch(getPin(`page=1`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidate(){
        let where="";
        let page = localStorage.getItem("pagePin");
        let dateFrom = this.state.dateFrom;
        let dateTo = this.state.dateTo;
        let any = this.state.any;
        localStorage.setItem("dateFromPin",`${dateFrom}`);
        localStorage.setItem("dateToPin",`${dateTo}`);

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
        localStorage.setItem("pagePin",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(getPin(where));

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
        this.props.dispatch(getPin(where));
    }

    handleAdd(e){
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("generatePin"));
        this.setState({detail:{}});
    }


    render(){
        const columnStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
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
                                            <th className="text-black" style={columnStyle}>Kode</th>
                                            <th className="text-black" style={columnStyle}>Paket</th>
                                            <th className="text-black" style={columnStyle}>Pemilik</th>
                                            <th className="text-black" style={columnStyle}>Harga</th>
                                            <th className="text-black" style={columnStyle}>Tipe</th>
                                            <th className="text-black" style={columnStyle}>Status</th>
                                            <th className="text-black" style={columnStyle}>Tanggal Dibuat</th>
                                            <th className="text-black" style={columnStyle}>Tanggal Expired</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof data === 'object' ? data.length > 0 ?
                                                data.map((v, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td style={columnStyle}>
                                                                <span className="circle">{i+1 + (10 * (parseInt(current_page,10)-1))}</span>
                                                            </td>
                                                            <td style={columnStyle}>{v.kode}</td>
                                                            <td style={columnStyle}>{v.paket_title}</td>
                                                            <td style={columnStyle}>{v.pemilik}</td>
                                                            <td style={columnStyle}>Rp {toCurrency(v.harga)} .-</td>
                                                            <td style={columnStyle}>{v.type===0?'REGISTER':'RO'}</td>
                                                            <td style={columnStyle}>{v.status}</td>
                                                            <td style={columnStyle}>{moment(v.created_at).locale('id').format("ddd, Do MMM YYYY hh:mm:ss")}</td>
                                                            <td style={columnStyle}>{moment(v.exp_date).locale('id').format("ddd, Do MMM YYYY")}</td>
                                                        </tr>
                                                    );
                                                })
                                                : <tr>
                                                    <td colSpan={9} style={columnStyle}><img src={NOTIF_ALERT.NO_DATA}/></td>
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
        data:state.pinReducer.data,
    }
}


export default connect(mapStateToProps)(IndexPin);