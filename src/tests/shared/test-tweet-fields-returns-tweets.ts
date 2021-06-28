import { TweetFields } from "../../enums/tweet-fields";
import { TweetFieldsParams } from "../../interfaces/params/tweet-fields-params";
import { User } from "../../interfaces/users/user";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testTweetFieldsReturnsFields = <TParams extends TweetFieldsParams>(
    options: Omit<TestOptions<TParams, User>, "name">
) => {
    const { method } = options;
    test.each([
        [TweetFields.Lang, TweetFields.AuthorId],
        `${TweetFields.Lang},${TweetFields.AuthorId}`,
    ])("given tweetFields %p, it returns tweets", async (tweetFields) => {
        // Arrange
        const params = Object.assign(options.params, { tweetFields });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);

        expect(result.includes?.tweets).toBeDefined();
        expect(result.includes?.tweets?.length).toBeGreaterThanOrEqual(1);

        const tweet = result.includes?.tweets?.[0]!;
        expect(tweet.lang).toBeDefined();
        expect(tweet.author_id).toBeDefined();
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testTweetFieldsReturnsFields };

// #endregion Exports
