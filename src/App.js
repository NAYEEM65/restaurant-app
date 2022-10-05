import { Route, Routes } from 'react-router-dom';
import './App.css';
import CreateContainer from './components/CreateContainer/CreateContainer';
import Header from './components/Header/Header';
import MainContainer from './components/MainContainer/MainContainer';
import { AnimatePresence } from 'framer-motion';

function App() {
    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary">
                <Header />
                <main className="w-full mt-24 p-8">
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
