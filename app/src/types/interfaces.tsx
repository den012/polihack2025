export interface Event {
    id: number;
    name: string
    description: string;
    image: string;
    date: string;
    price: number;
    location: string;
    organizer: string;
    category: string;

}

export interface Category {
    id: number;
    name: string;
}