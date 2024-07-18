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
