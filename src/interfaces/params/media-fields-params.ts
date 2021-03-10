import { MediaFields } from "../../enums/media-fields";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface MediaFieldsParams {
    mediaFields?: ArrayOrCsv<MediaFields>;
}

interface RawMediaFieldsParams {
    "media.fields": string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { MediaFieldsParams, RawMediaFieldsParams };

// #endregion Exports
