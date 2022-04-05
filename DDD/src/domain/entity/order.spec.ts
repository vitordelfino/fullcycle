import { Order } from "./order";
import { OrderItem } from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customer is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError("customerId is required");
  })
  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", "123", []);
    }).toThrowError("items are required");
  })

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "item 1", 10, "p1", 2);
    const item2 = new OrderItem("2", "item 2", 20, "p2", 3);

    const order = new Order("1", "123", [item1, item2]);

    expect(order.total()).toBe(80);
  })

  it("should check if the qte qtd is greater than 0", () => {
    const item = new OrderItem("1", "item 1", 10, "p1", 0);
    expect(() => {
      new Order("1", "123", [item]);
    }).toThrowError("quantity must be greater than 0");
  })
});
