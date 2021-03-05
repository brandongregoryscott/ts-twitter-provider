import { MediaFieldsParams, RawMediaFieldsParams } from "./media-fields-params";
import { PollFieldsParams, RawPollFieldsParams } from "./poll-fields-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "./tweet-expansions-params";
import { RawTweetFieldsParams, TweetFieldsParams } from "./tweet-fields-params";
import { RawUserFieldsParams, UserFieldsParams } from "./user-fields-params";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface BaseParams
    extends PollFieldsParams,
        TweetFieldsParams,
        TweetExpansionsParams,
        MediaFieldsParams,
        UserFieldsParams {}

interface RawBaseParams
    extends RawPollFieldsParams,
        RawTweetFieldsParams,
        RawTweetExpansionsParams,
        RawMediaFieldsParams,
        RawUserFieldsParams {}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { BaseParams, RawBaseParams };

// #endregion Exports
