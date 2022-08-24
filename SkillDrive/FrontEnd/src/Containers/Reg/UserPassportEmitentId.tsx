import {connect} from "react-redux";
import UserPassportEmitentId from "../../Components/Reg/Inputs/UserPassportEmitentId";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassportEmitentId);