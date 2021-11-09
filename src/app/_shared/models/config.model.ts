export interface AnimalCount {
    AnimalCountId?: number;
    Name?: string;
    SortKey?: number;
}

export interface Affiliation {
    AffiliationId?: number;
    Name?: string;
    SortKey?: number;
}

export interface Species {
    SpeciestId?: number;
    Name?: string;
    ClassificationId: number;
    SortKey?: number;
}

export interface YesNo {
    RefTableDataId?: number;
    Name?: string;
    SortKey?: number;
}

export interface Age {
    WildlifeAgeId?: number;
    Name?: string;
    SortKey?: number;
}

export interface Captive {
    CaptiveId?: number;
    Name?: string;
    SortKey?: number;
}

export interface Classification {
    ClassificationId?: number;
    Name?: string;
    SortKey?: number;
}