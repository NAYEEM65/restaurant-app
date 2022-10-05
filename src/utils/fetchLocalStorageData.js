export const fetchUser = () => {
    const userinfo =
        localStorage.getItem('user') !== undefined
            ? JSON.parse(localStorage.getItem('user'))
            : localStorage.clear();
    return userinfo;
};
export const fetchCart = () => {
    const cartInfo =
        localStorage.getItem('cartItems') !== 'undefined'
            ? JSON.parse(localStorage.getItem('cartItems'))
            : localStorage.clear();

    return cartInfo ? cartInfo : [];
};
