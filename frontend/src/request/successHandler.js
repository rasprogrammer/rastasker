import codeMessage from "./codeMessage";

const successHandler = (response) => {
    console.log('result > ', response);

    const { data }  = response;
    if (data && data.success === true) {
        const message = data.message;
        const successText = message || codeMessage[response.status];

        console.log('success message > ', successText);
    } else {
        const message = response.data && response.data.message
        const errorText = message || codeMessage[response.status];

        console.log('error message > ', errorText);
    }

}

export default successHandler;