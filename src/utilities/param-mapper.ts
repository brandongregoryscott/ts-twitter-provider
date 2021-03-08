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
import { RawBaseParams, BaseParams } from "../interfaces/params/base-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "../interfaces/params/tweet-expansions-params";
import {
    RawTweetFieldsParams,
    TweetFieldsParams,
} from "../interfaces/params/tweet-fields-params";
import {
    PollFieldsParams,
    RawPollFieldsParams,
} from "../interfaces/params/poll-fields-params";
import {
    RawUserFieldsParams,
    UserFieldsParams,
} from "../interfaces/params/user-fields-params";
import {
    PlaceFieldsParams,
    RawPlaceFieldsParams,
} from "../interfaces/params/place-fields-params";
import {
    ExcludeParams,
    RawExcludeParams,
} from "../interfaces/params/exclude-params";

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
        ..._mapSharedFields(params),
    };

    return transformedParams as RawListTweetsParams;
};

const toListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams => {
    params = _preprocessInputParams(params);

    const transformedParams: Partial<RawListTweetsByUserParams> = {
        ..._mapSharedFields(params),
        ..._mapArrayToCsv<ExcludeParams, RawExcludeParams>(params, "exclude"),
    };

    if (params.until_id != null) {
        transformedParams.until_id = params.until_id;
    }

    if (params.since_id != null) {
        transformedParams.since_id = params.since_id;
    }

    if (params.start_time != null) {
        transformedParams.start_time =
            params.start_time instanceof Date
                ? params.start_time.toISOString()
                : params.start_time;
    }

    if (params.end_time != null) {
        transformedParams.end_time =
            params.end_time instanceof Date
                ? params.end_time.toISOString()
                : params.end_time;
    }

    if (params.max_results != null) {
        transformedParams.max_results = params.max_results.toString();
    }

    if (params.pagination_token != null) {
        transformedParams.pagination_token = params.pagination_token.toString();
    }

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

const _mapSharedFields = (params: BaseParams): RawBaseParams => {
    const transformedParams: RawBaseParams = {
        ..._mapArrayToCsv<TweetFieldsParams, RawTweetFieldsParams>(
            params,
            "fields",
            "tweet.fields"
        ),
        ..._mapArrayToCsv<TweetExpansionsParams, RawTweetExpansionsParams>(
            params,
            "expansions"
        ),
        ..._mapArrayToCsv<MediaFieldsParams, RawMediaFieldsParams>(
            params,
            "mediaFields",
            "media.fields"
        ),
        ..._mapArrayToCsv<PollFieldsParams, RawPollFieldsParams>(
            params,
            "pollFields",
            "poll.fields"
        ),
        ..._mapArrayToCsv<UserFieldsParams, RawUserFieldsParams>(
            params,
            "userFields",
            "user.fields"
        ),
        ..._mapArrayToCsv<PlaceFieldsParams, RawPlaceFieldsParams>(
            params,
            "placeFields",
            "place.fields"
        ),
    };

    return transformedParams;
};

const _mapArrayToCsv = <TParams, TRawParams>(
    params: TParams,
    key: keyof TParams,
    rawKey?: keyof TRawParams
): TRawParams => {
    const transformedParams: Partial<TRawParams> = {};
    if (rawKey == null) {
        rawKey = key as any;
    }

    const values = (params[key] as any) as any[];
    const hasValues = values != null && values.length > 0;

    if (hasValues) {
        (transformedParams[rawKey!] as any) = values.join(",");
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
