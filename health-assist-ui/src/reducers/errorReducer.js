import { GET_ERRORS } from './../actions/type';

const initialState={
    errorMessage:null
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_ERRORS:
            //alert(action.payload["patientName"]+ "\n" + action.payload["patientIdentifier"] + "\n" +action.payload["patientAddress"]);
            return{
                ...state,
                errorMessage:action.payload
            }
        default:
            return state;
    }
}