import { TweetExpansions } from "../enums/tweet-expansions";
import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/params/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/params/list-tweets-params";
import { MediaFields } from "../enums/media-fields";
import { PlaceFields } from "../enums/place-fields";
import { PollFields } from "../enums/poll-fields";
import {
    ListMentionsByUserParams,
    RawListMentionsByUserParams,
} from "../interfaces/params/list-mentions-by-user-params";
import { UserFields } from "../enums/user-fields";
import {
    GetTweetParams,
    RawGetTweetParams,
} from "../interfaces/params/get-tweet-params";
import { FieldToExpansionsMappings } from "./types/field-to-expansions-mappings";
import { ParamUtils } from "./param-utils";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _fieldToExpansionMappings: FieldToExpansionsMappings = [
    {
        expansion: TweetExpansions.AttachmentsMediaKeys,
        fields: Object.values(MediaFields),
    },
    {
        expansion: TweetExpansions.AuthorId,
        fields: Object.values(UserFields),
    },
    {
        expansion: TweetExpansions.GeoPlaceId,
        fields: Object.values(PlaceFields),
    },
    {
        expansion: TweetExpansions.AttachmentsPollIds,
        fields: Object.values(PollFields),
    },
];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

/** @hidden */
const TweetParamMapper = {
    toGetTweetParams: (params: GetTweetParams): RawGetTweetParams =>
        _toRawTweetParams(params),
    toListMentionsByUserParams: (
        params: ListMentionsByUserParams
    ): RawListMentionsByUserParams => _toRawTweetParams(params),
    toListTweetsParams: (params: ListTweetsParams): RawListTweetsParams =>
        _toRawTweetParams(params),
    toListTweetsByUserParams: (
        params: ListTweetsByUserParams
    ): RawListTweetsByUserParams => _toRawTweetParams(params),
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _toRawTweetParams = <TParams, TRawParams>(params: TParams): TRawParams =>
    ParamUtils.toRawParams(
        ParamUtils.preprocessForExpansions(params, _fieldToExpansionMappings)
    ) as TRawParams;

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TweetParamMapper };

// #endregion Exports
