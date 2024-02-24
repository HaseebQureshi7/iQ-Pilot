import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

interface CustomRoutingControlOptions extends L.Routing.RoutingControlOptions {
    draggableWaypoints?: boolean;
}

let resolveRMData: ((data: any) => void) | null = null;

export const RMDataPromise = new Promise<any>((resolve) => {
    resolveRMData = resolve;
});

const createRoutineMachineLayer = ({ routes }: any) => {
    const instance = L.Routing.control({
        waypoints: [
            ...routes
        ],
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
        hide: true
    } as CustomRoutingControlOptions);

    instance.on("routeselected", (e: L.Routing.RouteSelectedEvent) => {
        const distanceInKilometers: number | undefined =
            typeof e.route.summary?.totalDistance === "number"
                ? e.route.summary.totalDistance / 1000
                : 0;

        const totalTimeInSeconds: number | undefined =
            typeof e.route.summary?.totalTime === "number"
                ? e.route.summary.totalTime
                : 0;

        const totalMinutes = Math.floor(totalTimeInSeconds / 60);

        const RMData = {
            totalMinutes,
            distanceInKilometers
        };

        // Resolve the promise with RMData
        if (resolveRMData) {
            resolveRMData(RMData);
            resolveRMData = null; // Reset to prevent further resolution
        }
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
