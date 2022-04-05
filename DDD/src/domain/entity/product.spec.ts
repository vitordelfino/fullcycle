import { Product } from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Produto 1", 100);
    }).toThrowError("id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("1", "", 100);
    }).toThrowError("name is required");
  });

  it("should throw error when price is less then 0", () => {
    expect(() => {
      new Product("1", "Produto 1", -1);
    }).toThrowError("price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changeName("Produto 2");
    expect(product.name).toBe("Produto 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Produto 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
})
