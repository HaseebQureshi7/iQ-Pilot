type RouteTypes = {
    driver?: string;
    passengers?: Array<string>;
    shiftTime?: string;
    shiftDate?: string;
    office?: string;
    typeOfRoute?: 'pickup' | 'drop';
    estimatedTime?: number;
    routeStatus?: 'notStarted' | 'inProgress' | 'completed';
    totalDistance?: number;
}

export default RouteTypes