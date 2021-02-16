import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Paginationq, {rangeDate, toCurrency, toRp} from "../../../helper";
import {NOTIF_ALERT} from "../../../redux/actions/_constants";
import {ModalToggle, ModalType} from "../../../redux/actions/modal.action";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment'
import General from './general'

class IndexPin extends Component{
    constructor(props){
        super(props);
        this.state={
            detail:{},
            any:"",
            type:0,
            last:'',
            dateFrom:moment().format("yyyy-MM-DD"),
            dateTo:moment().format("yyyy-MM-DD")
        };
    }
   


    render(){
        return(
            <Layout page={"Setting"}>
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row" style={{zoom:"90%"}}>
                                    <div className="col-12 col-xs-12 col-md-12">
                                         <Tabs>
                                            <TabList>
                                                <Tab>General</Tab>
                                                <Tab>Title 2</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <General/>
                                            </TabPanel>
                                            <TabPanel>
                                                <h2>Any content 2</h2>
                                            </TabPanel>
                                        </Tabs>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
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