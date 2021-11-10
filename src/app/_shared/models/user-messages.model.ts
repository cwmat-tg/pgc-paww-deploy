export class UserMessages {
    // Location page
    public static LocationHelperText: string = 'Use the map below to draw a point at the location at which the observation you wish to report was made.';

    // Contact page
    public static ContactHelperText: string = 'Please complete the following fields below for your observation report. Providing contact information will enable the Game Commission to contact you should they need to discuss your observation.';

    // Animal page
    public static AnimalHelperText: string = 'Please complete all of the following fields below in order to proceed with your observation report. Fish, amphibian, or reptile observations should be directed to the Pennsylvania Fish and Boat Commission (provide URL link or phone number).';
    public static RabiesPopup: string = 'Signs that an animal might have rabies: aggressive behavior, drooling, lack of fear of humans, walking in circles or otherwise appearing disoriented, biting or chewing on itself. These signs may also occur with other diseases.';
    public static CaptivePopup: string = 'Captive - animal is usually kept inside an enclosure and is there now or may have escaped, Free-Ranging Wild - the animal is not contained and does not appear to have escaped from captivity.';
    public static PoachingPopup: string = '<p>The illegal shooting or taking of big game or protected, endangered or threatened species, or any crime against those species should be reported through Operation Game Thief</p> <p>(1-888-PGC-8001)</p> <p><a href="https://www.pgc.pa.gov/HuntTrap/Law/Pages/OperationGameThief.aspx" target="_blank">Operation Game Thief Website</a></p>';
}

export interface ConfirmationSettings {
    title : string
    text : string;
    confirm : string;
    cancel : string;
}