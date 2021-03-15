import { PollFields } from "../../enums/poll-fields";
import { ListMentionsByUserParams } from "../../interfaces/params/list-mentions-by-user-params";
import { ListTweetsByUserParams } from "../../interfaces/params/list-tweets-by-user-params";
import { ListTweetsParams } from "../../interfaces/params/list-tweets-params";
import { TestOptions } from "../interfaces/test-option";
import { TestTwitterProvider } from "../test-twitter-provider";

// -----------------------------------------------------------------------------------------
// #region Shared Spec
// -----------------------------------------------------------------------------------------

const testPollFieldsWithoutExpansionReturnsPollIds = <
    TParams =
        | ListTweetsByUserParams
        | ListMentionsByUserParams
        | ListTweetsParams
>(
    options: TestOptions<TParams>
) => {
    const { method } = options;
    const name =
        options.name ??
        "given pollFields without specifying expansions, it returns tweets with list of poll_ids";
    test(name, async () => {
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
        expect(poll.voting_status).toBe("closed");
    });
};

// #endregion Shared Spec

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { testPollFieldsWithoutExpansionReturnsPollIds };

// #endregion Exports
