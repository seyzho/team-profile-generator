const Intern = require ("../lib/Intern");


test("create a school object", () => {
    const schoolObject = "someschool";
    const intern = new Intern("khan", "7", "someemail@gmail.com", schoolObject)

    expect(intern.school).toBe(schoolObject);
});