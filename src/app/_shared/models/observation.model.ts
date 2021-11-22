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
    alive?: number;
    sickOrInjured?: number;
    inYourPossession?: number;
    poaching?: number;
    age?: number;
    captiveWild?: number;
    rabies?: number;
    zoonotic?: number;
    details?: string;
}

export interface Observation {
    geometry?: PointGeom;
    inState?: boolean;
    contact?: Contact;
    information?: Information;
}

export interface ObservationDto {
  geometry?: PointGeom;
  inState?: boolean;
  name?: string;
  affiliation?: string;
  email?: string;
  phone?: number;
  date?: Date;
  numberOfAnimals?: string;
  species?: string;
  alive?: number;
  sickOrInjured?: number;
  inYourPossession?: number;
  poaching?: number;
  age?: number;
  captiveWild?: number;
  rabies?: number;
  zoonotic?: number;
  details?: string;
}

export interface ObservationMediaDto {
  name?: string;
  type?: string;
  data?: string;
  confirmation?: string;
}

export interface ObservationDtoContainer {
  data: ObservationDto;
  media: ObservationMediaDto[];
  uid?: string;
  dbId?: number;
}
