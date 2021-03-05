import { Includes } from "./includes";
import { Meta } from "./meta";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TwitterResponse<T> extends Includes, Meta {
    data: T;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterResponse };

// #endregion Exports
