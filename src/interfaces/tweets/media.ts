// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface Media {
    media_key: string;
    type: string;

    // Additional fields
    duration_ms?: number;
    height?: number;
    preview_image_url?: string;
    url?: string;
    width?: number;
    public_metrics?: object;
    non_public_metrics?: object;
    organic_metrics?: object;
    promoted_metrics?: object;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { Media };

// #endregion Exports
