
export namespace Environment {
  export namespace Server {
    export const Port: number = 4321;
  }

  export namespace Nats {
    export const Url: string = 'nats://nats-container:4222';
  }

  export namespace Auth {
    export const Secret: string = 'mySecretKey';
    export const ExpiresIn: number = 86400;
  }

  export namespace Mongodb {
    export const Username = `root`;
    export const Password = `12345`;
    export const Host = `localhost`;
    export const Port = `27017`;
    export const Database = `gafrome`;
  }
}
