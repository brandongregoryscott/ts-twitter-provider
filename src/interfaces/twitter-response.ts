import { Includes } from "./includes";
import { Meta } from "./meta";
import { TwitterError } from "./twitter-error";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TwitterResponse<T> extends Includes, Meta {
    data: T;
    errors?: TwitterError[];
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterResponse };

// #endregion Exports
