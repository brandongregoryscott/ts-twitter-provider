import { TweetFields } from "../../enums/tweet-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TweetFieldsParams {
    fields?: TweetFields[];
}

interface RawTweetFieldsParams {
    "tweet.fields": string[];
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetFieldsParams, RawTweetFieldsParams };

// #endregion Exports
