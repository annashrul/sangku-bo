import React, {Component} from 'react'
import { connect } from 'react-redux'
import WrapperModal from '../_wrapper.modal'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "../../../../redux/actions/modal.action";
import {rmComma, ToastQ, toCurrency} from "../../../../helper";
import {postBarang} from "../../../../redux/actions/paket/barang.action";


class FormBarang extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            title:"",
            harga:"",
            ppn:"0",
            satuan:"",
            status:"1",
            berat:"",
            stock:"",
        }
    }

    clearState(){
        this.setState({
            title:"",
            harga:"",
            ppn:"",
            satuan:"",
            status:"",
            berat:"",
            stock:"",
        })
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));

    };
    handleSubmit(e){
        e.preventDefault();
        let parseData = {};
        parseData['title'] = this.state.title;
        parseData['harga'] = rmComma(this.state.harga);
        parseData['ppn'] = this.state.ppn;
        parseData['satuan'] = this.state.satuan;
        parseData['status'] = this.state.status;
        parseData['berat'] = this.state.berat;
        parseData['stock'] = rmComma(this.state.stock);
        console.log(parseData)

        if(parseData['title']===''){
            ToastQ.fire({icon:'error',title:`nama tidak boleh kosong`});
            return;
        }
        if(parseData['harga']===''){
            ToastQ.fire({icon:'error',title:`harga tidak boleh kosong`});
            return;
        }
        if(parseData['ppn']===''){
            ToastQ.fire({icon:'error',title:`ppn tidak boleh kosong`});
            return;
        }
        if(parseData['satuan']===''){
            ToastQ.fire({icon:'error',title:`satuan tidak boleh kosong`});
            return;
        }
        if(parseData['berat']===''){
            ToastQ.fire({icon:'error',title:`berat tidak boleh kosong`});
            return;
        }
        if(parseData['stock']===''){
            ToastQ.fire({icon:'error',title:`stock tidak boleh kosong`});
            return;
        }
        if(this.props.detail.id!==''){
            // this.props.dispatch(putPaket(parseData,this.props.detail.id));
        }
        else{
            this.props.dispatch(postBarang(parseData));
        }
        if(this.props.isError===true){
            this.clearState();
        }

    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formBarang"} size="md">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?"Tambah Barang":"Ubah Barang"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Nama</label>
                                <input type="text" className={"form-control"} name={"title"} value={this.state.title} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Harga</label>
                                <input type="text" className={"form-control"} name={"harga"} value={toCurrency(this.state.harga)} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Satuan</label>
                                <input type="text" className={"form-control"} name={"satuan"} value={this.state.satuan} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select name="status" className="form-control" defaultValue={this.state.status} onChange={this.handleChange}>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Berat (Gram)</label>
                                <input type="number" className={"form-control"} name={"berat"} value={this.state.berat} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input type="text" className={"form-control"} name={"stock"} value={toCurrency(this.state.stock)} onChange={this.handleChange}/>
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
        isLoadingPost: state.barangReducer.isLoadingPost,
        isError: state.barangReducer.isError,
    }
}
export default connect(mapStateToProps)(FormBarang);