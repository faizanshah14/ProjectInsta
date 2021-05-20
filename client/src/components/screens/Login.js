import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import M from 'materialize-css';
const Login = () => {
	const { state, dispatch } = userContext(userContext);
	const history = useHistory();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const ragex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const Postdata = () => {
		if (!ragex.test(email) || !password) {
			return M.toast({
				html: 'Invalid Email Or Password',
				classes: 'rounded #e53935 red darken-1',
			});
		}
		fetch('/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.error) {
					M.toast({
						html: data.error,
						classes: 'rounded #e53935 red darken-1',
					});
				} else {
					localStorage.setItem('jwt', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					dispatch({ type: 'USER', payload: data.user });
					M.toast({
						html: 'Signed In Successfully',
						classes: 'rounded #00e676 green accent-3',
					});
					history.push('/');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="mycard ">
			<div className="card auth-card input-field">
				<h2>New Intagram</h2>
				<input
					className="input-field"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="input-field"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>{' '}
				<button
					className="btn waves-effect waves-light #42a5f5 blue lighten-1"
					type="submit"
					name="action"
					onClick={() => Postdata()}
				>
					Login
				</button>
				<h5>
					<Link to="./Signup">Dont't have an account! Signup.</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
