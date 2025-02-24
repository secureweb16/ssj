import React, { useState, useEffect, useRef } from 'react';
import {Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputTextarea  } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from "primereact/floatlabel";
import { Autocomplete, GoogleMap, Marker, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'; 
import Location1 from '../assets/images/Pickup.svg';
import Location2 from '../assets/images/Dropoff.svg';
import Closeicon from '../assets/images/close.svg';
import Editicon from '../assets/images/edit-icon.png';
import WhatsappIcon from '../assets/images/whatsapp-icon.svg';
import mapIcon from '../assets/images/map-icon.svg';
import { Calendar } from 'primereact/calendar';
import UserIcon from '../assets/images/user.svg';
import SuitcaseIcon from '../assets/images/suitcase.svg';
import LocationMap from '../assets/images/location-map.jpg';
import CarThumb from '../assets/images/mercedes-v-class.jpg';
import config from '../config'; 
import backgroundImage from '../assets/images/thank-you-image.jpg';


const containerStyle = {width: '550px',height: '250px'}
const geocoder = new window.google.maps.Geocoder();

function BookingPopup({ cars, isHomeBanner, closePopup, location = ["Central London", "Babington House"] }) {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [innerActiveIndex, innerSetActiveIndex] = useState(0);
    const [selectedCars, setSelectedCars] = useState([]);
    const [showWarning, setShowWarning] = useState(false);
    const [pickupValue, setPickupValue] = useState('');
    const [destinationValue, setDestinationValue] = useState('');
    const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
    const [destinationAutocomplete, setDestinationAutocomplete] = useState(null);
    const [datetime12h, setDateTime12h] = useState(null);
    const [mapCenter, setMapCenter] = useState({  lat: 51.5074, lng: -0.1278  });
    // const londonBounds = {north: 51.7, south: 51.3, west: -0.5, east: 0.3,};
    const londonBounds = {north: 60, south: 49.5, west: -11, east: 2.5 }

    
    const [zoomLevel, setZoomLevel] = useState(10); // Default zoom level
    const mapRef = useRef(null); // Store map instance
    const [startPoint, setStartPoint] = useState(null);
    const [endPoint, setEndPoint] = useState(null);
    const [directions, setDirections] = useState(null);
    const vehicleTypes = [...new Set(cars?.map(car => car.type))];
    const [passengerCount, setPassengerCount] = useState(null);
    const [additionalRequests, setAdditionalRequests] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const onPickupLoad = (autocomplete) => {
        setPickupAutocomplete(autocomplete);
        if (location?.[0]) {
            setPickupValue(location[0]); // ✅ Set default input value
        }
    };
    const onDestinationLoad = (autocomplete) => {
        setDestinationAutocomplete(autocomplete);
        if (location?.[1]) {
            setDestinationValue(location[1]); // ✅ Set default input value
        }
    };

    /* Handle Car Selection */ 
    const handleSelectCar = (car) => {
        if (selectedCars.some((selectedCar) => selectedCar._id === car._id)) {
          setSelectedCars(selectedCars.filter((selectedCar) => selectedCar._id !== car._id));
        } else {
          setSelectedCars([...selectedCars, car]);
        }
    };
    
    /* Handle Remove Car */
    const handleRemoveCar = (car) => {
        const updatedCars = selectedCars.filter((selectedCar) => selectedCar._id !== car._id);
        setSelectedCars(updatedCars);
        if (updatedCars.length === 0) {
            setActiveIndex(0);
        }
    };

    /* Handle Pickup Change */ 
    const handlePickupChange = (e) => {
        const newPickupValue = e.target.value;
        setPickupValue(newPickupValue);
    };

    /* Handle Destination Change */ 
    const handleDestinationChange = (e) => {
        const  newDestinationValue = e.target.value;
        setDestinationValue(newDestinationValue);
    };

    /* Marker Start */ 
    const startMarkerIcon = {
        url: mapIcon, // The image URL
        scaledSize: new window.google.maps.Size(40, 40), // Resizing the image
        anchor: new window.google.maps.Point(20, 40), // Anchor position
    };
    
    /* Marker End */ 
    const endMarkerIcon = {
        url: mapIcon, 
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 40),
    };

    const onLoad = (map) => {
        mapRef.current = map;
    
        if (startPoint && endPoint) {
            const bounds = new window.google.maps.LatLngBounds();
            bounds.extend(new window.google.maps.LatLng(startPoint.lat, startPoint.lng));
            bounds.extend(new window.google.maps.LatLng(endPoint.lat, endPoint.lng));
            map.fitBounds(bounds, { top: 100, bottom: 100, left: 100, right: 100 });
           // north: 60.9, south: 49.8, west: -8.6, east: 1.9 
        } else if (startPoint) {
            // If only one point exists, center it with a reasonable zoom
            map.setCenter(new window.google.maps.LatLng(startPoint.lat, startPoint.lng));
            map.setZoom(10); // ✅ Adjusted zoom for a single location
        }
    };
    

    const onUnmount = (map) => {
        //console.log('Map Unmounted:', map);
    };

    /* Handle Start Marker Dragging */ 
    const handleStartMarkerDragEnd = (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        const newStartPoint = { lat: newLat, lng: newLng };
        setStartPoint(newStartPoint);
        // Get address of new location
        geocoder.geocode({ location: newStartPoint }, (results, status) => {
          if (status === 'OK' && results[0]) {
            setPickupValue(results[0].formatted_address);
          } else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
    };

     /* Handle End Marker Dradding */
    const handleEndMarkerDragEnd = (e) => {
        const newLat = e.latLng.lat();
        const newLng = e.latLng.lng();
        const newEndPoint = { lat: newLat, lng: newLng };
        setEndPoint(newEndPoint);
         // Get address of new location
        geocoder.geocode({ location: newEndPoint }, (results, status) => {
            if (status === 'OK' && results[0]) {
                setDestinationValue(results[0].formatted_address);  
            } else {
            console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    /* Handle Fields Edition */
    const handleEditClick = async (type) => {
        let inputElement;
        let tabindex;
        tabindex = (type === 'pickupaddress' || type === 'destinationaddress' || type === 'datetime') ? 1 : (type === 'passenger' || type === 'additional') ? 2 : 0;
        await handleTabChange(tabindex);
        if(type == 'datetime'){
            const spanElement = document.getElementById('datetime');
            inputElement = spanElement.querySelector('input');
        }else if(type == 'passenger'){
            const spanElement = document.getElementById('passenger');
            inputElement = spanElement?.querySelector('input');
        }else{
            inputElement = document.getElementById(type);
        }
        if (inputElement) {           
            inputElement.focus(); // Or inputElement.click() if you need to trigger a click
        }
    };
    
    /* Handle Done Buttton Functionality */ 
    const handleDoneClick = (type) => {
        if ((type === 'route' && (!pickupValue || !destinationValue || !datetime12h)) ||
            (type === 'vehicle' && selectedCars.length === 0) || 
            (type === 'details' && (!email || !name || !phone || !passengerCount || !additionalRequests))) {
            console.log(`${type} fields are missing or no car selected`);
            setShowWarning(true);
            return; // Stop further execution if condition is met
        }
        setShowWarning(false);
        setActiveIndex(activeIndex + 1); // Move to the next tab or step
        const tabIndex = (activeIndex != 3) ? activeIndex + 1 : activeIndex;
        setActiveIndex(tabIndex); 
        if(tabIndex === 3){
            const carDetails = selectedCars.map(car => `${car.company_name} (${car.car_name})`).join(', ');
            const messageBody = `
                Car Details: ${carDetails}
                Pickup Location: ${pickupValue}
                Destination Location: ${destinationValue}
                Date & Time: ${datetime12h}
                Passengers: ${passengerCount}
                Additional Requests: ${additionalRequests}
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
            `;
            const encodedMessage = encodeURIComponent(messageBody);
            const whatsappLink = `${config.whatsapp.baseUrl}${config.whatsapp.recipientPhone}?text=${encodedMessage}`;
            return whatsappLink;
        }
    };

    /* Handle Tab Change Functionality */ 
    const handleTabChange = (index) => {
        if (index === 1 && selectedCars.length === 0) {
            setShowWarning(true);
        } else if (index === 0 || index === 1) {
            setActiveIndex(index); 
            setShowWarning(false);  
        } else if (selectedCars.length === 0) {
            setShowWarning(true);
        } else if (!pickupValue || !destinationValue || !datetime12h) {
            setShowWarning(true);
        } else {
            setActiveIndex(index);
            setShowWarning(false);
        }
    };
    
    /* Handle Pickup changes */
    const handlePickupPlaceChange = () => {
        const place = pickupAutocomplete?.getPlace();
        if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setStartPoint({ lat, lng });
            setPickupValue(place.formatted_address);
            setMapCenter({ lat, lng });
            if (endPoint && mapRef.current) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng(lat, lng));
                bounds.extend(new window.google.maps.LatLng(endPoint.lat, endPoint.lng));
                mapRef.current.fitBounds(bounds); // Adjust zoom based on markers
            }
        } 
    };
    
    /* Handle Destination changes */
    const handleDestinationPlaceChange = () => {
        const place = destinationAutocomplete?.getPlace();
        if (place && place.geometry) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setEndPoint({ lat, lng });
            setDestinationValue(place.formatted_address);
            setMapCenter({ lat, lng });
            if (startPoint && mapRef.current) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng(lat, lng));
                bounds.extend(new window.google.maps.LatLng(startPoint.lat, startPoint.lng));
                mapRef.current.fitBounds(bounds); // Adjust zoom based on markers
            }
        } 
    };

 
    /* Map Initialization */ 
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${config.googlemap.apiKey}`,
    })

    /* Code For Change Date Format */ 
    const formatTime = (date) => {
        if (!date) return ''; // Return empty if no date is selected
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = date.toLocaleString('en-US', options);
        const day = date.getDate();
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) {
            suffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
            suffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            suffix = 'rd';
        }
        return formattedDate.replace(/(\d+)/, day + suffix); // Replace the day with the suffix
    };


    /* Handle Passenger Change */
    const handlePassengerChange = (e) => {
      setPassengerCount(e.value); // Set state instantly with the input value
    };

    /* Handle Additional Requests Change */ 
    const handleAdditionalRequestsChange = (e) => {
        setAdditionalRequests(e.target.value); // Set state instantly with the input value
    };

    /* Handle Name Change */ 
    const handleNameChange = (e) => {
    setName(e.target.value);
    };

    /* Handle Email Change */ 
    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };

    /* Handle Phone Number Change */ 
    const handlePhoneChange = (e) => {
    setPhone(e.value); // InputNumber gives e.value for numeric inputs
    };


    // Handle form submission
    const handleSubmit = async (type) => {
        const formData = {selectedCars,pickupValue,destinationValue,datetime12h,passengerCount,additionalRequests,name,email,phone};
        if(type == 'email'){
            try {
                setIsLoading(true);
                const response = await fetch(`${config.api.baseURL}${config.api.emailEndpoint}`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json', // Important to send data as JSON
                },
                  body: JSON.stringify(formData), // Convert formData to a JSON string
                });
                if (response.ok) {
                    setVisible2(true);
                    setVisible(false);
                    //setSuccessMessage('Email sent successfully!');
                    //setErrorMessage(''); // Clear error message if successful
                } else {
                  throw new Error('Failed to send email');
                }
            } catch (error) {
                setErrorMessage('Failed to send email');
                setSuccessMessage(''); // Clear success message if failed
            }
            setIsLoading(false); 
        }
         if(type == 'whatsapp'){
            const whatsappLink = handleDoneClick();  // Get the WhatsApp link from the handleDoneClick function
            if (whatsappLink) {
                window.open(whatsappLink, "_blank");
                setSuccessMessage('Redirecting to WhatsApp...');
                setErrorMessage(''); // Clear error message if successful
            } else {
                setErrorMessage('Failed to generate WhatsApp link');
                setSuccessMessage(''); // Clear success message if failed
            }
         }          
    };

    useEffect(() => {
        if (isHomeBanner) {
          setVisible(true);
        }
    }, [isHomeBanner]);

    useEffect(() => {
        const fetchLocations = async () => {
            if (!isLoaded || !location?.length) return;
            try {
                const startLatLng = await fetchLatLng(location[0]);
                const endLatLng = location[1] ? await fetchLatLng(location[1]) : null;
                if (startLatLng) setStartPoint(startLatLng);
                if (endLatLng) setEndPoint(endLatLng);
                if (mapRef.current) {
                    const map = mapRef.current;
                    if (startLatLng && endLatLng) {
                        // Adjust zoom dynamically for both points
                        const bounds = new window.google.maps.LatLngBounds();
                        bounds.extend(new window.google.maps.LatLng(startLatLng.lat, startLatLng.lng));
                        bounds.extend(new window.google.maps.LatLng(endLatLng.lat, endLatLng.lng));
                        // Apply padding and auto-fit zoom
                        map.fitBounds(bounds, { top: 80, bottom: 80, left: 80, right: 80 });
                    } else if (startLatLng) {
                        // If only one point, set dynamic zoom
                        map.setCenter(new window.google.maps.LatLng(startLatLng.lat, startLatLng.lng));
                        // Set zoom based on region size
                        const zoomLevel = startLatLng.lat > 50 ? 10 : 5; // UK-focused zoom level
                        map.setZoom(zoomLevel);
                    }
                }
            } catch (error) {
                console.error("Error fetching location coordinates:", error);
            }
        };
        fetchLocations();
    }, [isLoaded, location]);
    
    
    // ✅ Updated fetchLatLng function
    const fetchLatLng = async (placeName) => {
        return new Promise((resolve, reject) => {
            if (!placeName) {
                console.error("Invalid place name:", placeName);
                resolve(null);
                return;
            }
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: placeName }, (results, status) => {
                if (status === "OK" && results[0]?.geometry?.location) {
                    const { lat, lng } = results[0].geometry.location;
                    resolve({ lat: lat(), lng: lng() });
                } else {
                    console.error(`Geocoding failed for ${placeName}:`, status);
                    resolve(null);
                }
            });
        });
    };
    

    return (
        <>
        {!isHomeBanner && (
            <span className='btn largebtn' onClick={() => setVisible(true)}>Book Now</span>
        )}
        <Dialog visible={visible} onHide={() => {if (!visible) return; setVisible(false); if(closePopup) {closePopup(); }  }} className='booking-popup-outer' draggable={false}>
            <div className='booking-popup'>
                <div className='booking-popup-head d-flex align-items-center'>
                    <div className='booking-popup-head-left'>
                        <h3 className='m-0'>your <strong>trip</strong></h3>
                    </div>
                    <div className='booking-popup-head-right'>
                        {activeIndex === 0 && (
                            <Button className="btn largebtn" onClick={() => handleDoneClick('vehicle')}>Book Now</Button>
                        )}

                        {activeIndex === 1 && (
                            <Button className="btn largebtn" onClick={() => handleDoneClick('route')}>Book Now</Button>
                        )}

                        {activeIndex === 2 && (
                            <Button className="btn largebtn" onClick={() => handleDoneClick('details')}>Book Now</Button>
                        )}

                        {activeIndex === 3 && (
                            <Button className={`btn largebtn ${isLoading ? 'loading' : ''}`} onClick={() => handleSubmit('email')}>Book Now  <div className="loader-wrap"><span className='loader'></span></div></Button>
                        )}
                    </div>
                </div>
                <div className="booking-popup-maintab d-flex">
                    <div className="booking-popup-maintab-left">
                        <div className="booking-popup-maintab-left-wrap">
                            <div className="booking-popup-tableft-inner">
                                <div className="bookingpop-left-tab">    
                                    {/* <Button onClick={() => setActiveIndex(0)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 0} label="Vehicle" /> */}
                                    <Button
                                        onClick={() => handleTabChange(0)}
                                        className="w-2rem h-2rem p-0"
                                        rounded
                                        outlined={activeIndex !== 0}
                                        label="Vehicle"
                                    />
                                    <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                        {selectedCars.map((car) => (
                                            <li key={car._id}>
                                                {car.company_name} {car.car_name}
                                                <span
                                                className="result-icon"
                                                onClick={() => handleRemoveCar(car)}
                                                >
                                                <img src={Closeicon} alt="Close Icon" />
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bookingpop-left-tab">    
                                    {/* <Button onClick={() => setActiveIndex(1)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 1} label="Route + Schedule" /> */}
                                    <Button
                                        onClick={() => handleTabChange(1)}
                                        className="w-2rem h-2rem p-0"
                                        rounded
                                        outlined={activeIndex !== 1}
                                        label="Route + Schedule"
                                    />
                                    <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                        {pickupValue && (
                                            <li>
                                                <strong>Pick-up:</strong> {pickupValue}
                                                <span className='result-icon' onClick={() => handleEditClick('pickupaddress')}>
                                                    <img src={Editicon} alt="Edit Icon" className="" />
                                                </span>
                                            </li>
                                        )}
                                        {destinationValue && (
                                            <li>
                                                <strong>Destination:</strong> {destinationValue}
                                                <span className='result-icon' onClick={() => handleEditClick('destinationaddress')}>
                                                    <img src={Editicon} alt="Edit Icon" className="" />
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                    <ul className='popup-filter-results font-12 fw-400 nostyle'>   
                                        {datetime12h && (
                                            <li>
                                                <strong>Time:</strong> {formatTime(datetime12h)} {/* Display the formatted time */}
                                                <span className="result-icon" onClick={() => handleEditClick('datetime')}>
                                                    <img src={Editicon} alt="Edit Icon" className="" />
                                                </span>
                                            </li>
                                        )}                
                                    </ul>
                                </div>
                                <div className="bookingpop-left-tab">    
                                    {/* <Button onClick={() => setActiveIndex(2)} className="w-2rem h-2rem p-0" rounded outlined={activeIndex !== 2} label="Details" /> */}
                                    <Button
                                        onClick={() => handleTabChange(2)}
                                        className="w-2rem h-2rem p-0"
                                        rounded
                                        outlined={activeIndex !== 2}
                                        label="Details"
                                    />
                                    <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                        <li>
                                            <strong>Passengers: </strong>{passengerCount ? passengerCount : 0}
                                            <span className='result-icon' onClick={() => handleEditClick('passenger')}>
                                                <img src={Editicon} alt="Edit Icon" className="" />
                                            </span>
                                        </li>
                                        <li>
                                            <strong>Additional requests: </strong> {additionalRequests ? additionalRequests : 'None'}
                                            <span className='result-icon' onClick={() => handleEditClick('additional')}>
                                                <img src={Editicon} alt="Edit Icon" className="" />
                                            </span>                                        
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='mobile-tab-results show-mobile'>
                                <ul className='popup-filter-results font-12 fw-400 nostyle'>
                                    <li>
                                        Mercedes S-Class
                                        <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>
                                    </li>
                                    <li>
                                        Rolls Royce Phantom
                                        <span className='result-icon'><img src={Closeicon} alt="Close Icon" className="" /></span>                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='booking-popup-maintab-right'>
                        <div className='booking-popup-mainform'>
                            {activeIndex === 0 && (
                                <>
                                    <div className="vehicle-booking-content">
                                        <div className="vehicle-booking-category">
                                            {/* Tab buttons */}
                                            {vehicleTypes.map((type, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => innerSetActiveIndex(index)}
                                                className="border-button gray-border"
                                                outlined={innerActiveIndex !== index}
                                                label={type}
                                            />
                                            ))}
                                        </div>
                                        <div className="booking-car-list">
                                            {/* Loop over cars based on the active tab */}
                                            {cars.filter((car) => vehicleTypes[innerActiveIndex] === car.type).map((car) => (
                                                <div key={car?._id} className="common-booking-car-info d-flex align-items-center">
                                                    <div className="carpop-bottom-detail d-flex align-items-center">
                                                        <div className="carpop-bottom-image">
                                                            <img src={`${config.api.baseURL}${car?.image.replace(/\\/g, '/')}`}  alt={car?.name} />
                                                        </div>
                                                        <div className="carpop-bottom-info">
                                                            <h6>{car?.company_name} <strong>{car?.car_name}</strong></h6>
                                                            <div className="car-spec show-mobile">
                                                                <div className="common-car-spec d-flex align-items-center">
                                                                    <img src={UserIcon} alt="User Icon" />
                                                                    {car?.passengers}
                                                                </div>
                                                                <div className="common-car-spec d-flex align-items-center">
                                                                    <img src={SuitcaseIcon} alt="Suitcase Icon" />
                                                                    {car?.luggage_type}
                                                                </div>
                                                            </div>                                                            
                                                            <Link to="/signature-routes" className="font-12 viewmorebtn">
                                                                view more
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="car-spec show-desktop">
                                                        <div className="common-car-spec d-flex align-items-center">
                                                            <img src={UserIcon} alt="User Icon" />
                                                            <span className="hideforsmall">up to</span>&nbsp;{(car?.passengers) ? car?.passengers : 0 }&nbsp;
                                                            <span className="hideforsmall">passengers</span>
                                                        </div>
                                                        <div className="common-car-spec d-flex align-items-center">
                                                            <img src={SuitcaseIcon} alt="Suitcase Icon" />
                                                            {car?.luggage_type}&nbsp; <span className="hideforsmall">luggage</span>
                                                        </div>
                                                    </div>
                                                    <span className={`border-button gray-border select-button ${
                                                        selectedCars.some((selectedCar) => selectedCar._id === car._id) ? 'selected' : ''
                                                    }`}
                                                    onClick={() => handleSelectCar(car)}
                                                    >
                                                    {selectedCars.some((selectedCar) => selectedCar._id === car._id)
                                                        ? 'Selected'
                                                        : 'Select'}
                                                    </span>
                                                </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className='done-button pt-40 text-right'>
                                        <Button className="btn formbtn" onClick={() =>handleDoneClick('vehicle')}>Done</Button>
                                        {showWarning && (
                                        <div className="warning-message" style={{ color: 'red' }}>
                                            Please select at least one car to proceed.
                                        </div>
                                        )}
                                    </div>
                                </>
                            )}
                            {activeIndex === 1 && (
                                <>
                                    <div className='vehicle-routeschedule-content'>
                                        <h6>Select your <strong>pick-up location and destination</strong></h6>
                                        <div className='vehicle-routeschedule-signaturebox mb-30'>
                                            <div className='routeschedule-signaturebox-top d-flex align-items-center'>
                                                <p className='text-uppercase m-0 fw-400 font-12'>Signature Routes</p>
                                                <a href="/signature-routes" className="font-12 viewmorebtn">
                                                    view more
                                                </a>
                                                {/* <span className='viewmorebtn' onClick={() => setVisible2(true)}>view more</span> */}
                                            </div>
                                            <div className='routeschedule-signaturebox-bottom'>
                                                <div className='routeschedule-signaturebox-locations d-grid'>
                                                    {pickupValue && (
                                                        <div className='routeschedule-signaturebox-location d-flex align-items-center'>
                                                            <img src={Location1} alt="Location Image" className="" />
                                                            <p className='m-0'>{pickupValue} </p>
                                                        </div>
                                                    )}
                                                    {destinationValue && (
                                                        <div className='routeschedule-signaturebox-location d-flex align-items-center'>
                                                            <img src={Location2} alt="Location Image" className="" />
                                                            <p className='m-0'>{destinationValue} </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group position-relative'>
                                            <FloatLabel>
                                                <Autocomplete
                                                    onLoad={onPickupLoad}
                                                    onPlaceChanged={handlePickupPlaceChange}
                                                    ref={pickupAutocomplete}
                                                >
                                                    <InputText
                                                        id="pickupaddress"
                                                        value={pickupValue}
                                                        onChange={handlePickupChange}
                                                        className='w-100'
                                                    />
                                                </Autocomplete>
                                                <label htmlFor="pickupaddress">Type a <strong>pickup</strong> address or location</label>
                                            </FloatLabel>
                                        </div>
                                        <div className='form-group position-relative'>
                                            <FloatLabel>
                                                <Autocomplete
                                                    onLoad={onDestinationLoad}
                                                    onPlaceChanged={handleDestinationPlaceChange}
                                                    ref={destinationAutocomplete}
                                                >
                                                    <InputText
                                                        id="destinationaddress"
                                                        value={destinationValue}
                                                        onChange={handleDestinationChange}
                                                        className='w-100'
                                                    />
                                                </Autocomplete>
                                                <label htmlFor="destinationaddress">Type a <strong>destination</strong> address or location</label>
                                            </FloatLabel>
                                        </div>
                                        <div className='popup-location-map mb-20 mt-20'>
                                            {/* <img src={LocationMap} alt="Location Image" className="" /> */}
                                            <GoogleMap
                                                mapContainerStyle={containerStyle}
                                                center={mapCenter}
                                                // zoom={zoomLevel}
                                                onLoad={onLoad} // Load map instance
                                                onUnmount={onUnmount}
                                                options={{
                                                    restriction: {
                                                        latLngBounds: londonBounds,
                                                        strictBounds: true, // Prevent dragging outside London
                                                    },
                                                    mapTypeId: "roadmap", // Standard view
                                                    //streetViewControl: false, // Hide street view
                                                    //fullscreenControl: false, // Disable full screen
                                                    zoomControl: true, // Allow zooming
                                                }}
                                            >
                                                {/* Markers */}
                                                {startPoint && <Marker position={startPoint} draggable onDragEnd={handleStartMarkerDragEnd}  icon={startMarkerIcon} />}
                                                {endPoint && <Marker position={endPoint} draggable onDragEnd={handleEndMarkerDragEnd}  icon={endMarkerIcon} />}
                                                {directions && <DirectionsRenderer directions={directions} />}
                                            </GoogleMap>
                                        </div>                                
                                        <h6 className='mb-10'>Select a <strong>pick-up time</strong></h6>
                                        <div className='form-group position-relative m-0'>
                                            <FloatLabel>
                                                <Calendar
                                                    value={datetime12h}
                                                    onChange={(e) => setDateTime12h(e.value)}
                                                    showTime
                                                    hourFormat="12"
                                                    dateFormat="MM d,yy"
                                                    readOnlyInput
                                                    id="datetime"
                                                    className='w-100'
                                                />
                                                <label htmlFor="username">type a day and time here</label>
                                            </FloatLabel>
                                        </div>
                                    </div>
                                    <div className='done-button pt-40 text-right'>
                                        <Button className="btn formbtn" onClick={() =>handleDoneClick('route')}>Done</Button>
                                        {showWarning && (
                                            <div className="warning-message" style={{ color: 'red' }}>
                                                Please fill in all the required fields.
                                            </div>
                                        )}
                                        {/* <Button className="btn formbtn">Done</Button> */}
                                    </div>
                                </>
                            )}
                            {activeIndex === 2 && (
                                <>
                                    <div className='vehicle-details-content'>
                                        <h6 className='mb-10 label'>Add details about your trip here</h6>
                                        <div className='form-group'>
                                            {/* <InputNumber placeholder='type the number of passengers' useGrouping={false} className='w-100' /> */}
                                            <InputNumber
                                                value={passengerCount} // Bind the value of InputNumber to the state
                                                onChange={handlePassengerChange} // Handle value change
                                                placeholder='Type the number of passengers'
                                                useGrouping={false} // Disable grouping (comma separation)
                                                className='w-100'
                                                id='passenger'
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <InputTextarea value={additionalRequests || ""} placeholder="any additional notes?" className='w-100' id='additional' onChange={handleAdditionalRequestsChange}></InputTextarea>
                                        </div>
                                        <h6 className='mb-10 pt-20 label'>Your contact details</h6>
                                        {/* <div className='form-group'>
                                            <InputText type="text" placeholder="your name" className='w-100'/>
                                        </div>
                                        <div className='form-group'>
                                            <InputText type="email" placeholder="your email" className='w-100'/>
                                        </div>
                                        <div className='form-group'>
                                            <InputNumber type="text" placeholder="phone number" className='w-100'/>
                                        </div> */}

                                        <div className="form-group">
                                            <InputText
                                            type="text"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={handleNameChange} // Bind to state
                                            className="w-100"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <InputText
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={handleEmailChange} // Bind to state
                                            className="w-100"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <InputNumber
                                            type="tel"
                                            placeholder="Phone number"
                                            value={phone}
                                            onValueChange={handlePhoneChange} // Bind to state
                                            className="w-100"
                                            />
                                        </div>
                                    </div>
                                    <div className='done-button pt-40 text-right'>
                                        {/* <Button className="btn formbtn">Done</Button> */}
                                        <Button className="btn formbtn"  onClick={() =>handleDoneClick('details')}>Done</Button>
                                        {showWarning && (
                                            <div className="warning-message" style={{ color: 'red' }}>
                                                Please fill in all the required fields.
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        {activeIndex === 3 && (
                            <div className='popup-how-continue'>
                                <h6>Choose how to continue with our team</h6>
                                <p>We will email you details of your request and respond there or you can get in touch with us immediately via WhatsApp.</p>
                                <ul className='nostyle p-0 d-flex align-items-center gap-10 mt-30'>
                                    <li>
                                        <Button className={`btn ${isLoading ? 'loading' : ''}`}  onClick={() =>handleSubmit('email')}>Send Now  <div className="loader-wrap"><span className='loader'></span></div></Button>
                                    </li>
                                    <li>
                                        <Button className="btn d-flex align-items-center connect-whatsappbtn" onClick={() =>handleSubmit('whatsapp')}>Connect Via Whatsapp
                                            <img src={WhatsappIcon} alt='Icon' />
                                        </Button>
                                    </li>
                                </ul>
                                {/* Success Message */}
                                {successMessage && <p className="success-message">{successMessage}</p>}
                                {/* Error Message */}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </div>
                        )}
                    </div>                        
                </div>
            </div>
        </Dialog>
        <Dialog visible={visible2} onHide={() => {if (!visible2) return; setVisible2(false); }} style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }} className='booking-popup-outer thank-you-popup booking-popup-vhicles' draggable={false}>
           <div className="popup-wrapper">
                <h2>your <span>trip has been requested!</span></h2>
                <p>Our team will reply as soon as possible to confirm. </p>
                <a href="#" onClick={(e) => { e.preventDefault(); setVisible2(false); }}>Done</a>
           </div>
        </Dialog>
        </>
    );
}

export default BookingPopup;
