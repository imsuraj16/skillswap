import axios from "../../api/apiconfig"
import { loadSkill } from "../reducers/skillsSlice";
import { editProfile } from "./userActions";



export const addSkill = (skill)=>async(dispatch)=>{

    const {data} = await axios.post('/skills',skill)
    dispatch(getSkills())
    
}



export const getSkills = ()=>async(dispatch)=>{

    const {data} = await axios.get('/skills')
    dispatch(loadSkill(data))
    
}