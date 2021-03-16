import { IdFilterParams } from "../../interfaces/params/id-filter-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testUntilIdReturnsTweetsUpToId = <TParams extends IdFilterParams>(
    options: Omit<TestOptions<TParams>, "name">
) =>
    test("given until_id, returns tweets up to id", async () => {
        // Arrange
        const { method } = options;
        const until_id = "1366493658762084362";
        const params = Object.assign(options.params, { until_id });

        // Act
        const result = await method(TestTwitterProvider)(params);

        // Assert
        expect(result.data.length).toBeGreaterThanOrEqual(1);
        result.data.forEach((tweet) =>
            expect(Number(tweet.id)).toBeLessThanOrEqual(Number(until_id))
        );
    });

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testUntilIdReturnsTweetsUpToId };

// #endregion Exports
