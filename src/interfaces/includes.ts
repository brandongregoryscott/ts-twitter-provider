import { Media } from "./tweets/media";
import { Poll } from "./tweets/poll";
import { User } from "./tweets/user";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Includes {
    includes?: {
        media?: Media[];
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
