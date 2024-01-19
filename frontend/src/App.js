import React, { useState, useEffect } from "react";
import "./App.css";
import "./css/transition.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignInPage from "./pages/SignInPage";
import AboutUs from "./pages/AboutUs";
import AccountDetails from "./pages/AccountDetails";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import Results from "./pages/Results";

function App() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<Router>
			<div className="App">
				<Header />
				<div>
					<Routes>
						<Route path="/" element={<HomePage/>} />
						<Route path="/SignIn" element={<SignInPage />} />
						<Route path="/SignUp" element={<SignUpPage/>}/>
						<Route path="/AccountDetails" element={<AccountDetails/>} />
						<Route path="/AboutUs" element={<AboutUs />} />
						<Route path="/SignIn" element={<SignInPage/>} />
						<Route path="/AccountDetails" element={<AccountDetails/>} />
						<Route path="/AboutUs" element={<AboutUs/>} />
						<Route path="/Result" element={Results}/>
	
					</Routes>
				</div>
				{/*<Footer />*/}
			</div>
		</Router>
	);
}

export default App;
