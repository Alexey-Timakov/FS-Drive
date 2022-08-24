import {connect} from "react-redux";
import UserPasswordCheck from "../../Components/Reg/Inputs/UserPasswordCheck";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserPasswordCheck);