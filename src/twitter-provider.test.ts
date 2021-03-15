import { TwitterProvider } from "./twitter-provider";
import dotenv from "dotenv";
import { TweetFields } from "./enums/tweet-fields";
import { TweetExpansions } from "./enums/tweet-expansions";
import { MediaFields } from "./enums/media-fields";
import { PollFields } from "./enums/poll-fields";
import faker from "faker";
import { UserFields } from "./enums/user-fields";
import { PlaceFields } from "./enums/place-fields";
import { TweetTypes } from "./enums/tweet-types";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { TestOptions } from "./tests/interfaces/test-option";
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

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const USERID_BSCOTTORIGINALS = "953649053631434752";

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

        // Skipping these for now until there's an easier way to set up a test
        // testPollFieldsWithExpansionReturnsPollIds<ListMentionsByUserParams>({
        //     method: (sut) => sut.listMentionsByUser,
        //     params: {
        //         userId: "1205666185"
        //     },
        // });

        // testPollFieldsWithoutExpansionReturnsPollIds<ListMentionsByUserParams>({
        //     method: (sut) => sut.listMentionsByUser,
        //     params: {
        //         userId: "1205666185"
        //     },
        // });
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

        test.each([
            [PlaceFields.Country, PlaceFields.Name],
            `${PlaceFields.Country},${PlaceFields.Name}`,
        ])(
            `given placeFields %p and '${TweetExpansions.GeoPlaceId}', it returns tweets with those included fields`,
            async (placeFields) => {
                // Arrange
                const ids = ["1136048014974423040"];
                const sut = setupSut();

                // Act
                const result = await sut.listTweets({
                    ids,
                    expansions: [TweetExpansions.GeoPlaceId],
                    placeFields,
                });

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                expect(result.data[0].geo).toBeDefined();

                expect(result.includes?.places).toBeDefined();
                expect(result.includes?.places?.length).toBeGreaterThanOrEqual(
                    1
                );

                const place = result.includes?.places?.[0]!;
                expect(place.country).toBeDefined();
                expect(place.name).toBeDefined();
            }
        );

        test("given list of placeFields without specifying expansions, it returns tweets with those included fields", async () => {
            // Arrange
            const ids = ["1136048014974423040"];
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.GeoPlaceId
                placeFields: [PlaceFields.Country, PlaceFields.Name],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].geo).toBeDefined();

            expect(result.includes?.places).toBeDefined();
            expect(result.includes?.places?.length).toBeGreaterThanOrEqual(1);

            const place = result.includes?.places?.[0]!;
            expect(place.country).toBeDefined();
            expect(place.name).toBeDefined();
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

        test("given until_id, returns list of recent tweets up to that id", async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const until_id = "1366493658762084362";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({ userId, until_id });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            result.data.forEach((tweet) =>
                expect(Number(tweet.id)).toBeLessThanOrEqual(Number(until_id))
            );
        });

        test("given since_id, returns list of recent tweets after that id", async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const since_id = "1366493658762084362";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({ userId, since_id });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            result.data.forEach((tweet) =>
                expect(Number(tweet.id)).toBeGreaterThanOrEqual(
                    Number(since_id)
                )
            );
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

        test.each([
            [
                MediaFields.Height,
                MediaFields.MediaKey,
                MediaFields.Type,
                MediaFields.Width,
            ],
            [
                MediaFields.Height,
                MediaFields.MediaKey,
                MediaFields.Type,
                MediaFields.Width,
            ].join(),
        ])(
            `given mediaFields %p and '${TweetExpansions.AttachmentsMediaKeys}', it returns tweets with those media fields`,
            async (mediaFields) => {
                // Arrange
                const userId = USERID_BSCOTTORIGINALS;
                const sut = setupSut();

                // Act
                const result = await sut.listTweetsByUser({
                    userId,
                    expansions: [TweetExpansions.AttachmentsMediaKeys],
                    mediaFields,
                });

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                const tweet = result.data[0];

                expect(tweet.attachments).toBeDefined();
                expect(
                    tweet.attachments?.media_keys?.length
                ).toBeGreaterThanOrEqual(1);

                expect(result.includes).toBeDefined();
                expect(result.includes?.media?.length).toBeGreaterThanOrEqual(
                    1
                );

                const attachment = result.includes?.media?.[0]!;
                expect(attachment.media_key).toBeDefined();
                expect(attachment.type).toBeDefined();
                expect(attachment.width).toBeDefined();
                expect(attachment.height).toBeDefined();
            }
        );

        test("given list of mediaFields without specifying expansions, it returns tweets with those media fields", async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentMediaKeys
                mediaFields: [
                    MediaFields.Height,
                    MediaFields.MediaKey,
                    MediaFields.Type,
                    MediaFields.Width,
                ],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            const tweet = result.data[0];

            expect(tweet.attachments).toBeDefined();
            expect(
                tweet.attachments?.media_keys?.length
            ).toBeGreaterThanOrEqual(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.media?.length).toBeGreaterThanOrEqual(1);

            const attachment = result.includes?.media?.[0]!;
            expect(attachment.media_key).toBeDefined();
            expect(attachment.type).toBeDefined();
            expect(attachment.width).toBeDefined();
            expect(attachment.height).toBeDefined();
        });

        testUserFieldsWithExpansionReturnsUser<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        test(`given list of userFields without specifying expansions, it returns tweets with those included fields`, async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                expansions: [TweetExpansions.AuthorId],
                userFields: [UserFields.CreatedAt, UserFields.Verified],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].author_id).toBeDefined();

            expect(result.includes?.users).toBeDefined();
            expect(result.includes?.users?.length).toBeGreaterThanOrEqual(1);

            const user = result.includes?.users?.[0]!;
            expect(user.username).toBe("bscottoriginals");
            expect(user.created_at).toBeDefined();
            expect(user.verified).toBeDefined();
        });
    });

    // #endregion listTweetsByUser
});
