import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const CheckOut = () => {
	const { _id, title, price } = useLoaderData();
	const { user } = useContext(AuthContext);

	const handlePlaceOrder = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = `${form.firstName.value} ${form.lastName.value}`;
		const email = user?.email || "Unregistered";
		const message = form.message.value;
		const phone = form.phone.value;

		const order = {
			service: _id,
			serviceName: title,
			price,
			customer: name,
			email,
			phone,
			message,
		};

		// if(phone > 10){
		//   alert("Please enter a phone number at least 10 characters")
		// }else{}

		// API POST Request
		fetch("https://genius-car-server-eta-one.vercel.app/orders", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.acknowledged) {
					alert("Order placed successfully");
					form.reset();
				}
				console.log(data);
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<form onSubmit={handlePlaceOrder}>
				<h2 className="text-4xl">{title}</h2>
				<h4 className="text-3xl">Price: {price}</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<input
						type="text"
						placeholder="First Name"
						name="firstName"
						className="input input-bordered w-full"
					/>
					<input
						type="text"
						placeholder="Last Name"
						name="lastName"
						className="input input-bordered w-full"
					/>
					<input
						type="text"
						placeholder="Your Phone Number"
						name="phone"
						required
						className="input input-bordered w-full"
					/>
					<input
						type="text"
						placeholder="Your Email Address"
						defaultValue={user?.email}
						readOnly
						name="email"
						className="input input-bordered w-full"
					/>
				</div>
				<textarea
					className="textarea textarea-bordered w-full"
					placeholder="Your Message"
					name="message"
				></textarea>
				<input className="btn" type="submit" value="Place Your Order" />
			</form>
		</div>
	);
};

export default CheckOut;
