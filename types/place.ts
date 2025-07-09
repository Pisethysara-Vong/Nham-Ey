export type LatLngLiteral = {
    lat: number;
    lng: number;
};

export interface PlaceResult {
    place_id: string;
    name: string;
    geometry: {
        location: {
        lat: number;
        lng: number;
        };
    };
    icon?: string;
    rating?: number;
    types?: string[];
    vicinity?: string;
    price_level?: number;
    opening_hours?: {
        open_now: boolean;
    };
    photos?: {
        photo_reference: string;
        height: number;
        width: number;
        html_attributions: string[];
    }[];
}
