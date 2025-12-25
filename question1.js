// get the json data from the data.json file
const data = require("./data.json"); 
// ---------------------------------------------------

// Get average budget of all active campaigns from Marketing department
let totalBudget = 0;
let activeCampaignCount = 0;

data.departments.forEach(dept => {
  if (dept.name === "Marketing") {
    dept.teams.forEach(team => {
      if (team.campaigns && team.campaigns.length > 0) {
        team.campaigns.forEach(campaign => {
          if (campaign.active === true) {
            totalBudget += campaign.budget;
            activeCampaignCount++;
          }
        });
      }
    });
  }
});

let averageBudget = 0;
if (activeCampaignCount > 0) {
  averageBudget = totalBudget / activeCampaignCount;
}

console.log(
  "Average budget of active marketing campaigns:",
  averageBudget
);
// ---------------------------------------------------

// Get completed projects from Engineering department
const completedProjects = [];

data.departments.forEach(dept => {
  if (dept.name === "Engineering") {
    dept.teams.forEach(team => {
      if (team.projects) {
        team.projects.forEach(project => {
          if (project.completed === true) {
            completedProjects.push(project.name);
          }
        });
      }
    });
  }
});

console.log("Completed Engineering projects:",completedProjects);
// ---------------------------------------------------

// Get single manager who has more running or high budget projects or campaigns
const managerStats = {};

data.departments.forEach(dept => {
  dept.teams.forEach(team => {
    const managerName = team.lead.name;

    // initialize count if not present
    if (!managerStats[managerName]) {
      managerStats[managerName] = 0;
    }

    // Engineering projects
    if (team.projects) {
      team.projects.forEach(project => {
        if (!project.completed || project.budget > 85000) {
          managerStats[managerName]++;
        }
      });
    }

    // Marketing campaigns
    if (team.campaigns) {
      team.campaigns.forEach(campaign => {
        if (campaign.active || campaign.budget > 85000) {
          managerStats[managerName]++;
        }
      });
    }
  });
});

// Find manager with max count
let topManager = null;
let maxCount = 0;

for (let manager in managerStats) {
  if (managerStats[manager] > maxCount) {
    maxCount = managerStats[manager];
    topManager = manager;
  }
}

console.log("Manager with most running/high budget work:",topManager);
// ---------------------------------------------------

// Return project names whose team members are the same
const teamMap = {};
const sameTeamProjects = [];

data.departments.forEach(dept => {
  if (dept.name === "Engineering") {
    dept.teams.forEach(team => {
      team.projects.forEach(project => {
        // sorting so order not affect comparison
        const membersKey = project.team_members
          .slice()
          .sort()
          .join(",");

        if (teamMap[membersKey]) {
          sameTeamProjects.push(
            project.name,
            teamMap[membersKey]
          );
        } else {
          teamMap[membersKey] = project.name;
        }
      });
    });
  }
});

// remove duplicates before printing
const uniqueSameTeamProjects = [...new Set(sameTeamProjects)];

console.log("Projects with same team members:",uniqueSameTeamProjects);