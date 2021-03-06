import { MediaFields } from "../../enums/media-fields";
import { TweetTypes } from "../../enums/tweet-types";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ExcludeParams {
    exclude?: TweetTypes[];
}

interface RawExcludeParams {
    exclude: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ExcludeParams, RawExcludeParams };

// #endregion Exports
