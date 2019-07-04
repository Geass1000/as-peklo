import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { model, Model, Document } from 'mongoose';

export class CRUDModel<T extends Document> {
  public className: string = 'CRUDModel';
  public model: Model<T>;

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * getMonitors - returns the list of documents (all).
   *
   * @return {Bluebird<T[]>}
   */
  public getAll(): Bluebird<T[]> {
    return Bluebird.resolve(this.model.find().exec());
  }

  /**
   * getById - returns the document by id.
   *
   * @return {Bluebird<T[]>}
   */
  public getById(id: string): Bluebird<T> {
    if (!_.isString(id) || !id) {
      throw new Error(`${this.className} - getById: ID is required!`);
    }

    return Bluebird.resolve(this.model.findOne({ _id: id }).exec());
  }

  /**
   * addOne - adds new document to the collection. As result returns the new document.
   *
   * @return {Bluebird<T>}
   */
  public addOne(obj: T): Bluebird<T> {
    if (!obj) {
      throw new Error(`${this.className} - addOne: Object is required!`);
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * addMany - adds new documents to the collection. As result returns the new documents.
   *
   * @return {Bluebird<T[]>}
   */
  public addMany(obj: T[]): Bluebird<T[]> {
    if (!obj) {
      throw new Error(`${this.className} - addMany: Objects are required!`);
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * updateById - updates the document by id. As result returns the updated document.
   *
   * @return {Bluebird<T[]>}
   */
  public updateById(id: string, obj: T): Bluebird<T> {
    if (!_.isString(id) || !id) {
      throw new Error(`${this.className} - updateById: ID is required!`);
    }

    if (!obj) {
      throw new Error(`${this.className} - updateById: Object is required!`);
    }

    return Bluebird.resolve(this.model.findOneAndUpdate({
      _id: id
    }, obj, { new: true }).exec());
  }

  /**
   * removeById - finds and removes the document by id. As result returns the
   * removed document.
   *
   * @return {Bluebird<T>}
   */
  public removeById(id: string): Bluebird<T> {
    if (!_.isString(id) || !id) {
      throw new Error(`${this.className} - removeById: ID is required!`);
    }

    return Bluebird.resolve(this.model.findOneAndRemove({
      _id: id
    }).exec());
  }

  /**
   * dropCollection - drops the collection.
   *
   * @return {Bluebird<any>}
   */
  public dropCollection(): Bluebird<any> {
    return Bluebird.resolve(this.model.collection.drop());
  }
}
