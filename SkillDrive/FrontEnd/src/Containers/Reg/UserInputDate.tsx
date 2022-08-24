import { connect } from "react-redux";
import UserInputDate from "../../Components/Reg/Inputs/UserInputDate";
import { addUserInfoToStateAction } from "../../Actions/addUserInfoToStateAction";

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(UserInputDate);