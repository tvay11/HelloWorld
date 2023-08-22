
function Card({city,country,ImageUrl,amadeus_airports,handleOpenModal,touristSpots}) {
    const handleClickOpen = () => {
        handleOpenModal(ImageUrl,city,country,amadeus_airports,touristSpots)
    };
    return (
        <div className="card">
            <img src={ImageUrl} className="image" onClick={handleClickOpen} draggable="false"/>
        </div>
    )
}
export default Card