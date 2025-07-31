import codeMessage from "./codeMessage";
import { toast } from "react-hot-toast";

const successHandler = (response, NotifyOnSuccess=true) => {
    const { data }  = response;
    if (data && data.success === true) {
        const message = data.message;
        let successText = typeof message === 'string'
            ? message
            : codeMessage[response.status] || JSON.stringify(message) || 'Success';

        if (NotifyOnSuccess) {
            console.log('ok ', successText);
            toast.success(successText.toString());
        }
    } else {
        const message = response.data && response.data.message
        const errorText = message || codeMessage[response.status];

        toast.error(errorText);
    }

}

export default successHandler;