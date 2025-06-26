import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import skillSlice from "./reducers/skillsSlice"
import requestSlice from "./reducers/requestSlice"

export const store = configureStore({

    reducer  : {
        user : userSlice,
        skill : skillSlice,
        request : requestSlice
    }
})