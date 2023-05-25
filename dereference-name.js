class DereferenceName extends HTMLElement {

  constructor() {
    super();
    async function cc(e) {
      let url = "https://db.artsdata.ca/repositories/artsdata"
      if (e.innerHTML.startsWith('http') ) {
        let sparql = `construct { <${e.innerHTML}> <http://schema.org/name> ?c ; a ?type }  where { graph ?g { <${e.innerHTML}> <http://schema.org/name> ?c ; a ?type }} `
       
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
              e.innerHTML = `<div class="statement-object"><b>${json[0]["http://schema.org/name"][0]["@value"]}</b> <div class="alternate-name">${json[0]["@type"]}</div><rdf-link>${e.innerHTML}</rdf-link></div>`
          } else {
            e.innerHTML = `<rdf-link>${e.innerHTML}</rdf-link>`
          }


      }
    }

    cc(this)


  }
}

customElements.define("dereference-name", DereferenceName);