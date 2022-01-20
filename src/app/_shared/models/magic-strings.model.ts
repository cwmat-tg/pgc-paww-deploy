export class MagicStrings {
    // Name of the application
    public static AppName: string = 'Wildlife Health Survey';

    // Abbreviation for app
    public static AppAbbrev: string = 'WHS';

    // Location page
    public static LocationHeader: string = 'Observation Location';

    // Contact page
    public static ContactHeader: string = 'Contact Information';

    // Animal page
    public static AnimalHeader: string = 'Observation Details';
    public static PhotosHeader: string = 'Add Photos/Videos';

    // Out of state page
    public static OutOfStateHeader: string = 'Out-of-State Confirmation';

    // Confirmation page
    public static ConfirmationHeader: string = 'Confirmation';
    public static ConfirmationHeaderActionNeeded: string = 'Contact Dispatch';
    public static ConfirmationHeaderNoActionNeeded: string = 'Submission Complete';

    // API endpoints
    public static AnimalCount: string = 'GetAnimalCountLookUp';
    public static Affiliation: string = 'GetWildlifeHealthAffilationLookUp';
    public static Species: string = 'GetSpeciesLookUp';
    public static SpeciesImage: string = 'GetSpeciesItemById';
    public static YesNo: string = 'GetYesNoLookUp';
    public static Age: string = 'GetWildlifeAgeLookUp';
    public static Captive: string = 'GetOriginLookUp';
    public static Classification: string = 'GetClassificationLookUp';
    public static WildlifeStatus: string = 'GetWildlifeStatusLookUp';
    public static PostObs: string = 'SubmitPublicObservation';
    public static PostObsMedia: string = 'SubmitPublicObservationImage';

    // UI visibility
    public static Hidden: string = 'hidden';
    public static Visible: string = 'visible';

    // Lookup Values
    public static RefLookupYes: number = 1;
    public static RefLookupNo: number = 2;
    public static RefLookupMammal: number = 2;
    public static RefLookupAlive: number = 1;
    public static RefLookupPublicAffiliation: number = 7;

    // Local Storage Keys
    public static LocalStorageObsKey: string = 'paww:storedObservations';

    // Confirmation Status
    public static ConfFreshNoAction: string = 'paww:freshNoAction';
    public static ConfFreshActionNeeded: string = 'paww:freshActionNeeded';
    public static ConfStale: string = 'paww:stale';

    // Phone
    public static GameCommissionPhone: string = '717-787-4250';
}