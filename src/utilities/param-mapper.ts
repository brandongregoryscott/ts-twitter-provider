import { TweetExpansions } from "../enums/tweet-expansions";
import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/params/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/params/list-tweets-params";
import { RawBaseParams, BaseParams } from "../interfaces/params/base-params";
import { ArrayOrCsv } from "../types/array-or-csv";
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
import {
    GetUserParams,
    RawGetUserParams,
} from "../interfaces/params/get-user-params";
import { TweetFields } from "../enums/tweet-fields";
import { UserExpansions } from "../enums/user-expansions";
import { CoreUtils } from "./core-utils";
import { FieldToExpansionsMappings } from "./types/field-to-expansions-mappings";
import { ParamUtils } from "./param-utils";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _customMappedKeys: Record<CustomMapKey, CustomMapValue> = {
    fields: "tweet.fields",
};

const _fieldToTweetExpansionMappings: FieldToExpansionsMappings = [
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

const _fieldToUserExpansionMappings: FieldToExpansionsMappings = [
    {
        expansion: UserExpansions.PinnedTweetId,
        fields: Object.values(TweetFields),
    },
];

const _unmappedKeys: Array<UnmappedKey> = ["id", "userId"];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

type CustomMapKey = keyof Pick<BaseParams, "fields">;
type CustomMapValue = keyof Pick<RawBaseParams, "tweet.fields">;

type UnmappedKey =
    | keyof Pick<GetTweetParams, "id">
    | keyof Pick<ListTweetsByUserParams, "userId">;

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const toGetTweetParams = (params: GetTweetParams): RawGetTweetParams =>
    _toRawTweetParams<GetTweetParams, RawGetTweetParams>(params);

const toGetUserParams = (params: GetUserParams): RawGetUserParams =>
    _toRawUserParams<GetUserParams, RawGetUserParams>(params);

const toListMentionsByUserParams = (
    params: ListMentionsByUserParams
): RawListMentionsByUserParams =>
    _toRawTweetParams<ListMentionsByUserParams, RawListMentionsByUserParams>(
        params
    );

const toListTweetsParams = (params: ListTweetsParams): RawListTweetsParams =>
    _toRawTweetParams<ListTweetsParams, RawListTweetsParams>(params);

const toListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams =>
    _toRawTweetParams<ListTweetsByUserParams, RawListTweetsByUserParams>(
        params
    );

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _toRawParams = <TParams extends Record<string, any>, TRawParams>(
    params: TParams
): TRawParams => {
    const rawParams: Record<string, any> = {};
    const keyMap = _transformKeysToMap(Object.keys(params));

    Object.entries(keyMap).forEach(([original, transformedKey]) => {
        const value = params[original];
        let transformedValue: string | undefined = undefined;
        if (typeof value === "number" || typeof value === "string") {
            transformedValue = value.toString();
        }

        if (typeof value === "string" && value.includes(",")) {
            transformedValue = CoreUtils.trimCsv(value);
        }

        if (value instanceof Date) {
            transformedValue = value.toISOString();
        }

        if (Array.isArray(value)) {
            transformedValue = value.join();
        }

        if (transformedValue == null) {
            throw new Error(
                `Could not transform original value '${value}' from param key '${original}' - is this a supported param or type?`
            );
        }

        rawParams[transformedKey] = transformedValue;
    });

    return rawParams as TRawParams;
};

const _transformKeysToMap = (keys: string[]): Record<string, string> => {
    const keyMap: Record<string, string> = {};
    keys.filter((key) => !_unmappedKeys.includes(key as UnmappedKey)).forEach(
        (unmodified) => {
            if (Object.keys(_customMappedKeys).includes(unmodified)) {
                keyMap[unmodified] =
                    _customMappedKeys[unmodified as CustomMapKey];
                return;
            }

            const objectFieldsMatch = unmodified.match(/([a-z]+)(Fields)/);
            if (objectFieldsMatch != null) {
                keyMap[unmodified] = unmodified.replace("Fields", ".fields");
                return;
            }

            keyMap[unmodified] = unmodified;
            return;
        }
    );

    return keyMap;
};

const _toRawTweetParams = <
    TParams =
        | GetTweetParams
        | ListMentionsByUserParams
        | ListTweetsByUserParams
        | ListTweetsParams,
    TRawParams =
        | RawGetTweetParams
        | RawListMentionsByUserParams
        | RawListTweetsByUserParams
        | RawListTweetsParams
>(
    params: TParams
): TRawParams =>
    _toRawParams(
        ParamUtils.preprocessParamsForExpansions(
            params,
            _fieldToTweetExpansionMappings
        )
    ) as TRawParams;

const _toRawUserParams = <
    TParams = GetUserParams,
    TRawParams = RawGetUserParams
>(
    params: TParams
): TRawParams =>
    _toRawParams(
        ParamUtils.preprocessParamsForExpansions(
            params,
            _fieldToUserExpansionMappings
        )
    ) as TRawParams;

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

const ParamMapper = {
    toGetTweetParams,
    toGetUserParams,
    toListMentionsByUserParams,
    toListTweetsParams,
    toListTweetsByUserParams,
};

export { ParamMapper };

// #endregion Exports
