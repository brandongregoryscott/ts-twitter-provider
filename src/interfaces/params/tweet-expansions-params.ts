import { TweetExpansions } from "../../enums/tweet-expansions";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TweetExpansionsParams {
    expansions?: ArrayOrCsv<TweetExpansions>;
}

interface RawTweetExpansionsParams {
    expansions: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetExpansionsParams, RawTweetExpansionsParams };

// #endregion Exports
