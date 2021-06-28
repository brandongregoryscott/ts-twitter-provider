import { TweetExpansions } from "../../enums/tweet-expansions";
import { UserExpansions } from "../../enums/user-expansions";
import { BaseParams } from "../../interfaces/params/base-params";
import { UserExpansionsParams } from "../../interfaces/params/user-expansion-params";
import { User } from "../../interfaces/users/user";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testUserExpansionsReturnsExpandedFields = <
    TParams extends UserExpansionsParams
>(
    options: Omit<TestOptions<TParams, User>, "name">
) =>
    test.each([[UserExpansions.PinnedTweetId], UserExpansions.PinnedTweetId])(
        "given expansions %p, it returns users with those expanded fields",
        async (expansions) => {
            // Arrange
            const { method } = options;
            const params = Object.assign(options.params, { expansions });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const user = result.data[0];
            expect(user.pinned_tweet_id).toBeDefined();
        }
    );

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testUserExpansionsReturnsExpandedFields };

// #endregion Exports
