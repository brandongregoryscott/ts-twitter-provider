import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { ListTweetsParams } from "../../interfaces/params/list-tweets-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPaginationTokenReturnsNextPageOfTweets = <
    TParams = ListTweetsByUserParams | ListMentionsByUserParams
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
