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

    const margRight = '10px';


    return (
        <div className="modalBackground" onClick={clickBackGroundHandle} ref={modalRef}>
            <div className="modalContainer" onClick={handleClick}>
                <img src={props.imageUrl} alt="" className="modalImage" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Button variant="filledTonal" style={{borderRadius:'30px', background: 'rgba(20, 65, 210, 0.7)', color:"white", height:"70px",width:"260px",fontSize:"20px",marginTop:"10px",marginRight:margRight}} size="large" ref ={searchRef}> {searchTerm}</Button>
                    <Button variant="filledTonal" style={{borderRadius:'30px', background: 'rgb(229, 123, 55,0.7)', color:"white", height:"70px",width:"260px",fontSize:"20px",marginTop:"10px",marginRight:margRight}} size="large" ref = {bookRef}> Add to Destination List </Button>
                    <div style={{ background: 'rgb(34, 5, 45, 0.7)', borderRadius: '20px', padding: '10px', marginTop: '10px',width:"245px", }}>
                        <h1 style={{color:"white",fontSize:"22px", textAlign:"center"}}>Places to go</h1>
                        {touristSpots.map(spot => (
                            <p key={spot} style={{color:"white",fontSize:"18px", textAlign:"center"}}>{spot}</p>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;