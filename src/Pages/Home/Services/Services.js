import React, { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
	const [services, setService] = useState([]);
	const [isAsc, setISAsc] = useState(true);
	const [search, setSearch] = useState("");
	const searchRef = useRef();

	useEffect(() => {
		fetch(
			`https://genius-car-server-eta-one.vercel.app/services?search=${search}&order=${
				isAsc ? "asc" : "desc"
			}`
		)
			.then((res) => res.json())
			.then((data) => setService(data));
	}, [isAsc, search]);

	const handleSearch = () => {
		setSearch(searchRef.current.value);
	};
	return (
		<div>
			<div className="text-center">
				<p className="text-2xl text-orange-600 font-bold">Services</p>
				<h1 className="text-5xl font-semibold py-5">Our Service Area</h1>
				<p className="py-5">
					the majority have suffered alteration in some form, by injected
					humour, <br /> or randomised words which don't look even slightly
					believable.{" "}
				</p>
				<input
					className="input input-bordered input-xs w-full max-w-xs mr-5"
					ref={searchRef}
					type="text"
				/>{" "}
				<button onClick={handleSearch} className="btn btn-active btn-ghost">
					Search
				</button>{" "}
				<br />
				<br />
				<button className="btn btn-primary" onClick={() => setISAsc(!isAsc)}>
					{isAsc ? "asc" : "desc"}
				</button>
			</div>
			<div className="grid gap-6 py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => (
					<ServiceCard key={service._id} service={service}></ServiceCard>
				))}
			</div>
		</div>
	);
};

export default Services;
