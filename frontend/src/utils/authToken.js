export const getUser = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current || {};
}

export const getToken = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current?.token || '';
}

export const getUserId = () => {
    const result = window.localStorage.getItem('auth');
    const tmpAuth = JSON.parse(result);
    return tmpAuth?.current?._id || '';
}