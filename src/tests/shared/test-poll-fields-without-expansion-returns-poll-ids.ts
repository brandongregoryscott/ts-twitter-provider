import { PollFields } from "../../enums/poll-fields";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPollFieldsWithoutExpansionReturnsPollIds = <
    TParams extends BaseParams
>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test("given pollFields without specifying expansions, it returns tweets with poll_ids", async () => {
        // Arrange
        const params = Object.assign(options.params, {
            expansions: [], // <-- Intentionally not sending through TweetExpansions.AttachmentsPollIds
            pollFields: [PollFields.VotingStatus],
        });

        // Act
        const result = await method(TestTwitterProvider)(params);

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
        expect(poll.voting_status).toMatch(/closed|open/);
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPollFieldsWithoutExpansionReturnsPollIds };

// #endregion Exports
