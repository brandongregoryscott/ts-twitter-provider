import { TweetFields } from "./enums/tweet-fields";
import { TweetExpansions } from "./enums/tweet-expansions";
import { UserFields } from "./enums/user-fields";
import { UserExpansions } from "./enums/user-expansions";
import { testReturnsUsers } from "./tests/shared/test-returns-users";
import { ListUsersByUsernameParams } from "./interfaces/params/list-users-by-username";
import { testUserExpansionsReturnsExpandedFields } from "./tests/shared/test-user-expansions-returns-expanded-fields";
import { testUserFieldsReturnsFields } from "./tests/shared/test-user-fields-returns-fields";
import { testTweetFieldsReturnsFields } from "./tests/shared/test-tweet-fields-returns-tweets";
import { TestUtils } from "./tests/test-utils";
import { TestUserProvider } from "./tests/test-user-provider";
import { ListUsersParams } from "./interfaces/params/list-users-params";

describe("UserProvider", () => {
    // -----------------------------------------------------------------------------------------
    // #region getUserByUsername
    // -----------------------------------------------------------------------------------------

    describe("getUserByUsername", () => {
        test("given user exists, returns user", async () => {
            // Arrange & Act
            const { username } = TestUtils.users.bscottoriginals;

            const result = await TestUserProvider.getUserByUsername({
                username,
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.username).toBe(username);
        });

        test("given user does not exist, returns undefined with errors", async () => {
            // Arrange & Act
            const username = TestUtils.fakeUsername();
            const result = await TestUserProvider.getUserByUsername({
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
                const { username } = TestUtils.users.bscottoriginals;

                // Act
                const result = await TestUserProvider.getUserByUsername({
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
                const { username } = TestUtils.users.twitterdev;

                // Act
                const result = await TestUserProvider.getUserByUsername({
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
                const { username } = TestUtils.users.twitterdev;

                // Act
                const result = await TestUserProvider.getUserByUsername({
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
            const { username } = TestUtils.users.twitterdev;
            const fields = [TweetFields.CreatedAt, TweetFields.Lang];

            // Act
            const result = await TestUserProvider.getUserByUsername({
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
            const { id } = TestUtils.users.bscottoriginals;
            const result = await TestUserProvider.getUser({
                id,
            });

            // Assert
            expect(result.data).toBeDefined();
            expect(result.data!.id).toBe(id);
        });

        test("given user does not exist, returns undefined with errors", async () => {
            // Arrange & Act
            const id = "00000";
            const result = await TestUserProvider.getUser({
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
                const { id } = TestUtils.users.bscottoriginals;

                // Act
                const result = await TestUserProvider.getUser({
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
                const { id } = TestUtils.users.twitterdev;

                // Act
                const result = await TestUserProvider.getUser({
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
                const { id } = TestUtils.users.twitterdev;

                // Act
                const result = await TestUserProvider.getUser({
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
            const { id } = TestUtils.users.twitterdev;
            const fields = [TweetFields.CreatedAt, TweetFields.Lang];

            // Act
            const result = await TestUserProvider.getUser({
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
    // #region listUsersByUsername
    // -----------------------------------------------------------------------------------------

    describe("listUsersByUsername", () => {
        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given a valid username, it returns a user",
            method: (sut) => sut.listUsersByUsername,
            params: { usernames: TestUtils.users.brandonscott.username },
        });

        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given comma separated usernames, it returns users",
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: `${TestUtils.users.brandonscott.username},${TestUtils.users.bscottoriginals.username}`,
            },
        });

        testReturnsUsers<ListUsersByUsernameParams>({
            name: "given array of usernames, it returns users",
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: [
                    TestUtils.users.brandonscott.username,
                    TestUtils.users.bscottoriginals.username,
                ],
            },
        });

        testUserExpansionsReturnsExpandedFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: TestUtils.users.twitterdev.username,
            },
        });

        testUserFieldsReturnsFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: TestUtils.users.twitterdev.username,
            },
        });

        testTweetFieldsReturnsFields<ListUsersByUsernameParams>({
            method: (sut) => sut.listUsersByUsername,
            params: {
                usernames: TestUtils.users.twitterdev.username,
            },
        });
    });

    // #endregion listUsersByUsername

    // -----------------------------------------------------------------------------------------
    // #region listUsers
    // -----------------------------------------------------------------------------------------

    describe("listUsers", () => {
        testReturnsUsers<ListUsersParams>({
            method: (sut) => sut.listUsers,
            name: "given a valid id, it returns a user",
            params: {
                ids: TestUtils.users.brandonscott.id,
            },
        });

        testReturnsUsers<ListUsersParams>({
            method: (sut) => sut.listUsers,
            name: "given comma separated ids, it returns users",
            params: {
                ids: `${TestUtils.users.brandonscott.id},${TestUtils.users.twitterdev.id}`,
            },
        });

        testReturnsUsers<ListUsersParams>({
            method: (sut) => sut.listUsers,
            name: "given array of ids, it returns users",
            params: {
                ids: [
                    TestUtils.users.brandonscott.id,
                    TestUtils.users.twitterdev.id,
                ],
            },
        });

        testTweetFieldsReturnsFields<ListUsersParams>({
            method: (sut) => sut.listUsers,
            params: {
                ids: TestUtils.users.twitterdev.id,
            },
        });

        testUserFieldsReturnsFields<ListUsersParams>({
            method: (sut) => sut.listUsers,
            params: {
                ids: TestUtils.users.twitterdev.id,
            },
        });

        testUserExpansionsReturnsExpandedFields<ListUsersParams>({
            method: (sut) => sut.listUsers,
            params: {
                ids: TestUtils.users.twitterdev.id,
            },
        });
    });

    // #endregion listUsers
});
