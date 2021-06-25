import { TweetFields } from "../enums/tweet-fields";
import { UserExpansions } from "../enums/user-expansions";
import {
    GetUserByUsernameParams,
    RawGetUserByUsernameParams,
} from "../interfaces/params/get-user-by-username-params";
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

/** @hidden */
const UserParamMapper = {
    toGetUserByUsernameParams(
        params: GetUserByUsernameParams
    ): RawGetUserByUsernameParams {
        const preprocessedParams = ParamUtils.preprocessForExpansions(
            params,
            _fieldToExpansionMappings
        );

        return ParamUtils.toRawParams(preprocessedParams);
    },
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
