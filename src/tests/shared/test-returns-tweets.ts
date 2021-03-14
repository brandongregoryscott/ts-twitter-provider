import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { ListTweetsParams } from "../../interfaces/params/list-tweets-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testReturnsTweets = <
    TParams =
        | ListTweetsByUserParams
        | ListMentionsByUserParams
        | ListTweetsParams
>(
    options: TestOptions<TParams>
) => {
    const { method, params } = options;
    const name = options.name ?? "returns tweets";
    test(name, async () => {
        // Arrange & Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testReturnsTweets };

// #endregion Exports
