import * as _ from 'lodash';

import { Games } from './shared/games.interfaces';

export class GamesHelper {
  public static getFactoryContracts (gameInfo: any, factoryId: number): Games.Contract[] {
    if (!_.has(gameInfo, 'contracts.contract') || !_.isArray(gameInfo.contracts.contract)) {
      throw new Error(`Contracts are not founded!`);
    }

    const contracts = _.chain(gameInfo.contracts.contract)
      .filter((contract) => contract.$.building_id === factoryId)
      .map((contract) => contract.$)
      .value();

    return contracts;
  }

  public static getArmoryFactories (gameInfo: any): Games.ArmoryFactories {
    if (!_.has(gameInfo, 'buildings.building') || !_.isArray(gameInfo.buildings.building)) {
      throw new Error(`Buildings are not founded!`);
    }

    const landFactory = _.find(gameInfo.buildings.building, (building) => {
      return building.$.type === `factory`;
    });

    const spaceFactory = _.find(gameInfo.buildings.building, (building) => {
      return building.$.type === `space_engineering`;
    });

    return {
      land: this.getValue(landFactory, `$.id`),
      space: this.getValue(spaceFactory, `$.id`),
    };
  }

  public static getResourcesItems (gameInfo: any): Games.ResourceItems {
    if (!_.has(gameInfo, 'items')) {
      throw new Error(`Buildings are not founded!`);
    }

    const items = gameInfo.items;

    return {
      metal: this.getValue(items, `metal`),
      crystal: this.getValue(items, `crystal`),
      cordite: this.getValue(items, `cordite`),
      fuel: this.getValue(items, `fuel`),
    };
  }

  public static getArmoryItems (gameInfo: any): Games.ArmoryItems {
    if (!_.has(gameInfo, 'items')) {
      throw new Error(`Buildings are not founded!`);
    }

    const items = gameInfo.items;

    return {
      airStrike: this.getValue(items, `air_strike`),
      medicaments: this.getValue(items, `medicaments`),
      gravibomb: this.getValue(items, `gravibomb`),
      shields: this.getValue(items, `shields`),
      spaceMines: this.getValue(items, `space_mines`),
      repairDrones: this.getValue(items, `repair_drones`),
      adaptiveShield: this.getValue(items, `adaptive_shield`),
      ecm: this.getValue(items, `ecm`),
    };
  }

  private static getValue (obj: any, path: string, def: any = null) {
    return _.get(obj, path, def);
  }
}
