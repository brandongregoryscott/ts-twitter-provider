import { RequestParameters } from "twitter-v2";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import {
    RawUserExpansionsParams,
    UserExpansionsParams,
} from "./user-expansion-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface GetUserParams
    extends TweetFieldsParams,
        UserExpansionsParams,
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
        RawUserExpansionsParams,
        RawUserFieldsParams {
    id: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { GetUserParams, RawGetUserParams };

// #endregion Exports
