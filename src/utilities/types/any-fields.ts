import { MediaFields } from "../../enums/media-fields";
import { PlaceFields } from "../../enums/place-fields";
import { PollFields } from "../../enums/poll-fields";
import { TweetFields } from "../../enums/tweet-fields";
import { UserFields } from "../../enums/user-fields";

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

/** @hidden */
type AnyFields =
    | UserFields
    | TweetFields
    | PollFields
    | PlaceFields
    | MediaFields;

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { AnyFields };

// #endregion Exports
