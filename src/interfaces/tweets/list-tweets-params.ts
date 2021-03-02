import { RequestParameters } from "twitter-v2";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsParams extends TweetFieldsParams {
    ids: string | string[];
}

/**
 * Interface representing what the /tweets endpoint expects directly
 */
interface RawListTweetsParams extends RequestParameters, RawTweetFieldsParams {
    ids: string;
    expands?: any;
    "media.fields"?: any;
    "place.fields"?: any;
    "poll.fields"?: any;
    "user.fields"?: any;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ListTweetsParams, RawListTweetsParams };

// #endregion Exports
