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

export interface Information {
    date?: Date;
    numberOfAnimals?: string;
    species?: string;
}

export interface Observation {
    geometry?: PointGeom;
    inState?: boolean;
    contact?: Contact;
    information?: Information;
}