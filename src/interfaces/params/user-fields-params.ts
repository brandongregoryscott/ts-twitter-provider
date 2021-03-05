import { UserFields } from "../../enums/user-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface UserFieldsParams {
    userFields?: UserFields[];
}

interface RawUserFieldsParams {
    "user.fields": string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { UserFieldsParams, RawUserFieldsParams };

// #endregion Exports
