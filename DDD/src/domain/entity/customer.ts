import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active?: boolean;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); 
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }
  
  get rewardPoints(): number {
    return this._rewardPoints;
  }
  
  get address(): Address {
    return this._address;
  }

  isActive(): boolean {
    return !!this._active;
  }

  validate() {
    if(!this._id) {
      throw new Error('Id is required');
    }
    if(!this._name) {
      throw new Error('Name is required');
    }
  }
  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if(!this._address) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
