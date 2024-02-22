export interface UserTypes {
    id?: number;
    fName: string,
    lName: string,
    phone?: number;
    email?: string;
    role?: "admin" | "employee" | "driver";
    password?: string;
    profilePicture?: string;
    pickup?: [number, number];
    onLeave?: {
        numDays: 4 | 12 | number;
        startDate: Date;
    }; // Optional field
    cabDetails?: {
        cabNumber: string;
        seatingCapacity: number;
        numberPlate: string;
        model: string;
        color: string;
    }; // Optional field
    address?: string;
    createdAt?: Date;
}