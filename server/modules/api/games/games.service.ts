import * as Nest from '@nestjs/common';
import * as Bluebird from 'bluebird';
import * as xml2js from 'xml2js';
import * as _ from 'lodash';

import { Games } from './games.interfaces';

import * as DTO from './games.dto';
import { RequestService } from '../../../core/sevices/request';
import * as RequestInterfaces from '../../../core/sevices/request/request.interfaces';
import * as RequestEnums from '../../../core/sevices/request/request.enums';

type ContractId = string;
type SId = string;

@Nest.Injectable()
export class GamesService {
  constructor (
    private requestService: RequestService
  ) {}

  async signIn (authCreds: DTO.SignIn): Promise<SId> {
    const reqData = `<auth uid="${authCreds.uid}" auth_key="${authCreds.auth_key}"/>`;

    const options = this.getReqOptions('auth', reqData);

    const resp = await this.requestService.requestPromise<any>(options);
    const respData = await this.parseXMLToJSON(resp);

    if (respData.error) {
      throw new Error(`Error ${JSON.stringify(respData.error)}`);
    }

    return _.get(respData, 'response.auth_ok.sid');
  }

  async getGameInfo (userCreds: DTO.User) {
    const reqData = `<get_game_info
      uid="${userCreds.uid}"
      auth_key="${userCreds.auth_key}"
      sid="${userCreds.sid}"/>`;

    const options = this.getReqOptions('command', reqData);

    const resp = await this.requestService.requestPromise<any>(options);
    const respData = await this.parseXMLToJSON(resp);

    if (respData.error) {
      throw new Error(`Error ${JSON.stringify(respData.error)}`);
    }

    return _.get(respData, 'response.init_game.user');
  }

  async addArmory (userCreds: Games.UserCredentials, armoryItem: Games.ArmoryItem): Promise<ContractId> {
    const reqData = `
      <start_contract
          uid="${userCreds.uid}"
          auth_key="${userCreds.auth_key}"
          sid="${userCreds.sid}">
        <building_id>${armoryItem.building}</building_id>
        <type>produce_${armoryItem.type}</type>
      </start_contract>`;

    const options = this.getReqOptions('command', reqData);

    const resp = await this.requestService.requestPromise<any>(options);
    const respData = await this.parseXMLToJSON(resp);

    if (respData.error) {
      throw new Error(`Error ${JSON.stringify(respData.error)}`);
    }

    return _.get(respData, 'response.contract_started._');
  }

  async collectArmory (userCreds: Games.UserCredentials, contractId: ContractId) {
    const reqData = `
      <collect_contract
          uid="${userCreds.uid}"
          auth_key="${userCreds.auth_key}"
          sid="${userCreds.sid}">
        <id>${contractId}</id>
      </collect_contract>`;

    const options = this.getReqOptions('command', reqData);

    const resp = await this.requestService.requestPromise<any>(options);
    const respData = await this.parseXMLToJSON(resp);

    if (respData.error) {
      throw new Error(`Error ${JSON.stringify(respData.error)}`);
    }

    return _.get(respData, 'response');
  }

  private getReqOptions (path: string, data: any): RequestInterfaces.Request.Options {
    return {
      domainName: 'https://game-r02vk.rjgplay.com',
      port: 80,
      path: path,
      method: RequestEnums.RequestType.Post,
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };
  }

  private parseXMLToJSON<T> (xmlSOAPResp: string): Bluebird<any> {
    return new Bluebird((resolve, reject) => {
      xml2js.parseString(xmlSOAPResp, {
        explicitArray: false,
        valueProcessors: [
          xml2js.processors.parseBooleans,
        ],
      }, (err, result) => {
        resolve(result);
      });
    });
  }
}
