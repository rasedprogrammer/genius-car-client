import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Login = () => {
	const { login } = useContext(AuthContext);
	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		login(email, password)
			.then((result) => {
				const user = result.user;
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="hero w-full my-20">
			<div className="w-full hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
				<div className="text-center lg:text-left">
					<img className="w-3/4" src={img} alt="" />
				</div>
				<div className="card flex-shrink-0 w-full max-w-sm rounded-lg shadow-2xl bg-base-100 py-20">
					<form onSubmit={handleLogin} className="card-body">
						<h1 className="text-5xl font-bold text-center">Login</h1>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="text"
								placeholder="email"
								name="email"
								className="input input-bordered"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="text"
								placeholder="password"
								name="password"
								className="input input-bordered"
							/>
							<label className="label">
								<a href="/" className="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							<input className="btn btn-primary" type="submit" value="Login" />
						</div>
					</form>
					<p className="text-center">
						New to Genius Car{" "}
						<Link className="text-orange-600" to="/signup">
							Sign Up
						</Link>{" "}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
