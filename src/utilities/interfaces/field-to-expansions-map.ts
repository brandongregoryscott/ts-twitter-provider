import { AnyExpansions } from "../types/any-expansions";
import { AnyFields } from "../types/any-fields";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

/** @hidden */
interface FieldToExpansionsMap<
    TFields = AnyFields,
    TExpansion = AnyExpansions
> {
    fields: TFields[];
    expansion: TExpansion;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { FieldToExpansionsMap };

// #endregion Exports
