import { TweetFields } from "../../enums/tweet-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsParams {
    ids: string | string[];
    fields?: TweetFields[];
}

/**
 * Interface representing what the /tweets endpoint expects directly
 *
 * @interface RawListTweetsParams
 */
interface RawListTweetsParams {
    ids: string;
    expands?: any;
    "media.fields"?: any;
    "place.fields"?: any;
    "poll.fields"?: any;
    "tweet.fields"?: TweetFields[];
    "user.fields"?: any;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsParams, RawListTweetsParams };

// #endregion Exports
