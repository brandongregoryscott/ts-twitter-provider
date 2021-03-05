import { Media } from "./tweets/media";
import { Place } from "./tweets/place";
import { Poll } from "./tweets/poll";
import { User } from "./tweets/user";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Includes {
    includes?: {
        media?: Media[];
        places?: Place[];
        polls?: Poll[];
        users?: User[];
    };
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Includes };

// #endregion Exports
