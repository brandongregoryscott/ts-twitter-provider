import {
    ListTweetsParams,
    RawListTweetsParams,
} from "../interfaces/tweets/list-tweets-params";

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const mapListTweetParams = (params: ListTweetsParams): RawListTweetsParams => {
    const transformedParams: Partial<RawListTweetsParams> = {};

    transformedParams.ids = Array.isArray(params.ids)
        ? params.ids.join()
        : _sanitizeCsvString(params.ids).join();

    if (params.fields != null && params.fields.length > 0) {
        transformedParams["tweet.fields"] = params.fields;
    }

    return transformedParams as RawListTweetsParams;
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _sanitizeCsvString = (input: string): string[] =>
    input.split(",").map((value: string) => value.trim());

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

const ParamMapper = {
    mapListTweetParams,
};

export { ParamMapper };

// #endregion Exports
