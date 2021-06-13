const Engineer = require("../lib/Engineer");

test("create a github object", () => {
    const githubObject = "somegithub";
    const engineer = new Engineer("khan", "7", "someemail@gmail.com", githubObject);

    expect(engineer.github).toBe(githubObject);
});