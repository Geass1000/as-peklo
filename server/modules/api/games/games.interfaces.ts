
export namespace Games {
  export interface UserCredentials {
    uid: string;
    auth_key: string;
    sid?: string;
  }

  export interface Contract {
    id: string;
    type: string;
    building_id: number;
    production_timing_id: number;
  }

  export interface ArmoryFactories {
    land: number;
    space: number;
  }

  export interface ArmoryItems {
    airStrike: number;
    medicaments: number;
    gravibomb: number;
    shields: number;
    spaceMines: number;
    repairDrones: number;
    adaptiveShield: number;
    ecm: number;
  }

  export interface ArmoryItem {
    building: number;
    type: string;
  }

  export interface ResourceItems {
    metal: number;
    crystal: number;
    cordite: number;
    fuel: number;
  }

  export interface Info {
    factories: ArmoryFactories;
    armoryItems: ArmoryItems;
    resourceItems: ResourceItems;
  }
}
