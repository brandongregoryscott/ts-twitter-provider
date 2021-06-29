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
import {
    ListUsersByUsernameParams,
    RawListUsersByUsernameParams,
} from "../interfaces/params/list-users-by-username";
import { UserExpansionsParams } from "../interfaces/params/user-expansion-params";
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
    toGetUserByUsernameParams: (
        params: GetUserByUsernameParams
    ): RawGetUserByUsernameParams => _toRawParams(params),
    toGetUserParams: (params: GetUserParams): RawGetUserParams =>
        _toRawParams(params),
    toListUsersByUsernameParams: (
        params: ListUsersByUsernameParams
    ): RawListUsersByUsernameParams => _toRawParams(params),
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _toRawParams = <TParams, TRawParams>(params: TParams): TRawParams =>
    ParamUtils.toRawParams(_preprocessForExpansions(params));

const _preprocessForExpansions = <TParams extends UserExpansionsParams>(
    params: TParams
): TParams =>
    ParamUtils.preprocessForExpansions(params, _fieldToExpansionMappings);

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserParamMapper };

// #endregion Exports
