import { RequestParameters } from "twitter-v2";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface GetUserParams
    extends TweetFieldsParams,
        TweetExpansionsParams,
        UserFieldsParams {
    id: string;
}

/**
 * @hidden
 * Interface representing what the /users/:id endpoint expects directly
 */
interface RawGetUserParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawTweetExpansionsParams,
        RawUserFieldsParams {
    id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { GetUserParams, RawGetUserParams };

// #endregion Exports
