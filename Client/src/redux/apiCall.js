import { loginFailure, loginStart, loginSuccess ,logout} from "./UserRedux";
import { publicRequest, userRequest } from "../requestMethods";
import axios from "axios";

export const login = async (dispatch, user) => {   //user=>{email:"abc",password:"***"}
    console.log(user)  // i got user=>{email:"abc",password:"***"}
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/user/login", user);
    console.log(res.data.token) //await userRequest.post("user/login", user); //usingg axios
    dispatch(loginSuccess(res.data.token));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Logout=async (dispatch)=>{
   dispatch(logout())
}