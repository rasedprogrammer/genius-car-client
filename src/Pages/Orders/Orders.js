import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import OrdersRow from "./OrdersRow";

const Orders = () => {
	const { user } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);

	console.log(user?.email);
	useEffect(() => {
		fetch(
			`https://genius-car-server-eta-one.vercel.app/orders?email=${user?.email}`
		)
			.then((res) => res.json())
			.then((data) => setOrders(data));
	}, [user?.email]);

	const handleDelete = (id) => {
		const proceed = window.confirm(
			"Are you sure you want to delete this order"
		);
		if (proceed) {
			fetch(`https://genius-car-server-eta-one.vercel.app/orders/${id}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.deletedCount > 0) {
						alert("Delete order successfully");
						const remaining = orders.filter((odr) => odr._id !== id);
						setOrders(remaining);
					}
				});
		}
	};
	const handleStatusUpdate = (id) => {
		fetch(`https://genius-car-server-eta-one.vercel.app/orders/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ status: "Approved" }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					const remaining = orders.filter((odr) => odr._id !== id);
					const approving = orders.find((odr) => odr._id === id);
					approving.status = "Approved";

					const newOrders = [approving, ...remaining];
					setOrders(newOrders);
				}
			});
	};

	return (
		<div>
			<h2 className="text-5xl">You Have: {orders.length}</h2>
			<div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<OrdersRow
								key={order._id}
								order={order}
								handleDelete={handleDelete}
								handleStatusUpdate={handleStatusUpdate}
							></OrdersRow>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Orders;
