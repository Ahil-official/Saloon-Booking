import React, { useEffect, useState } from "react"
import BookingForm from "../booking/BookingForm"
import {
	FaUtensils,
	FaWifi,
	FaTv,
	FaWineGlassAlt,
	FaParking,
	FaCar,
	FaTshirt
} from "react-icons/fa"

import { useParams } from "react-router-dom"
import { getRoomById } from "../utils/ApiFunctions"
import RoomCarousel from "../common/RoomCarousel"

const Checkout = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [serviceInfo, setServiceInfo] = useState({
		photo: "",
		serviceName: "",
		servicePrice: "",
		stylist: "",
		duration: ""
	})

	const { serviceId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getServiceById(serviceId)
				.then((response) => {
					setServiceInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [serviceId])

	return (
		<div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading service information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="service-info">
								<img
									src={`data:image/png;base64,${serviceInfo.photo}`}
									alt="Service photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Service Name:</th>
											<td>{serviceInfo.serviceName}</td>
										</tr>
										<tr>
											<th>Price:</th>
											<td>${serviceInfo.servicePrice}</td>
										</tr>
										<tr>
											<th>Stylist:</th>
											<td>{serviceInfo.stylist}</td>
										</tr>
										<tr>
											<th>Duration:</th>
											<td>{serviceInfo.duration} mins</td>
										</tr>
										<tr>
											<th>Included Services:</th>
											<td>
												<ul className="list-unstyled">
													<li>
														<FaScissors /> Haircut
													</li>
													<li>
														<FaUserTie /> Consultation
													</li>
													<li>
														<FaClock /> Timely Service
													</li>
													<li>
														<FaCheckCircle /> Complimentary Refreshments
													</li>
												</ul>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)}
					</div>
					<div className="col-md-8">
						<BookingForm />
					</div>
				</div>
			</section>
			<div className="container">
				<ServiceCarousel />
			</div>
		</div>
	)
}

export default Checkout
