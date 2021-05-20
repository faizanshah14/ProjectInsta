import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const ragex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const Postdata = () => {
		if (!ragex.test(email) || !password || !name) {
			return M.toast({
				html: 'Invalid Email Or Password',
				classes: 'rounded #e53935 red darken-1',
			});
		}
		fetch('/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, name, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({
						html: data.error,
						classes: 'rounded #e53935 red darken-1',
					});
				} else {
					M.toast({
						html: data.message,
						classes: 'rounded #00e676 green accent-3',
					});
					history.push('/login');
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
					type="text"
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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
				/>
				<button
					className="btn waves-effect waves-light #42a5f5 blue lighten-1"
					type="submit"
					name="action"
					onClick={() => Postdata()}
				>
					Signup
				</button>
				<h5>
					<Link to="./Login">Already have an account ! Login.</Link>
				</h5>
			</div>
		</div>
	);
};

export default Signup;
