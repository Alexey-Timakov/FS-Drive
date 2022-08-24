import {connect} from "react-redux";
import UserLicId from "../../Components/Reg/Inputs/UserLicId";
import {addUserInfoToStateAction} from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserLicId);