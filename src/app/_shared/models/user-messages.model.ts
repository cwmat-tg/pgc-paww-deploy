export class UserMessages {
    // Location page
    public static LocationHelperText: string = 'Use the map below to draw a point at the location at which the observation you wish to report was made.';

    // Contact page
    public static ContactHelperText: string = 'Please provide your contact information in case the Game Commission needs to contact you to discuss your observation.';

    // Map page
    public static OfflineMap: string = 'Looks like you currently have limited network connection.  Loading a simplified offline map view until connection is restored.';

    // Animal page
    public static AnimalHelperText: string = 'Please provide the details of your bird or mammal observation. Any amphibian, fish, or reptile observations should be directed to the Pennsylvania Fish and Boat Commission. * Denotes Required Field.';
    public static PhotosHelperText: string = 'Optionally, upload photos and/or videos of your observation.  Combined photos/videos cannot exceed 25MB.';
    public static RabiesPopup: string = 'Signs that an animal might have rabies: aggressive behavior, drooling, lack of fear of humans, walking in circles or otherwise appearing disoriented, biting or chewing on itself. These signs may also occur with other diseases.';
    public static CaptivePopup: string = 'Captive - animal is usually kept inside an enclosure and is there now or may have escaped, Free-Ranging Wild - the animal is not contained and does not appear to have escaped from captivity.';
    public static PoachingPopup: string = '<p>The illegal shooting or taking of big game or protected, endangered or threatened species, or any crime against those species should be reported through Operation Game Thief</p> <p>(1-888-PGC-8001)</p> <p><a href="https://www.pgc.pa.gov/HuntTrap/Law/Pages/OperationGameThief.aspx" target="_blank">Operation Game Thief Website</a></p>';
    public static CurrentlyOffline: string = '<p>You are currently offline or are in an area with poor connectivity and your Observation cannot be submitted at this time.</p><p>Click <strong>"Save and Return Home"</strong> to save your observation to your device so it can be uploaded when you are connected again.</p><p>Or click <strong>"Close"</strong> to stay on the page.</p>';

    // File Upload
    public static UploadTooLarge: string = 'Your files are too large.  Please make sure they do not exceed 25MB.';
    public static UploadWrongType: string = 'Some or all of your files did not upload due to an incorrect file type.';

    // Home
    public static UploadTooltip: string = 'Looks like you have some Observations that were saved on your device while you were offline.  Now that you are online again, click to upload them.';

    // Confirmation
    public static BulkUploadConfirmation = 'Thank you for submitting an observation to Pennsylvania Wildlife Watch.';
    public static ConfirmSubmit = 'Please confirm your Observation Submission.';
    public static ConfirmActionNeededShort = '<p>Based on your observation details, an additional investigation by the Pennsylvania Game Commission may be required.</p><p>Please immediately contact the Game Commission at 717-787-4250 and provide your PAWW confirmation number to the dispatcher.</p><p>More information about the Game Commission can be found on their website at <a href="https://www.pgc.pa.gov/" target="_blank">pgc.pa.gov</a>.</p>';
    public static ConfirmNoActionNeededShort = '<p>Based on your observation details, the Pennsylvania Game Commission or <a href="https://www.vet.upenn.edu/research/centers-laboratories/research-initiatives/wildlife-futures-program" target="_blank">Wildlife Futures Program</a> may contact you for additional information.</p><p>Follow-up contact is not guaranteed but recent observations are prioritized.</p><p>More information about the Game Commission can be found on their website at <a href="https://www.pgc.pa.gov/" target="_blank">pgc.pa.gov</a>.</p>';
}

export interface ConfirmationSettings {
    title : string
    text : string;
    confirm : string;
    cancel : string;
}
