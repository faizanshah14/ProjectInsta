import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const CreatePost = () => {
	const history = useState();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');
	useEffect(() => {
		if (url) {
			fetch('/createpost', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + localStorage.getItem('jwt'),
				},
				body: JSON.stringify({ title, body, pic: url }),
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
							html: 'Posted  Successfully',
							classes: 'rounded #00e676 green accent-3',
						});
						history.push('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [url]);

	const postDetails = () => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'insta-clone');
		data.append('cloud_name', 'dalapdfny');
		fetch(' https://api.cloudinary.com/v1_1/dalapdfny/image/upload', {
			method: 'POST',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				setUrl(data.url);
				console.log(data);
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className="container center">
			<div
				className="card input-field"
				style={{ margin: '30px auto', padding: '30px' }}
			>
				<input
					type="text"
					placeholder="Title"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Body"
					onChange={(e) => {
						setBody(e.target.value);
					}}
				/>
				<div className="file-field input-field">
					<div className="btn blue darken-1">
						<span>Image</span>
						<input
							type="file"
							onChange={(e) => {
								setImage(e.target.files[0]);
							}}
						/>
					</div>
					<div className="file-path-wrapper">
						<input
							className="file-path validate"
							type="text"
							placeholder="Upload image"
						/>
					</div>
				</div>
				<button
					className="btn waves-effect waves-light #42a5f5 blue darken-1"
					onClick={() => postDetails()}
				>
					Submit Post
				</button>
			</div>
		</div>
	);
};

export default CreatePost;
