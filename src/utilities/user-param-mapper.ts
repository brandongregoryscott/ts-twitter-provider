import { TweetFields } from "../enums/tweet-fields";
import { UserExpansions } from "../enums/user-expansions";
import {
    GetUserParams,
    RawGetUserParams,
} from "../interfaces/params/get-user-params";
import { ParamUtils } from "./param-utils";
import { FieldToExpansionsMappings } from "./types/field-to-expansions-mappings";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _fieldToExpansionMappings: FieldToExpansionsMappings = [
    {
        expansion: UserExpansions.PinnedTweetId,
        fields: Object.values(TweetFields),
    },
];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const UserParamMapper = {
    toGetUserParams(params: GetUserParams): RawGetUserParams {
        const preprocessedParams = ParamUtils.preprocessForExpansions(
            params,
            _fieldToExpansionMappings
        );
        return ParamUtils.toRawParams(preprocessedParams);
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserParamMapper };

// #endregion Exports
