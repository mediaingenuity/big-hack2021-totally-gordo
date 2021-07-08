#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { run, getRepoList, getLastCommitBefore } = require("./utils");

// get repos that aren't jupyter notebooks:

const quarters = [
  new Date(2018, 0, 1), //jan
  // new Date(2018, 3, 1), // april
  new Date(2018, 6, 1), // july
  // new Date(2018, 9, 1), // october
  new Date(2019, 0, 1),
  // new Date(2019, 3, 1),
  new Date(2019, 6, 1),
  // new Date(2019, 9, 1),
  new Date(2020, 0, 1),
  // new Date(2020, 3, 1),
  new Date(2020, 6, 1),
  // new Date(2020, 9, 1),
  new Date(2021, 0, 1),
  // new Date(2021, 3, 1),
  new Date(2021, 6, 8),
];

const eligibleRepos = [
  "TotallyMoney.Remortgages",
  "CreditCards.WebApp",
  "basin.server",
  "TotallyMoney.Mortgages.Admin",
  "CreditCards.ProductCatalogue.Admin",
  "CreditCards.Consumer",
  "Marbles.Card",
  "Loans.Api",
  "Marbles.Card.Static",
  "Marbles.Card.Static.Aggregators.Welcome",
  "Marbles.Card.Static.Aggregators.Applynow",
  "Marbles.KeepAliveD",
  "Loans.WebApp",
  "Loans.Data.Api",
  "Loans.Consumer",
  "TotallyMoney.StaticSite",
  "Loans.Click.Api",
  "Loans.Cms",
  "CreditCards.Api2",
  "Click.Api",
  "Account",
  "CreditCards.ProductCatalogue",
  "Loans.Slack.Alerts",
  "CallCredit.Api",
  "Mortgages.WebApp",
  "Mortgages.Consumer",
  "Fluid.Static",
  "Fluid.Homepage",
  "Fluid.Form",
  "Fluid.Api",
  "devops",
  "Fluid.FakeIssuer",
  "Fluid.Test",
  "CreditCards.ScoreBuilder",
  "SftpLambda",
  "FreeCreditReport.Lambda",
  "LambdaS3ToDb_SanitizeData",
  "demographic-segment-service",
  "LambdaS3ToDb_BulkInsertToDb",
  "TotallyMoney.HackSessions",
  "Account.NativeApp",
  "Account.AppReviewPrompt",
  "LambdaZendeskProxy",
  "TotallyMoney.GlobalNav",
  "Zendesk.DataUpload.Lambda",
  "TotallyMoney.Team",
  "basin.js-client",
  "Account.NativeApp.Provisioning",
  "FirstImpressionsCalculations",
  "BasinToBlueshift",
  "Account.ConfigBackup",
  "fsharp-lambda-scaffold",
  "TotallyMoney.Snowflake.Lambda",
  "SignupForm",
  "TotallyMoney.DataRetriever.Lambda",
  "QueueShift",
  "TotallyMoney.UI",
  "CRM.UpdateEmailAddress",
  "CRM.EventAdapter",
  "TotallyMoney.Intranet.Lambda",
  "Judas.Silver",
  "TotallyMoney.Snowflake.ViewDefinitions",
  "Launchpad",
  "CreditCards.Provider.Tappily",
  "c-agent",
  "JWT.Authentication.Provider",
  "TotallyMoney.Static",
  "CreditCards.Defaqto.Api.v2",
  "HDClickShare.Lambda",
  "Loans.Lead.Api.Lambda",
  "Account.Disputes",
  "Account.Validation",
  "LogLeech",
  "CRM.BlueshiftIngest",
  "Energy.Backend",
  "affordability-questions-form",
  "Energy.WebApp",
  "TotallyMoney.GlobalAssets",
  "ApiGatewayAuthoriser",
  "CRM.Hello",
  "EmailVerificationService",
  "CreditReportAnalysis",
  "affordability-questions-api",
  "Monitoring.Data",
  "CreditCards.Providers.Monorepo",
  "FSharp.DynamoDBLockClient",
  "Pipeline.Api",
  "Judas.Web",
  "CarFinance",
  "DebtAnalysis.Flagging",
  "CreditCards.4K.Eligibility.Api",
  "CreditCards.4K.LeadData.Api",
  "TotallyMoney.Energy.ProductCatalogue",
  "SnsDelay",
  "CreditCards.PostOfficeAuth",
  "TMFooter.Legacy",
  "ASM.Subscription",
  "ApiGateway-Key-Rotator",
  "basin.sls",
  "employment-questions-api",
  "Account.CreditScore",
  "4K.Filters.Api",
  "CallCredit.ReportProxy",
  "AdminTool.Devices",
  "credit-assistant",
  "car-insurance",
  "JaffaCake.MagicLink.Auth",
  "CarInsurance.WebApp",
  "4K.Filters.FE",
  "CallCredit.ResilientClose",
  "4K.Filters.CMS",
  "CRM.Preferences",
  "DataKnox.CreditReport",
  "simple-account-authorizer",
  "Loans.Providers.Monorepo",
  "Atlas",
  "Preferences.WebApp",
  "DataServices.Lambda",
  "Account.LiveAlerts",
  "DataKnox.LiveAlerts",
  "GitHubPackageRegistry.Boilerplate",
  "Reprocessing",
  "CRM.LiveAlerts",
  "Account.Job.EnqueueAllKbaOkCustomers",
  "awsboard",
  "Account.Job.SendElectoralRollsToDataKnox",
  "Fluid.Guides",
  "Account.DailyIdCounter",
  "Offers.WebApp",
  "Static.NetlifyCms.Oauth",
  "basin",
  "Serverless.Loggly.Lambda",
  "Account.Suspensions",
  "Fluid.StaticPages",
  "RockLobster",
  "Account.BundleIdCounter",
  "DataServices.DataRequests",
  "NetlifyCMS.GitHub.OAuth.Provider",
  "Fluid.UI",
];

