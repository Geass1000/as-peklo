
export namespace AccessToken {
  export type Type = string;

  export interface Data {
    userId: string;
  }
}

export interface SignIn {
  accessToken: AccessToken.Type;
}

export namespace Config {
  export interface Google {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly loginDialogURL: string;
    readonly oauthRedirectURL: string;
    readonly responseType: string;
    readonly scopes: string[];
  }
}

export interface RedirectOptions {
  url: string;
}
