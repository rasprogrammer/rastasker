import codeMessage from "./codeMessage";
import { toast } from "react-hot-toast";

export default function errorHandler(error) {

    if (!navigator.onLine) {
        toast.info('Cannot connet to the server, Check your internet network');
        return;
    }

    const { response } = error;

    if (!response) {
        toast.error('Cannot connect to the server, Contact your Account administrator');
        return;
    }
    
    if (response && response.status) {
        console.log('response in status > ', response);
        const message = response.data && response.data.message;
        const errorText = message || codeMessage[response.status];
        
        toast.error(errorText);
    } else {
        console.log('response without status > ', response); 
    }

}