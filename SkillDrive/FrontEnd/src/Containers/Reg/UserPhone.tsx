import {connect} from "react-redux";
import UserPhone from "../../components/Reg/UserPhone";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction.js"

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPhone);