import { RequestParameters } from "twitter-v2";
import { MediaFieldsParams, RawMediaFieldsParams } from "./media-fields-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface ListTweetsParams
    extends TweetFieldsParams,
        TweetExpansionsParams,
        MediaFieldsParams {
    ids: string | string[];
}

/**
 * Interface representing what the /tweets endpoint expects directly
 */
interface RawListTweetsParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawTweetExpansionsParams,
        RawMediaFieldsParams {
    ids: string;
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
