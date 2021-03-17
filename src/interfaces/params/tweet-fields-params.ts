import { TweetFields } from "../../enums/tweet-fields";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TweetFieldsParams {
    fields?: ArrayOrCsv<TweetFields>;
}

/** @hidden */
interface RawTweetFieldsParams {
    "tweet.fields": string[];
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetFieldsParams, RawTweetFieldsParams };

// #endregion Exports
