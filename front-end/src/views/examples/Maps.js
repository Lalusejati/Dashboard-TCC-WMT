/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
// react plugin used to create google maps
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import ApiAxios from "network/ApiAxios";

// Dummy locations for now, will be replaced by API data later if we proceed
const staticLocations = [
  {
    name: "Jakarta",
    id: "12345",
    position: { lat: -6.2088, lng: 106.8456 },
    status: "Ganti",
    error: "6.2%",
  },
  {
    name: "Bandung",
    id: "67890",
    position: { lat: -6.9175, lng: 107.6191 },
    status: "Akurat",
    error: "2.1%",
  },
];

// mapTypeId={google.maps.MapTypeId.ROADMAP}
const MapWrapper = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: -6.2088, lng: 106.8456 }}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [{ color: "#444444" }],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [{ color: "#f2f2f2" }],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [{ saturation: -100 }, { lightness: 45 }],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [{ visibility: "simplified" }],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
          },
        ],
      }}
    >
      {props.locations.map((loc, index) => (
        <Marker
          key={index}
          position={loc.position}
          onClick={() => props.onMarkerClick(loc)}
        >
          {props.activeLocation && props.activeLocation.id === loc.id && (
            <InfoWindow onCloseClick={() => props.onCloseClick()}>
              <div>
                <h5>Lokasi: {loc.name}</h5>
                <p>ID Pelanggan: {loc.id}</p>
                <p>Hasil Error: {loc.error}</p>
                <p>Status: {loc.status}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ))
);

const Maps = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [stats, setStats] = useState({
    totalTests: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
  });
  // We still need to fetch logs to calculate stats, even if not shown on map yet
  useEffect(() => {
    const fetchStatsForHeader = async () => {
      try {
        const response = await ApiAxios.get("/pengujian");
        const allLogs = response.data;

        const totalTests = allLogs.length;
        const passed = allLogs.filter(
          (log) => log.statusPengujian.toLowerCase() === "lolos"
        ).length;
        const failed = totalTests - passed;
        const passRate = totalTests > 0 ? (passed / totalTests) * 100 : 0;

        setStats({
          totalTests,
          passed,
          failed,
          passRate: passRate.toFixed(2),
        });
      } catch (err) {
        console.error("Failed to fetch stats for Maps header:", err);
        // Set stats to 0 or show an error if fetching fails
        setStats({ totalTests: 0, passed: 0, failed: 0, passRate: 0 });
      }
    };

    fetchStatsForHeader();
  }, []);

  const handleMarkerClick = (location) => {
    setActiveLocation(location);
  };

  const handleCloseClick = () => {
    setActiveLocation(null);
  };

  return (
    <>
      <Header stats={stats} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyC0gxuYF8d2FI81JJSMUvnpVMZwHM_wxes`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                  <div
                    style={{ height: `600px` }}
                    className="map-canvas"
                    id="map-canvas"
                  />
                }
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "inherit" }} />
                }
                locations={staticLocations} // Using static locations for now
                activeLocation={activeLocation}
                onMarkerClick={handleMarkerClick}
                onCloseClick={handleCloseClick}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;
