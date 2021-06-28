import { TweetFields } from "./enums/tweet-fields";
import { TweetExpansions } from "./enums/tweet-expansions";
import { PlaceFields } from "./enums/place-fields";
import { TweetTypes } from "./enums/tweet-types";
import { ListTweetsByUserParams } from "./interfaces/params/list-tweets-by-user-params";
import { ListMentionsByUserParams } from "./interfaces/params/list-mentions-by-user-params";
import { ListTweetsParams } from "./interfaces/params/list-tweets-params";
import { testReturnsTweets } from "./tests/shared/test-returns-tweets";
import { testEndTimeReturnsTweetsOnOrBeforeDate } from "./tests/shared/test-end-time-returns-tweets";
import { testStartTimeReturnsTweetsOnOrAfterDate } from "./tests/shared/test-start-time-returns-tweets";
import { testTweetExpansionsReturnsExpandedFields } from "./tests/shared/test-tweet-expansions-returns-expanded-fields";
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
import { ALL_MEDIA_FIELDS } from "./tests/constants/media-fields";
import { UserExpansions } from "./enums/user-expansions";
import faker from "faker";
import { ListTweetsByUsernameParams } from "./interfaces/params/list-tweets-by-username-params";
import { testReturnsUsers } from "./tests/shared/test-returns-users";
import { ListUsersByUsernameParams } from "./interfaces/params/list-users-by-username";
import { testUserExpansionsReturnsExpandedFields } from "./tests/shared/test-user-expansions-returns-expanded-fields";
import { testUserFieldsReturnsFields } from "./tests/shared/test-user-fields-returns-fields";
import { testTweetFieldsReturnsFields } from "./tests/shared/test-tweet-fields-returns-tweets";

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const USERID_BRANDONSCOTT = "730217167195648000";
const USERID_BSCOTTORIGINALS = "953649053631434752";
const USERID_TWITTERDEV = "2244994945";
const USERNAME_BRANDONSCOTT = "soakthroughyou";
const USERNAME_BSCOTTORIGINALS = "bscottoriginals";
const USERNAME_TWITTERDEV = "twitterdev";

// #endregion Constants

/**
 * Writing integration tests for ease of development until the API is further fleshed out.
 * The suite expects API keys from a .env file
 */
