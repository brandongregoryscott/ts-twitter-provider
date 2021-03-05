import { PlaceFields } from "../../enums/place-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface PlaceFieldsParams {
    placeFields?: PlaceFields[];
}

interface RawPlaceFieldsParams {
    "place.fields": string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { PlaceFieldsParams, RawPlaceFieldsParams };

// #endregion Exports
