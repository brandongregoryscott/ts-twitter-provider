import { MediaFieldsParams, RawMediaFieldsParams } from "./media-fields-params";
import { PlaceFieldsParams, RawPlaceFieldsParams } from "./place-fields-params";
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
    extends MediaFieldsParams,
        PlaceFieldsParams,
        PollFieldsParams,
        TweetExpansionsParams,
        TweetFieldsParams,
        UserFieldsParams {}

/** @hidden */
interface RawBaseParams
    extends RawMediaFieldsParams,
        RawPlaceFieldsParams,
        RawPollFieldsParams,
        RawTweetExpansionsParams,
        RawTweetFieldsParams,
        RawUserFieldsParams {}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { BaseParams, RawBaseParams };

// #endregion Exports
