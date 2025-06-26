import axios from "../../api/apiconfig";
import { loadAllUser, loadUser, logout } from "../reducers/userSlice";
import { getSkills } from "./skillsAction";

export const registerUser = (userData) => async (dispatch) => {
  const { data } = await axios.post("/user", userData);
};

export const loginUser = (user) => async (dispatch) => {
  const { data } = await axios.get(
    `/user?email=${user.email}&password=${user.password}`
  );

  localStorage.setItem("user", JSON.stringify(data[0]));
  dispatch(currentUser());
};

export const currentUser = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    dispatch(loadUser(user));
  }
};

export const logoutuser = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch(logout());
};

export const getAllUsers = () => async (dispatch) => {
  const { data } = await axios.get("/user");
  dispatch(loadAllUser(data));

};

export const editProfile = (user, id) => async (dispatch) => {
  try {
    // 1. Update user
    const { data } = await axios.patch(`/user/${id}`, user);

    // 2. Get all skills of the user
    const skillsRes = await axios.get(`/skills?ownerId=${id}`);
    const userSkills = skillsRes.data;

    // 3. Update creatorName in each skill
    await Promise.all(
      userSkills.map((skill) =>
        axios.patch(`/skills/${skill.id}`, { username: user.name })
      )
    );

    // 4. Update localStorage + Redux
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(currentUser());
    dispatch(getAllUsers())
    dispatch(getSkills())
  } catch (error) {
    console.log(error);
  }
};

