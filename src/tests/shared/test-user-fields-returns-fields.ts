import { UserFields } from "../../enums/user-fields";
import { UserFieldsParams } from "../../interfaces/params/user-fields-params";
import { User } from "../../interfaces/users/user";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testUserFieldsReturnsFields = <TParams extends UserFieldsParams>(
    options: Omit<TestOptions<TParams, User>, "name">
) => {
    const { method } = options;
    test.each([
        [UserFields.CreatedAt, UserFields.Verified],
        `${UserFields.CreatedAt},${UserFields.Verified}`,
    ])("given userFields %p, it returns fields", async (userFields) => {
        // Arrange
        const params = Object.assign(options.params, { userFields });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        const user = result.data[0]!;
        expect(user.username).toBeDefined();
        expect(user.created_at).toBeDefined();
        expect(user.verified).toBeDefined();
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testUserFieldsReturnsFields };

// #endregion Exports
