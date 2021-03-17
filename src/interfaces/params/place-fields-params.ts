import { PlaceFields } from "../../enums/place-fields";
import { ArrayOrCsv } from "../../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface PlaceFieldsParams {
    placeFields?: ArrayOrCsv<PlaceFields>;
}

/** @hidden */
interface RawPlaceFieldsParams {
    "place.fields": string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { PlaceFieldsParams, RawPlaceFieldsParams };

// #endregion Exports
