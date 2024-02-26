import { UserTypes } from "./UserTypes";

type RouteTypes = {
    _id?: string; 
    driver?: UserTypes;
    passengers?: Array<UserTypes>;
    shiftTime?: string;
    shiftDate?: string;
    office?: string;
    typeOfRoute?: 'pickup' | 'drop';
    estimatedTime?: number;
    routeStatus?: 'notStarted' | 'inProgress' | 'completed';
    totalDistance?: number;
}

export default RouteTypes