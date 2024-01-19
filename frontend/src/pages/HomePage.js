import React, { useState, useRef } from "react";
import SearchFlight from "../components/SearchFlight";
import ImageSlider from "../components/ImageSlider";
import Modal from "../components/Modal";
import "../css/ImageSlider.css";

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false); // New state for closing animation
    const [selectedImage, setSelectedImage] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [amadeus_airports, setAmadeusAirports] = useState([]);
    const [touristSpots, setTouristSpots] = useState([]);
    const addModalRef = useRef(null);

    const handleOpenModal = (ImageUrl, city, country, amadeus_airports, touristSpots) => {
        setSelectedImage(ImageUrl);
        setCity(city);
        setCountry(country);
        setAmadeusAirports(amadeus_airports);
        setTouristSpots(touristSpots);
        setShowModal(true);
        setIsClosing(false);
    };

    const handleCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 500);
    };

    function handleAdd(newLocations) {
        if (addModalRef.current) {
            addModalRef.current.sendModalLocations(newLocations);
        }
    }

    return (
        <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#202124' }}>
            <SearchFlight ref={addModalRef} />
            <div className="imageSliderContainer">
                <ImageSlider handleOpenModal={handleOpenModal}/>
            </div>
            {showModal && (
                <div className={`modalContainer ${isClosing ? 'closing' : ''}`}>
                    <Modal imageUrl={selectedImage} city={city} country={country} amadeus_airports={amadeus_airports} handleCloseModal={handleCloseModal} addLocations={handleAdd} touristSpots={touristSpots}/>
                </div>
            )}
        </div>
    );
}

export default HomePage;
