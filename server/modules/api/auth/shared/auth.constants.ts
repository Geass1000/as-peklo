
export namespace DI {
  export namespace Config {
    export const Google = Symbol(`DI-Config-Google`);
  }
}

export namespace Routes {
  export namespace Google {
    const BaseURI = `google`;
    export const Redirect: string = `${BaseURI}/redirect`;
    export const SignIn: string = `${BaseURI}/signin`;
  }
}
