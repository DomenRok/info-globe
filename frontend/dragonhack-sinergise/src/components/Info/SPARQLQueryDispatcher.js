export class SPARQLQueryDispatcher {
	constructor() {
		this.endpoint = 'https://query.wikidata.org/sparql';
    }
    
    getPopulation(name) {
        const sparqlQuery = `SELECT ?population WHERE {
                                SERVICE wikibase:mwapi {
                                    bd:serviceParam mwapi:search "${name}" .    
                                    bd:serviceParam mwapi:language "en" .    
                                    bd:serviceParam wikibase:api "EntitySearch" .
                                    bd:serviceParam wikibase:endpoint "www.wikidata.org" .
                                    bd:serviceParam wikibase:limit 1 .
                                    ?item wikibase:apiOutputItem mwapi:item .
                                }
                                ?item wdt:P1082 ?population
                            }`;
        
        return this.query( sparqlQuery );
    }

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}