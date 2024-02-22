import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useContext, useState } from "react";
import { Icon, LatLngExpression } from "leaflet";
import UserDataContext from "../context/UserDataContext";
import useAxios from "../api/useAxios";
import { useQuery } from "@tanstack/react-query";
import { UserTypes } from "../types/UserTypes";

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
    iconUrl: "/images/icon-passenger.png",
    iconSize: [40, 40], // specify the size of your icon
    iconAnchor: [20, 40],
  });

  // const empIcon = (name: string) => {
  //   return {
  //     html: `<div>${name}</div>`,
  //     iconSize: [40, 40],
  //   };
  // };

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

  // ALL PENDING PASSENGERS
  const getAllEmployees = () => {
    return useAxios.get("users/employees");
  };

  const { data: allEmployees, status: allEmployeesStatus } = useQuery({
    queryFn: getAllEmployees,
    queryKey: ["All Employees"],
    select: (data) => {
      return data.data.employees;
    },
  });

  return (
    <div style={{ position: "relative", height, width, overflow: "hidden" }}>
      {/* <button onClick={() => setPosition([34.0836, 74.7973])}>
          Click to change LOC
        </button> */}
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[34.0836, 74.7973]}
        zoom={12}
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

        {allEmployeesStatus === "success" &&
          allEmployees?.length > 1 &&
          allEmployees.map((employee: UserTypes) => {
            return (
              <Marker
                icon={empIcon}
                key={employee?._id}
                position={employee?.pickup as LatLngExpression}
              >
                <Tooltip className="employee-tooltip" direction="top" offset={[0, -40]} permanent>
                  <span>{employee.fName[0] + "." + " " + employee.lName}</span>
                </Tooltip>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
