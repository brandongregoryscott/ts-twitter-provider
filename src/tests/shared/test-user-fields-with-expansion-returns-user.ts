import { TweetExpansions } from "../../enums/tweet-expansions";
import { UserFields } from "../../enums/user-fields";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testUserFieldsWithExpansionReturnsUser = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test.each([
        [UserFields.CreatedAt, UserFields.Verified],
        `${UserFields.CreatedAt},${UserFields.Verified}`,
    ])(
        `given userFields %p and '${TweetExpansions.AuthorId}', it returns user`,
        async (userFields) => {
            // Arrange
            const params = Object.assign(options.params, {
                expansions: [TweetExpansions.AuthorId],
                userFields,
            });

            // Act
            const result = await method(TestTwitterProvider)(params);

            // Assert
            expect(result.data.length).toBeGreaterThanOrEqual(1);
            expect(result.data[0].author_id).toBeDefined();

            expect(result.includes?.users).toBeDefined();
            expect(result.includes?.users?.length).toBeGreaterThanOrEqual(1);

            const user = result.includes?.users?.[0]!;
            expect(user.username).toBeDefined();
            expect(user.created_at).toBeDefined();
            expect(user.verified).toBeDefined();
        }
    );
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testUserFieldsWithExpansionReturnsUser };

// #endregion Exports
