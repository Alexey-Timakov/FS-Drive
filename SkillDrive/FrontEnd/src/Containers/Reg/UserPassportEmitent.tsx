import {connect} from "react-redux";
import UserPassportEmitent from "../../components/Reg/Inputs/UserPassportEmitent";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction.js"

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassportEmitent);