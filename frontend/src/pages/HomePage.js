import SearchFlight from "../components/SearchFlight";
import ImageSlider from "../components/ImageSlider";
import React, {useState, useRef} from "react";
import Modal from "../components/Modal";
import "../css/ImageSlider.css"

function HomePage() {

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [city, setCity] = useState('')
	const [amadeus_airports, setAmadeusAirports] = useState([]);
    const [country, setCountry] = useState('')
	const addModalRef = useRef(null);
    const [touristSpots, setTouristSpots] = useState([])


    const handleOpenModal = (ImageUrl, city, country, amadeus_airports,touristSpots) => {
        setSelectedImage(ImageUrl)
        setCountry(country)
        setCity(city)
        setTouristSpots(touristSpots)
		setAmadeusAirports(amadeus_airports)
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

	function handleAdd(newLocations) {
		if (addModalRef.current) {
			addModalRef.current.sendModalLocations(newLocations);
		}
	}
    return (
        <div>
            <h1 className="titleName">Flight</h1>
            <SearchFlight ref = {addModalRef} />
                <ImageSlider handleOpenModal={handleOpenModal}/>
            {showModal && (
                <div>
                    <Modal imageUrl={selectedImage}  city = {city} country = {country} amadeus_airports = {amadeus_airports} handleCloseModal={handleCloseModal} addLocations ={handleAdd} touristSpots = {touristSpots}/>
                </div>
            )}
        </div>
    );
}
export default HomePage;
