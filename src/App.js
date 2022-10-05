/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateContainer from './components/CreateContainer/CreateContainer';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
import { useEffect } from 'react';

function App() {
    const [{ foodItems }, dispatch] = useStateValue();

    useEffect(() => {
        const fetchData = async () => {
            await getAllFoodItems().then((data) => {
                console.log(data);
                dispatch({
                    type: actionType.SET_FOOD_ITEMS,
                    foodItems: data,
                });
            });
        };
        fetchData();
    }, [dispatch]);
    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />
                <main className="w-full mt-16 md:mt-20 px-4 md:px-16 py-4">
                    <Routes>
                        <Route path="/*" element={<MainContainer />} />
                        <Route path="/create" element={<CreateContainer />} />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
}

export default App;
