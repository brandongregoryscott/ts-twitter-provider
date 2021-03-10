import { UserFields } from "../../enums/user-fields";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface UserFieldsParams {
    userFields?: ArrayOrCsv<UserFields>;
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
