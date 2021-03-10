import { TweetExpansions } from "../enums/tweet-expansions";
import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/params/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/params/list-tweets-params";
import { MediaFieldsParams } from "../interfaces/params/media-fields-params";
import { RawBaseParams, BaseParams } from "../interfaces/params/base-params";
import { TweetExpansionsParams } from "../interfaces/params/tweet-expansions-params";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _customMappedKeys: Record<CustomMapKey, CustomMapValue> = {
    fields: "tweet.fields",
};

const _unmappedKeys: Array<UnmappedKey> = ["userId"];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

type CustomMapKey = keyof Pick<BaseParams, "fields">;
type CustomMapValue = keyof Pick<RawBaseParams, "tweet.fields">;
type UnmappedKey = keyof Pick<ListTweetsByUserParams, "userId">;

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const toListTweetsParams = (params: ListTweetsParams): RawListTweetsParams => {
    params = _preprocessInputParams(params);

    const transformedParams: Partial<RawListTweetsParams> = {
        ..._transformAndMapKeys(params),
    };

    return transformedParams as RawListTweetsParams;
};

const toListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams => {
    params = _preprocessInputParams(params);

    const transformedParams: Partial<RawListTweetsByUserParams> = {
        ..._transformAndMapKeys(params),
    };
    return transformedParams as RawListTweetsByUserParams;
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

/**
 * Preprocessing to prevent common mistakes such as requesting media fields without expanding attachments
 */
const _preprocessInputParams = <
    TParams extends MediaFieldsParams & TweetExpansionsParams
>(
    params: TParams
): TParams => {
    let processed: TParams = { ...params };
    const { expansions, mediaFields } = params;

    const requestingMediaFields = mediaFields != null && mediaFields.length > 0;
    const missingAttachmentExpansion =
        expansions == null ||
        !expansions.includes(TweetExpansions.AttachmentsMediaKeys);

    if (requestingMediaFields && missingAttachmentExpansion) {
        processed = {
            ...processed,
            expansions: [
                ...(expansions ?? []),
                TweetExpansions.AttachmentsMediaKeys,
            ],
        };
    }

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
    toListTweetsParams,
    toListTweetsByUserParams,
};

export { ParamMapper };

// #endregion Exports
