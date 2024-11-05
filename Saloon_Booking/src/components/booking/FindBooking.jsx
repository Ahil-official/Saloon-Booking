import React, { useState } from "react";
import moment from "moment";
import { cancelBooking, getBookingByConfirmationCode } from "../utils/ApiFunctions";

const FindBooking = () => {
	const [confirmationCode, setConfirmationCode] = useState("");
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [bookingInfo, setBookingInfo] = useState({
		id: "",
		bookingConfirmationCode: "",
		service: { id: "", serviceName: "" },
		stylistName: "",
		appointmentDate: "",
		guestName: "",
		guestEmail: "",
	});

	const emptyBookingInfo = {
		id: "",
		bookingConfirmationCode: "",
		service: { id: "", serviceName: "" },
		stylistName: "",
		appointmentDate: "",
		guestName: "",
		guestEmail: "",
	};

	const [isDeleted, setIsDeleted] = useState(false);

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const data = await getBookingByConfirmationCode(confirmationCode);
			setBookingInfo(data);
			setError(null);
		} catch (error) {
			setBookingInfo(emptyBookingInfo);
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message);
			} else {
				setError(error.message);
			}
		}

		setTimeout(() => setIsLoading(false), 2000);
	};

	const handleBookingCancellation = async () => {
		try {
			await cancelBooking(bookingInfo.id);
			setIsDeleted(true);
			setSuccessMessage("Booking has been cancelled successfully!");
			setBookingInfo(emptyBookingInfo);
			setConfirmationCode("");
			setError(null);
		} catch (error) {
			setError(error.message);
		}
		setTimeout(() => {
			setSuccessMessage("");
			setIsDeleted(false);
		}, 2000);
	};

	const buttonStyle = {
		backgroundColor: "rgb(169, 77, 123)", // Button background color
		color: "#fff", // Button text color
		padding: "0.5rem 1rem", // Button padding
		border: "none", // No border
		borderRadius: "4px", // Rounded corners
		cursor: "pointer", // Pointer cursor on hover
		transition: "background-color 0.3s ease", // Transition for hover effect
	};

	const buttonHoverStyle = {
		...buttonStyle,
		backgroundColor: "rgb(137, 127, 132)", // Darker button color on hover
	};

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4" style={{ color: "rgb(25, 24, 24)" }}>
					Find My Booking
				</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="confirmationCode"
							name="confirmationCode"
							value={confirmationCode}
							onChange={handleInputChange}
							placeholder="Enter the booking confirmation code"
						/>

						<button
							type="submit"
							className="btn btn-salon input-group-text"
							style={buttonStyle}
							onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
							onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
						>
							Find booking
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your booking...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : bookingInfo.bookingConfirmationCode ? (
					<div className="col-md-6 mt-4 mb-5">
						<h3>Booking Information</h3>
						<p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
						<p>Service Name: {bookingInfo.service.serviceName}</p>
						<p>Stylist Name: {bookingInfo.stylistName}</p>
						<p>
							Appointment Date:{" "}
							{moment(bookingInfo.appointmentDate).format("MMM Do, YYYY")}
						</p>
						<p>Full Name: {bookingInfo.guestName}</p>
						<p>Email Address: {bookingInfo.guestEmail}</p>

						{!isDeleted && (
							<button
								onClick={handleBookingCancellation}
								className="btn btn-danger"
								style={{ marginTop: "1rem" }} // Margin to separate from other elements
							>
								Cancel Booking
							</button>
						)}
					</div>
				) : (
					<div>find booking...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	);
};

export default FindBooking;
