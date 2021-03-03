import { TweetExpansions } from "../enums/tweet-expansions";
import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/params/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/params/list-tweets-params";
import {
    MediaFieldsParams,
    RawMediaFieldsParams,
} from "../interfaces/params/media-fields-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "../interfaces/params/tweet-expansions-params";
import {
    RawTweetFieldsParams,
    TweetFieldsParams,
} from "../interfaces/params/tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const toListTweetsParams = (params: ListTweetsParams): RawListTweetsParams => {
    params = _preprocessInputParams(params);

    let transformedParams: Partial<RawListTweetsParams> = {};

    transformedParams.ids = Array.isArray(params.ids)
        ? params.ids.join()
        : _sanitizeCsvString(params.ids).join();

    transformedParams = {
        ...transformedParams,
        ..._mapTweetFields(params),
        ..._mapTweetExpansions(params),
        ..._mapMediaFields(params),
    };

    return transformedParams as RawListTweetsParams;
};

const toListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams => {
    params = _preprocessInputParams(params);

    let transformedParams: Partial<RawListTweetsByUserParams> = {};

    transformedParams = {
        ...transformedParams,
        ..._mapTweetFields(params),
        ..._mapTweetExpansions(params),
        ..._mapMediaFields(params),
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

const _mapMediaFields = <
    TParams extends MediaFieldsParams,
    TRawParams extends RawMediaFieldsParams
>(
    params: TParams
): TRawParams => {
    const transformedParams: Partial<TRawParams> = {};
    if (params.mediaFields != null && params.mediaFields.length > 0) {
        transformedParams["media.fields"] = params.mediaFields.join(",");
    }

    return transformedParams as TRawParams;
};

const _mapTweetExpansions = <
    TParams extends TweetExpansionsParams,
    TRawParams extends RawTweetExpansionsParams
>(
    params: TParams
): TRawParams => {
    const transformedParams: Partial<TRawParams> = {};
    if (params.expansions != null && params.expansions.length > 0) {
        transformedParams.expansions = params.expansions.join(",");
    }

    return transformedParams as TRawParams;
};

const _mapTweetFields = <
    TParams extends TweetFieldsParams,
    TRawParams extends RawTweetFieldsParams
>(
    params: TParams
): TRawParams => {
    const transformedParams: Partial<TRawParams> = {};
    if (params.fields != null && params.fields.length > 0) {
        transformedParams["tweet.fields"] = params.fields;
    }

    return transformedParams as TRawParams;
};

const _sanitizeCsvString = (input: string): string[] =>
    input.split(",").map((value: string) => value.trim());

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
