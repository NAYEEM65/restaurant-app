/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { app } from '../../firebase.config';
import logo from '../../assets/img/logo.png';
import { MdLogout, MdAdd, MdShoppingBasket } from 'react-icons/md';
import avaterImage from '../../assets/img/avatar.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [isMenu, setIsMenu] = useState(false);
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
    const login = async () => {
        if (!user) {
            const {
                user: { accessToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: 'SET_USER',
                user: providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({
            type: 'SET_USER',
            user: null,
        });
    };
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 ">
            {/* desktop and tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-8 object-cover" />
                        <p className="text-headingColor text-xl font-bold">City</p>
                    </div>
                </Link>
                <div className="flex item center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 1 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ml-auto"
                    >
                        <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                            Home
                        </li>
                        <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                            Menu
                        </li>
                        <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                            About Us
                        </li>
                        <li className="text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out">
                            Service
                        </li>
                    </motion.ul>
                    <motion.div
                        className="relative flex items-center justify-center"
                        whileTap={{ scale: 0.6 }}
                        onClick={showCart}
                    >
                        <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                        {cartItems?.length > 0 && (
                            <div className="absolute -top-0 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                                <p className=" text-xs text-white font-semibold">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </motion.div>
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : avaterImage}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-lg rounded-full cursor-pointer"
                            alt="ava"
                            onClick={login}
                        />
                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-200 shadow-xl rounded-lg absolute top-10 right-0 flex flex-col"
                            >
                                {user && user.email === 'developernayeem65@gmail.com' && (
                                    <Link to="/create">
                                        <p
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            New Items <MdAdd />
                                        </p>
                                    </Link>
                                )}

                                <button
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    Logout <MdLogout />
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            {/* mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-8 object-cover" />
                        <p className="text-headingColor text-xl font-bold">City</p>
                    </div>
                </Link>
                <motion.div
                    className="relative flex items-center justify-center"
                    whileTap={{ scale: 0.6 }}
                    onClick={showCart}
                >
                    <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
                    {cartItems?.length > 0 && (
                        <div className="absolute -top-0 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                            <p className=" text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </motion.div>
                <div className="flex item-center gap-8">
                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : avaterImage}
                            className="w-10 min-w-[40px] h-10 min-h-[40px] shadow-lg rounded-full cursor-pointer"
                            alt="avater"
                            onClick={login}
                        />

                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-200 shadow-xl rounded-lg absolute top-10 right-0 flex flex-col"
                            >
                                {user && user.email === 'developernayeem65@gmail.com' && (
                                    <Link to="/create">
                                        <p
                                            className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                            onClick={() => setIsMenu(false)}
                                        >
                                            New Items <MdAdd />
                                        </p>
                                    </Link>
                                )}
                                <ul className="flex flex-col ">
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Home
                                    </li>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Menu
                                    </li>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        About Us
                                    </li>
                                    <li
                                        className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        Service
                                    </li>
                                </ul>

                                <p
                                    className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}
                                >
                                    {user ? 'Logout' : 'Login'} <MdLogout />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
