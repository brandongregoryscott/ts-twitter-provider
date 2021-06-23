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

interface GetUserByUsernameParams
    extends TweetFieldsParams,
        UserExpansionsParams,
        UserFieldsParams {
    username: string;
}

/**
 * @hidden
 * Interface representing what the /users/by/username/:username endpoint expects directly
 */
interface RawGetUserByUsernameParams
    extends RequestParameters,
        RawTweetFieldsParams,
        RawUserExpansionsParams,
        RawUserFieldsParams {
    username: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { GetUserByUsernameParams, RawGetUserByUsernameParams };

// #endregion Exports
