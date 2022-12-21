const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    users: []
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder =>{
        builder.addCase()
    }
})