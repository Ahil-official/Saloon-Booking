import React, { useEffect } from "react"
import moment from "moment"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import BookingSummary from "./BookingSummary"
import { bookRoom, getRoomById } from "../utils/ApiFunctions"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

const BookingForm = () => {
	const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [servicePrice, setServicePrice] = useState(0)

	const currentUser = localStorage.getItem("userId")

	const [booking, setBooking] = useState({
		guestFullName: "",
		guestEmail: currentUser,
		appointmentDate: "",
		numOfGuests: 1 // Assuming this represents the number of guests for salon services
	})

	const { serviceId } = useParams()
	const navigate = useNavigate()

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({ ...booking, [name]: value })
		setErrorMessage("")
	}

	const getServicePriceById = async (serviceId) => {
		try {
			const response = await getServiceById(serviceId)
			setServicePrice(response.servicePrice)
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(() => {
		getServicePriceById(serviceId)
	}, [serviceId])

	const calculatePayment = () => {
		const appointmentDate = moment(booking.appointmentDate)
		const paymentPerGuest = servicePrice ? servicePrice : 0
		return booking.numOfGuests * paymentPerGuest
	}

	const isGuestCountValid = () => {
		const guestCount = parseInt(booking.numOfGuests)
		return guestCount >= 1
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false || !isGuestCountValid()) {
			e.stopPropagation()
		} else {
			setIsSubmitted(true)
		}
		setValidated(true)
	}

	const handleFormSubmit = async () => {
		try {
			const confirmationCode = await bookAppointment(serviceId, booking)
			setIsSubmitted(true)
			navigate("/booking-success", { state: { message: confirmationCode } })
		} catch (error) {
			const errorMessage = error.message
			console.log(errorMessage)
			navigate("/booking-success", { state: { error: errorMessage } })
		}
	}

	return (
		<>
			<div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">Book Salon Appointment</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label htmlFor="guestFullName" className="hotel-color">
										Full Name
									</Form.Label>
									<FormControl
										required
										type="text"
										id="guestFullName"
										name="guestFullName"
										value={booking.guestFullName}
										placeholder="Enter your full name"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your full name.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="guestEmail" className="hotel-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="guestEmail"
										name="guestEmail"
										value={booking.guestEmail}
										placeholder="Enter your email"
										onChange={handleInputChange}
										disabled
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email address.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="appointmentDate" className="hotel-color">
										Appointment Date
									</Form.Label>
									<FormControl
										required
										type="date"
										id="appointmentDate"
										name="appointmentDate"
										value={booking.appointmentDate}
										min={moment().format("YYYY-MM-DD")}
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please select an appointment date.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="numOfGuests" className="hotel-color">
										Number of Guests
									</Form.Label>
									<FormControl
										required
										type="number"
										id="numOfGuests"
										name="numOfGuests"
										value={booking.numOfGuests}
										min={1}
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please select at least 1 guest.
									</Form.Control.Feedback>
								</Form.Group>

								<div className="form-group mt-2 mb-2">
									<button type="submit" className="btn btn-hotel">
										Continue
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
								booking={booking}
								payment={calculatePayment()}
								onConfirm={handleFormSubmit}
								isFormValid={validated}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default BookingForm
