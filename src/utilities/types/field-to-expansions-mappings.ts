import { FieldToExpansionsMap } from "../interfaces/field-to-expansions-map";
import { AnyExpansions } from "./any-expansions";
import { AnyFields } from "./any-fields";

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

/** @hidden */
type FieldToExpansionsMappings<
    TFields = AnyFields,
    TExpansions = AnyExpansions
> = FieldToExpansionsMap<TFields, TExpansions>[];

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { FieldToExpansionsMappings };

// #endregion Exports
