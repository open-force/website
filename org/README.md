# open-force.org Salesforce Org Backend
This repository defines the schema and supporting code for the Salesforce org that is used as a backend datastore for the open-force.org website. The website code, a React app hosted on Heroku, is hosted at https://github.com/open-force/website.

This repo is in Salesforce DX project format, so you can clone it and spin up a scratch org if you would like to experiment or work on a pull request.

## Set up a scratch org

There is a build script you can run that will execute a series of DX commands:

    ./build
    
If you want to see some Resource records, you can run the AutoIndex class by pasting the following into Anonymous Apex:

    new AutoIndex().execute(null);

## Deploy to a production org

We deploy this repo to the live Salesforce org using these commands:

    sfdx force:source:convert --outputdir mdapi
    sfdx force:mdapi:deploy --deploydir mdapi --testlevel RunAllTestsInOrg -w 15 --targetusername <liveOrgUsername>