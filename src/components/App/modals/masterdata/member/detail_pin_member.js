import React, { Component } from "react";
import { connect } from "react-redux";
import WrapperModal from "../../_wrapper.modal";
import { ModalHeader, ModalBody } from "reactstrap";
import { ModalToggle } from "../../../../../redux/actions/modal.action";
import { getKategoriPin } from "../../../../../redux/actions/paket/pin.action";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WidgetDetailPinMember from "../member/widget/widgetDetailPinMember";
class DetailPinMember extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  toggle = (e) => {
    e.preventDefault();
    const bool = !this.props.isOpen;
    this.props.dispatch(ModalToggle(bool));
  };

  //   componentWillMount() {
  //     this.props.dispatch(getKategoriPin(`id_member=${this.props.detail.id}`));
  //   }

  render() {
    const columnStyle = {
      verticalAlign: "middle",
      whiteSpace: "nowrap",
    };
    return (
      <WrapperModal
        isOpen={this.props.isOpen && this.props.type === "detailPinMember"}
        size="md"
      >
        <ModalHeader toggle={this.toggle}>Detail PIN Member</ModalHeader>
        <ModalBody>
          <Tabs>
            <TabList style={{ margin: "0px" }}>
              <Tab>Aktivasi</Tab>
              <Tab>Repeat Order</Tab>
            </TabList>
            <TabPanel>
              <WidgetDetailPinMember
                detail={{ id: this.props.detail.id, type: "aktivasi" }}
              />
            </TabPanel>
            <TabPanel>
              <WidgetDetailPinMember
                detail={{ id: this.props.detail.id, type: "ro" }}
              />
            </TabPanel>
          </Tabs>
        </ModalBody>
      </WrapperModal>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isOpen: state.modalReducer,
    type: state.modalTypeReducer,
  };
};
export default connect(mapStateToProps)(DetailPinMember);
