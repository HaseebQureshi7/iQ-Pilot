import { UserTypes } from "./UserTypes";

type RouteTypes = {
    driver?: string;
    passengers?: [UserTypes];
    shiftTime?: number;
    shiftDate?: string;
    office?: string;
    typeOfRoute?: 'pickup' | 'drop';
    estimatedTime?: number;
    routeStatus?: 'notStarted' | 'inProgress' | 'completed';
    totalDistance?: number;
}

export default RouteTypes