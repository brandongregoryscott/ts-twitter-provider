import { IdFilterParams } from "../../interfaces/params/id-filter-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testSinceIdReturnsTweetsAfterId = <TParams extends IdFilterParams>(
    options: Omit<TestOptions<TParams>, "name">
) =>
    test("given since_id, returns tweets after id", async () => {
        // Arrange
        const { method } = options;
        const since_id = "1366493658762084362";
        const params = Object.assign(options.params, { since_id });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        result.data.forEach((tweet) =>
            expect(Number(tweet.id)).toBeGreaterThanOrEqual(Number(since_id))
        );
    });

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testSinceIdReturnsTweetsAfterId };

// #endregion Exports
