
import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/Header";
import ToDos from "./pages/ToDos";
import TodoProvider from "./context/TodoProvider";

function App() {
  return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/todo" element={
                            <TodoProvider>
                                <ToDos/>
                            </TodoProvider>
                        } />


                </Routes>
            </BrowserRouter>

        </>
  );
}

export default App;
