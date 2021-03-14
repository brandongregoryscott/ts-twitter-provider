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
import { TwitterResponse } from "./interfaces/twitter-response";
import { Tweet } from "./interfaces/tweets/tweet";

// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

interface TestOptions<TParams> {
    name?: string;
    method: (
        sut: TwitterProvider
    ) => (params: TParams) => Promise<TwitterResponse<Tweet[]>>;
    params: TParams;
}

// #endregion Interfaces

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
            // Arrange
            const sut = setupSut();

            // Act
            const result = await method(sut)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
        });
    };

    const testEndTimeReturnsTweetsOnOrBeforeDate = <
        TParams = ListTweetsByUserParams | ListMentionsByUserParams
    >(
        options: TestOptions<TParams>
    ) =>
        test.each([faker.date.past(1), faker.date.past(1).toISOString()])(
            "given end_time %p, returns tweets before or on that date",
            async (end_time) => {
                // Arrange
                const { method } = options;
                const sut = setupSut();
                const params = Object.assign(options.params, {
                    end_time,
                    fields: [TweetFields.CreatedAt],
                });

                // Act
                const result = await method(sut)(params);

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                result.data.forEach((tweet) => {
                    expect(tweet.created_at).toBeDefined();
                    expect(
                        new Date(tweet.created_at!) <= new Date(end_time)
                    ).toBe(true);
                });
            }
        );

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
                const sut = setupSut();

                // Act
                const result = await method(sut)(params);

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);

                const tweet = result.data[0];
                expect(tweet.author_id).toBeDefined();
            }
        );

    const testFieldsReturnsRequestedFields = <
        TParams = ListTweetsByUserParams | ListMentionsByUserParams
    >(
        options: TestOptions<TParams>
    ) =>
        test.each([
            [TweetFields.Lang, TweetFields.Id],
            `${TweetFields.Lang},${TweetFields.Id}`,
        ])(
            "given fields %p, it returns tweets with those included fields",
            async (fields) => {
                // Arrange
                const { method } = options;
                const params = Object.assign(options.params, { fields });
                const sut = setupSut();

                // Act
                const result = await method(sut)(params);

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                expect(result.data[0].lang).toBeDefined();
            }
        );

    const testStartTimeReturnsTweetsOnOrAfterDate = <
        TParams extends
            | ListTweetsByUserParams
            | ListMentionsByUserParams
            | ListTweetsParams
    >(
        options: TestOptions<TParams>
    ) =>
        test.each([faker.date.past(1), faker.date.past(1).toISOString()])(
            "given start_time %p, returns tweets on or after that date",
            async (start_time) => {
                // Arrange
                const { method } = options;
                const params = Object.assign(options.params, {
                    start_time,
                    fields: [TweetFields.CreatedAt],
                });
                const sut = setupSut();

                // Act
                const result = await method(sut)(params);

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                result.data.forEach((tweet) => {
                    expect(tweet.created_at).toBeDefined();
                    expect(
                        new Date(tweet.created_at!) >= new Date(start_time)
                    ).toBe(true);
                });
            }
        );

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

        test(`given list of pollFields and '${TweetExpansions.AttachmentsPollIds}', it returns tweets with list of poll_ids`, async () => {
            // Arrange
            const ids = "1342161609909800963";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                expansions: [TweetExpansions.AttachmentsPollIds],
                pollFields: [PollFields.VotingStatus],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const tweet = result.data[0];
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.poll_ids).toHaveLength(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.polls?.length).toBeGreaterThanOrEqual(1);

            const poll = result.includes?.polls?.[0]!;
            expect(poll.id).toBeDefined();
            expect(poll.options.length).toBeGreaterThanOrEqual(1);
            expect(poll.voting_status).toBe("closed");
        });

        test("given list of pollFields without specifying expansions, it returns tweets with list of poll_ids", async () => {
            // Arrange
            const ids = "1342161609909800963";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentsPollIds
                pollFields: [PollFields.VotingStatus],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const tweet = result.data[0];
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.poll_ids).toHaveLength(1);

            expect(result.includes).toBeDefined();
            expect(result.includes?.polls?.length).toBeGreaterThanOrEqual(1);

            const poll = result.includes?.polls?.[0]!;
            expect(poll.id).toBeDefined();
            expect(poll.options.length).toBeGreaterThanOrEqual(1);
            expect(poll.voting_status).toBe("closed");
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

        test.each([
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
                    fields: [TweetFields.InReplyToUserId],
                    exclude,
                });

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                result.data.forEach((tweet) =>
                    expect(tweet.in_reply_to_user_id).toBeUndefined()
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

        test("given max_results, returns up to that count of recent tweets", async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const max_results = faker.random.number({ min: 5, max: 100 });
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({ userId, max_results });

            // Assert
            expect(result.data.length).toBeLessThanOrEqual(max_results);
        });

        testStartTimeReturnsTweetsOnOrAfterDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        testEndTimeReturnsTweetsOnOrBeforeDate<ListTweetsByUserParams>({
            method: (sut) => sut.listTweetsByUser,
            params: { userId: USERID_BSCOTTORIGINALS },
        });

        test("given pagination_token, returns next page of tweets", async () => {
            // Arrange
            const userId = USERID_BSCOTTORIGINALS;
            const sut = setupSut();

            const pageOne = await sut.listTweetsByUser({ userId });
            const pagination_token = pageOne.meta?.next_token;

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                pagination_token,
            });

            // Assert
            expect(result.meta?.previous_token).toBeDefined();
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

        test.each([
            [UserFields.CreatedAt, UserFields.Verified],
            `${UserFields.CreatedAt},${UserFields.Verified}`,
        ])(
            `given userFields %p and '${TweetExpansions.AuthorId}', it returns tweets with those included fields`,
            async (userFields) => {
                // Arrange
                const userId = USERID_BSCOTTORIGINALS;
                const sut = setupSut();

                // Act
                const result = await sut.listTweetsByUser({
                    userId,
                    expansions: [TweetExpansions.AuthorId],
                    userFields,
                });

                // Assert
                expect(result.data.length).toBeGreaterThanOrEqual(1);
                expect(result.data[0].author_id).toBeDefined();

                expect(result.includes?.users).toBeDefined();
                expect(result.includes?.users?.length).toBeGreaterThanOrEqual(
                    1
                );

                const user = result.includes?.users?.[0]!;
                expect(user.username).toBe("bscottoriginals");
                expect(user.created_at).toBeDefined();
                expect(user.verified).toBeDefined();
            }
        );

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
