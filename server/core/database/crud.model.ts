import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { model, Model, Document } from 'mongoose';

export class CRUDModel<IModel, IModelDoc extends Document> {
  public className: string = 'CRUDModel';
  public model: Model<IModelDoc>;

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * Returns the list of documents (all).
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public getAll(): Bluebird<IModelDoc[]> {
    return Bluebird.resolve(this.model.find().exec());
  }

  /**
   * Returns the document by id.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public getById(id: string): Bluebird<IModelDoc> {
    if (!_.isString(id) || !id) {
      throw new Error(`${this.className} - getById: ID is required!`);
    }

    return Bluebird.resolve(this.model.findOne({ _id: id }).exec());
  }

  /**
   * Returns the document by specific conditions.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public get(conditions: any): Bluebird<IModelDoc> {
    return Bluebird.resolve(this.model.findOne(conditions).exec());
  }

  /**
   * Adds new document to the collection. As result returns the new document.
   *
   * @return {Bluebird<IModelDoc>}
   */
  public addOne(obj: IModel): Bluebird<IModelDoc> {
    if (!obj) {
      throw new Error(`${this.className} - addOne: Object is required!`);
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * Adds new documents to the collection. As result returns the new documents.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public addMany(obj: IModel[]): Bluebird<IModelDoc[]> {
    if (!_.isArray(obj)) {
      throw new Error(`${this.className} - addMany: Objects must be of type array!`);
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * Updates the document by id. As result returns the updated document.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public updateById(id: string, obj: IModelDoc): Bluebird<IModelDoc> {
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
   * Finds and removes the document by id. As result returns the
   * removed document.
   *
   * @return {Bluebird<IModelDoc>}
   */
  public removeById(id: string): Bluebird<IModelDoc> {
    if (!_.isString(id) || !id) {
      throw new Error(`${this.className} - removeById: ID is required!`);
    }

    return Bluebird.resolve(this.model.findOneAndRemove({
      _id: id
    }).exec());
  }

  /**
   * Drops the collection.
   *
   * @return {Bluebird<any>}
   */
  public dropCollection(): Bluebird<any> {
    return Bluebird.resolve(this.model.collection.drop());
  }
}
