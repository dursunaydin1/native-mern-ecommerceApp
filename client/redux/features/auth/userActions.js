import { server } from "../../store";
import axios from "axios";

// action login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    // hitting node api login request
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};

// Get User Data
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/user/profile`, {});
    dispatch({
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFailure",
      payload: error.response.data.message,
    });
  }
};

// logout user
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/user/logout`);
    dispatch({
      type: "logoutSuccess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};
