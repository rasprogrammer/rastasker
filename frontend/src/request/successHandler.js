import codeMessage from "./codeMessage";
import { toast } from "react-hot-toast";

const successHandler = (response) => {
    console.log('result > ', response);

    const { data }  = response;
    if (data && data.success === true) {
        const message = data.message;
        const successText = message || codeMessage[response.status];

        toast.success(successText);
    } else {
        const message = response.data && response.data.message
        const errorText = message || codeMessage[response.status];

        toast.error(errorText);
    }

}

export default successHandler;