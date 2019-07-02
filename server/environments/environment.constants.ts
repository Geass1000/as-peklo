
export namespace Environment {
  export const Port: number = 4321;

  export namespace Nats {
    export const Url: string = 'nats://nats-container:4222';
  }

  export namespace Auth {
    export const Secret: string = 'mySecretKey';
    export const ExpiresIn: number = 86400;
  }
}
