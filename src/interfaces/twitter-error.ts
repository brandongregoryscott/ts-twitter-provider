// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

/**
 * Represents an error object returned from the Twitter API
 *
 * @example
 * {
 *    value: '12345',
 *    detail: 'Could not find tweet with id: [12345].',
 *    title: 'Not Found Error',
 *    resource_type: 'tweet',
 *    parameter: 'id',
 *    resource_id: '12345',
 *    type: 'https://api.twitter.com/2/problems/resource-not-found'
 *  }
 */
interface TwitterError {
    detail: string;
    parameter: string;
    resource_id: string;
    resource_type: string;
    title: string;
    type: string;
    value: string;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TwitterError };

// #endregion Exports
