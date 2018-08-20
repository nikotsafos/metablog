//Requires
var fs = require("fs");

//Define helper functions to do my I/O
function getAllTeams() {
  var teams = fs.readFileSync("./models/data.json");
  return JSON.parse(teams);
}

function getOneTeam(teamName) {
  var teams = getAllTeams();

  for(var i = 0; i < teams.length; i++){
    if(teams[i].name === teamName){
      return teams[i];
    }
  }

  return { name: "Error: Team doesn't exist", members: "N/A"};
}

function addTeam(teamData){
  var teams = getAllTeams();
  teams.push(teamData);
  writeOutData(teams);
}

function editTeam(teamName, teamData){
  var teams = getAllTeams();

  for(var i = 0; i < teams.length; i++){
    if(teams[i].name === teamName){
      teams[i] = teamData;
    }
  }

  writeOutData(teams);
}

function deleteTeam(teamName){
  var teams = getAllTeams();
  var index = -1;

  for(var i = 0; i < teams.length; i++){
    if(teams[i].name === teamName){
      index = i;
      break;
    }
  }

  teams.splice(index, 1);
  writeOutData(teams);
}

//Private helper function, used to reduce repeated code
function writeOutData(teamData){
  fs.writeFileSync("./models/data.json", JSON.stringify(teamData));
}

module.exports = {
  getAllTeams: getAllTeams,
  getOneTeam: getOneTeam,
  addTeam: addTeam,
  editTeam: editTeam,
  deleteTeam: deleteTeam
}
