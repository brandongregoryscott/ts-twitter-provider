import { BaseParams, RawBaseParams } from "../interfaces/params/base-params";
import { TweetExpansionsParams } from "../interfaces/params/tweet-expansions-params";
import { UserExpansionsParams } from "../interfaces/params/user-expansion-params";
import { CoreUtils } from "./core-utils";
import { AnyExpansions } from "./types/any-expansions";
import { AnyFields } from "./types/any-fields";
import { FieldToExpansionsMappings } from "./types/field-to-expansions-mappings";

// -----------------------------------------------------------------------------------------
// #region Types
// -----------------------------------------------------------------------------------------

type CustomMapKey = keyof Pick<BaseParams, "fields">;
type CustomMapValue = keyof Pick<RawBaseParams, "tweet.fields">;

// #endregion Types

// -----------------------------------------------------------------------------------------
// #region Constants
// -----------------------------------------------------------------------------------------

const _customMappedKeys: Record<CustomMapKey, CustomMapValue> = {
    fields: "tweet.fields",
};
const _unmappedKeys: string[] = ["id", "username"];

// #endregion Constants

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

/** @hidden */
const ParamUtils = {
    preprocessForExpansions<
        TParams extends TweetExpansionsParams | UserExpansionsParams
    >(params: TParams, mappings: FieldToExpansionsMappings): TParams {
        let processed: TParams = { ...params };
        const expansions = CoreUtils.arrayOrCsvToArray<AnyExpansions>(
            params.expansions
        );

        const keys = Object.keys(params).filter(
            (key) => key.endsWith("Fields") || key.endsWith("fields")
        );
        const values = keys
            .map((key) =>
                CoreUtils.arrayOrCsvToArray<AnyFields>((params as any)[key])
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
    toRawParams<TParams extends Record<string, any>, TRawParams>(
        params: TParams
    ): TRawParams {
        const rawParams: Record<string, any> = {};
        const keyMap = _transformKeysToMap(Object.keys(params));

        Object.entries(keyMap).forEach(([original, transformedKey]) => {
            const value = params[original];
            let transformedValue: string | undefined = undefined;
            if (typeof value === "number" || typeof value === "string") {
                transformedValue = value.toString();
            }

            if (typeof value === "string" && value.includes(",")) {
                transformedValue = CoreUtils.trimCsv(value);
            }

            if (value instanceof Date) {
                transformedValue = value.toISOString();
            }

            if (Array.isArray(value)) {
                transformedValue = value.join();
            }

            if (transformedValue == null) {
                throw new Error(
                    `Could not transform original value '${value}' from param key '${original}' - is this a supported param or type?`
                );
            }

            rawParams[transformedKey] = transformedValue;
        });

        return rawParams as TRawParams;
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _transformKeysToMap = (keys: string[]): Record<string, string> => {
    const keyMap: Record<string, string> = {};
    const filteredKeys = keys.filter(
        (key: string) => !_unmappedKeys.includes(key)
    );
    filteredKeys.forEach((unmodifiedKey: string) => {
        if (Object.keys(_customMappedKeys).includes(unmodifiedKey)) {
            keyMap[unmodifiedKey] =
                _customMappedKeys[unmodifiedKey as CustomMapKey];
            return;
        }

        const objectFieldsMatch = unmodifiedKey.match(/([a-z]+)(Fields)/);
        if (objectFieldsMatch != null) {
            keyMap[unmodifiedKey] = unmodifiedKey.replace("Fields", ".fields");
            return;
        }

        keyMap[unmodifiedKey] = unmodifiedKey;
        return;
    });

    return keyMap;
};

// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { ParamUtils };

// #endregion Exports
