class DereferenceName extends HTMLElement {

  constructor() {
    super();
    async function cc(e) {
      let url = "https://db.artsdata.ca/repositories/artsdata"
      if (e.innerHTML.startsWith('http') ) {
        let sparql = `construct { 
          <${e.innerHTML}> <http://schema.org/name> ?c ; 
          a ?type ; 
          <http://schema.org/streetAddress> ?street  ;  
          <http://schema.org/addressLocality> ?locality ;  
          <http://schema.org/postalCode> ?postalCode . 
        } 
        where { 
          OPTIONAL { <${e.innerHTML}> <http://www.w3.org/2000/01/rdf-schema#label> ?c . } 
          graph ?g { 
            <${e.innerHTML}> a ?type 
            OPTIONAL { <${e.innerHTML}>   <http://schema.org/streetAddress> ?street ; 
              <http://schema.org/addressLocality> ?locality ; 
              <http://schema.org/postalCode> ?postalCode . }
          }
        } `
       
          const res = await fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/ld+json',
            },
            body: 'query=' + sparql,
          });
          const json = await res.json();
          console.log(e.innerHTML,json)
          if (json.length > 0) {
              e.innerHTML = `<div class="statement-object">
                <b>${json[0]?.["http://schema.org/name"]?.[0]?.["@value"] ||  json[0]["http://schema.org/streetAddress"][0]["@value"] + ', ' + json[0]["http://schema.org/addressLocality"][0]["@value"] + ', ' + json[0]["http://schema.org/postalCode"][0]["@value"] }</b> 
                <div class="alternate-name">${json[0]["@type"] }</div>
                <rdf-link>${e.innerHTML}</rdf-link></div>`
          } else {
            e.innerHTML = `<rdf-link>${e.innerHTML}</rdf-link>`
          }


      }
    }

    cc(this)


  }
}

customElements.define("dereference-name", DereferenceName);