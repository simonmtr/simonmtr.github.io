commandstack = []
updowncounter = 1

document.getElementById('cmd-output').innerText = get_help_text()
document.getElementById("prompt").textContent = 'user@simonmtr.github.io % ';
document.getElementById("cmd-input")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    switch (event.key) {
      case 'Enter':
        handleEnterInput(document.getElementById('cmd-input').value.toLowerCase())
        break;
      case 'ArrowUp':
        if (updowncounter <= commandstack.length) {
          document.getElementById("cmd-input").value = commandstack[commandstack.length - updowncounter]
          updowncounter++
        }
        break;
      case 'ArrowDown':
        if (updowncounter > 2) {
          updowncounter--
          document.getElementById("cmd-input").value = commandstack[(commandstack.length - updowncounter) + 1]
        }
        break;
      default:
        break;
    }
  });

function handleEnterInput(currentInput) {
  document.getElementById('cmd-output').innerText += currentInput + '\n'
  if (currentInput) {
    commandstack.push(currentInput)
  }
  var output = interpretTerminalInput(currentInput)
  document.getElementById('cmd-output').innerText += output + '\n'
  document.getElementById('cmd-input').value = ''
}

json_cv = JSON.parse(get_cv_json())
function interpretTerminalInput(input) {
  if (input.startsWith('cli pi')) {
    flags = input.substring(7).split(" ")
    return interpretCVFlags(flags)
  } else {
    switch (input) {
      case 'cli --help':
      case 'cli -h':
        return get_help_text();
      case 'cli copyright':
        return "This code is copyrighted by Simon Treutlein."
      default:
        document.getElementById("prompt").textContent = 'user@simon-treutlein.dev # ';
        return 'Command not found: ' + input + " -> For help please type \'--help\'"
    }
  }
}

function interpretCVFlags(flags) {
  returnstring = ''
  flags.forEach(flag => {
    if (flag.substring(0, 2) == '--') {
      flag = flag[2]
    }
    if (flag[0] === '-') {
      newflags = flag.split('')
      newflags.shift()
      returnstring += interpretCVFlags(newflags)
      return
    }
    switch (flag) {
      case 'h':
        returnstring += get_help_text()
        break;
      case 'f':
        returnstring += '\n### full json ###\n'
        returnstring += JSON.stringify(json_cv);
        returnstring += '\n### full json end ###'
        break;
      case 'i':
        returnstring += '\n### information ###\n'
        returnstring += `${json_cv.name}\n${json_cv.info}`
        returnstring += '\n### information end ###'
        break;
      case 'c':
        returnstring += '\n### contact ###\n'
        returnstring += json_cv.contact
        returnstring += '\n### contact end ###'
        break;
      case 'u':
        returnstring += '\n### urls ###'
        json_cv.urls.forEach(url => {
          returnstring += `\n-> ${url}`
        })
        returnstring += '\n### urls end ###'
        break;
      case 'w':
        returnstring += '\n### work-experience ###'
        json_cv.workexperience.toReversed().forEach(experience => {
          returnstring += `\n<-- ${experience.company} -->\n`
          returnstring += `${experience.startdate} - ${experience.enddate}\n`
          returnstring += `${experience.location}\n`
          returnstring += `${experience.title}\n`
          experience.information.forEach(information => { returnstring += ` - ${information}\n` })
          returnstring += `Technologies: ${experience.technologies}`
          returnstring += '\n<---->'
        });
        returnstring += '\n### work-experience end ###'
        break;
      case 'e':
        returnstring += '\n### education ###'
        json_cv.education.forEach(education => {
          returnstring += `\n<-- ${education.degree} -->\n`
          returnstring += `${education.startdate} - ${education.enddate}\n`
          returnstring += `${education.institute}\n`
          returnstring += `${education.name}\n`
          returnstring += `${education.information}\n`
          returnstring += education.focus
          returnstring += '\n<---->'
        })
        returnstring += '\n### education end###'
        break;
      case 'p':
        returnstring += '\n### projects ###'
        json_cv.projects.forEach(project => {
          returnstring += `\n<-- ${project.name} -->\n`
          returnstring += `${project.startdate} - ${project.enddate}\n`
          returnstring += `${project.company}\n`
          returnstring += `${project.information}\n`
          returnstring += `${project.technologies}\n`
          returnstring += project.link
          returnstring += '\n<---->'
        })
        returnstring += '\n### projects end ###'
        break;
      case 's':
        returnstring += '\n### skills ###\n'
        returnstring += `Programming Languages: ${json_cv.skills.programminglanguages}\n`
        returnstring += `Technologies: ${json_cv.skills.technologies}\n`
        returnstring += `Languages: ${json_cv.skills.languages}`
        returnstring += '\n### skills end ###'
        break;
      default:
        returnstring = `ERROR: Flag ${flag} was not found. -> For help please type \'cli --help\'`
        break;
    }
  })
  return returnstring
}

/*
STATIC
*/
function get_cv_json() {
  return `{
    "name": "Simon Treutlein",
    "contact": "linkedin.com/in/simon-treutlein",
    "info": "I am a driven Devops software engineering graduate with a full stack background. I have first-hand experience on web development, microservices, API-management and Mobile App Development. I am used to working in multicultural teams in a world wide setting.",
    "urls": [
        "github.com/simonmtr",
        "linkedin.com/in/simon-treutlein",
        "leetcode.com/simonmtr",
        "simonmtr.github.io"
    ],
    "projects":[
      {
        "name": "Infinite Monkey Theorem Genetic Algorithm",
        "company": "private project",
        "information": [
            "Development of an Genetic Algorithm for a subproblem of the infinite monkey theorem"
          ],
        "technologies": "C++, JavaScript",
        "startdate": "11/2024",
        "enddate": "11/2024",
        "link":"https://github.com/simonmtr/ga-infinite-monkey-theorem"
      },
      {
        "name": "CodinGame Participant",
        "company": "private project",
        "information": [
            "Participating in CodinGame Challenges (www.codingame.com)"
          ],
        "technologies": "C++, Python",
        "startdate": "12/2021",
        "enddate": "ongoing",
        "link":"https://github.com/simonmtr/codingame"
      },
      {
        "name": "Virtual Reality Driving Simulation",
        "company": "NTT Data",
        "information": [
            "Developing a virtual reality driving simulation for the HTC Vive"
          ],
        "technologies": "Unity, C#",
        "startdate": "09/2018",
        "enddate": "03/2019",
        "link":"https://innovationlab.fh-rosenheim.de/projekte/2018_DAS_ntt.pdf"
      },
      {
        "name": "Trivia Application",
        "company": "x-root",
        "information": [
            "Development of a cross-platform trivia application"
        ],
        "technologies":"Flutter, Dart, Google Firebase",
        "startdate": "09/2017",
        "enddate": "03/2018",
        "link":"https://innovationlab.fh-rosenheim.de/projekte/2018_SE2_x_root.pdf"
      }
    ],
    "workexperience": [
    {
        "company": "Mercedes-AMG GmbH",
        "location": "Affalterbach / Remote",
        "title": "Software Engineer",
        "information": [
          "Development of continuous testing pipeline for automotive software and hardware",
          "Responsible for Planning and Implementation of Web App for booking remote workstations",
          "Managing offshore development of UI in India: coordination, specifications, quality control"
        ],
        "technologies": "Python, Gitlab CI, AWS, OpenAPI, Docker",
        "startdate": "09/2023",
        "enddate": "ongoing"
      },  
      {
        "company": "Amadeus Data Processing GmbH",
        "location": "Erding / Remote",
        "title": "Software Engineer",
        "information": [
          "Continuing in Core Cloud Networking Team"
        ],
        "technologies": "Python, Flask, Jenkins, Microsoft Azure, Swagger, OpenAPI",
        "startdate": "04/2023",
        "enddate": "08/2023"
      },    
      { 
        "company": "Amadeus Data Processing GmbH",
        "location": "Erding / Remote",
        "title": "Junior Software Engineer",
        "information": [
          "Graduate program set for 18 months, rotation through two different teams for 9 months each:",
          "Core Cloud Networking:", 
          "Reducing of network security group amount by ~25% by implementing enhanced grouping l​​ogic",
          "Development of Python web application for configuring connectivity between cloud components",
          "NoSQL Datastores:",
          "Implementation of RBAC for Go web application used for patching and editing datastores",
          "Reduced deployment time of Redis datastores by ~4 times by improving logic of Jenkins pipelines"
        ],
        "technologies": "Python, Go, Flask, Jenkins, Docker, OpenAPI, Swagger, OpenShift, Microsoft Azure",
        "startdate": "10/2021",
        "enddate": "03/2023"
      },
      {
        "company": "Ausy Technologies Germany GmbH",
        "location": "Munich",
        "title": "Master Thesis",
        "information": [
          "Development of two GraphQL servers, one REST server and one cross-platform application",
          "Comparison of performance, testability, error handling between REST and GraphQL"
        ],
        "technologies": "Node.js, Express.js, Flutter, Dart, PostgreSQL, GraphQL, REST",
        "startdate": "11/2020",
        "enddate": "04/2021"
      },
      {
        "company": "Wohnungshelden GmbH",
        "location": "Munich",
        "title": "Working Student",
        "information": [
            "Full Stack development of a cloud-based SaaS Solution to manage real estate properties",
            "Development of microservices as well as creation and extension of automated tests"
        ],
        "technologies": "Java, Spring, Angular, Jenkins, Docker, TypeScript, Google Cloud",
        "startdate": "09/2019",
        "enddate": "03/2020"
        },
        {
          "company": "Wohnungshelden GmbH",
          "location": "Munich",
          "title": "Bachelor Thesis",
          "information": [
              "Design and Development of continuously integrated contract tests for microservices"
          ],
          "technologies": "Pact, Java, Spring Boot, Angular, Jenkins, Docker, TypeScript, Google Cloud",
          "startdate": "03/2019",
          "enddate": "08/2019"
        },
        {
          "company": "Daimler AG",
          "location": "Sindelfingen",
          "title": "Intern",
          "information": [
              "Development of C# Software for manager reporting used productively in various Daimler plants"
          ],
          "technologies": "C#, .Net, Visual Basic for Applications (VBA)",
          "startdate": "09/2016",
          "enddate": "02/2017"
        }
    ],
    "education":[
      {
        "institute": "Rosenheim Technical University of Applied Science",
        "name": "Computer Science",
        "degree": "Master of Science",
        "information": "Thesis: 'Dynamic and flexible API-design with GraphQL' (written in german)",
        "focus": "Software Engineering",
        "startdate": "10/2019",
        "enddate": "04/2021"
      },
      {
          "institute": "Rosenheim Technical University of Applied Science",
          "name": "Computer Science",
          "degree": "Bachelor of Science",
          "information": "Thesis: 'Contract Testing for Microservices' (written in german)",
          "focus": "Software Engineering",
          "startdate": "03/2017",
          "enddate": "08/2019"
      },
      {
          "institute": "Rosenheim Technical University of Applied Science",
          "name": "Business Computer Science",
          "degree": "Bachelor of Science (not completed)",
          "information": "Change of studies to Computer Science in March 2017",
          "focus": "Software Engineering",
          "startdate": "10/2014",
          "enddate": "02/2017"
      }
    ],
    "skills": {
      "programminglanguages": "Python, Flask, OpenAPI/Swagger, REST, C++, Java, Spring, Go, JavaScript, TypeScript, C#",
      "frontend": "Angular, Nuxt.js, React.js, HTML, CSS, Flutter",
      "technologies": "Git, Docker, Gitlab CI, Jenkins, GraphQL, SQL, NoSQL, PostgreSQL, Azure, AWS",
      "languages": "german (native), english (C1+ certificate, fluent following work experience)",
      "Mentionable Certification": "ISTQB Tester Foundation Level (CTFL)"
    }
  }`
}

function get_help_text() {
  return `
  Usage: 
    cli pi [options]
    cli -h | --help
    cli copyright

  CLI
  This cli gives the option to give different information about Simon Treutlein in different output formats.

  Options:
    -h, --help              Show help for commands
    -f, --full              Show all information in JSON structure
    -i, --info              Show general information
    -c, --contact           Show contact information
    -u, --urls              Show urls of websites
    -w, --workexperience    Show work experience
    -e, --education         Show education
    -p, --projects          Show projects
    -s, --skills            Show skills of programming languages and technologies

  Commands:
    pi              Print info of CV in output

`
}