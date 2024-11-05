import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
	const appointmentDate = moment(booking.appointmentDate)
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])

	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title salon-color">Appointment Summary</h4>
				<p>
					Name: <strong>{booking.clientName}</strong>
				</p>
				<p>
					Email: <strong>{booking.clientEmail}</strong>
				</p>
				<p>
					Service: <strong>{booking.service}</strong>
				</p>
				<p>
					Stylist: <strong>{booking.stylist}</strong>
				</p>
				<p>
					Appointment Date: <strong>{moment(booking.appointmentDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Time: <strong>{booking.time}</strong>
				</p>

				{payment > 0 ? (
					<>
						<p>
							Total payment: <strong>${payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">Please provide all required booking details.</p>
				)}
			</div>
		</div>
	)
}

export default BookingSummary
