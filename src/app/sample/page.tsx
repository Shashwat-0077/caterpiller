// "use client";
// import { useState, useEffect } from "react";

// type Coordinates = {
//     latitude: number | null;
//     longitude: number | null;
// };

// type GeolocationError = {
//     code: number;
//     message: string;
// };

// const useGeolocation = () => {
//     const [location, setLocation] = useState<Coordinates>({
//         latitude: null,
//         longitude: null,
//     });
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     setLocation({
//                         latitude: position.coords.latitude,
//                         longitude: position.coords.longitude,
//                     });
//                 },
//                 (err: GeolocationPositionError) => {
//                     const geolocationError: GeolocationError = {
//                         code: err.code,
//                         message: err.message,
//                     };
//                     setError(geolocationError.message);
//                 },
//                 {
//                     enableHighAccuracy: true, // Request high accuracy
//                     timeout: 10000, // Timeout after 10 seconds
//                     maximumAge: 0, // No caching of location data
//                 },
//             );
//         } else {
//             setError("Geolocation is not supported by this browser.");
//         }
//     }, []);

//     return { location, error };
// };

// export default function Home() {
//     const { location, error } = useGeolocation();

//     return (
//         <div>
//             <h1>User Coordinates</h1>
//             {error ? (
//                 <p>Error: {error}</p>
//             ) : (
//                 <div>
//                     <p>Latitude: {location.latitude}</p>
//                     <p>Longitude: {location.longitude}</p>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";
import React, { useState } from "react";

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            await fetch("http://localhost:3000/api/upload", {
                method: "POST",
                body: formData,
            });
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default FileUpload;
