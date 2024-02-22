import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useContext, useState } from "react";
import { Icon } from "leaflet";
import UserDataContext from "../context/UserDataContext";

type MapTypes = {
  width?: string;
  height?: string;
  markersArray?: [any];
  routingEnabled?: boolean;
  driversLocation?: boolean;
};

const MapComponent = ({
  width = "100%",
  height = "500px",
  markersArray,
  routingEnabled = false,
  driversLocation = false,
}: MapTypes) => {
  const [driversPosition, setDriversPosition] = useState<any>();

  const { userData } = useContext(UserDataContext);

  const cabIcon = new Icon({
    iconUrl: "/cab-icon.png",
    iconSize: [40, 40], // specify the size of your icon
  });

  const empIcon = new Icon({
    iconUrl: "/icon-passenger.png",
    iconSize: [40, 40], // specify the size of your icon
  });

  const officeIcon = new Icon({
    iconUrl: "/office-icon.png",
    iconSize: [40, 40], // specify the size of your icon
  });

  function MapController() {
    //@ts-ignore
    const map = useMapEvents({
      //   click() {
      //     map.locate({ watch: true, enableHighAccuracy:true});
      //   },
      //   locationfound(e: any) {
      //     setPosition(e.latlng);
      //     map.flyTo(e.latlng, 17.5);
      //   },
    });
    return null;
  }

  return (
    <div style={{ position: "relative", height, width, overflow: "hidden" }}>
      {/* <button onClick={() => setPosition([34.0836, 74.7973])}>
          Click to change LOC
        </button> */}
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[34.0836, 74.7973]}
        zoom={11}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* {driversPosition && (
          <Marker icon={cabIcon} position={driversPosition} />
        )} */}

        {/* <Marker icon={officeIcon} position={[34.0837559, 74.8229426]} /> */}

        <MapController />

        {/* {markersArray?.length &&
          markersArray.map((marker: any) => {
            // console.log(marker.pickup)
            return <Marker icon={empIcon} key={marker} position={marker} />;
          })} */}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
