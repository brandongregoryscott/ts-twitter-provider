import { Media } from "./tweets/media";
import { Place } from "./tweets/place";
import { Poll } from "./tweets/poll";
import { Tweet } from "./tweets/tweet";
import { User } from "./users/user";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Includes {
    includes?: {
        media?: Media[];
        places?: Place[];
        polls?: Poll[];
        tweets?: Tweet[];
        users?: User[];
    };
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Includes };

// #endregion Exports
