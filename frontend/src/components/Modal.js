import React, {useEffect, useRef, useState} from "react";
import "../css/Modal.css"
import Button from '@mui/material-next/Button';


function Modal(props) {
    const modalRef = useRef();
    const searchRef = useRef()
    const [searchTerm, setSearchTerm] = useState("")
    const bookRef = useRef()
    const [touristSpots,setTouristSpots] = useState([])

    const clickBackGroundHandle = (e) => {
        if(e.target === modalRef.current) {
            props.handleCloseModal()
        }
    }

    const handleClick = (e) => {
        if(e.target ===searchRef.current) {
            const searchUrl = `https://www.google.com/search?q=${searchTerm}`;
            window.open(searchUrl, '_blank');
        }
        else if(e.target === bookRef.current) {
            console.log(props.amadeus_airports);
            props.addLocations(props.amadeus_airports);
            props.handleCloseModal()
        }

    };


    useEffect(() => {
        const cityAndCountry = `${props.city}, ${props.country}`;
        setSearchTerm(cityAndCountry);
        setTouristSpots(props.touristSpots)
        function handleEscape(event) {
            if (event.key === "Escape") {
                props.handleCloseModal()
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };

    }, [props.city, props.country]);



    return (
        <div className="modalBackground" onClick={clickBackGroundHandle} ref={modalRef}>
            <div className="modalContainer" onClick={handleClick}>
                <img src={props.imageUrl} alt="" className="modalImage" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button
                        variant="filledTonal"
                        className={`customButton searchButton`}
                        size="large"
                        ref={searchRef}
                    >
                        {searchTerm}
                    </button>

                    <button
                        variant="filledTonal"
                        className={`customButton bookButton`}
                        size="large"
                        ref={bookRef}
                    >
                        Book it!
                    </button>
                    <div className="placesContainer">
                        <h1 className="placesTitle">Places to go</h1>
                        {touristSpots.map(spot => (
                            <p key={spot} className="placesItem">{spot}</p>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal;