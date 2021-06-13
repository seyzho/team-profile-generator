const fs = require("fs");


function generatePage() {
    const templateHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css"
        integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
      <title>Team Members</title>
    </head>
  
    <body>
      <nav class="navbar bg-info mb-5">
        <span class="navbar-brand mb-0 h1 w-100 text-center">Team Members</span>
      </nav>
      <div class="col-12 col-md-12">
      <div class="containter">
        <div class="row">
  `;
  fs.writeFile("./dist/output.html", templateHTML, err => {
      if (err) {
          console.log(err)
      }
  })
};

module.exports = generatePage;

