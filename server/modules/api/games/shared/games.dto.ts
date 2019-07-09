import * as Interfaces from './games.interfaces';

export class SignIn {
  constructor (
    public readonly uid: string,
    public readonly auth_key: string,
  ) {}
}

export class User {
  constructor (
    public readonly uid: string,
    public readonly auth_key: string,
    public readonly sid: string,
  ) {}

  valueOf (): Interfaces.Games.UserCredentials {
    return {
      uid: this.uid,
      auth_key: this.auth_key,
      sid: this.sid,
    }
  }
}

export class GameInfo {
  constructor (
    public readonly armoryItems: Interfaces.Games.ArmoryItems,
    public readonly resourceItems: Interfaces.Games.ResourceItems,
  ) {}
}

export class ArmoryOrder {
  constructor (
    public type: string,
    public count: number,
  ) {}
}

export class ArmoryConveyor {
  constructor (
    public readonly user: User,
    public readonly armoryOrders: ArmoryOrder[],
  ) {}
}
