import { OrderItem } from "./order_item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();

    this._total = this.total();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }
    if (!this._customerId) {
      throw new Error("customerId is required");
    }
    if (!this._items || this._items.length === 0) {
      throw new Error("items are required");
    }

    if(this._items.some(item => item.quantity <= 0)) {
      throw new Error("quantity must be greater than 0");
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total = this.total();
  }
}
