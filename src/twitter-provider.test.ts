import { TweetFields } from "./enums/tweet-fields";
import { TweetTypes } from "./enums/tweet-types";
import { testReturnsTweets } from "./tests/shared/test-returns-tweets";
import { testEndTimeReturnsTweetsOnOrBeforeDate } from "./tests/shared/test-end-time-returns-tweets";
import { testStartTimeReturnsTweetsOnOrAfterDate } from "./tests/shared/test-start-time-returns-tweets";
import { testTweetExpansionsReturnsExpandedFields } from "./tests/shared/test-tweet-expansions-returns-expanded-fields";
import { testFieldsReturnsRequestedFields } from "./tests/shared/test-fields-returns-requested-fields";
import { testPaginationTokenReturnsNextPageOfTweets } from "./tests/shared/test-pagination-token-returns-next-page";
import { testMaxResultsReturnsUpToCount } from "./tests/shared/test-max-results-returns-up-to-count";
import { testUserFieldsWithExpansionReturnsUser } from "./tests/shared/test-user-fields-with-expansion-returns-user";
import { testUserFieldsWithoutExpansionReturnsUser } from "./tests/shared/test-user-fields-without-expansion-returns-user";
import { testUntilIdReturnsTweetsUpToId } from "./tests/shared/test-until-id-returns-tweets-up-to-id";
import { testSinceIdReturnsTweetsAfterId } from "./tests/shared/test-since-id-returns-tweets-after-id";
import { testPlaceFieldsWithExpansionReturnsPlace } from "./tests/shared/test-place-fields-with-expansion-returns-place";
import { testPlaceFieldsWithoutExpansionReturnsPlace } from "./tests/shared/test-place-fields-without-expansion-returns-place";
import { testMediaFieldsWithExpansionReturnsMedia } from "./tests/shared/test-media-fields-with-expansion-returns-media";
import { testMediaFieldsWithoutExpansionReturnsMedia } from "./tests/shared/test-media-fields-without-expansion-returns-media";
import { TestTwitterProvider } from "./tests/test-twitter-provider";
import { ListTweetsByUsernameParams } from "./interfaces/params/list-tweets-by-username-params";
import { TestUtils } from "./tests/test-utils";

/**
 * Writing integration tests for ease of development until the API is further fleshed out.
 * The suite expects API keys from a .env file
 */
describe("TwitterProvider", () => {
    // -----------------------------------------------------------------------------------------
    // #region listTweetsByUsername
    // -----------------------------------------------------------------------------------------

    describe("listTweetsByUsername", () => {
        test("when user does not exist, throws not found error", async () => {
            // Arrange
            const username = TestUtils.fakeUsername();

            // Act
            try {
                await TestTwitterProvider.listTweetsByUsername({ username });
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toContain("not found");
            }

            // Assert
            expect.assertions(2);
        });

        testReturnsTweets<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.twitterdev.username },
        });

        test.skip.each([
            [TweetTypes.Replies, TweetTypes.Retweets],
            `${TweetTypes.Replies},${TweetTypes.Retweets}`,
        ])(
            "given exclude %p, it returns tweets without those types",
            async (exclude) => {
                // Arrange
                const username = TestUtils.users.twitterdev.username;

                // Act
                const result = await TestTwitterProvider.listTweetsByUsername({
                    username,
                    // Despite requesting this field, it should always be undefined
                    fields: [TweetFields.ReferencedTweets],
                    exclude,
                });

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                result.data.forEach((tweet) =>
                    expect(tweet.referenced_tweets).toBeUndefined()
                );
            }
        );

        testUntilIdReturnsTweetsUpToId<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testSinceIdReturnsTweetsAfterId<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testMaxResultsReturnsUpToCount<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testFieldsReturnsRequestedFields<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testTweetExpansionsReturnsExpandedFields<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListTweetsByUsernameParams>(
            {
                method: (sut) => sut.listTweetsByUsername,
                params: { username: TestUtils.users.bscottoriginals.username },
            }
        );

        testUserFieldsWithExpansionReturnsUser<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: TestUtils.users.bscottoriginals.username },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                username: TestUtils.users.brandonscott.username,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListTweetsByUsernameParams>(
            {
                method: (sut) => sut.listTweetsByUsername,
                params: {
                    // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                    since_id: "1371977096273215400",
                    until_id: "1371977096273215500",
                    username: TestUtils.users.brandonscott.username,
                },
            }
        );
    });

    // #endregion listTweetsByUsername
});
