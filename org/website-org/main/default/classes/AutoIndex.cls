/**
 * Simple scheduled Apex class that fetches the open-force public repositories and adds them to our Resources object.
 */
public with sharing class AutoIndex implements Schedulable {

	public void execute(SchedulableContext sc) {

		fetchRepositories();
	}

	@Future(Callout=true)
	public static void fetchRepositories() {

		// set up an API call to Github
		HttpRequest req = new HttpRequest();
		req.setEndpoint('https://api.github.com/orgs/open-force/repos');
		req.setTimeout(120000);
		req.setMethod('GET');

		// Call the Github API to fetch information about open-force repositories
		JSONParse repos = new JSONParse(new Http().send(req).getBody());

		// Iterate through the repos we found and make sure we have a Resource created for each one
		List<Resource__c> resourcesToUpsert = new List<Resource__c>();
		for(JSONParse repo : repos.asList()) {
			resourcesToUpsert.add(new Resource__c(
				Canonical_URL__c = repo.get('html_url').getStringValue()
			));
		}
		upsert resourcesToUpsert Resource__c.Canonical_URL__c;
	}
}