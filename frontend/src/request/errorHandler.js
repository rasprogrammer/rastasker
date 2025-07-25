import codeMessage from "./codeMessage";
import { toast } from "react-hot-toast";

export default function errorHandler(error) {

    if (!navigator.onLine) {
        toast.info('Cannot connect to the Internet, Check your internet network');
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Check your internet network'
        }
    }

    const { response } = error;

    if (!response) {
        toast.error('Cannot connect to the server, Contact your Account administrator');
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Contact your Account administrator',
        }
    }

    if (response && response.status) {
        const message = response.data && response.data.message;
        const errorText = message || codeMessage[response.status];

        toast.error(errorText);

        return response.data;
    } else {
        return {
            success: false,
            result: null,
            message: 'Cannot connect to the server, Check your internet network',
        };
    }

}