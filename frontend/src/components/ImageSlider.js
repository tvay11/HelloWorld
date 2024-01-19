import React, {useRef} from 'react';
import Card from "./Card";

const ImageSlider = ({handleOpenModal}) => {
    const galleryRef = useRef(null);

    const handleScroll = () => {
        const gallery = galleryRef.current;
        let scrollPercentage = (gallery.scrollLeft / (gallery.scrollWidth - gallery.clientWidth)) * 100;
        let percentage = (scrollPercentage / (gallery.clientWidth/2)) * data.length * 100 * 0.75

        for (const image of galleryRef.current.getElementsByClassName("image")) {
            image.style.objectPosition = `${percentage}% center`;
        }
    }
    const data = [
        {
            ImageUrl: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
            city: 'New York City',
            country: 'USA',
			amadeus_airports: ['JFK - JOHN F KENNEDY INTL - NEW YORK', 'LGA - LAGUARDIA - NEW YORK'],
            touristSpots: ['Statue of Liberty', 'Central Park', 'Empire State Building', 'Metropolitan Museum of Art']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1623947452139-a5c1961aba07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHN0LiUyMGxvdWlzfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=1000&q=60",
            city: 'Saint Louis',
            country: 'USA',
			amadeus_airports: ['STL - LAMBERT-ST LOUIS INTL - ST LOUIS'],
            touristSpots: ['Gateway Arch', 'City Museum', 'Forest Park', 'Missouri Botanical Garden']
        },
        {
            ImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
            city: 'Paris',
            country: 'France',
			amadeus_airports: ['CDG - CHARLES DE GAULLE - PARIS','ORY - ORLY - PARIS','BVA - BEAUVAIS TILLE - PARIS'],
            touristSpots: ['Eiffel Tower', 'Louvre Museum', 'Arc de Triomphe', 'Notre-Dame Cathedral']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'London',
            country: 'United Kingdom',
			amadeus_airports: ['LHR - HEATHROW - LONDON','LGW - GATWICK - LONDON','STN - STANSTED - LONDON','LTN - LUTON - LONDON','LCY - CITY AIRPORT - LONDON','SEN - SOUTHEND - LONDON'],
            touristSpots: ["The British Museum", "Tower of London", "London Eye", "Buckingham Palace", "Big Ben and the Houses of Parliament", "Westminster Abbey"]
        },
        {
            ImageUrl: "https://images.unsplash.com/reserve/D8ijGd3CSGq4BxJ9EzTf_13976945916_fa0ce84ee3_o.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNhbiUyMGZyYW5jaXNjbyUyMGJyaWRnZXxlbnwwfDB8MHx8&auto=format&fit=crop&w=1000&q=60",
            city: 'San Francisco',
            country: 'USA',
			amadeus_airports: ['SFO - SAN FRANCISCO INTL - SAN FRANCISCO'],
            touristSpots: ['Golden Gate Bridge', 'Alcatraz Island', 'Fisherman\'s Wharf', 'Chinatown']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1597933534024-debb6104af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'Chicago',
            country: 'USA',
			amadeus_airports: ['ORD - O HARE INTERNATIONAL - CHICAGO','MDW - MIDWAY INTERNATIONAL - CHICAGO'],
            touristSpots: ['Millennium Park', 'Art Institute of Chicago', 'Navy Pier', 'Willis Tower', 'The Magnificent Mile']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1535581652167-3a26c90bbf86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'Seattle',
            country: 'USA',
			amadeus_airports: ['SEA - SEATTLE TACOMA INTL - SEATTLE','LKE - LAKE UNION SPB - SEATTLE','BFI - BOEING FLD KING CO INT - SEATTLE'],
            touristSpots: ['Pike Place Market', 'Space Needle', 'Chihuly Garden and Glass', 'Museum of Pop Culture', 'Kerry Park']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1589083130544-0d6a2926e519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'Miami',
            country: 'USA',
			amadeus_airports: ['MIA - MIAMI INTL - MIAMI','TMB - MIAMI EXECUTIVE - MIAMI','OPF - OPA LOCKA EXECUTIVE - MIAMI'],
            touristSpots: ['South Beach', 'Little Havana', 'Vizcaya Museum and Gardens', 'Everglades National Park', 'Wynwood Walls']
        },
        {
            ImageUrl: "https://images.unsplash.com/photo-1563503136947-cc262fa1e423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80https://images.unsplash.com/photo-1563503136947-cc262fa1e423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'Los Angeles',
            country: 'USA',
			amadeus_airports: ['LAX - LOS ANGELAS INTL - LOS ANGELES'],
            touristSpots: ['Universal Studios Hollywood', 'Griffith Observatory', 'Santa Monica Pier', 'The Getty Center', 'Hollywood Walk of Fame']
        },

        {
            ImageUrl: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            city: 'Madrid',
            country: 'Spain',
			amadeus_airports: ['MAD - ADOLFO SUAREZ BARAJAS - MADRID'],
            touristSpots: ["Prado Museum", "Royal Palace of Madrid", "Retiro Park", "Thyssen-Bornemisza Museum", "Plaza Mayor", "Puerta del Sol"]
        },

    ];

    return(
        <div className="imageSlide"  data-prev-percentage="0" ref={galleryRef} onScroll={handleScroll} style={{height:"380px"}}>
            {data.map(item => (
                <Card ImageUrl={item.ImageUrl} city={item.city} country={item.country} amadeus_airports={item.amadeus_airports} handleOpenModal={handleOpenModal} touristSpots = {item.touristSpots}/>
            ))}
        </div>
    )

}

export default ImageSlider;
