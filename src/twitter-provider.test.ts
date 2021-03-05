import { TwitterProvider } from "./twitter-provider";
import dotenv from "dotenv";
import { TweetFields } from "./enums/tweet-fields";
import { TweetExpansions } from "./enums/tweet-expansions";
import { MediaFields } from "./enums/media-fields";
import { PollFields } from "./enums/poll-fields";
import faker from "faker";
import { UserFields } from "./enums/user-fields";

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
    // #region listTweets
    // -----------------------------------------------------------------------------------------

    describe("listTweets", () => {
        test("given a valid id, it returns a tweet", async () => {
            // Arrange
            const ids = "1326691582758760450";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(1);
        });

        test("given array of valid ids, it returns multiple tweets", async () => {
            // Arrange
            const ids = ["1326691582758760450", "1327657800667947008"];
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(ids.length);
        });

        test("given comma separated string of valid ids, it returns multiple tweets", async () => {
            // Arrange
            const ids = "1326691582758760450,1327657800667947008";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({ ids });

            // Assert
            expect(result.data).toHaveLength(ids.split(",").length);
        });

        test("given list of fields, it returns tweets with those included fields", async () => {
            // Arrange
            const ids = "1141796911684476929";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                fields: [TweetFields.Lang],
            });

            // Assert
            expect(result.data).toHaveLength(1);
            expect(result.data[0].lang).toBeDefined();
        });

        test("given list of expansions, it returns tweets with those expanded fields", async () => {
            // Arrange
            const ids = "1141796911684476929";
            const sut = setupSut();

            // Act
            const result = await sut.listTweets({
                ids,
                expansions: [
                    TweetExpansions.AttachmentsMediaKeys,
                    TweetExpansions.AuthorId,
                ],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const tweet = result.data[0];
            expect(tweet.author_id).toBeDefined();
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.media_keys).toHaveLength(1);
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

        test.skip("TODO - given list of pollFields without specifying expansions, it returns tweets with list of poll_ids", async () => {
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
    });

    // #endregion listTweets

    // -----------------------------------------------------------------------------------------
    // #region listTweetsByUser
    // -----------------------------------------------------------------------------------------

    describe("listTweetsByUser", () => {
        test("given userId, returns list of recent tweets", async () => {
            // Arrange
            const userId = "953649053631434752";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({ userId });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
        });

        test("given until_id, returns list of recent tweets up to that id", async () => {
            // Arrange
            const userId = "953649053631434752";
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
            const userId = "953649053631434752";
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
            const userId = "953649053631434752";
            const max_results = faker.random.number({ min: 5, max: 100 });
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({ userId, max_results });

            // Assert
            expect(result.data.length).toBeLessThanOrEqual(max_results);
        });

        test("given pagination_token, returns next page of tweets", async () => {
            // Arrange
            const userId = "953649053631434752";
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

        test("given list of fields, it returns tweets with those included fields", async () => {
            // Arrange
            const userId = "953649053631434752";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                fields: [TweetFields.Lang],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].lang).toBeDefined();
        });

        test("given list of expansions, it returns tweets with those expanded fields", async () => {
            // Arrange
            const userId = "953649053631434752";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                expansions: [
                    TweetExpansions.AttachmentsMediaKeys,
                    TweetExpansions.AuthorId,
                ],
            });

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);

            const tweet = result.data[0];
            expect(tweet.author_id).toBeDefined();
            expect(tweet.attachments).toBeDefined();
            expect(tweet.attachments?.media_keys).toHaveLength(1);
        });

        test(`given list of mediaFields and '${TweetExpansions.AttachmentsMediaKeys}', it returns tweets with those media fields`, async () => {
            // Arrange
            const userId = "953649053631434752";
            const sut = setupSut();

            // Act
            const result = await sut.listTweetsByUser({
                userId,
                expansions: [TweetExpansions.AttachmentsMediaKeys],
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

        test("given list of mediaFields without specifying expansions, it returns tweets with those media fields", async () => {
            // Arrange
            const userId = "953649053631434752";
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

        test(`given list of userFields and '${TweetExpansions.AuthorId}', it returns tweets with those included fields`, async () => {
            // Arrange
            const userId = "953649053631434752";
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

        test.skip(`given list of userFields without specifying expansions, it returns tweets with those included fields`, async () => {
            // Arrange
            const userId = "953649053631434752";
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
