import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { ListTweetsParams } from "../../interfaces/params/list-tweets-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

// test("given pagination_token, returns next page of tweets", async () => {
//     // Arrange
//     const userId = USERID_BSCOTTORIGINALS;
//     const sut = setupSut();

//     const pageOne = await sut.listTweetsByUser({ userId });
//     const pagination_token = pageOne.meta?.next_token;

//     // Act
//     const result = await sut.listTweetsByUser({
//         userId,
//         pagination_token,
//     });

//     // Assert
//     expect(result.meta?.previous_token).toBeDefined();
// });

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
