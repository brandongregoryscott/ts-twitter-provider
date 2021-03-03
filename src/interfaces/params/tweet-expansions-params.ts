import { TweetExpansions } from "../../enums/tweet-expansions";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TweetExpansionsParams {
    expansions?: TweetExpansions[];
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
