import { User } from "../../interfaces/users/user";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testReturnsUsers = <TParams>(options: TestOptions<TParams, User>) => {
    const { method, params } = options;
    const name = options.name ?? "returns users";
    test(name, async () => {
        // Arrange & Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testReturnsUsers };

// #endregion Exports
