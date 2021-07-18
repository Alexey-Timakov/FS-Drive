import {connect} from "react-redux";
import ResetPass from "../components/Common/ResetPass.jsx";
import {addUserInfoToStateAction} from "../Actions/addUserInfoToStateAction.js"

// const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
    addUserInfoToState: (name, value) => dispatch(addUserInfoToStateAction(name, value))
});

export default connect(null, mapDispatchToProps)(ResetPass);