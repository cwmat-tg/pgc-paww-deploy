export class MagicStrings {
    // Name of the application
    public static AppName: string = 'Pennsylvania Wildlife Watch';

    // Abbreviation for app
    public static AppAbbrev: string = 'PAWW';

    // Location page
    public static LocationHeader: string = 'Observation Location';

    // Contact page
    public static ContactHeader: string = 'Contact Information';

    // Animal page
    public static AnimalHeader: string = 'Observation Information';
    public static PhotosHeader: string = 'Add Photos/Video';

    // Out of state page
    public static OutOfStateHeader: string = 'Out-of-State Confirmation';

    // API endpoints
    public static AnimalCount: string = 'GetAnimalCountLookUp';
    public static Affiliation: string = 'GetWildlifeHealthAffilationLookUp';
    public static Species: string = 'GetSpeciesLookUp';
    public static YesNo: string = 'GetYesNoLookUp';
    public static Age: string = 'GetWildlifeAgeLookUp';
    public static Captive: string = 'GetCaptiveLookup';
    public static Classification: string = 'GetClassificationLookup';
    public static PostObs: string = 'PostObs';
    public static PostObsMedia: string = 'PostObsMedia';

    // UI visibility
    public static Hidden: string = 'hidden';
    public static Visible: string = 'visible';

    // Lookup Values
    public static RefLookupYes: number = 1; // TODO need to cross walk actual value
    public static RefLookupNo: number = 2; // TODO need to cross walk actual value
    public static RefLookupMammal: number = 1; // TODO need to cross walk actual value
}