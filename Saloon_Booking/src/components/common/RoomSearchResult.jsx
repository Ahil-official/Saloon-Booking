import React, { useState } from "react";
import RomCard from "../room/RoomCard"; // Changed from RoomCard to ServiceCard
import { Button, Row } from "react-bootstrap";
import RoomPaginator from "./RoomPaginator"; // Keep as is if you plan to use it for pagination

const RoomSearchResults = ({ results, onClearSearch }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const resultsPerPage = 3;

	const totalResults = results.length;
	const totalPages = Math.ceil(totalResults / resultsPerPage);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const startIndex = (currentPage - 1) * resultsPerPage;
	const paginatedResults = results.slice(startIndex, startIndex + resultsPerPage);

	return (
		<>
			{totalResults > 0 ? (
				<>
					<h5 className="text-center mt-5">Available Services</h5>
					<Row>
						{paginatedResults.map((service) => (
							<ServiceCard key={service.id} service={service} />
						))}
					</Row>
					<Row className="justify-content-between mt-3">
						{totalPages > 1 && ( // Only show paginator if more than one page
							<RoomPaginator
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
						<Button variant="secondary" onClick={onClearSearch}>
							Clear Search
						</Button>
					</Row>
				</>
			) : (
				<p className="text-center mt-4">No services found for the selected criteria.</p>
			)}
		</>
	);
};

export default RoomSearchResults;
