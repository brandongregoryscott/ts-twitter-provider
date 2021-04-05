import { TweetExpansions } from "../enums/tweet-expansions";
import { UserExpansions } from "../enums/user-expansions";
import { BaseParams } from "../interfaces/params/base-params";
import { GetUserParams } from "../interfaces/params/get-user-params";
import { TweetExpansionsParams } from "../interfaces/params/tweet-expansions-params";
import { UserExpansionsParams } from "../interfaces/params/user-expansion-params";
import { CoreUtils } from "./core-utils";
// -----------------------------------------------------------------------------------------
// #region Interfaces
// -----------------------------------------------------------------------------------------

export interface FieldToExpansionsMap<
    TFields,
    TExpansion = UserExpansions | TweetExpansions
> {
    fields: TFields[];
    expansion: TExpansion;
}

// #endregion Interfaces

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const ParamUtils = {
    preprocessParamsForExpansions<
        TParams extends TweetExpansionsParams | UserExpansionsParams,
        TFields extends string,
        TExpansions extends UserExpansions | TweetExpansions
    >(
        params: TParams,
        mappings: FieldToExpansionsMap<TFields, TExpansions>[]
    ): TParams {
        let processed: TParams = { ...params };
        let expansions = CoreUtils.arrayOrCsvToArray<
            UserExpansions | TweetExpansions
        >(params.expansions);

        const keys = Object.keys(params).filter(
            (key) => key.endsWith("Fields") || key.endsWith("fields")
        );
        const values = keys
            .map((key) =>
                CoreUtils.arrayOrCsvToArray<TFields>((params as any)[key])
            )
            .flat();

        mappings.forEach((map) => {
            const { expansion } = map;
            // Coerce the TFields array to a string array to satisfy TS compiler
            const fields = map.fields.map((field) => field.toString());
            if (!values.some((field) => fields.includes(field))) {
                return;
            }

            if (expansions.includes(expansion)) {
                return;
            }

            processed = {
                ...processed,
                expansions: [...expansions, expansion],
            };
        });

        return processed;
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ParamUtils };

// #endregion Exports
