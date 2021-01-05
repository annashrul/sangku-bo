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
            id_category:'',
            data_kategori:[],

        }
    }

    componentWillReceiveProps(nextProps){
        let dataKategori=[];
        if(nextProps.kategori.data!==undefined){
            if(nextProps.kategori.data.length>0){

                nextProps.kategori.data.map((v,i)=>{
                    dataKategori.push({value:v.id,label:v.title})
                });
            }
        }
        this.setState({data_kategori:dataKategori});

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

    componentWillMount(){
        this.props.dispatch(fetchKategori('testimoni'));
    }

    clearState(){
        this.setState({
            title:"",
            picture:"-",
            video:"-",
            caption:"",
            type:0,
            id_category:'',
            data_kategori:[],
        })
    }
    handleChangeImage(files) {
        if (files.status==='success'){
            this.setState({
                picture: files.base64
            })
        }
    };

    handleChangeKategori(val){
        this.setState({
            id_category:val.value
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

    updateContent(newContent) {
        this.setState({
            caption: newContent
        })
    }

    onChange(evt){
        var newContent = evt.editor.getData();
        this.setState({
            caption: newContent
        })
    }

    onBlur(evt){
    }

    afterPaste(evt){
    }

    handleSubmit(e){
        e.preventDefault();
        let parsedata={
            "title":this.state.title,
            "picture":this.state.picture,
            "video":this.state.video,
            "caption":this.state.caption,
            "type":1,
            "id_category":this.state.id_category
        };
        if(parsedata['title']===''){
            ToastQ.fire({icon:'error',title:`judul tidak boleh kosong`});
            return;
        }
        if(parsedata['id_category']===''){
            ToastQ.fire({icon:'error',title:`kategori tidak boleh kosong`});
            return;
        }

        if(parsedata['caption']===''){
            ToastQ.fire({icon:'error',title:`Deskripsi tidak boleh kosong`});
            return;
        }
        if(this.props.detail.id===''){
            this.props.dispatch(postContent(parsedata,'testimoni'));
        }
        else{
            this.props.dispatch(putContent(this.props.detail.id,parsedata,'testimoni'));
        }
        if(this.props.isError===true){
            this.clearState();
        }

    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formTestimoni"} size="md">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?'Tambah':'Ubah'} Testimoni</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-12">

                            <div className="form-group">
                                <label>Judul</label>
                                <input type="text" className={"form-control"} name={"title"} value={this.state.title} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Kategori</label>
                                {

                                    <Select
                                        options={this.state.data_kategori}
                                        placeholder="==== Pilih Kategori ===="
                                        onChange={this.handleChangeKategori}
                                        value={
                                            this.state.data_kategori.find(op => {
                                                return op.value === this.state.id_category
                                            })
                                        }

                                    />

                                }

                            </div>
                            <div className="form-group">
                                <label>Link Video</label>
                                <input type="text" className={"form-control"} name={"video"} value={this.state.video} onChange={this.handleChange}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputState" className="col-form-label">Gambar {this.props.detail.id!==''?<small style={{color:'red'}}>kosongkan bila tidak akan diubah</small>:''}</label><br/>
                                <File64
                                    multiple={ false }
                                    maxSize={2048} //in kb
                                    fileType='png, jpg' //pisahkan dengan koma
                                    className="mr-3 form-control-file"
                                    onDone={ this.handleChangeImage }
                                    showPreview={true}
                                    lang='id'
                                    previewLink={this.state.prev}
                                    previewConfig={{
                                        width:'200px',
                                        height: '200px'
                                    }}
                                />

                            </div>
                            <CKEditor
                                activeClass="p10"
                                content={this.state.caption}
                                events={{
                                    "blur": this.onBlur,
                                    "afterPaste": this.afterPaste,
                                    "change": this.onChange
                                }}

                            />


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