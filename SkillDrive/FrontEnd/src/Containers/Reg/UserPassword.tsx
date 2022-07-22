import {connect} from "react-redux";
import UserPassword from "../../components/Reg/inputs/UserPassword";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction.js"

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassword);