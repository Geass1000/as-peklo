
export namespace DI {
  export namespace Config {
    export const Google = Symbol(`DI-Config-Google`);
    export const Facebook = Symbol(`DI-Config-Facebook`);
  }
}

export namespace Routes {
  export namespace Google {
    const BaseURI = `google`;
    export const Redirect: string = `${BaseURI}/redirect`;
    export const SignIn: string = `${BaseURI}/signin`;
  }

  export namespace Facebook {
    const BaseURI = `facebook`;
    export const Redirect: string = `${BaseURI}/redirect`;
    export const SignIn: string = `${BaseURI}/signin`;
  }
}
