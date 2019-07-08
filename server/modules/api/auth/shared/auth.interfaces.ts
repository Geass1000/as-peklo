
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
  export interface OAuth {
    readonly clientId: string;
    readonly clientSecret: string;
    readonly loginDialogURL: string;
    readonly oauthRedirectURL: string;
  }

  export interface Google extends OAuth {
    readonly responseType: string;
    readonly scopes: string[];
  }
}

export interface RedirectOptions {
  url: string;
}
