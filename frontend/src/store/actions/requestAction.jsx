import axios from "../../api/apiconfig";
import { loadRequest } from "../reducers/requestSlice";

export const addRequest = (requestData) => async (dispatch) => {
  try {
    const { fromUserId, toUserId, skillId } = requestData;

    const { data } = await axios.get(
      `/requests?fromUserId=${fromUserId}&skillId=${skillId}&toUserId=${toUserId}`
    );

    if (data.length > 0) {
      return { success: false, message: "Request already sent!" };
    }

    await axios.post("/requests", requestData);
    dispatch(getRequests());
    return { success: true, message: "Request sent successfully!" };
  } catch (error) {
    console.error("Error adding request:", error.message);
    return { success: false, message: "Something went wrong." };
  }
};

export const getRequest = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/requests");
    dispatch(loadRequest(data));
  } catch (error) {
    console.error("Error fetching requests:", error.message);
  }
};
