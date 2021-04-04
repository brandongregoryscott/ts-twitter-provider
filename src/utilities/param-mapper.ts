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

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _customMappedKeys: Record<CustomMapKey, CustomMapValue> = {
    fields: "tweet.fields",
};

const _fieldToExpansionMappings: Array<FieldToExpansionMap> = [
    {
        expansion: TweetExpansions.AttachmentsMediaKeys,
        requestedFields: Object.values(MediaFields),
    },
    {
        expansion: TweetExpansions.AuthorId,
        requestedFields: Object.values(UserFields),
    },
    {
        expansion: TweetExpansions.GeoPlaceId,
        requestedFields: Object.values(PlaceFields),
    },
    {
        expansion: TweetExpansions.AttachmentsPollIds,
        requestedFields: Object.values(PollFields),
    },
];

const _unmappedKeys: Array<UnmappedKey> = ["id", "userId"];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

type CustomMapKey = keyof Pick<BaseParams, "fields">;
type CustomMapValue = keyof Pick<RawBaseParams, "tweet.fields">;
type FieldToExpansionMap = {
    requestedFields: MediaFields[] | PlaceFields[] | PollFields[] | any[];
    expansion: TweetExpansions;
};
type UnmappedKey =
    | keyof Pick<GetTweetParams, "id">
    | keyof Pick<ListTweetsByUserParams, "userId">;

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const toGetTweetParams = (params: GetTweetParams): RawGetTweetParams =>
    _toRawParams<GetTweetParams, RawGetTweetParams>(params);

const toGetUserParams = (params: GetUserParams): RawGetUserParams =>
    _toRawParams<GetUserParams, RawGetUserParams>(params);

const toListMentionsByUserParams = (
    params: ListMentionsByUserParams
): RawListMentionsByUserParams =>
    _toRawParams<ListMentionsByUserParams, RawListMentionsByUserParams>(params);

const toListTweetsParams = (params: ListTweetsParams): RawListTweetsParams =>
    _toRawParams<ListTweetsParams, RawListTweetsParams>(params);

const toListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams =>
    _toRawParams<ListTweetsByUserParams, RawListTweetsByUserParams>(params);

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _arrayOrCsvToArray = <T extends string>(value?: ArrayOrCsv<T>): T[] => {
    if (Array.isArray(value)) {
        return value;
    }

    if (value != null && value.length > 0) {
        return _sanitizeCsv(value).split(",") as T[];
    }

    return [];
};

/**
 * Preprocessing to prevent common mistakes such as requesting media fields without expanding attachments
 */
const _preprocessInputParams = <TParams extends BaseParams>(
    params: TParams
): TParams => {
    let processed: TParams = { ...params };
    let expansions = _arrayOrCsvToArray(params.expansions);

    const keys = Object.keys(params).filter((key) => key.endsWith("Fields"));
    const values = keys
        .map((key) => _arrayOrCsvToArray((params as any)[key]))
        .flat();

    _fieldToExpansionMappings.forEach((map) => {
        const { requestedFields, expansion } = map;
        if (!values.some((field) => requestedFields.includes(field))) {
            return;
        }

        if (expansions.includes(expansion)) {
            return;
        }

        processed = {
            ...processed,
            expansions: [...expansions, expansion],
        };
    });

    return processed;
};

const _transformAndMapKeys = <TParams extends Record<string, any>, TRawParams>(
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
            transformedValue = _sanitizeCsv(value);
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

const _toRawParams = <TParams, TRawParams>(params: TParams): TRawParams =>
    _transformAndMapKeys(_preprocessInputParams(params)) as TRawParams;

const _sanitizeCsv = (input: string): string =>
    input
        .split(",")
        .map((value: string) => value.trim())
        .join();

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
