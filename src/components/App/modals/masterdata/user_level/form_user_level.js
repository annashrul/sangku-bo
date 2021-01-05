import React,{Component} from 'react';
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";

import {
    ModalBody,
    ModalHeader,
    ModalFooter
} from "reactstrap";
import {ModalToggle} from "../../../../../redux/actions/modal.action";
import {stringifyFormData,ToastQ} from "../../../../../helper";
import {postUserLevel, putUserLevel} from "../../../../../redux/actions/masterdata/user_level.action";


class FormUserLevel extends Component{
    //MENU ACCESS MASTERDATA = 0-9
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            pin: [{id: 0, value: "0", isChecked: false,label:'PIN'}],
            member: [{id: 1, value: "0", isChecked: false,label:'Member'}],
            paket: [
                {id: 2, value: "0", isChecked: false,label:'Paket'},
                {id: 3, value: "0", isChecked: false,label:'Barang'},
            ],
            masterdata       : [
                {id: 10, value: "0", isChecked: false,label:'User List'},
                {id: 11, value: "0", isChecked: false,label:'User Level'},
                {id: 12, value: "0", isChecked: false,label:''},
                {id: 13, value: "0", isChecked: false,label:''},
                {id: 14, value: "0", isChecked: false,label:''},
                {id: 15, value: "0", isChecked: false,label:''},
                {id: 16, value: "0", isChecked: false,label:''},
                {id: 17, value: "0", isChecked: false,label:''},
                {id: 18, value: "0", isChecked: false,label:''},
                {id: 19, value: "0", isChecked: false,label:''},
            ],
            konten       : [
                {id: 20, value: "0", isChecked: false,label:'Berita'},
                {id: 21, value: "0", isChecked: false,label:'Testimoni'},
                {id: 22, value: "0", isChecked: false,label:''},
                {id: 23, value: "0", isChecked: false,label:''},
                {id: 24, value: "0", isChecked: false,label:''},
                {id: 25, value: "0", isChecked: false,label:''},
                {id: 26, value: "0", isChecked: false,label:''},
                {id: 27, value: "0", isChecked: false,label:''},
                {id: 28, value: "0", isChecked: false,label:''},
                {id: 29, value: "0", isChecked: false,label:''},
            ],
            lvl             : "",
            access          : [],
            array_modul     : ['pin','member','paket','masterdata','konten'],

        }
    }
    clearState(){
        this.setState({
            pin: [{id: 0, value: "0", isChecked: false,label:'PIN'}],
            member: [{id: 1, value: "0", isChecked: false,label:'Member'}],
            paket: [
                {id: 2, value: "0", isChecked: false,label:'Paket'},
                {id: 3, value: "0", isChecked: false,label:'Barang'},
            ],
            masterdata       : [
                {id: 10, value: "0", isChecked: false,label:'User List'},
                {id: 11, value: "0", isChecked: false,label:'User Level'},
                {id: 12, value: "0", isChecked: false,label:''},
                {id: 13, value: "0", isChecked: false,label:''},
                {id: 14, value: "0", isChecked: false,label:''},
                {id: 15, value: "0", isChecked: false,label:''},
                {id: 16, value: "0", isChecked: false,label:''},
                {id: 17, value: "0", isChecked: false,label:''},
                {id: 18, value: "0", isChecked: false,label:''},
                {id: 19, value: "0", isChecked: false,label:''},
            ],
            konten       : [
                {id: 20, value: "0", isChecked: false,label:'Berita'},
                {id: 21, value: "0", isChecked: false,label:'Testimoni'},
                {id: 22, value: "0", isChecked: false,label:''},
                {id: 23, value: "0", isChecked: false,label:''},
                {id: 24, value: "0", isChecked: false,label:''},
                {id: 25, value: "0", isChecked: false,label:''},
                {id: 26, value: "0", isChecked: false,label:''},
                {id: 27, value: "0", isChecked: false,label:''},
                {id: 28, value: "0", isChecked: false,label:''},
                {id: 29, value: "0", isChecked: false,label:''},
            ],
            lvl             : "",
            access          : [],
            array_modul     : ['pin','member','paket','masterdata','konten'],
        })
    }
    getProps(param){
        if (param.detail !== undefined && param.detail !== []) {
            let array=[];

            this.state.array_modul.map(val=>{
                array.push(...this.state[val]);
                return val;
            });

            this.handleLoopAccess(
                array,
                param.detail.access
            );
            this.setState({lvl:param.detail.lvl});
        }
        else{
            this.clearState();
        }
    }
    componentWillReceiveProps(nextProps) {
        this.getProps(nextProps);
    }
    componentWillMount(){
        this.getProps(this.props);
    }
    toggle = (e) => {
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
        this.clearState();
    };
    handleLoopAccess(moduls=[],nextProps=[]){
        if(nextProps!==null){
            moduls.forEach(modul=>{
                for(let i=0;i<nextProps.length;i++){
                    if(modul.id === nextProps[i].id){
                        modul.isChecked = nextProps[i].isChecked;
                        modul.value = nextProps[i].value;
                    }
                }
            });
            return moduls;
        }
    }
    handleAllChecked = (event,param) => {
        let moduls = this.state[param];
        moduls.forEach(modul => {
            modul.isChecked = event.target.checked;
            modul.value = modul.label!==''?modul.isChecked === false ? "0":"1":"0";
        });
        this.setState({param: moduls});
    };
    handleCheckChieldElement = (event,param) => {
        let moduls = this.state[param];
        moduls.forEach(modul => {
            if (modul.label === event.target.getAttribute("id")){
                modul.isChecked =  event.target.checked;
                modul.value = modul.label!==''? modul.isChecked === false ? "0":"1":"0";
            }
        });
        this.setState({param: moduls});
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        let err = Object.assign({}, this.state.error, {[event.target.name]: ""});
        this.setState({error: err});
    };
    handleSubmit(e){
        e.preventDefault();
        let parseData   = {};
        let akses       = [];
        this.state.array_modul.forEach(val=>{
            this.state[val].forEach(key=>{
                akses.push({id: key.id, value:key.value, isChecked:key.isChecked, label:key.label})
            })
        });
        parseData['level']    = this.state.lvl;
        parseData['access_level'] = JSON.stringify(akses);
        if(parseData['level']===''||parseData['level']===undefined){
            ToastQ.fire({icon:'error',title:`nama user level tidak boleh kosong`});
            return;
        }
        if(this.props.detail.id===''){
            this.props.dispatch(postUserLevel(parseData))
        }
        else{
            this.props.dispatch(putUserLevel(parseData,this.props.detail.id));
        }
        this.clearState();
    }
    render(){
        const {array_modul} = this.state;
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formUserLevel"} size="lg">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?"Tambah User Level":"Ubah User Level"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label>Nama User Level</label>
                                <input type="text" className="form-control" name="lvl" value={this.state.lvl}  onChange={(e)=>this.handleChange(e)} />

                            </div>

                        </div>
                        {
                            array_modul.map((val,i)=>{
                                return (
                                    <div className="col-md-12" key={i}>
                                        <div className="form-group">
                                            <input type="checkbox" onChange={(e)=>this.handleAllChecked(e,val)}  value="checkedall" /> <b style={{color:'red'}}>{val.replace('_',' ').toUpperCase()}</b>
                                        </div>
                                        <div className="row">
                                            {
                                                this.state[val].map((modul, index) => {
                                                    return (
                                                        modul.label!==''? <div className="col-md-3" key={index} >
                                                            <div className="form-group" style={{marginLeft:"6px",fontSize:"12px"}}>
                                                                <input onChange={(e)=>this.handleCheckChieldElement(e,val)} id={modul.label} className={modul.label} type="checkbox" checked={modul.isChecked} value={modul.value} /> {modul.label}
                                                            </div>
                                                        </div>:''
                                                    )
                                                })
                                            }
                                        </div>
                                        <hr/>
                                    </div>
                                );
                            })
                        }

                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button style={{color:"white"}} type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle} ><i className="ti-close"/>Keluar</button>
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleSubmit} ><i className="ti-save" />{!this.props.isLoadingPost?'Simpan':'Loading ......'}</button>
                    </div>
                </ModalFooter>
            </WrapperModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        isLoadingPost: state.userLevelReducer.isLoadingPost,
        isError: state.userLevelReducer.isError,
    }
}

export default connect(mapStateToProps)(FormUserLevel);
