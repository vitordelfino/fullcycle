import { ProductInterface } from "./product.interface";

export class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  validate() {
    if(!this._id) {
      throw new Error('Product id is required');
    }
    if(!this._name) {
      throw new Error('Product name is required');
    }
    if(this._price < 0) {
      throw new Error('Product price must be greater than 0');
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price * 2;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }
}
