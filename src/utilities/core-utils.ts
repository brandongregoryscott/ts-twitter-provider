import { ArrayOrCsv } from "../types/array-or-csv";

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const CoreUtils = {
    /**
     * Converts a nullable csv string or array to an array of type T.
     */
    arrayOrCsvToArray<T>(value?: ArrayOrCsv<T>): T[] {
        if (Array.isArray(value)) {
            return value;
        }

        if (value != null && value.length > 0) {
            return (this.trimCsv(value).split(",") as any) as T[];
        }

        return [];
    },

    /**
     * Splits a csv and trims each value, returning a sanitized string
     */
    trimCsv: (input: string): string =>
        input
            .split(",")
            .map((value: string) => value.trim())
            .join(),
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { CoreUtils };

// #endregion Exports
