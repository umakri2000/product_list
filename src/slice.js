import { createSlice } from "@reduxjs/toolkit";
var dispatchArr=[];
var idArr=[];
var slice=createSlice({
    name : 'recepie',
    initialState:[] ,
    reducers:{
        stateChange:(state,action)=>{
            var getState=[...state];
            if(getState.length ==0){
                getState.push(action.payload.formjson);
              return  getState 
            }
            else{

                let filterState = [...getState];
                let itemExists = false;
                filterState = filterState.map((val) => {
                 if (val.id === action.payload.formjson.id) { 
                     itemExists = true;
                     return action.payload.formjson;
                    }
                return val;
                 });
              if (!itemExists)  {filterState.push(action.payload.formjson)};
                
                if(action.payload.formjson.count == '0'){
                    filterState = filterState.filter(val => val.id !== action.payload.formjson.id);                       
                }

console.log("Updated State:", JSON.parse(JSON.stringify(filterState)));

return filterState;

            }
    },
    removeElement:(state,action)=>{

var removeState=[...state];
removeState=removeState.filter((removeId) => {return  removeId.id != action.payload.remveId})
        console.log(JSON.parse(JSON.stringify(removeState)));
        return removeState

    },
    
}


    
    
}) 
var resetSlice=createSlice({
    name :'reset',
    initialState:[],
    reducers:{
        resetElement:(state,action)=>{
            console.log('efceef');

            return {'reset':true}
    
    
        }
    }

})

export var {stateChange,removeElement}=slice.actions
export var expreducer=slice.reducer;
export var resetRed=resetSlice.reducer
export var{resetElement}=resetSlice.actions

