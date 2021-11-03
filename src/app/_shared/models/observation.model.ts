export interface PointGeom {
    lat?: number;
    long?: number;
}

export interface Observation {
    geometry?: PointGeom;
    inState?: boolean;
}