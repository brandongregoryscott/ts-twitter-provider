import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/tweets/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/tweets/list-tweets-params";
import {
    RawTweetExpansionsParams,
    TweetExpansionsParams,
} from "../interfaces/tweets/tweet-expansions-params";
import {
    RawTweetFieldsParams,
    TweetFieldsParams,
} from "../interfaces/tweets/tweet-fields-params";

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const mapListTweetsParams = (params: ListTweetsParams): RawListTweetsParams => {
    let transformedParams: Partial<RawListTweetsParams> = {};

    transformedParams.ids = Array.isArray(params.ids)
        ? params.ids.join()
        : _sanitizeCsvString(params.ids).join();

    transformedParams = {
        ...transformedParams,
        ..._mapTweetFields(params),
        ..._mapTweetExpansions(params),
    };

    return transformedParams as RawListTweetsParams;
};

const mapListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams => {
    let transformedParams: Partial<RawListTweetsByUserParams> = {};

    transformedParams = {
        ...transformedParams,
        ..._mapTweetFields(params),
        ..._mapTweetExpansions(params),
    };

    return transformedParams as RawListTweetsByUserParams;
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

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

const _sanitizeCsvString = (input: string): string[] =>
    input.split(",").map((value: string) => value.trim());

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

const ParamMapper = {
    mapListTweetsParams,
    mapListTweetsByUserParams,
};

export { ParamMapper };

// #endregion Exports
