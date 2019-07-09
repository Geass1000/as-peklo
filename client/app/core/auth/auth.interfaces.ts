
export namespace AccessToken {
  export type Type = string;

  export interface Data {
    userId: string;
  }
}

export interface SignIn {
  accessToken: AccessToken.Type;
}

export interface RedirectOptions {
  state: string;
}
