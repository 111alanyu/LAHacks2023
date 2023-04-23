import React, { useState, useEffect } from "react";

function Location() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => console.error(error)
        );
    }, []);

    return (
        [latitude, longitude]
    );
}