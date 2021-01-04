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
import {postPaket, putPaket} from "../../../../redux/actions/paket/paket.action";
import FileBase64 from "react-file-base64";



var noBrgSelected=0;
class FormPaket extends Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.HandleChangeCategory = this.HandleChangeCategory.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleChangeDynamic = this.handleChangeDynamic.bind(this);

        this.state={
            kategori_data:[],
            kategori:"",
            id:"",
            title:"",
            harga:0,
            deskripsi:"",
            foto:"",
            status:"",
            point_volume:"",
            type:"",
            barang_data:[],
            error:{
                kategori:"",
                title:"",
                deskripsi:"",
                foto:"",
                status:"",
                point_volume:"",
                type:"",
            },
        }
    }

    handlePage(pageNumber){

    }
    handleChangeDynamic(e,i){
        e.preventDefault();
        let column = e.target.name;
        let value = e.target.value;
        let checked = e.target.checked;
        let hrg=parseInt(this.state.harga);
        let barang_data = [...this.state.barang_data];
        if(column === 'isSelected'){
            console.log(barang_data[i].bonus);
            if(value==='1'){
                noBrgSelected+=1;
                hrg=hrg+parseInt(barang_data[i].harga);
                console.log("HARGA PLUS",barang_data[i].harga)
            }
            else{
                noBrgSelected-=1;
                hrg=hrg-parseInt(barang_data[i].harga);
                console.log("HARGA MINUS",barang_data[i].harga)

            }
        }
        if(column==='bonus'&&barang_data[i].isSelected==='1'){
            if(value==='1'){
                hrg=hrg-parseInt(barang_data[i].harga);
            }
            else{
                hrg=hrg+parseInt(barang_data[i].harga);
            }
        }

        barang_data[i] = {...barang_data[i], [column]: value};
        this.setState({barang_data,harga:hrg});
    }
    componentDidUpdate(prevProps) {
        if(this.props.detail.id!==''){
            if (this.props.detail.id !== prevProps.detail.id) {
                // this.props.dispatch(detailPaket(this.props.detail.id));
                // this.getProps(this.props);

            }
        }
    }

    getProps(param){
        let kategori = typeof param.kategori.data === 'object' ? param.kategori.data : [];
        let barang = typeof param.barang.data === 'object' ? param.barang.data : [];
        let valKategori = [];
        for(let i=0;i<kategori.length;i++){
            valKategori.push({value:kategori[i].id,label:kategori[i].title})
        }
        let valBarang = [];

        if(param.detail.id!==''){
            if(param.paketDetail.detail!==undefined){
                if(param.paketDetail.detail.length>0){
                    for(let x=0;x<barang.length;x++){
                        valBarang.push({
                            isSelected:"0",
                            qty:"0",
                            id:barang[x].id,
                            title:barang[x].title,
                            bonus:"0",
                            harga:barang[x].harga,
                        });
                        for(let i=0;i<param.paketDetail.detail.length;i++){
                            if(param.paketDetail.detail[i].id_barang===barang[x].id){
                                noBrgSelected=param.paketDetail.detail.length;
                                Object.assign(valBarang[x],{
                                    isSelected:"1",
                                    bonus:"1",
                                    qty:param.paketDetail.detail[i].qty,
                                });
                            }
                        }

                    }
                }
            }
            this.setState({
                kategori:param.paketDetail.id_kategori,
                id:param.paketDetail.id,
                title:param.paketDetail.title,
                harga:param.paketDetail.harga,
                deskripsi:param.paketDetail.deskripsi,
                foto:"",
                status:param.paketDetail.status,
                point_volume:param.paketDetail.point_volume,
                type:param.paketDetail.type,
            });
        }
        else{
            for(let i=0;i<barang.length;i++){
                valBarang.push({
                    isSelected:"0",
                    qty:"0",
                    id:barang[i].id,
                    title:barang[i].title,
                    bonus:"0",
                    harga:barang[i].harga,
                });

            }
        }
        this.setState({
            kategori_data:valKategori,
            barang_data:valBarang
        });
    }


    componentWillReceiveProps(nextProps){
        console.log("DATA DETAIL",nextProps.paketDetail);
        this.getProps(nextProps);
    }

    HandleChangeCategory(val){
        this.setState({
            kategori:val.value,
        });
    }
    clearState(){
        this.setState({
            kategori_data:[],
            kategori:"",
            id:"",
            title:"",
            harga:0,
            deskripsi:"",
            foto:"",
            status:"",
            point_volume:"",
            type:"",
            barang_data:[],
        });
    }
    toggle = (e) => {
        e.preventDefault();

        this.clearState();

        const bool = !this.props.isOpen;
        this.props.dispatch(ModalToggle(bool));

    };
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        let err = Object.assign({}, this.state.error, {
            [event.target.name]: ""
        });
        this.setState({
            error: err
        });
    }
    handleValidation(e){
        e.preventDefault();
        // let err = this.state.error;
        let detail=[];

        let parseData = {};
        parseData['title'] = this.state.title;
        parseData['harga'] = this.state.harga;
        parseData['deskripsi'] = this.state.deskripsi;
        parseData['id_kategori'] = this.state.kategori;
        parseData['status'] = this.state.status;
        parseData['point_volume'] = this.state.point_volume;
        parseData['type'] = this.state.type;
        parseData['foto'] = this.state.foto!==""?this.state.foto.base64:'-';

        if(parseData['title']===''){
            ToastQ.fire({icon:'error',title:`title tidak boleh kosong`});
            return;
        }
        if(parseData['harga']===''){
            ToastQ.fire({icon:'error',title:`harga tidak boleh kosong`});
            return;
        }
        if(parseData['deskripsi']===''){
            ToastQ.fire({icon:'error',title:`deskripsi tidak boleh kosong`});
            return;
        }
        if(parseData['id_kategori']===''){
            ToastQ.fire({icon:'error',title:`kategori tidak boleh kosong`});
            return;
        }
        if(parseData['status']===''){
            ToastQ.fire({icon:'error',title:`status tidak boleh kosong`});
            return;
        }
        if(parseData['point_volume']===''){
            ToastQ.fire({icon:'error',title:`PV tidak boleh kosong`});
            return;
        }
        if(parseData['type']===''){
            ToastQ.fire({icon:'error',title:`tipe tidak boleh kosong`});
            return;
        }
        if(noBrgSelected===0){
            ToastQ.fire({icon:'error',title:`belum ada barang yang dipilih`});
            return;
        }
        for(let i=0;i<this.state.barang_data.length;i++){
            if(this.state.barang_data[i].isSelected==="1"){
                if(this.state.barang_data[i].qty==="0"){
                    ToastQ.fire({icon:'error',title:`qty ${this.state.barang_data[i].title} harus lebih dari nol`});
                    return;
                }
                detail.push({
                    "id_barang":this.state.barang_data[i].id,
                    "qty":this.state.barang_data[i].qty,
                    "isbonus":this.state.barang_data[i].bonus
                });
            }
        }
        parseData['detail'] = detail;
        console.log(parseData);
        if(this.props.detail.id!==''){
            this.props.dispatch(putPaket(parseData,this.props.detail.id));
        }
        else{
            this.props.dispatch(postPaket(parseData));
        }
        // this.props.dispatch(postPaket(parseData));
        if(this.props.isError===true){
            this.clearState();
        }

    }

    handleFile(files) {
        this.setState({foto: files});
    }
    render(){
        const columnStyle = {verticalAlign: "middle", textAlign: "center",whiteSpace:"nowrap"};
        return (
            <WrapperModal isOpen={this.props.isOpen && this.props.type === "formPaket"} size="lg"  className="custom-map-modal">
                <ModalHeader toggle={this.toggle}>{this.props.detail.id===''?"Tambah Paket":"Ubah Paket"}</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>title</label>
                                <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
                                <div className="invalid-feedback" style={this.state.error.title !== "" ? {display: 'block'} : {display: 'none'}}>{this.state.error.title}</div>
                            </div>
                            <div className="form-group">
                                <label>Harga</label>
                                <input type="text" className="form-control" name="harga" value={toCurrency(this.state.harga)} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Deskripsi</label>
                                <input type="text" className="form-control" name="deskripsi" value={this.state.deskripsi} onChange={this.handleChange} />
                                <div className="invalid-feedback" style={this.state.error.deskripsi !== "" ? {display: 'block'} : {display: 'none'}}>{this.state.error.deskripsi}</div>
                            </div>
                            <div className="form-group">
                                <label>Kategori</label>
                                {
                                    typeof this.props.kategori.data === 'object' ?
                                        (
                                            <Select
                                                options={this.state.kategori_data}
                                                placeholder="Pilih Kategori"
                                                onChange={this.HandleChangeCategory}
                                                value={
                                                this.state.kategori_data.find(op => {
                                                    return op.value === this.state.kategori
                                                })
                                            }

                                            />
                                        )
                                    : <Skeleton height={40}/>
                                }

                            </div>
                            <div className="form-group">
                                <label>Status</label>
                                <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.handleChange} defaultValue={this.state.status}>
                                    <option value="">=== Pilih ===</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                                <div className="invalid-feedback" style={this.state.error.status !== "" ? {display: 'block'} : {display: 'none'}}>{this.state.error.status}</div>
                            </div>
                            <div className="form-group">
                                <label>PV</label>
                                <input type="text" className="form-control" name="point_volume" value={this.state.point_volume} onChange={this.handleChange} />
                                <div className="invalid-feedback" style={this.state.error.point_volume !== "" ? {display: 'block'} : {display: 'none'}}>{this.state.error.point_volume}</div>
                            </div>
                            <div className="form-group">
                                <label>Tipe</label>
                                <select className="form-control form-control-lg" name="type" value={this.state.type} onChange={this.handleChange} defaultValue={this.state.type}>
                                    <option value="">=== Pilih ===</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                                <div className="invalid-feedback" style={this.state.error.type !== "" ? {display: 'block'} : {display: 'none'}}>{this.state.error.type}</div>
                            </div>
                            <div className="form-group">
                                <label>Gambar <small style={{color:"red",fontWeight:"bold"}}>{this.props.detail.id!==''?"( kosongkan apabila tidak akan diubah )":""}</small></label><br/>
                                <FileBase64 multiple={ false } className="mr-3 form-control-file" onDone={ this.handleFile.bind(this) } />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Type something here ..</label>
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control" name="any" placeholder={"search by transaction code, note"} value={this.state.any} onChange={this.handleChange} onKeyPress={event=>{if(event.key==='Enter'){this.handleSearch(event);}}} />
                                    <div className="input-group-prepend">
                                        <button className="btn btn-primary" onClick={(event)=>this.handleSearch(event)}>
                                            <i className="fa fa-search"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={columnStyle}>No</th>
                                            <th style={columnStyle}>Pilih</th>
                                            <th style={columnStyle}>Bonus</th>
                                            <th style={columnStyle}>Nama</th>
                                            <th style={columnStyle}>Qty</th>
                                            <th style={columnStyle}>Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                       this.state.barang_data.map((v,i)=>{
                                            console.log("finish value",v.isSelected)
                                            let errQty='';
                                            let isRead=true;
                                            if(v.isSelected==='1'){
                                                isRead=false;
                                               if(v.qty<1){
                                                   errQty="qty tidak boleh kosong";
                                               }
                                            }
                                            return (
                                                <tr key={i}>
                                                    <td style={columnStyle}>
                                                        <span class="circle" style={v.isSelected==="1"?{background:"#5d78ff",color:"white"}:{background:"#e3e3e3"}}>{i+1 + (10 * (parseInt(this.props.barang.current_page,10)-1))}</span>

                                                    </td>
                                                    <td style={columnStyle}>
                                                        <select name="isSelected" className="form-control" defaultValue={v.isSelected} onChange={(e)=>this.handleChangeDynamic(e,i)}>
                                                            <option value="1" selected={v.isSelected==="1"}>YA</option>
                                                            <option value="0" selected={v.isSelected==="0"}>TIDAK</option>
                                                        </select>

                                                    </td>
                                                    <td style={columnStyle}>
                                                        <select name="bonus" className="form-control" defaultValue={v.bonus} onChange={(e)=>this.handleChangeDynamic(e,i)}>
                                                            <option value="1" selected={v.bonus==="1"}>YA</option>
                                                            <option value="0" selected={v.bonus==="0"}>TIDAK</option>
                                                        </select>
                                                    </td>
                                                    <td style={columnStyle}> {v.title}</td>
                                                    <td style={columnStyle}>
                                                        <input style={{textAlign:"right"}} type="text" name="qty" className="form-control" value={v.qty} onChange={(e)=>this.handleChangeDynamic(e,i)} readOnly={isRead}/>
                                                        {
                                                            <small style={{color:"red"}}>{errQty}</small>
                                                        }
                                                    </td>
                                                    <td style={columnStyle}> {toRp(v.harga)}</td>

                                                </tr>
                                            );
                                        })
                                    }

                                    </tbody>
                                </table>
                            </div>
                            <div style={{"float":"right"}}>
                                <Paginationq
                                    current_page={parseInt(this.props.barang.current_page,10)}
                                    per_page={parseInt(this.props.barang.per_page,10)}
                                    total={parseInt(this.props.barang.total,10)}
                                    callback={this.handlePage}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="form-group" style={{textAlign:"right"}}>
                        <button style={{color:"white"}} type="button" className="btn btn-warning mb-2 mr-2" onClick={this.toggle} ><i className="ti-close"/>Keluar</button>
                        <button type="submit" className="btn btn-primary mb-2 mr-2" onClick={this.handleValidation} ><i className="ti-save" />{!this.props.isLoadingPost?'Simpan':'Loading ......'}</button>
                    </div>
                </ModalFooter>
            </WrapperModal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // isLoadingPost: state.paketReducer.isLoadingPost,
        // isLoading: state.barangReducer.isLoading,
        // isLoadingDetail: state.paketReducer.isLoadingDetail,
        // isError: state.paketReducer.isError,
        isOpen: state.modalReducer,
        type: state.modalTypeReducer,
        // paketDetail:state.paketReducer.detail,

        // kategori:state.kategoriReducer.data,
        // barang:state.barangReducer.data,
        // dataDetail:state.paketReducer.detail

    }
}
export default connect(mapStateToProps)(FormPaket);