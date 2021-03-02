import {
    ListTweetsByUserParams,
    RawListTweetsByUserParams,
} from "../interfaces/tweets/list-tweets-by-user-params";
import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/tweets/list-tweets-params";
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

    transformedParams = { ...transformedParams, ..._mapTweetFields(params) };

    return transformedParams as RawListTweetsParams;
};

const mapListTweetsByUserParams = (
    params: ListTweetsByUserParams
): RawListTweetsByUserParams => {
    let transformedParams: Partial<RawListTweetsByUserParams> = {};

    transformedParams = { ...transformedParams, ..._mapTweetFields(params) };

    return transformedParams as RawListTweetsByUserParams;
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _mapTweetFields = <
    TInputParams extends TweetFieldsParams,
    TRawParams extends RawTweetFieldsParams
>(
    params: TInputParams
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
    mapListTweetsParams,
    mapListTweetsByUserParams,
};

export { ParamMapper };

// #endregion Exports
