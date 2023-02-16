export interface Room {
    id: number;
    name: string;
    disponible: boolean;
    reserved: boolean;
    details: string;
    price: number;
    reservation_details: null | string;
}
