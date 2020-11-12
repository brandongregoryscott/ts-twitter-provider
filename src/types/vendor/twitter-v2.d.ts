declare module "twitter-v2" {
    export interface CredentialsConstructorArgs {
        consumer_key?: string;
        consumer_secret?: string;
        bearer_token?: string;
        access_token?: string;
        access_token_secret?: string;
    }

    export class Credentials {
        constructor(args: CredentialsConstructorArgs);
        public appAuth(): boolean;
        public userAuth(): boolean;
        public async createBearerToken(): Promise<any>;
        public async authorizationHeader(url): Promise<any>;
    }

    export class TwitterStream {
        constructor(connect: any, close: any);
        [Symbol.asyncIterator]();
        public close();
    }

    export default class Twitter {
        constructor(credentials: CredentialsConstructorArgs);
        public get(endpoint: string, parameters?: any): Promise<any>;
        public post(
            endpoint: string,
            body?: any,
            parameters?: any
        ): Promise<any>;
        public stream(endpoint: string, parameters?: any): TwitterStream;
    }
}
