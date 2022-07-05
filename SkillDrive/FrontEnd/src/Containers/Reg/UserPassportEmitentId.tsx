import {connect} from "react-redux";
import UserPassportEmitentId from "../../components/Reg/UserPassportEmitentId";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction.js"

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassportEmitentId);