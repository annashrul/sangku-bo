import React,{Component} from 'react';
import WrapperModal from "../../_wrapper.modal";
import connect from "react-redux/es/connect/connect";
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import Select from 'react-select';
import {getUserLevel} from "../../../../../redux/actions/masterdata/user_level.action";
import {ModalToggle} from "../../../../../redux/actions/modal.action";
import {ToastQ} from "../../../../../helper";
import {postUserList, putUserList} from "../../../../../redux/actions/masterdata/user_list.action";

class FormUserList extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUserLevel = this.handleChangeUserLevel.bind(this);
        this.state={
            name:'',
            username:'',
            password:'',
            conf_password:'',
            level:'',
            status:'1',
            level_data:[]
        }

    }

    clearState(){
        this.setState({
            name:'',
            username:'',
            password:'',
            conf_password:'',
            level:'',
            status:'1',
            level_data:[]
        })
    }

    componentWillMount(){
        this.props.dispatch(getUserLevel());
    }

    componentWillReceiveProps(nextProps){
        let data=[];

        if(nextProps.dataLevel.data!==undefined){
            if(nextProps.dataLevel.data.length>0){
                console.log(nextProps.dataLevel.data);
                nextProps.dataLevel.data.map((v,i)=>{
                    data.push({value:v.id,label:v.level});
                    // this.setState({
                    //     name:'',
                    //     username:'',
                    //     password:'',
                    //     level:'',
                    //     status:'',
                    // })
                })
            }
        }
        if(nextProps.detail.id!==''){
            this.handleChangeUserLevel({value:nextProps.detail.id_level,label:nextProps.detail.level})
            this.setState({
                name:nextProps.detail.name,
                username:nextProps.detail.username,
                password:nextProps.detail.password,
                conf_password:nextProps.detail.conf_password,
                status:nextProps.detail.status,
            })
        }
        this.setState({level_data:data});
    }

    handleChangeUserLevel(val){
        this.setState({
            level:val.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        let parseData   = {};
        parseData['name']    = this.state.name;
        parseData['username']    = this.state.username;
        let pass='';
        if(this.props.detail.id!==''){
            if(this.state.password!=='-'||this.state.password!==''){
                pass    = this.state.password;
            }else{
                pass = '-';
            }
        }else{
            pass = this.state.password;
        }
        parseData['password'] = pass;
        parseData['conf_password']    = this.state.conf_password;
        parseData['level']    = this.state.level;
        parseData['status']    = this.state.status;

        // if(parseData['password'])

        console.log(parseData);
        if(parseData['name']===''){
            ToastQ.fire({icon:'error',title:`nama tidak boleh kosong`});
            return;
        }
        if(parseData['username']===''){
            ToastQ.fire({icon:'error',title:`username tidak boleh kosong`});
            return;
        }
        if(this.props.detail.id===''){
            if(parseData['password']===''){
                ToastQ.fire({icon:'error',title:`password tidak boleh kosong`});
                return;
            }
            if(parseData['conf_password']===''){
                ToastQ.fire({icon:'error',title:`konfirmasi password tidak boleh kosong`});
                return;
            }
        }



        if(parseData['level']===''){
            ToastQ.fire({icon:'error',title:`level tidak boleh kosong`});
            return;
        }
        if(parseData['status']===''){
            ToastQ.fire({icon:'error',title:`status tidak boleh kosong`});
            return;
        }
        if(parseData['conf_password']!==parseData['password']){
            ToastQ.fire({icon:'error',title:`konfirmasi password tidak sesuai`});
            return;
        }
        if(this.props.detail.id===''){
            this.props.dispatch(postUserList(parseData));
        }
        else{
            this.props.dispatch(putUserList(parseData,this.props.detail.id));
        }
        this.clearState();
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle(e){
        e.preventDefault();
        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));
    };

    render(){
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formUserList"} size="md">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id!==''?`Ubah User List`:`Tambah User List`}</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nama</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}  onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input readOnly={this.props.detail.id!==''} type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password<small>{this.props.detail.id!==''?' (  kosongkan jika tidak akan diubah )':''}</small></label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Konfirmasi Password<small>{this.props.detail.id!==''?' (  kosongkan jika tidak akan diubah )':''}</small></label>
                        <input type="password" className="form-control"  name="conf_password" value={this.state.conf_password} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label>User Level</label>
                        <Select
                            options={this.state.level_data}
                            placeholder="Pilih User Level"
                            onChange={this.handleChangeUserLevel}
                            value={
                                this.state.level_data.find(op => {
                                    return op.value === this.state.level
                                })
                            }

                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" className={"form-control"} defaultValue={this.state.status} onChange={this.handleChange}>
                            <option value="1">Aktif</option>
                            <option value="0">Tidak Aktif</option>
                        </select>
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
        isLoadingPost: state.userListReducer.isLoadingPost,
        isError: state.userListReducer.isError,
        dataLevel:state.userLevelReducer.data
    }
}

export default connect(mapStateToProps)(FormUserList);

