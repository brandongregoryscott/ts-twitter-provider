import { TweetExpansions } from "../../enums/tweet-expansions";
import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testExpansionsReturnsExpandedFields = <
    TParams = ListTweetsByUserParams | ListMentionsByUserParams
>(
    options: TestOptions<TParams>
) =>
    test.each([
        [TweetExpansions.AttachmentsMediaKeys, TweetExpansions.AuthorId],
        `${TweetExpansions.AttachmentsMediaKeys},${TweetExpansions.AuthorId}`,
    ])(
        "given expansions %p, it returns tweets with those expanded fields",
        async (expansions) => {
            // Arrange
            const { method } = options;
            const params = Object.assign(options.params, { expansions });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const tweet = result.data[0];
            expect(tweet.author_id).toBeDefined();
        }
    );

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testExpansionsReturnsExpandedFields };

// #endregion Exports
