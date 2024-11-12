import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Products from './components/Products';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherApp from './components/WeatherApp';
import Counter from './components/counter';

function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>

                //<Route path = "Weather" element = {<WeatherApp/>} />

                <Route path="/" element={<SignIn setUser={setUser} />} />

                {/* SignIn page */}
                <Route path="/signin" element={<SignIn setUser={setUser} />} />
                
                {/* SignUp page */}
                <Route path="/signup" element={<SignUp />} />
                
                {/* Products page - only accessible if the user is logged in */}
                <Route path="/products" element={user ? <Products user={user} setUser={setUser} /> : <SignIn setUser={setUser} />} />

                <Route path="/counter" element={<Counter />} />
        <Route path="/weather" element={<WeatherApp />} />

            </Routes>
        </Router>
    );
}

export default App;
