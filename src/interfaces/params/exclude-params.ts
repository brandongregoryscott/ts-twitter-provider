import { MediaFields } from "../../enums/media-fields";
import { TweetTypes } from "../../enums/tweet-types";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ExcludeParams {
    exclude?: ArrayOrCsv<TweetTypes>;
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
