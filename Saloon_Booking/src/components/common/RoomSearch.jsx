import React, { useState } from "react"
import { Form, Button, Row, Col, Container } from "react-bootstrap"
import moment from "moment"
import { getAvailableRooms } from "../utils/ApiFunctions"
import RoomSearchResults from "./RoomSearchResult"
import RoomTypeSelector from "./RoomTypeSelector"

const RoomSearch = () => {
	const [searchQuery, setSearchQuery] = useState({
		date: "", // Single date for salon booking
		serviceType: "" // Service type for salon
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [availableRooms, setAvailableRooms] = useState([]) // This represents available services
	const [isLoading, setIsLoading] = useState(false)

	const handleSearch = (e) => {
		e.preventDefault()
		const selectedDate = moment(searchQuery.date) // Validate the selected date
		if (!selectedDate.isValid()) {
			setErrorMessage("Please enter a valid date")
			return
		}

		setIsLoading(true)
		getAvailableRooms(selectedDate.format("YYYY-MM-DD"), searchQuery.serviceType) // Fetch available services
			.then((response) => {
				setAvailableRooms(response.data) // Assuming response.data contains the list of available services
			})
			.catch((error) => {
				console.log(error)
				setErrorMessage("Error fetching available services")
			})
			.finally(() => {
				setIsLoading(false) // Always reset loading state
			})
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setSearchQuery({ ...searchQuery, [name]: value }) // Update state based on user input
	}

	const handleClearSearch = () => {
		setSearchQuery({
			date: "",
			serviceType: "" // Reset search inputs
		})
		setAvailableRooms([]) // Clear available services
		setErrorMessage("") // Clear any existing error messages
	}

	return (
		<Container className="shadow mt-n5 mb-5 py-5">
			<Form onSubmit={handleSearch}>
				<Row className="justify-content-center">
					<Col xs={12} md={3}>
						<Form.Group controlId="date">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								name="date"
								value={searchQuery.date}
								onChange={handleInputChange}
								min={moment().format("YYYY-MM-DD")}
							/>
						</Form.Group>
					</Col>
					<Col xs={12} md={3}>
						<Form.Group controlId="serviceType">
							<Form.Label>Service Type</Form.Label>
							<div className="d-flex">
								<RoomTypeSelector
									handleRoomInputChange={handleInputChange} // Forward the change handler
									newRoom={searchQuery} // Pass the current search query
								/>
								<Button variant="secondary" type="submit" className="ml-2">
									Search
								</Button>
							</div>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			{isLoading ? (
				<p className="mt-4">Finding available services....</p>
			) : availableRooms.length > 0 ? (
				<RoomSearchResults results={availableRooms} onClearSearch={handleClearSearch} />
			) : (
				<p className="mt-4">No services available for the selected date and service type.</p>
			)}
			{errorMessage && <p className="text-danger">{errorMessage}</p>}
		</Container>
	)
}

export default RoomSearch
