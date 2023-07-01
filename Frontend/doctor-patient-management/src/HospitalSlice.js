const { createSlice } = require("@reduxjs/toolkit");

const hospitalSlice=createSlice({
    name:"users",
    initialState:[],
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload);
            console.log(action.payload);
        },
        editUser:(state,action)=>{
            for(let index=0;index<state.length;index++)
            {
                if(state[index].userID==action.payload.id)
                {
                    state[index].name=action.payload.name;
                    state[index].age=action.payload.age;
                    break;
                }
            }
        },
        deleteUser:(state,action)=>{
            for (let index = 0; index < state.length; index++) 
            {
                if(state[index].userID == action.payload.userID)
                {
                    state.splice(index,1);
                    break;
                }
            }
        }
    }
});

//Dispatcher
export const {addUser,editUser,deleteUser}=hospitalSlice.actions;

//Store
export default hospitalSlice.reducer;