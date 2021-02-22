import React, {Component} from 'react'
import { connect } from 'react-redux'
import WrapperModal from '../../_wrapper.modal'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import {ModalToggle} from "../../../../../redux/actions/modal.action";
import Paginationq, {ToastQ, toCurrency, toRp} from "../../../../../helper";
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import {fetchPaket} from "../../../../../redux/actions/paket/paket.action";
import {generatePin} from "../../../../../redux/actions/paket/pin.action";
import {fetchKategori, getKategori} from "../../../../../redux/actions/kategori/kategori.action";
import File64 from "../../../../common/File64";
import CKEditor from "react-ckeditor-component";
import {postContent, putContent} from "../../../../../redux/actions/konten/konten.action";


class FormBerita extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleChangeKategori = this.handleChangeKategori.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


        this.state={
            title:"",
            picture:"-",
            video:"-",
            caption:"",
            type:0,
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps.detail.id!==''){
            this.setState({
                caption:nextProps.detail.caption,
                id_category:nextProps.detail.id_category,
                title:nextProps.detail.title,
                video:nextProps.detail.video,
            });
            this.handleChangeKategori({value:nextProps.detail.id_category,label:nextProps.detail.category})
        }
    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formTestimoni"} size="lg">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?'Tambah':'Ubah'} Testimoni</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">


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
        kategori:state.kategoriReducer.data,
        isLoadingPost: state.contentReducer.isLoadingPost,
        isError: state.contentReducer.isError,

    }
}
export default connect(mapStateToProps)(FormBerita);