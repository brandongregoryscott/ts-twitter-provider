// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Place {
    id: string;
    full_name: string;

    // Additional fields
    contained_within?: any[];
    country?: string;
    country_code?: string;
    geo?: object;
    name?: string;
    place_type?: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Place };

// #endregion Exports
