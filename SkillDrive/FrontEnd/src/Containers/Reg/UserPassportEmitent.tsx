import {connect} from "react-redux";
import UserPassportEmitent from "../../Components/Reg/Inputs/UserPassportEmitent";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassportEmitent);