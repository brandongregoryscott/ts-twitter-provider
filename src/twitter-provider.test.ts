import { TwitterProvider } from "./twitter-provider";
import dotenv from "dotenv";
import { TweetFields } from "./enums/tweet-fields";
import { TweetExpansions } from "./enums/tweet-expansions";
import { MediaFields } from "./enums/media-fields";
import { PlaceFields } from "./enums/place-fields";
import { TweetTypes } from "./enums/tweet-types";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { testReturnsTweets } from "./tests/shared/test-returns-tweets";
import { testEndTimeReturnsTweetsOnOrBeforeDate } from "./tests/shared/test-end-time-returns-tweets";
import { testStartTimeReturnsTweetsOnOrAfterDate } from "./tests/shared/test-start-time-returns-tweets";
import { testExpansionsReturnsExpandedFields } from "./tests/shared/test-expansions-returns-expanded-fields";
import { testFieldsReturnsRequestedFields } from "./tests/shared/test-fields-returns-requested-fields";
import { testPaginationTokenReturnsNextPageOfTweets } from "./tests/shared/test-pagination-token-returns-next-page";
import { testPollFieldsWithExpansionReturnsPollIds } from "./tests/shared/test-poll-fields-with-expansion-returns-poll-ids";
import { testPollFieldsWithoutExpansionReturnsPollIds } from "./tests/shared/test-poll-fields-without-expansion-returns-poll-ids";
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
import { PollFields } from "./enums/poll-fields";
import { UserFields } from "./enums/user-fields";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const USERID_BSCOTTORIGINALS = "953649053631434752";
const USERID_BRANDONSCOTT = "730217167195648000";

// #endregion Constants

/**
 * Writing integration tests for ease of development until the API is further fleshed out.
 * The suite expects API keys from a .env file
 */
describe("TwitterProvider", () => {
    // -----------------------------------------------------------------------------------------
    // #region Setup
    // -----------------------------------------------------------------------------------------

    // Load API keys from .env
    dotenv.config();

    const setupSut = () =>
        new TwitterProvider({
            consumer_key: process.env.CONSUMER_KEY!,
            consumer_secret: process.env.CONSUMER_SECRET!,
        });

    // #endregion Setup

    // -----------------------------------------------------------------------------------------
    // #region getTweet
    // -----------------------------------------------------------------------------------------

    describe.only("getTweet", () => {
        test("when tweet exists, returns tweet", async () => {
            // Arrange & Act
            const id = "1371978365557690371";
            const result = await TestTwitterProvider.getTweet({
                id,
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.id).toBe(id);
        });

        test("when tweet does not exist, returns undefined with errors", async () => {
            // Arrange & Act
            const id = "12345";
            const result = await TestTwitterProvider.getTweet({
                id,
            });

            // Assert
            expect(result.data).toBeUndefined();
            expect(result.errors?.length).toBeGreaterThanOrEqual(1);
        });

        test(`given list of pollFields and '${TweetExpansions.AttachmentsPollIds}', returns tweet with poll_ids`, async () => {
            // Arrange
            const id = "1371788005279682560";

            // Act
            const result = await TestTwitterProvider.getTweet({
                id,
                expansions: [TweetExpansions.AttachmentsPollIds],
                pollFields: [PollFields.VotingStatus],
            });

            // Assert
            expect(result.data).toBeDefined();

            const tweet = result.data!;
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.poll_ids).toHaveLength(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.polls?.length).toBeGreaterThanOrEqual(1);

            const poll = result.includes?.polls?.[0]!;
            expect(poll.id).toBeDefined();
            expect(poll.options.length).toBeGreaterThanOrEqual(1);
            expect(poll.voting_status).toMatch(/closed|open/);
        });

        test("given pollFields without specifying expansions, returns tweets with poll_ids", async () => {
            // Arrange
            const id = "1371788005279682560";

            // Act
            const result = await TestTwitterProvider.getTweet({
                id,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentsPollIds
                pollFields: [PollFields.VotingStatus],
            });

            // Assert
            expect(result.data).toBeDefined();

            const tweet = result.data!;
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.poll_ids).toHaveLength(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.polls?.length).toBeGreaterThanOrEqual(1);

            const poll = result.includes?.polls?.[0]!;
            expect(poll.id).toBeDefined();
            expect(poll.options.length).toBeGreaterThanOrEqual(1);
            expect(poll.voting_status).toMatch(/closed|open/);
        });

        test.each([
            [UserFields.CreatedAt, UserFields.Verified],
            `${UserFields.CreatedAt},${UserFields.Verified}`,
        ])(
            `given userFields %p and '${TweetExpansions.AuthorId}', it returns user`,
            async (userFields) => {
                // Arrange
                const id = "1371788005279682560";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    expansions: [TweetExpansions.AuthorId],
                    userFields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const tweet = result.data!;

                expect(tweet.author_id).toBeDefined();

                expect(result.includes?.users).toBeDefined();
                expect(result.includes?.users?.length).toBeGreaterThanOrEqual(
                    1
                );

                const user = result.includes?.users?.[0]!;
                expect(user.username).toBeDefined();
                expect(user.created_at).toBeDefined();
                expect(user.verified).toBeDefined();
            }
        );

        test.each([
            [UserFields.CreatedAt, UserFields.Verified],
            `${UserFields.CreatedAt},${UserFields.Verified}`,
        ])(
            `given userFields %p without specifying expansions, it returns user`,
            async (userFields) => {
                const id = "1371788005279682560";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    expansions: [], // <-- Intentionally not sending through TweetExpansions.AuthorId
                    userFields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const tweet = result.data!;

                expect(tweet.author_id).toBeDefined();

                expect(result.includes?.users).toBeDefined();
                expect(result.includes?.users?.length).toBeGreaterThanOrEqual(
                    1
                );

                const user = result.includes?.users?.[0]!;
                expect(user.username).toBeDefined();
                expect(user.created_at).toBeDefined();
                expect(user.verified).toBeDefined();
            }
        );
    });

    // #endregion getTweet

    // -----------------------------------------------------------------------------------------
    // #region listMentionsByUser
    // -----------------------------------------------------------------------------------------

    describe("listMentionsByUser", () => {
        testReturnsTweets<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testExpansionsReturnsExpandedFields<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testFieldsReturnsRequestedFields<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testMaxResultsReturnsUpToCount<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testUserFieldsWithExpansionReturnsUser<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testUntilIdReturnsTweetsUpToId<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testSinceIdReturnsTweetsAfterId<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: "63046977" },
        });

        testPollFieldsWithExpansionReturnsPollIds<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371788005279682560
                since_id: "1371788005279682500",
                until_id: "1371788005279682600",
                userId: USERID_BSCOTTORIGINALS,
            },
        });

        testPollFieldsWithoutExpansionReturnsPollIds<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371788005279682560
                since_id: "1371788005279682500",
                until_id: "1371788005279682600",
                userId: USERID_BSCOTTORIGINALS,
            },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                userId: USERID_BSCOTTORIGINALS,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                userId: USERID_BSCOTTORIGINALS,
            },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371978365557690371
                since_id: "1371978365557690300",
                until_id: "1371978365557690400",
                userId: USERID_BSCOTTORIGINALS,
            },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371978365557690371
                since_id: "1371978365557690300",
                until_id: "1371978365557690400",
                userId: USERID_BSCOTTORIGINALS,
            },
        });
    });

    // #endregion listMentionsByUser

    // -----------------------------------------------------------------------------------------
    // #region listTweets
    // -----------------------------------------------------------------------------------------

    describe("listTweets", () => {
        testReturnsTweets<ListTweetsParams>({
            name: "given a valid id, it returns a tweet",
            method: (sut) => sut.listTweets,
            params: { ids: "1326691582758760450" },
        });

        testReturnsTweets<ListTweetsParams>({
            name: "given comma separated ids, it returns tweets",
            method: (sut) => sut.listTweets,
            params: { ids: "1326691582758760450,1327657800667947008" },
        });

        testReturnsTweets<ListTweetsParams>({
            name: "given array of ids, it returns tweets",
            method: (sut) => sut.listTweets,
            params: { ids: ["1326691582758760450", "1327657800667947008"] },
        });

        testFieldsReturnsRequestedFields<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1141796911684476929" },
        });

        testExpansionsReturnsExpandedFields<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1141796911684476929" },
        });

        testPollFieldsWithExpansionReturnsPollIds<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1342161609909800963" },
        });

        testPollFieldsWithoutExpansionReturnsPollIds<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1342161609909800963" },
        });

        testUserFieldsWithExpansionReturnsUser<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1342161609909800963" },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1342161609909800963" },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1136048014974423040" },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1136048014974423040" },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1050508671938125830" },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListTweetsParams>({
            method: (sut) => sut.listTweets,
            params: { ids: "1050508671938125830" },
        });
    });

    // #endregion listTweets

    // -----------------------------------------------------------------------------------------
    // #region listTweetsByUser
    // -----------------------------------------------------------------------------------------

    describe("listTweetsByUser", () => {
        testReturnsTweets<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: "63046977" },
        });

        test.skip.each([
            [TweetTypes.Replies, TweetTypes.Retweets],
            `${TweetTypes.Replies},${TweetTypes.Retweets}`,
        ])(
            "given exclude %p, it returns tweets without those types",
            async (exclude) => {
                // Arrange
                const userId = "326756275";
                const sut = setupSut();

                // Act
                const result = await sut.listTweetsByUser({
                    userId,
                    // Despite requesting this field, it should always be undefined
                    fields: [TweetFields.ReferencedTweets],
                    exclude,
                });

                // Assert
                console.log(result);
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                result.data.forEach((tweet) =>
                    expect(tweet.referenced_tweets).toBeUndefined()
                );
            }
        );

        testUntilIdReturnsTweetsUpToId<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testSinceIdReturnsTweetsAfterId<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testMaxResultsReturnsUpToCount<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testFieldsReturnsRequestedFields<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testExpansionsReturnsExpandedFields<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListTweetsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListTweetsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testUserFieldsWithExpansionReturnsUser<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                userId: USERID_BRANDONSCOTT,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                userId: USERID_BRANDONSCOTT,
            },
        });
    });

    // #endregion listTweetsByUser
});