describe("TwitterProvider", () => {
    // -----------------------------------------------------------------------------------------
    // #region Setup
    // -----------------------------------------------------------------------------------------

    /** Twitter API expects usernames to match ^[A-Za-z0-9_]{1,15}$ */
    const fakeUsername = (): string =>
        `${faker.random.uuid()}`.slice(0, 14).replace(/-/g, "_");

    // #endregion Setup

    // -----------------------------------------------------------------------------------------
    // #region getTweet
    // -----------------------------------------------------------------------------------------

    describe("getTweet", () => {
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

        test("given pollFields without specifying expansions, returns tweet with poll_ids", async () => {
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
            `given userFields %p and '${TweetExpansions.AuthorId}', returns user`,
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
            `given userFields %p without specifying expansions, returns user`,
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

        test.each([
            [PlaceFields.Country, PlaceFields.Name],
            `${PlaceFields.Country},${PlaceFields.Name}`,
        ])(
            `given placeFields %p and '${TweetExpansions.GeoPlaceId}', returns place`,
            async (placeFields) => {
                // Arrange
                const id = "1136048014974423040";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    expansions: [TweetExpansions.GeoPlaceId],
                    placeFields,
                });

                // Assert
                expect(result.data).toBeDefined();
                expect(result.data!.geo).toBeDefined();

                expect(result.includes?.places).toBeDefined();
                expect(result.includes?.places?.length).toBeGreaterThanOrEqual(
                    1
                );

                const place = result.includes?.places?.[0]!;
                expect(place.country).toBeDefined();
                expect(place.name).toBeDefined();
            }
        );

        test(`given placeFields without specifying expansion, returns place`, async () => {
            // Arrange
            const id = "1136048014974423040";

            // Act
            const result = await TestTwitterProvider.getTweet({
                id,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.GeoPlaceId
                placeFields: [PlaceFields.Country, PlaceFields.Name],
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.geo).toBeDefined();

            expect(result.includes?.places).toBeDefined();
            expect(result.includes?.places?.length).toBeGreaterThanOrEqual(1);

            const place = result.includes?.places?.[0]!;
            expect(place.country).toBeDefined();
            expect(place.name).toBeDefined();
        });

        test.each([
            [TweetExpansions.AttachmentsMediaKeys, TweetExpansions.AuthorId],
            `${TweetExpansions.AttachmentsMediaKeys},${TweetExpansions.AuthorId}`,
        ])(
            "given expansions %p, returns tweet with those expanded fields",
            async (expansions) => {
                // Arrange
                const id = "1136048014974423040";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    expansions,
                });

                // Assert
                const tweet = result.data;
                expect(tweet).toBeDefined();
                expect(tweet!.author_id).toBeDefined();
            }
        );

        test.each([ALL_MEDIA_FIELDS, ALL_MEDIA_FIELDS.join()])(
            `given mediaFields %p and '${TweetExpansions.AttachmentsMediaKeys}', returns media`,
            async (mediaFields) => {
                // Arrange
                const id = "1371978365557690371";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    expansions: [TweetExpansions.AttachmentsMediaKeys],
                    mediaFields,
                });

                // Assert
                const tweet = result.data;
                expect(tweet).toBeDefined();

                expect(tweet!.attachments).toBeDefined();
                expect(
                    tweet!.attachments?.media_keys?.length
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

        test("given mediaFields without specifying expansions, returns media", async () => {
            // Arrange
            const id = "1371978365557690371";

            // Act
            const result = await TestTwitterProvider.getTweet({
                id,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentMediaKeys
                mediaFields: ALL_MEDIA_FIELDS,
            });

            // Assert
            const tweet = result.data;
            expect(tweet).toBeDefined();

            expect(tweet!.attachments).toBeDefined();
            expect(
                tweet!.attachments?.media_keys?.length
            ).toBeGreaterThanOrEqual(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.media?.length).toBeGreaterThanOrEqual(1);

            const attachment = result.includes?.media?.[0]!;
            expect(attachment.media_key).toBeDefined();
            expect(attachment.type).toBeDefined();
            expect(attachment.width).toBeDefined();
            expect(attachment.height).toBeDefined();
        });

        test.each([
            [TweetFields.Lang, TweetFields.Id],
            `${TweetFields.Lang},${TweetFields.Id}`,
        ])(
            "given fields %p, returns tweet with those included fields",
            async (fields) => {
                // Arrange
                const id = "1371978365557690371";

                // Act
                const result = await TestTwitterProvider.getTweet({
                    id,
                    fields,
                });

                // Assert
                expect(result.data).toBeDefined();
                expect(result.data?.lang).toBeDefined();
            }
        );
    });

    // #endregion getTweet

    // -----------------------------------------------------------------------------------------
    // #region getUserByUsername
    // -----------------------------------------------------------------------------------------

    describe("getUserByUsername", () => {
        test("given user exists, returns user", async () => {
            // Arrange & Act
            const username = USERNAME_BSCOTTORIGINALS;
            const result = await TestTwitterProvider.getUserByUsername({
                username,
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.username).toBe(username);
        });

        test("given user does not exist, returns undefined with errors", async () => {
            // Arrange & Act
            const username = fakeUsername();
            const result = await TestTwitterProvider.getUserByUsername({
                username,
            });

            // Assert
            expect(result.data).toBeUndefined();
            expect(result.errors?.length).toBeGreaterThanOrEqual(1);
        });

        test.each([
            [UserFields.Verified, UserFields.CreatedAt],
            `${UserFields.Verified},${UserFields.CreatedAt}`,
        ])(
            `when userFields %p and '${TweetExpansions.AuthorId}', returns additional fields`,
            async (userFields) => {
                // Arrange
                const username = USERNAME_BSCOTTORIGINALS;

                // Act
                const result = await TestTwitterProvider.getUserByUsername({
                    username,
                    userFields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.username).toBeDefined();
                expect(user.created_at).toBeDefined();
                expect(user.verified).toBeDefined();
            }
        );

        test.each([
            [UserExpansions.PinnedTweetId],
            `${UserExpansions.PinnedTweetId}`,
        ])(
            "when expansions %p, returns additional field",
            async (expansions) => {
                // Arrange
                const username = USERNAME_TWITTERDEV;

                // Act
                const result = await TestTwitterProvider.getUserByUsername({
                    username,
                    expansions,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.pinned_tweet_id).toBeDefined();
            }
        );

        test.each([
            [TweetFields.CreatedAt, TweetFields.Lang],
            `${TweetFields.CreatedAt},${TweetFields.Lang}`,
        ])(
            `when fields %p and expansions ${UserExpansions.PinnedTweetId}, returns additional fields`,
            async (fields) => {
                // Arrange
                const username = USERNAME_TWITTERDEV;

                // Act
                const result = await TestTwitterProvider.getUserByUsername({
                    username,
                    expansions: UserExpansions.PinnedTweetId,
                    fields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.pinned_tweet_id).toBeDefined();
                expect(result.includes?.tweets).toBeDefined();

                const tweet = result.includes?.tweets![0]!;
                expect(tweet.lang).toBeDefined();
                expect(tweet.created_at).toBeDefined();
            }
        );

        test(`when fields requested without expansions '${UserExpansions.PinnedTweetId}', returns additional fields`, async () => {
            // Arrange
            const username = USERNAME_TWITTERDEV;
            const fields = [TweetFields.CreatedAt, TweetFields.Lang];

            // Act
            const result = await TestTwitterProvider.getUserByUsername({
                username,
                fields,
            });

            // Assert
            expect(result.data).toBeDefined();

            const user = result.data!;

            expect(user.pinned_tweet_id).toBeDefined();
            expect(result.includes?.tweets).toBeDefined();

            const tweet = result.includes?.tweets![0]!;
            expect(tweet.lang).toBeDefined();
            expect(tweet.created_at).toBeDefined();
        });
    });

    // #endregion getUserByUsername

    // -----------------------------------------------------------------------------------------
    // #region getUser
    // -----------------------------------------------------------------------------------------

    describe("getUser", () => {
        test("given user exists, returns user", async () => {
            // Arrange & Act
            const id = USERID_BSCOTTORIGINALS;
            const result = await TestTwitterProvider.getUser({
                id,
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.id).toBe(id);
        });

        test("given user does not exist, returns undefined with errors", async () => {
            // Arrange & Act
            const id = "00000";
            const result = await TestTwitterProvider.getUser({
                id,
            });

            // Assert
            expect(result.data).toBeUndefined();
            expect(result.errors?.length).toBeGreaterThanOrEqual(1);
        });

        test.each([
            [UserFields.Verified, UserFields.CreatedAt],
            `${UserFields.Verified},${UserFields.CreatedAt}`,
        ])(
            `when userFields %p and '${TweetExpansions.AuthorId}', returns additional fields`,
            async (userFields) => {
                // Arrange
                const id = USERID_BSCOTTORIGINALS;

                // Act
                const result = await TestTwitterProvider.getUser({
                    id,
                    userFields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.username).toBeDefined();
                expect(user.created_at).toBeDefined();
                expect(user.verified).toBeDefined();
            }
        );

        test.each([
            [UserExpansions.PinnedTweetId],
            `${UserExpansions.PinnedTweetId}`,
        ])(
            "when expansions %p, returns additional field",
            async (expansions) => {
                // Arrange
                const id = USERID_TWITTERDEV;

                // Act
                const result = await TestTwitterProvider.getUser({
                    id,
                    expansions,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.pinned_tweet_id).toBeDefined();
            }
        );

        test.each([
            [TweetFields.CreatedAt, TweetFields.Lang],
            `${TweetFields.CreatedAt},${TweetFields.Lang}`,
        ])(
            `when fields %p and expansions ${UserExpansions.PinnedTweetId}, returns additional fields`,
            async (fields) => {
                // Arrange
                const id = USERID_TWITTERDEV;

                // Act
                const result = await TestTwitterProvider.getUser({
                    id,
                    expansions: UserExpansions.PinnedTweetId,
                    fields,
                });

                // Assert
                expect(result.data).toBeDefined();

                const user = result.data!;

                expect(user.pinned_tweet_id).toBeDefined();
                expect(result.includes?.tweets).toBeDefined();

                const tweet = result.includes?.tweets![0]!;
                expect(tweet.lang).toBeDefined();
                expect(tweet.created_at).toBeDefined();
            }
        );

        test(`when fields requested without expansions '${UserExpansions.PinnedTweetId}', returns additional fields`, async () => {
            // Arrange
            const id = USERID_TWITTERDEV;
            const fields = [TweetFields.CreatedAt, TweetFields.Lang];

            // Act
            const result = await TestTwitterProvider.getUser({
                id,
                fields,
            });

            // Assert
            expect(result.data).toBeDefined();

            const user = result.data!;

            expect(user.pinned_tweet_id).toBeDefined();
            expect(result.includes?.tweets).toBeDefined();

            const tweet = result.includes?.tweets![0]!;
            expect(tweet.lang).toBeDefined();
            expect(tweet.created_at).toBeDefined();
        });
    });

    // #endregion getUser

    // -----------------------------------------------------------------------------------------
    // #region listMentionsByUser
    // -----------------------------------------------------------------------------------------

    describe("listMentionsByUser", () => {
        testReturnsTweets<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testTweetExpansionsReturnsExpandedFields<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testFieldsReturnsRequestedFields<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testMaxResultsReturnsUpToCount<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testUserFieldsWithExpansionReturnsUser<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testUntilIdReturnsTweetsUpToId<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testSinceIdReturnsTweetsAfterId<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: { id: "63046977" },
        });

        testPollFieldsWithExpansionReturnsPollIds<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371788005279682560
                since_id: "1371788005279682500",
                until_id: "1371788005279682600",
                id: USERID_BSCOTTORIGINALS,
            },
        });

        testPollFieldsWithoutExpansionReturnsPollIds<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371788005279682560
                since_id: "1371788005279682500",
                until_id: "1371788005279682600",
                id: USERID_BSCOTTORIGINALS,
            },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                id: USERID_BSCOTTORIGINALS,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                id: USERID_BSCOTTORIGINALS,
            },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371978365557690371
                since_id: "1371978365557690300",
                until_id: "1371978365557690400",
                id: USERID_BSCOTTORIGINALS,
            },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListMentionsByUserParams>({
            method: (sut) => sut.listMentionsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371978365557690371
                since_id: "1371978365557690300",
                until_id: "1371978365557690400",
                id: USERID_BSCOTTORIGINALS,
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

        testTweetExpansionsReturnsExpandedFields<ListTweetsParams>({
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
            params: { id: "63046977" },
        });

        test.skip.each([
            [TweetTypes.Replies, TweetTypes.Retweets],
            `${TweetTypes.Replies},${TweetTypes.Retweets}`,
        ])(
            "given exclude %p, it returns tweets without those types",
            async (exclude) => {
                // Arrange
                const id = "326756275";

                // Act
                const result = await TestTwitterProvider.listTweetsByUser({
                    id,
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
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testSinceIdReturnsTweetsAfterId<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testMaxResultsReturnsUpToCount<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testFieldsReturnsRequestedFields<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testTweetExpansionsReturnsExpandedFields<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testUserFieldsWithExpansionReturnsUser<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { id: USERID_BSCOTTORIGINALS },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                id: USERID_BRANDONSCOTT,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                id: USERID_BRANDONSCOTT,
            },
        });
    });

    // #endregion listTweetsByUser

    // -----------------------------------------------------------------------------------------
    // #region listTweetsByUsername
    // -----------------------------------------------------------------------------------------

    describe("listTweetsByUsername", () => {
        test("when user does not exist, throws not found error", async () => {
            // Arrange
            const username = fakeUsername();

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
            params: { username: USERNAME_TWITTERDEV },
        });

        test.skip.each([
            [TweetTypes.Replies, TweetTypes.Retweets],
            `${TweetTypes.Replies},${TweetTypes.Retweets}`,
        ])(
            "given exclude %p, it returns tweets without those types",
            async (exclude) => {
                // Arrange
                const username = USERNAME_TWITTERDEV;

                // Act
                const result = await TestTwitterProvider.listTweetsByUsername({
                    username,
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

        testUntilIdReturnsTweetsUpToId<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testSinceIdReturnsTweetsAfterId<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testMaxResultsReturnsUpToCount<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testPaginationTokenReturnsNextPageOfTweets<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testFieldsReturnsRequestedFields<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testTweetExpansionsReturnsExpandedFields<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testMediaFieldsWithExpansionReturnsMedia<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testMediaFieldsWithoutExpansionReturnsMedia<ListTweetsByUsernameParams>(
            {
                method: (sut) => sut.listTweetsByUsername,
                params: { username: USERNAME_BSCOTTORIGINALS },
            }
        );

        testUserFieldsWithExpansionReturnsUser<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testUserFieldsWithoutExpansionReturnsUser<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: { username: USERNAME_BSCOTTORIGINALS },
        });

        testPlaceFieldsWithExpansionReturnsPlace<ListTweetsByUsernameParams>({
            method: (sut) => sut.listTweetsByUsername,
            params: {
                // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                since_id: "1371977096273215400",
                until_id: "1371977096273215500",
                username: USERNAME_BRANDONSCOTT,
            },
        });

        testPlaceFieldsWithoutExpansionReturnsPlace<ListTweetsByUsernameParams>(
            {
                method: (sut) => sut.listTweetsByUsername,
                params: {
                    // Narrowing the ids down to a range that includes test tweet -> 1371977096273215491
                    since_id: "1371977096273215400",
                    until_id: "1371977096273215500",
                    username: USERNAME_BRANDONSCOTT,
                },
            }
        );
    });

    // #endregion listTweetsByUsername

    // -----------------------------------------------------------------------------------------
    // #region listUsersByUsername
    // -----------------------------------------------------------------------------------------

    describe("listUsersByUsername", () => {
        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given a valid username, it returns a user",
            method: (sut) => sut.listUsersByUsername,
            params: { usernames: USERNAME_BRANDONSCOTT },
        });

        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given comma separated usernames, it returns users",
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: `${USERNAME_BRANDONSCOTT},${USERNAME_BSCOTTORIGINALS}`,
            },
        });

        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given array of usernames, it returns users",
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: [USERNAME_BRANDONSCOTT, USERNAME_BSCOTTORIGINALS],
            },
        });

        testUserExpansionsReturnsExpandedFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: USERNAME_TWITTERDEV,
            },
        });

        testUserFieldsReturnsFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: USERNAME_TWITTERDEV,
            },
        });

        testTweetFieldsReturnsFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: USERNAME_TWITTERDEV,
            },
        });
    });

    // #endregion listUsersByUsername
});
