import { RequestParameters } from "twitter-v2";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsParams extends TweetFieldsParams, TweetExpansionsParams {
    ids: string | string[];
}

/**
 * Interface representing what the /tweets endpoint expects directly
 */
interface RawListTweetsParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawTweetExpansionsParams {
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
