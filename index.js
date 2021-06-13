const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generatePage = require("./src/template");
const fs = require("fs");

const employees = [];
const prompts = [];
const promptData = [
    {
        "type": 'text',
        "name": 'name',
        "message": "enter employee name",
        "errorMeassage": "err: enter employee name"
    },
    {
        "type": 'text',
        "name": 'id',
        "message": 'enter employee id',
        "errorMessage": 'err: enter employee id',
    },
    {
        "type": 'text',
        "name": 'email',
        "message":'enter employee email address',
        "errorMessage": 'err: enter eployee email address',
    },
    {
        "type": 'list',
        "name": 'role',
        "message": "select the employee's current role",
        "choices": ["Manager", "Engineer", "Intern"],
    },
];

buildPrompt = (promptData) => {
    prompt = {
        type: promptData["type"],
        name: promptData["name"],
        message: promptData["message"],
    };

    if (promptData["type"] == "text") {
        prompt["validate"] = (input) => {
            if (!input) {
                console.log(promptData["errorMessage"]);
            }
            return Boolean(input);
        }
    } else {
        prompt["choices"] = promptData["choices"];
    }
    return prompt;
}

addMember = () => {

    promptData.forEach(promptData => {
        prompts.push(buildPrompt(promptData));
    });

    return inquirer.prompt(prompts)
    .then(({name, id, email, role}) => {
        let employeeRole = "";
        if (role === "Manager") {
            employeeRole = "Office Number"
        } else if (role === "Engineer") {
            employeeRole = "Github"
        } else {
            employeeRole = "School"
        }
        inquirer.prompt([{
            type: "text",
            name: "employeeRole",
            message: `enter your employee's ${employeeRole}`,
        },
        {
            type: "list",
            name: "addEmployee",
            Message: "would you like to add any more employees",
            choices: [
                "yes",
                "no",
            ]
        }])
        .then(({ employeeRole, addEmployee}) => {
            let newEmployee;
            if (role === "Manager") {
                newEmployee = new Manager(name, id, email, employeeRole);
            } else if (role === "Engineer") {
                newEmployee = new Engineer(name, id, email, employeeRole);
            } else {
                newEmployee = new Intern(name, id, email, employeeRole);
            }
            employees.push(newEmployee);
            if (addEmployee === "yes") {
                addMember();
                generateProfile(newEmployee);
            } else {
                generateProfile(newEmployee);
                closeHTML();
            }
        })
    })
}

const generateProfile = (answers) => {
    return new Promise((resolve, reject) => {
        const name = answers.getName();
        const role = answers.getRole();
        const id = answers.getId();
        const email = answers.getEmail();
        let profile = 
        `<div class="col-4">
        <div class="card mx-auto mb-3" style="width: 18rem">
          <h4 class="card-header text-white bg-info">${name}<br /><br />
          <i class="fas fa-user-circle"></i> ${role}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${id}</li>
            <li class="list-group-item">Email Address: ${email}</li>`;
        if (role === "Manager") {
            const number = answers.getNumber();
            profile = profile +
            `
            <li class"list-group-item">Office Number: ${number}</li>
            `;
        } else if (role === "Engineer") {
            const github = answers.getGithub();
            profile = profile +
            `
            <li class="list-group-item">GitHub: ${github}</li>
            `;
        } else if (role === "intern") {
            const school = answers.getSchool();
            profile = profile +
            `
            <li class="list-group-item">School: ${school}</li>
            `;
        }
        profile = profile + 
          `</ul>
         </div>
        </div>`;

        fs.appendFile("./dist/output.html" , profile, err => {
            if (err) {
                reject(err);

                return
            }
        });
        return resolve({
            ok: true,
            message: "profile(s) added"
        });
    })
};

const closeHTML = () => {
    const closingHTML =
        `</div>
        </div>
      </body>
    </html>`;
        fs.appendFile("./dist/output.html", closingHTML, function (err) {
            if (err) {
                console.log(err);
            };
        });
        console.log("page creation success!");
}

addMember().then(generatePage);