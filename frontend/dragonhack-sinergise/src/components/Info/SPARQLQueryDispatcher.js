export default class SPARQLQueryDispatcher {
	constructor() {
		this.endpoint = 'https://query.wikidata.org/sparql';
    }
    
    getCountryInfo(name) {
        const sparqlQuery = `SELECT ?population ?countryLabel ?geoshape ?locator ?area ?capitalLabel ?flag ?gdp WHERE {
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
                  wdt:P2046 ?area;
                  wdt:P36 ?capital;
                  wdt:P41 ?flag;
                  wdt:P4010 ?gdp
            OPTIONAL {
                ?item wdt:P242 ?locator;
            }
            OPTIONAL { ?item wdt:P3896 ?geoshape   }
          }`;
        
        return this.query( sparqlQuery );
    }

    getCityInfo(name) {
        const sparqlQuery = `SELECT ?population ?area ?locator ?countryLabel ?flag ?geoshape WHERE {
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
            OPTIONAL {
                ?item wdt:P242 ?locator;
            }
          }`;
        
        return this.query( sparqlQuery );
    }

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}