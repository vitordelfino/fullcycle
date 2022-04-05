import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order_item";

const customer = new Customer("123", "Vitor");
const address = new Address("Rua A", 123, "Cidade", "12345-678");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);
const order = new Order("1", "123", [item1, item2]);
