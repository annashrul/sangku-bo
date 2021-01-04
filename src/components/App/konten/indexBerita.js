import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Paginationq, {noImage, rmHtml, statusQ, toCurrency} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import Skeleton from 'react-loading-skeleton';
import moment from "moment";
import DetailAlamat from "../modals/masterdata/member/detail_alamat"
import DetailBank from "../modals/masterdata/member/detail_bank"
import UncontrolledButtonDropdown from "reactstrap/es/UncontrolledButtonDropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import {deleteContent, getContent} from "../../../redux/actions/konten/konten.action";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import FormBerita from "../modals/konten/berita/form_berita"
import * as Swal from "sweetalert2";

moment.locale('id');// en

class IndexBerita extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
        };
        this.handleChange   = this.handleChange.bind(this);
        this.handlePage     = this.handlePage.bind(this);
        this.handleSearch   = this.handleSearch.bind(this);
        this.handleDelete   = this.handleDelete.bind(this);
    }

    componentWillMount(){
        this.props.dispatch(getContent('berita',`page=1`));
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleValidate(){
        let where="";
        let page = localStorage.getItem("pageBerita");
        let any = this.state.any;

        if(page!==null&&page!==undefined&&page!==""){
            where+=`page=${page}`;
        }else{
            where+="page=1";
        }
        if(any!==null&&any!==undefined&&any!==""){
            where+=`&q=${any}`;
        }
        return where;

    }

    handlePage(pageNumber){
        localStorage.setItem("pageBerita",pageNumber);
        let where = this.handleValidate();
        this.props.dispatch(getContent('berita',where));

    }
    handleSearch(e){
        e.preventDefault();
        let where = this.handleValidate();
        this.props.dispatch(getContent('berita',where));
    }
    handleModal(e,par){
        if(par!==''){
            this.setState({
                detail:{
                    caption: this.props.data.data[par].caption,
                    id_category: this.props.data.data[par].id_category,
                    category: this.props.data.data[par].category,
                    created_at: this.props.data.data[par].created_at,
                    id: this.props.data.data[par].id,
                    picture: this.props.data.data[par].picture,
                    title:this.props.data.data[par].title,
                    type:this.props.data.data[par].type,
                    type_no:this.props.data.data[par].type_no,
                    updated_at:this.props.data.data[par].updated_at,
                    video:this.props.data.data[par].video,
                    writer:this.props.data.data[par].writer,
                }
            })
        }
        else{
            this.setState({
                detail:{
                    id:''
                }
            })
        }
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formBerita"));
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
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteContent(id,'berita'));
            }
        })
    }

    render(){
        const headStyle ={verticalAlign: "middle", textAlign: "center",whiteSpace: "nowrap"};
        const numberStyle ={verticalAlign: "middle", textAlign: "right",whiteSpace: "nowrap"};
        const stringStyle ={verticalAlign: "middle", textAlign: "left",whiteSpace: "nowrap"};
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
            <Layout page={"Berita"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Berita</h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-12 col-xs-12 col-md-3">
                                        <div className="form-group">
                                            <label>Cari</label>
                                            <input type="text" className="form-control" name="any" placeholder={"cari disini"} defaultValue={this.state.any} value={this.state.any} onChange={this.handleChange}  onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}}/>
                                        </div>
                                    </div>
                                    <div className="col-2 col-xs-2 col-md-4">
                                        <div className="form-group">
                                            <button style={{marginTop:"27px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleSearch(e)}><i className="fa fa-search"/></button>
                                            <button style={{marginTop:"27px",marginLeft:"5px"}} type="button" className="btn btn-primary" onClick={(e)=>this.handleModal(e,'')}><i className="fa fa-plus"/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        typeof data === 'object' ? data.length>0 ? data.map((v,i)=>{
                                            return(
                                                <div key={i} className="col-xl-3 height-card box-margin break-992-none break-768-none">
                                                    <div className="card">
                                                        <img className="card-img-top" src={v.picture} onError={(e)=>{e.target.onerror = null; e.target.src=`${noImage()}`}} alt="member image"/>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-9">
                                                                    <h5 className="card-title">{v.title} <span className={"badge badge-success"}>{v.category}</span></h5>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <UncontrolledButtonDropdown>
                                                                        <DropdownToggle caret />
                                                                        <DropdownMenu>
                                                                            <DropdownItem onClick={(e)=>this.handleModal(e,i)}>Ubah</DropdownItem>
                                                                            <DropdownItem onClick={(e)=>this.handleDelete(e,v.id)}>Hapus</DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledButtonDropdown>
                                                                </div>
                                                            </div>
                                                            <p className="card-text">{v.caption.length>20?rmHtml(v.caption).substr(0,20)+' ...':rmHtml(v.caption)}</p>
                                                            <p className="card-text"><small className="text-muted">{moment(v.created_at).startOf('hour').fromNow()}</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }):"":(()=>{
                                            let container =[];
                                            for(let x=0; x<8; x++){
                                                container.push(
                                                    <div key={x} className="col-xl-3 height-card box-margin break-992-none break-768-none">
                                                        <div className="card">
                                                            <img src="https://www.sustainablesanantonio.com/wp-content/plugins/ldd-directory-lite/public/images/noimage.png" className="card-img-top" alt="..."/>
                                                            <div className="card-body">
                                                                <h5 className="card-title"><Skeleton width={100}/></h5>
                                                                <p className="card-text"><Skeleton/></p>
                                                                <p className="card-text"><Skeleton/></p>
                                                                <p className="card-text"><Skeleton/></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return container;
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.isOpen===true?<FormBerita detail={this.state.detail}/>:null
                }

            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.contentReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.contentReducer.data,
    }
}


export default connect(mapStateToProps)(IndexBerita);