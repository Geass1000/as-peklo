import * as WS from '@nestjs/websockets';
import { Client, Server } from 'socket.io';

import * as _ from 'lodash';
import * as Rx from 'rxjs';

import { User } from './../../../decorators';

import { GamesService } from './games.service';
import * as Interfaces from './games.interfaces';
import * as Nest from '@nestjs/common';
import { GamesHelper } from './games.helper';
import * as DTO from './games.dto';
import * as Enums from './games.enums';

@WS.WebSocketGateway()
export class GamesController {
  constructor (
    private gamesService: GamesService
  ) {}

  @WS.SubscribeMessage('events')
  async produceArmoryItems (client: Client, data: DTO.ArmoryConveyor) {
    const gameInfo = await this.gamesService.getGameInfo(data.user);
    const factories = GamesHelper.getArmoryFactories(gameInfo);

    const landArmories = [
      Enums.ArmoryType.AirStrike,
      Enums.ArmoryType.Medicaments,
      Enums.ArmoryType.Gravibomb,
      Enums.ArmoryType.Shields,
    ];

    const spaceArmories = [
      Enums.ArmoryType.SpaceMines,
      Enums.ArmoryType.AdaptiveShield,
      Enums.ArmoryType.RepairDrones,
      Enums.ArmoryType.Ecm,
    ];

    const rxLand = this.produceArmoryItemsForFactory(
      client, data, gameInfo,
      factories.land, landArmories);
    const rxSpace = this.produceArmoryItemsForFactory(
      client, data, gameInfo,
      factories.space, spaceArmories);

    return Rx.concat(rxLand, rxSpace)
      .map((order) => ({ event: `update`, data: order }));
  }

  private produceArmoryItemsForFactory (
    client: Client,
    data: DTO.ArmoryConveyor,
    gameInfo: any,
    factory: number,
    factoryArmories: Enums.ArmoryType[],
  ) {
    // Gets factory's contracts
    const factoryContracts = GamesHelper
      .getFactoryContracts(gameInfo, factory);

    // Groups factory's orders
    const factoryOrders = _.filter(data.armoryOrders, (armoryOrder) => {
      return _.includes(factoryArmories, armoryOrder.type);
    });

    // Adds first `land` order to produce
    if (factoryContracts.length === 0 && factoryOrders.length !== 0) {
      return this.addOrder(factoryOrders[0], data.user, factory)
        .concatMap((contractId) => {
          const rxOrders = this.handleOrderList(factoryOrders, data.user, factory);
          const rxFirstOrder = this.collectContract(contractId, data.user, factory)
            .map(() => factoryOrders[0]);
          return Rx.concat(rxOrders, rxFirstOrder);
        });
    }

    return this.handleOrderList(factoryOrders, data.user, factory);
  }

  private addOrder (order: DTO.ArmoryOrder, user: DTO.User, factory: number) {
    return Rx.from(this.gamesService.addArmory(user, {
        building: factory,
        type: order.type,
      }))
      .retry(3)
      .do(() => { order.count--; });
  }

  private collectContract (contractId: string, user: DTO.User, factory: number) {
    return Rx.from(this.gamesService.collectArmory(user, contractId))
      .retry(3);
  }

  private handleOrderList (
    orderList: DTO.ArmoryOrder[],
    user: DTO.User,
    factory: number
  ) {
    return Rx.from(orderList)
      .concatMap((order) => {
        return Rx.range(1, order.count)
          .concatMap(() =>
            this.addOrder(order, user, factory))
          .concatMap((contractId) =>
            this.collectContract(contractId, user, factory))
          .map(() => order);
      });
  }
}
