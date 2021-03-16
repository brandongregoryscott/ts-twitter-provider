import { TweetExpansions } from "../../enums/tweet-expansions";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testExpansionsReturnsExpandedFields = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
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
