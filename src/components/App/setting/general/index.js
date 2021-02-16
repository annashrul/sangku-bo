import React,{Component} from 'react';
import {connect} from "react-redux";
import Layout from 'components/Layout';
import Paginationq, {rangeDate, toCurrency, toRp} from "helper";
import {NOTIF_ALERT} from "redux/actions/_constants";
import {ModalToggle, ModalType} from "redux/actions/modal.action";
import Skeleton from 'react-loading-skeleton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment'
import File64 from 'components/common/File64'
import Select from 'react-select';

class Index extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            logo:"",
            address:"",
            email:"",
            no_telp:"",
            fax:"",
            kecamatan_asal:"",
            legalitas:"",
            fb:"",
            twt:"",
            ig:"",
            yt:"",
            website:"",
            data_kec:[],
            wd_charge:0,
            tf_charge:0,
            max_lvl_sponsor:0,
            dp_min: 0,
            wd_min: 0,
            tf_min: 0,
            otp_message:"",
            aktivasi_message: "",
            transaksi_message: ""
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleKecamatan = this.handleKecamatan.bind(this)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleKecamatan(val) {
        this.setState({
            kecamatan_asal: val.value,
        });
    }

   handleFile(files) {
       this.setState({
           logo: files
       });
   }


    render(){
        return(
            <div>
                <div className="row" style={{marginTop:'20px'}}>
                    <div className="col-md-12">
                        <div className="alert bg-secondary text-light">
                            Setelah melakukan perubahan silahkan <span style={{fontWeight:'800', color:'yellow'}}>tekan tombol "Enter"</span> untuk melakukan update.
                        </div>

                    </div>
                </div>
                <h4 className="margin-bottom-20" style={{marginTop:'30px',marginBottom:'20px'}}>Konfigurasi Perusahaan</h4>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className='form-group'>
                            <label>Nama Perusahaan</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-building"/></span>
                                </div>
                                <input type="text" name='title' onChange={this.handleChange} value={this.state.title} className="form-control" placeholder="Nama Perusahaan" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Logo Perusahaan</label>
                            <File64 multiple={ false }
                                    maxSize={2048} //in kb
                                    fileType='png, jpg' //pisahkan dengan koma
                                    className="mr-3 form-control-file"
                                    onDone={ this.handleFile.bind(this) }
                                    showPreview={true}
                                    lang='id'
                                    previewLink={this.state.prev}
                                    previewConfig={{
                                        width:'200px',
                                        height: '200px'
                                    }}
                                />
                        </div>
                        <div className='form-group'>
                            <label>Alamat Perusahaan</label>
                            <textarea rows={7} className="form-control" onChange={this.handleChange} name="address">{this.state.address}</textarea>
                        </div>
                        <div className='form-group'>
                            <label>Legalitas Perusahaan</label>
                            <textarea rows={7} className="form-control" onChange={this.handleChange} name="legalitas">{this.state.legalitas}</textarea>
                        </div>
                    </div>

                    <div className='col-md-6 col-sm-12'>
                        <div className='form-group'>
                            <label>Website</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-desktop"/></span>
                                </div>
                                <input type="text" name='website' onChange={this.handleChange} value={this.state.website} className="form-control" placeholder="Website" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-envelope"/></span>
                                </div>
                                <input type="text" name='email' onChange={this.handleChange} value={this.state.email} className="form-control" placeholder="Email" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Telepon</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-phone"/></span>
                                </div>
                                <input type="text" name='no_telp' onChange={this.handleChange} value={this.state.no_telp} className="form-control" placeholder="Telepon" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Fax</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-phone-square"/></span>
                                </div>
                                <input type="text" name='fax' onChange={this.handleChange} value={this.state.fax} className="form-control" placeholder="Fax" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Kecamatan Pengiriman <small>(untuk expedisi)</small></label>
                                <Select
                                    options={this.state.data_kec}
                                    placeholder="Pilih Kecamatan Pengiriman"
                                    onChange={this.handleKecamatan}
                                    value={
                                        this.state.data_kec.find(op => {
                                            return op.value === this.state.kategori
                                        })
                                    }

                                />
                        </div>
                        <div className='form-group'>
                            <label>Facebook</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-facebook-official"/></span>
                                </div>
                                <input type="text" name='fb' onChange={this.handleChange} value={this.state.fb} className="form-control" placeholder="Facebook" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Twitter</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-twitter-square"/></span>
                                </div>
                                <input type="text" name='twt' onChange={this.handleChange} value={this.state.twt} className="form-control" placeholder="Twitter" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Instagram</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-instagram"/></span>
                                </div>
                                <input type="text" name='ig' onChange={this.handleChange} value={this.state.ig} className="form-control" placeholder="Instagram" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>YouTube</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon4"><i className="fa fa-youtube-square"/></span>
                                </div>
                                <input type="text" name='yt' onChange={this.handleChange} value={this.state.yt} className="form-control" placeholder="YouTube" />
                            </div>
                        </div>
                    </div>
                </div>
                

                <h4 style={{marginTop:'30px',marginBottom:'20px'}}>Konfigurasi Umum</h4>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className='form-group'>
                            <label>Pesan OTP</label>
                            <textarea rows={4} className="form-control" onChange={this.handleChange} name="otp_message">{this.state.otp_message}</textarea>
                        </div>
                        <div className='form-group'>
                            <label>Pesan OTP Aktivasi</label>
                            <textarea rows={4} className="form-control" onChange={this.handleChange} name="aktivasi_message">{this.state.aktivasi_message}</textarea>

                        </div>
                        <div className='form-group'>
                            <label>Pesan Transaksi OTP</label>
                            <textarea rows={4} className="form-control" onChange={this.handleChange} name="transaksi_message">{this.state.transaksi_message}</textarea>
                        </div>
                        <div>
                            <h6>Note:</h6>
                            <ul>
                                <li>- Gunakan [nama] untuk nama member secara dinamis.</li>
                                <li>- Gunakan [otp] untuk mengeluarkan kode (otp/aktivasi) secara dinamis.</li>
                                <li>- Untuk memberi <b>Bold</b> pada pesan gunakan tanda '*' pada awal dan akhir kalimat. Cth: *ini text bold*</li>
                            </ul>
                        </div>

                    </div>
                

                    <div className="col-md-6 col-sm-12">
                        <div className='form-group'>
                            <label>Withdraw Charge</label>
                            <div className="input-group">
                                <input type="number" name='wd_charge' onChange={this.handleChange} value={this.state.wd_charge} className="form-control" placeholder="Withdraw Charge" />
                                <div className="input-group-append">
                                    <span className="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Transfer Charge</label>
                            <div className="input-group">
                                <input type="number" name='tf_charge' onChange={this.handleChange} value={this.state.tf_charge} className="form-control" placeholder="Transfer Charge" />
                                <div className="input-group-append">
                                    <span className="input-group-text">%</span>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Max Generasi <small>(Untuk pembagian bonus royalti RO)</small></label>
                            <div className="input-group">
                                <input type="number" name='max_lvl_sponsor' onChange={this.handleChange} value={this.state.max_lvl_sponsor} className="form-control" placeholder="Max level generasi" />
                                <div className="input-group-append">
                                    <span className="input-group-text">Level</span>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Minimal Deposit</label>
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text">Rp</span>
                                </div>
                                <input type="number" name='dp_min' onChange={this.handleChange} value={this.state.dp_min} className="form-control" placeholder="Minimal Deposit" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Minimal Withdrawal</label>
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text">Rp</span>
                                </div>
                                <input type="number" name='wd_min' onChange={this.handleChange} value={this.state.wd_min} className="form-control" placeholder="Minimal Withdrawal" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label>Minimal Transfer</label>
                            <div className="input-group">
                                <div className="input-group-append">
                                    <span className="input-group-text">Rp</span>
                                </div>
                                <input type="number" name='max_lvl_sponsor' onChange={this.handleChange} value={this.state.max_lvl_sponsor} className="form-control" placeholder="Minimal Transer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


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


export default connect(mapStateToProps)(Index);