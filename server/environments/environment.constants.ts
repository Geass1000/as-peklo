
export namespace Environment {
  export namespace Server {
    export const Port: number = 4321;
    export const Domain: string = `localhost`;
    export const Protocol: string = `http`;
  }

  export namespace Nats {
    export const Url: string = 'nats://nats-container:4222';
  }

  export namespace Auth {
    export const Secret: string = 'mySecretKey';
    export const ExpiresIn: string = '24h';
  }

  export namespace Mongodb {
    export const Username = `root`;
    export const Password = `12345`;
    export const Host = `mongo-container`;
    export const Port = `27017`;
    export const Database = `gafrome`;
  }
}