async function generateLocStats() {
  let repos = await getRepoList();
  repos = repos.filter((repo) => eligibleRepos.includes(repo.name));

  // initialise result
  const result = quarters.map((quarter) => ({
    date: quarter.toISOString(),
    repos: [],
  }));

  // for each repo
  for (repo of repos) {
    // clone it
    fs.mkdir(path.join(__dirname, "../../tmp"), () => {});
    process.chdir(path.join(__dirname, "../../tmp"));
    try {
      await run("git", `clone ${repo.ssh_url}`);
    } catch (e) {
      // shh is already cloned
    }

    // go through dates and do the thing;
    for (quarter of quarters) {
      console.log(`${repo.name} at ${quarter}`);

      // get last commit before that quarter
      const commit = await getLastCommitBefore(
        repo.name,
        quarter.toISOString()
      );

      if (!!commit) {
        // check it out and cloc it
        process.chdir(path.join(process.cwd(), repo.name));
        await run("git", `checkout ${commit.sha}`);
        process.chdir("../");
        const clocced = JSON.parse(
          await run("npx", `cloc ${repo.name} --skip-uniqueness --json`)
        );

        const locByFileType = Object.keys(clocced).reduce((acc, fileType) => {
          if (fileType === "header") {
            return acc;
          }
          acc[fileType] = clocced[fileType].code;
          return acc;
        }, {});

        // stick it in the right place
        result
          .find((item) => item.date === quarter.toISOString())
          .repos.push({
            name: repo.name,
            loc: locByFileType,
          });
      }
    }

    // return home;
    await run("rm", `-rf ${repo.name}`);
    process.chdir(__dirname);
    fs.writeFileSync(`./data.json`, JSON.stringify(result, null, 2), "utf8");
  }
}

generateLocStats();
