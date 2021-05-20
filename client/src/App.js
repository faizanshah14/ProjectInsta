import React, { useEffect, createContext, useReducer } from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/signup';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/createPost';

import { initialState, reducer } from './reducers/userReducers';

export const userContext = createContext();
const Routing = () => {
	const history = useHistory();
	useEffect(() => {
		const user = localStorage.getItem('user');
	}, []);
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/profile">
				<Profile />
			</Route>
			<Route path="/create">
				<CreatePost />
			</Route>
		</Switch>
	);
};
function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<userContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				<Routing />
			</BrowserRouter>
		</userContext.Provider>
	);
}

export default App;
