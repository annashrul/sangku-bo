
import React,{Component} from "react";
import {connect} from "react-redux";
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import {fetchKategori} from "../../redux/actions/kategori/kategori.action";

class Membership extends Component{

    constructor(props){
        super(props);
        this.state={
            kategori_data:[],
            kategori: "",
        };
        this.HandleChangeMembership=this.HandleChangeMembership.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        console.log(state.beforeType);
        console.log(props.type);
        if (state.beforeType !== props.type) {
            props.dispatch(fetchKategori(props.type));
            return {
                beforeType: props.type
            }
        }
        if (state.beforeId!==props.id) {
            return{
                kategori:props.id,
                beforeId:props.id
            }
        }

        if (props.kategori !== state.beforeKategori) {
            let kategori_data = [];
            if (props.id === 'semua') {
                kategori_data.push({
                    value: '-',
                    label: 'Semua'
                });
            } else {
                kategori_data = [];
            }
            if (props.kategori.data !== undefined) {
                props.kategori.data.map((v, i) => {
                    kategori_data.push({
                        value: v.id,
                        label: v.title
                    });
                });
            }
            return{
                kategori_data: kategori_data,
                beforeKategori: props.kategori
            }

        }

    }
    componentWillMount(){
        this.getProps(this.props);
    }
    componentDidMount(){
        this.getProps(this.props);
    }
    getProps(props){
        if(props.id!==''){
            this.setState({kategori:props.id});
        }

    }
    HandleChangeMembership(val){
        this.setState({
            kategori:val.value
        });
        this.props.handleChange({value:val.value,label:val.label});
    }
    render(){
        return(
            this.state.kategori_data.length>0 ? (
                <Select
                    options={this.state.kategori_data}
                    placeholder="Pilih Membership"
                    onChange={this.HandleChangeMembership}
                    value={
                        this.state.kategori_data.find(op => {
                            return op.value === this.state.kategori
                        })
                    }
                />
            ) : <Skeleton height={40}/>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        kategori:state.kategoriReducer.data,

    }
}
export default connect(mapStateToProps)(Membership)
