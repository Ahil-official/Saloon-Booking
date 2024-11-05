import React from "react";

const Services = () => {
	const serviceList = [
		{
			name: "Haircuts",
			description: "Stylish and modern haircuts for men, women, and children.",
		},
		{
			name: "Coloring",
			description: "Professional coloring services including highlights, balayage, and full color.",
		},
		{
			name: "Styling",
			description: "Elegant styling for all occasions including weddings, proms, and parties.",
		},
		{
			name: "Manicures & Pedicures",
			description: "Luxurious manicures and pedicures to pamper your hands and feet.",
		},
		{
			name: "Facials",
			description: "Rejuvenating facials to refresh and renew your skin.",
		},
	];

	const serviceCardStyle = {
		border: "1px solid #ddd",
		borderRadius: "8px",
		padding: "1rem",
		margin: "1rem 0",
		backgroundColor: "#fff",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	};

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4" style={{ color: "rgb(25, 24, 24)" }}>
				Our Services
			</h2>
			<div className="row">
				{serviceList.map((service, index) => (
					<div key={index} className="col-md-4">
						<div style={serviceCardStyle}>
							<h3 style={{ color: "rgb(169, 77, 123)" }}>{service.name}</h3>
							<p>{service.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
