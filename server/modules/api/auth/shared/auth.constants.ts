
export namespace DI {
  export namespace Config {
    export const Google = Symbol(`DI-Config-Google`);
    export const Facebook = Symbol(`DI-Config-Facebook`);
    export const Vkontakte = Symbol(`DI-Config-Vkontakte`);
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

  export namespace Vkontakte {
    const BaseURI = `vkontakte`;
    export const Redirect: string = `${BaseURI}/redirect`;
    export const SignIn: string = `${BaseURI}/signin`;
  }
}
