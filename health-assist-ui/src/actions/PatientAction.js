import axios from 'axios';
import { GET_ERRORS,GET_PATIENTS,DELETE_PATIENT,GET_PATIENT} from './type';

export const createPatient=(patient,history)=>async dispatch=> {
    try {
        const res =await axios.post ("http://localhost:8080/api/patients",patient)
        //alert("Patient saved with following details:\nPatient Identifier:  " + res["data"]["patientIdentifier"]+"\nName: " + res["data"]["patientName"] + "\nAge: " + res["data"]["patientAge"] + "\nPhone Number: " + res["data"]["phoneNumber"] + "\nAddress: " + res["data"]["patientAddress"]);
        history.push("/getPatient");
    } catch (error) {
        console.log(patient);
        console.log(error.response);
        dispatch({
            type:GET_ERRORS,
            payload:error.response.data
        })
    }
}

export const getPatients=()=>async dispatch=>{
    await axios.get("http://localhost:8080/api/patients/all")
    
    .then(response => {
        if (response.status==200) {
            dispatch({
                type: GET_PATIENTS,
                payload: response.data
            })
        }
        else {
            var error = new Error('Error' + response.status + ' ' + response.statusText);
            error.response = response;
            throw error;
        }
     },
        error => {
            var errmsg = new Error(error.message);
            throw errmsg;
        })
    .catch(error=>dispatch(getPatientsError(error.message)));
}
export const getPatientsError = (errmesg) => ({
        type:GET_ERRORS,
        payload: errmesg
     })

     export const getPatient=(patientidentifier,history)=>async dispatch=>{
        const res=await axios.get(`http://localhost:8080/api/patients/${patientidentifier}`);
        dispatch({
            type:GET_PATIENT,
            payload:res.data
        })
    }
    
    
    export const deletePatient=(patientIdentifier,history)=>async dispatch=>{
        try{
            
            const res = await axios.delete(`http://localhost:8080/api/patients/${patientIdentifier}`);
            window.confirm("Are you sure ? This will delete the patient and the data related to it")
            alert("Patient successfully deleted !!");
            history.push("/getPatient");
            dispatch({
                type:DELETE_PATIENT,
                payload:patientIdentifier
            })
         }
         catch (error) {
            
            console.log(error.response);
            dispatch({
                type:GET_ERRORS,
                payload:error.response.data
            })
        }
    }












// import axios from 'axios';
// import { GET_ERRORS, GET_PATIENTS, DELETE_PATIENTS } from './type';
// export const createPatient = (patient, history) => async dispatch => {
//     const res = await axios.post("http://localhost:8080/api/patients", patient)
//     fetch(res).then((response) => {
//         if (response.ok) {
//             console.log(res);
//             alert("Patient saved with following details:\nPatient Identifier:  " + res["data"]["patientIdentifier"] + "\nName: " + res["data"]["patientName"] + "\nAge: " + res["data"]["patientAge"] + "\nPhone Number: " + res["data"]["phoneNumber"] + "\nAddress: " + res["data"]["patientAddress"]);
//             history.push("/getPatient");
//         }
//     }).catch((error) => {
//         dispatch({
//             type: GET_ERRORS,
//             payload: error.response.data
//         })
//     });
// }


// export const getPatients = () => async dispatch => {

    
//     const res = await axios.get("http://localhost:8080/api/patients/all");
//     // const timeout = setTimeout(dispatch(getPatients(getPatients), 2000));
//     fetch(res).then(response => {
//         if (response.ok) {
//             return response;
//         }
//         else {
//             var error = new Error('Error' + response.status + ' ' + response.statusText);
//             error.response = response;
//             throw error;
//         }
//     },
//         error => {
//             var errmsg = new Error(error.message);
//             throw errmsg;
//         })
//     dispatch({
//         type: GET_PATIENTS,
//         payload: res.data
//     })
//     // .catch(error=>dispatch(getPatientsError(error.message)));
// }
// 

// export const deletePatient = (patientIdentifier) => async (dispatch) => {
//     if (window.confirm("Are you sure ? This will delete the Doctor details")) {
//         const res = await axios.delete(`http://localhost:8080/api/doctors/delete/${patientIdentifier}`);
//         console.log(res);
//         dispatch({
//             type: DELETE_PATIENTS,
//             payload: patientIdentifier
//         });
//     }
// };


// //     try {
// //         const res =await axios.post ("http://localhost:8080/api/patients",patient)
// //         alert("Patient saved with following details:\nPatient Identifier:  " + res["data"]["patientIdentifier"]+"\nName: " + res["data"]["patientName"] + "\nAge: " + res["data"]["patientAge"] + "\nPhone Number: " + res["data"]["phoneNumber"] + "\nAddress: " + res["data"]["patientAddress"]);
// //         history.push("/getPatient");
// //     } 
// //     catch (error) {
// //         dispatch({
// //             type:GET_ERRORS,
// //             payload:error.response.data
// //         })
// //     }
// // }
// // 