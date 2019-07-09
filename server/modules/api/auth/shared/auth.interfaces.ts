
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
    readonly scope: string[];
  }

  export interface Google extends OAuth {
  }

  export interface Vkontakte extends OAuth {
    readonly v: string;
  }

  export interface Facebook extends OAuth {
  }
}

export interface RedirectOptions {
  state: string;
}
