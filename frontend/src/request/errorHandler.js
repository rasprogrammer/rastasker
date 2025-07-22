import codeMessage from "./codeMessage";

export default function errorHandler(error) {

    if (!navigator.onLine) {
        console.log('Cannot connet to the server, Check your internet network');
        return;
    }

    const { response } = error;

    if (!response) {
        console.log('Cannot connect to the server, Contact your Account administrator');
        return;
    } 
    
    
    if (response && response.status) {
        console.log('response in status > ', response);
        const message = response.data && response.data.message;
        const errorText = message || codeMessage[response.status];
        
        console.log('error Message > ', errorText);
    } else {
        console.log('response without status > ', response); 
    }

}