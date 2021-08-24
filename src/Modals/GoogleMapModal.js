import React, { useState, useEffect } from 'react';
import reactDom from 'react-dom';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const Backdrop = (props) => {
    return  (
        <div 
            className="file-backdrop animate__animated animate__fadeIn" 
            onClick={props.onClick} 
        />
    );
};

const Map = (props) => {
    const [currMarker, setCurrMarker] = useState({ lat: null, lng: null });

    useEffect(() => {
        props.onTrigger(currMarker);
    }, [currMarker]);

    const geolocationHandler = (event) => {
        setCurrMarker({ ...currMarker, lat: event.latLng.lat(), lng: event.latLng.lng() });
    };

    return (
        <GoogleMap
            defaultZoom={4}
            defaultCenter={{ lat: 60.472023, lng: 8.468946 }}
            onClick={geolocationHandler}
        >
            <Marker 
                position={currMarker}
            />
        </GoogleMap>
    );
};
const WrappedMap = withScriptjs(withGoogleMap(Map));

const GoogleMapModalContainer = (props) => {
    const [currPosition, setCurrPosition] = useState({});

    const triggerCurrMarkerHandler = (currentMarker) => {
        setCurrPosition(currentMarker);
        console.log(currentMarker, "marker");
    };
    const triggerCurrPositionHandler = () => {
        props.onPass(currPosition);
        props.onClick();
    };

    return ( 
        <div className="file-modal banner-modal animate__animated animate__backInDown">
            <p className="file-modal__closer" onClick={props.onClick}>&times;</p>
            <h2 className="select-pos-title"> Select Position </h2>
            <div className="tumbnail-area banner-area map-area">
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: "100%" }} />}
                    containerElement={<div style={{ height: "100%" }} />}
                    mapElement={<div style={{ height: "100%" }} />}
                    onTrigger={triggerCurrMarkerHandler}
                />
            </div>
            <button 
                type="button" 
                className="submit-image-button" 
                onClick={triggerCurrPositionHandler}
            >
                Go
            </button>
        </div>
    );
};

const rootForGoogleMapModal = document.getElementById("google-map-modal");

const GoogleMapModal = (props) => {  
    const passCurrPositionHandler = (currPosition) => {
        props.onPass(currPosition);
    };

    return (
        <React.Fragment>
            { reactDom.createPortal(<Backdrop onClick={props.onClick} />, rootForGoogleMapModal) }
            { reactDom.createPortal(<GoogleMapModalContainer onClick={props.onClick} onPass={passCurrPositionHandler} />, rootForGoogleMapModal) }
        </React.Fragment>
    );
};

export default GoogleMapModal;