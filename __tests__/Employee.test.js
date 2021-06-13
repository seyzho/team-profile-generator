const Employee = require('../lib/Employee');

test('create an employee object', () => {
  const employee = new Employee('khan', '7', 'someemail@gmail.com');

  expect(employee.name).toBe('khan');
  expect(employee.id).toBe('7');
  expect(employee.email).toBe('someemail@gmail.com');
});


