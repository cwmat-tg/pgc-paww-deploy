export interface PointGeom {
    lat?: number;
    long?: number;
}

export interface Contact {
    name?: string;
    affiliation?: string;
    email?: string;
    phone?: number;
}

export interface Observation {
    geometry?: PointGeom;
    inState?: boolean;
    contact?: Contact;
}