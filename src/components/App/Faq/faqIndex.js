import React,{Component} from 'react';
import Layout from 'components/Layout';
import Info from "../Dashboard/src/Info";
import connect from "react-redux/es/connect/connect";
import FormFaq from "../../App/modals/faq/form_faq";
import Paginationq from "../../../helper";
import moment from "moment";


import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import * as Swal from "sweetalert2";
import {deleteFaq, FetchFaq} from "../../../redux/actions/faq/faq.action";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {BrowserView, MobileView} from "react-device-detect";

class Faq extends Component{
    constructor(props){
        super(props);
        this.handleModal = this.handleModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state={
            detail:{},
            idx:0,
            isLoad:false
        }
    }
    componentWillMount(){
        this.props.dispatch(FetchFaq('page=1'));
    }
    handleModal(e,param) {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.props.dispatch(ModalType("formFaq"));
        if(param!==''){
            const {data}=this.props.data;
            this.setState({
                detail:{
                    id:data[param].id,
                    question:data[param].question,
                    answer:data[param].answer,
                    status:data[param].status,
                }
            });
        }
        else{
            this.setState({detail:undefined})
        }
    }
    handlePageChange(pageNumber){
        this.props.dispatch(FetchFaq(`page=${pageNumber}`));
    }


    handleDelete(e,id,i){
        e.preventDefault();
        this.setState({isLoad:true,idx:i});
        Swal.fire({
            title: 'Warning !!!',
            text: "Are you sure delete this data ??",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oke',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.value) {
                this.props.dispatch(deleteFaq(id));
                this.setState({isLoad:false})
            }
        })

        console.log("isLoad",this.state.isLoad)

    }

    render(){
        const {
            total,
            last_page,
            per_page,
            current_page,
            from,
            to,
            data
        } = this.props.data;
        return (
            <Layout page={"faq"}>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="dashboard-header-title mb-3">
                            <h5 className="mb-0 font-weight-bold">Faq</h5>
                        </div>
                    </div>
                    {/* Dashboard Info Area */}
                    <Info handleSubmit={this.handleSubmit}/>
                </div>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 col-xs-6 col-md-3">
                                        <div className="form-group">
                                            <label>Type something here ..</label>
                                            <input type="text" className="form-control" name="any"/>
                                        </div>
                                    </div>
                                    <div className="col-4 col-xs-4 col-md-4">
                                        <div className="form-group">
                                            <button style={{marginTop:"27px",marginRight:"2px"}} type="button" className="btn btn-primary"><i className="fa fa-search"/></button>
                                            <button style={{marginTop:"27px",marginRight:"2px"}} type="button" onClick={(e)=>this.handleModal(e,'')} className="btn btn-primary"><i className="fa fa-plus"/></button>
                                        </div>
                                    </div>
                                </div>
                                {
                                    typeof data === 'object' ? data.length>0?
                                        data.map((v, i) => {
                                            return (
                                                <div className="ibox-content" id="ibox-content" key={i}>
                                                    <div id="vertical-timeline" className="vertical-container light--timeline">
                                                        <div className="vertical-timeline-block">
                                                            <div className="vertical-timeline-icon bg-info btn-floating pulse">
                                                                <i className="fa fa-briefcase"/>
                                                            </div>

                                                            <div className="vertical-timeline-content">
                                                                <p style={{fontWeight:"normal!important"}}>{v.question}</p>
                                                                <p style={{color:"grey"}}>{v.answer}</p>

                                                                <div className="single-browser-area d-flex align-items-center justify-content-between mb-4">
                                                                    <div className="d-flex align-items-center mr-3">
                                                                        <span className="vertical-date">
                                                                            <small>{moment(v.created_at).locale('id').format("LLLL")}</small>
                                                                        </span>
                                                                    </div>
                                                                    <BrowserView>
                                                                        <div className="row">
                                                                            <div className="col-4 col-xs-4 col-md-4">
                                                                                <button className={"btn btn-primary"} onClick={(e)=>this.handleModal(e,i)}>Edit</button>
                                                                            </div>
                                                                            <div className="col-4 col-xs-4 col-md-4">
                                                                                <button className={"btn btn-danger"} onClick={(e)=>this.handleDelete(e,v.id)}>Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </BrowserView>
                                                                </div>
                                                                <MobileView>
                                                                    <div className="row">
                                                                        <div className="col-12 col-xs-12">
                                                                            <button style={{marginRight:"5px"}} className={"btn btn-primary"} onClick={(e)=>this.handleModal(e,i)}>Edit</button>
                                                                            <button className={"btn btn-danger"} onClick={(e)=>this.handleDelete(e,v.id)}>Delete</button>
                                                                        </div>
                                                                    </div>
                                                                </MobileView>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    : <img className="img-fluid" src={NOTIF_ALERT.NO_DATA}/>
                                    : (()=>{
                                                    let container =[];
                                                    for(let x=0; x<10; x++){
                                                        container.push(
                                                            <div className="ibox-content" id="ibox-content" key={x}>
                                                                <div id="vertical-timeline" className="vertical-container light--timeline">
                                                                    <div className="vertical-timeline-block">

                                                                        <div className="vertical-timeline-content">
                                                                            <p style={{fontWeight:"normal!important"}}><Skeleton/></p>
                                                                            <p style={{color:"grey"}}><Skeleton/></p>
                                                                            <p style={{color:"grey"}}><Skeleton/></p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return container;
                                                })()

                                }




                                <div style={{"marginTop":"20px","float":"right"}}>
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
                <FormFaq detail={this.state.detail}/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.faqReducer.isLoading,
        isOpen:state.modalReducer,
        data:state.faqReducer.data

    }
}


export default connect(mapStateToProps)(Faq);