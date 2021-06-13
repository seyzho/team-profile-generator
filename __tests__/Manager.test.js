const Manager = require("../lib/Manager");

test("create a number object", () => {
    const numberObject = "510 777 7777"
    const manager = new Manager("khan", "7", "someemail@gmail.com", numberObject);

    expect(manager.number).toBe(numberObject);
});