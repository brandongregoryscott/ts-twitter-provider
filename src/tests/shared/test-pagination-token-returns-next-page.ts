import { PagingParams } from "../../interfaces/params/paging-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPaginationTokenReturnsNextPageOfTweets = <
    TParams extends PagingParams
>(
    options: TestOptions<TParams>
) => {
    const { method, params } = options;
    const name =
        options.name ?? "given pagination_token, returns next page of tweets";
    test(name, async () => {
        // Arrange
        const pageOne = await method(TestTwitterProvider)(params);
        const pagination_token = pageOne.meta?.next_token;
        const nextPageParams = Object.assign(params, { pagination_token });

        // Act
        const result = await method(TestTwitterProvider)(nextPageParams);

        // Assert
        expect(result.meta?.previous_token).toBeDefined();
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPaginationTokenReturnsNextPageOfTweets };

// #endregion Exports
