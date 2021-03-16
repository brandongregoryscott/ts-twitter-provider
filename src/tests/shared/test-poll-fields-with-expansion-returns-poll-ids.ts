import { PollFields } from "../../enums/poll-fields";
import { TweetExpansions } from "../../enums/tweet-expansions";
import { BaseParams } from "../../interfaces/params/base-params";
import { TestOptions } from "../interfaces/test-options";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPollFieldsWithExpansionReturnsPollIds = <TParams extends BaseParams>(
    options: Omit<TestOptions<TParams>, "name">
) => {
    const { method } = options;
    test(`given list of pollFields and '${TweetExpansions.AttachmentsPollIds}', it returns tweets with poll_ids`, async () => {
        // Arrange
        const params = Object.assign(options.params, {
            expansions: [TweetExpansions.AttachmentsPollIds],
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
        expect(poll.voting_status).toBe("closed");
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPollFieldsWithExpansionReturnsPollIds };

// #endregion Exports
