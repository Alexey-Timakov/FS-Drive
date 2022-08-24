import {connect} from "react-redux";
import UserPassport from "../../Components/Reg/Inputs/UserPassport";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPassport);