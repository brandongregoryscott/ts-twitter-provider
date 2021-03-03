import { MediaFields } from "../../enums/media-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface MediaFieldsParams {
    mediaFields?: MediaFields[];
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
