import React, { useState, useEffect } from "react";

function Location() {
    const [location, setLocation] = useState({});

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        });
    }, []);

    return (

        <div>
            <p>
                Test
            </p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
        </div>
    );
}

export default Location;
