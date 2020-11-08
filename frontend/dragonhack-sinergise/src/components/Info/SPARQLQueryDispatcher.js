export default class SPARQLQueryDispatcher {
	constructor() {
		this.endpoint = 'https://query.wikidata.org/sparql';
    }
    
    getCountryInfo(name) {
        const sparqlQuery = `SELECT ?population ?countryLabel ?geoshape ?area ?capitalLabel ?flag ?gdp WHERE {
            SERVICE wikibase:mwapi {
                bd:serviceParam mwapi:search "${name}" .    
                bd:serviceParam mwapi:language "en" .    
                bd:serviceParam wikibase:api "EntitySearch" .
                bd:serviceParam wikibase:endpoint "www.wikidata.org" .
                bd:serviceParam wikibase:limit 1 .
                ?item wikibase:apiOutputItem mwapi:item .
            }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
            ?item wdt:P1082 ?population;
                  wdt:P17 ?country;
                  wdt:P3896 ?geoshape;
                  wdt:P2046 ?area;
                  wdt:P36 ?capital;
                  wdt:P41 ?flag;
                  wdt:P4010 ?gdp
          }`;
        
        return this.query( sparqlQuery );
    }

    getCityInfo(name) {
        const sparqlQuery = `SELECT ?population ?area ?countryLabel ?flag ?geoshape WHERE {
            SERVICE wikibase:mwapi {
                bd:serviceParam mwapi:search "${name}" .    
                bd:serviceParam mwapi:language "en" .    
                bd:serviceParam wikibase:api "EntitySearch" .
                bd:serviceParam wikibase:endpoint "www.wikidata.org" .
                bd:serviceParam wikibase:limit 1 .
                ?item wikibase:apiOutputItem mwapi:item .
            }
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
            ?item wdt:P1082 ?population;
                  wdt:P17 ?country;
                  wdt:P41 ?flag;
                  wdt:P2046 ?area
            OPTIONAL { ?item wdt:P3896 ?geoshape   }
          }`;
        
        return this.query( sparqlQuery );
    }

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}