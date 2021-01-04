import React, {Component} from 'react'
import { connect } from 'react-redux'
import WrapperModal from '../_wrapper.modal'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "../../../../redux/actions/modal.action";
import Paginationq, {ToastQ, toCurrency, toRp} from "../../../../helper";
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import {fetchPaket} from "../../../../redux/actions/paket/paket.action";
import {generatePin} from "../../../../redux/actions/paket/pin.action";


class GeneratePin extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangePaket = this.handleChangePaket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state={
            qty:0,
            prefix:"",
            paket:"",
            dataPaket:[]
        }
    }
    clearState(){
        this.setState({
            qty:0,
            prefix:"",
            paket:"",
            dataPaket:[]
        })
    }

    componentWillMount(){
        this.props.dispatch(fetchPaket('page=1&perpage=1000'));
    }

    componentWillReceiveProps(nextProps){
        let data=[];
        if(nextProps.paket.data.length>0){
            nextProps.paket.data.map((v,i)=>{
                data.push({value:v.id,label:v.title})
            });
        }
        console.log(data);

        this.setState({dataPaket:data});

    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangePaket(val){
        this.setState({
            paket:val.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let parsedata={};
        parsedata['qty'] = this.state.qty;
        parsedata['prefix'] = this.state.prefix;
        parsedata['paket'] = this.state.paket;
        if(parsedata['paket']===''){
            ToastQ.fire({icon:'error',title:`paket tidak boleh kosong`});
            return;
        }
        if(parsedata['qty']===0||parsedata['qty']===''){
            ToastQ.fire({icon:'error',title:`qty tidak boleh kosong`});
            return;
        }
        if(parsedata['prefix']===''){
            ToastQ.fire({icon:'error',title:`prefix tidak boleh kosong`});
            return;
        }
        this.props.dispatch(generatePin(parsedata));
        if(this.props.isError===true){
            this.clearState();
        }
        console.log(parsedata);
    }
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));

    };
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "generatePin"} size="md">
                <ModalHeader toggle={this.toggle}>Buat Pin</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Paket</label>
                                {

                                    <Select
                                        options={this.state.dataPaket}
                                        placeholder="Pilih Paket"
                                        onChange={this.handleChangePaket}
                                        value={
                                            this.state.dataPaket.find(op => {
                                                return op.value === this.state.paket
                                            })
                                        }

                                    />

                                }
                            </div>
                            <div className="form-group">
                                <label>Qty</label>
                                <input type="numer" className={"form-control"} name={"qty"} value={this.state.qty} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Prefix <small style={{color:'red',fontWeight:'bold'}}>( maksimal 2 huruf dan harus menggunakan huruf kapital (besar) )</small></label>
                                <input maxLength={2} style={{textTransform:'uppercase'}} type="text" className={"form-control"} name={"prefix"} value={this.state.prefix} onChange={this.handleChange}/>
                            </div>
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button style={{color:"white"}} type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle} ><i className="ti-close"/>Keluar</button>
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleSubmit} ><i className="ti-save" />{!this.props.isLoadingPost?'Simpan':'Loading ......'}</button>
                    </div>
                </ModalFooter>
            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        paket:state.paketReducer.data,
        isLoadingPost: state.pinReducer.isLoadingPost,
        isError: state.pinReducer.isError,
    }
}
export default connect(mapStateToProps)(GeneratePin);