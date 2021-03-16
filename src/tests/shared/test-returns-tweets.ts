import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testReturnsTweets = <TParams>(options: TestOptions<TParams>) => {
    const { method, params } = options;
    const name = options.name ?? "returns tweets";
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

export { testReturnsTweets };

// #endregion Exports
