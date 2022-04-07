import { Address } from "../value-object/address";
import { Customer } from "./customer";

describe("Customer unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "Jhon")).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Jhon");

    customer.changeName("Peter");

    expect(customer.name).toBe("Peter");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 123, "City", "12345");

    customer.address = address;
    customer.activate()

    expect(customer.isActive()).toBeTruthy();
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    customer.deactivate()

    expect(customer.isActive()).toBeFalsy();
  });

  it("should throw error when address is undefined when activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it('should add reward points', () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);
  });
});
