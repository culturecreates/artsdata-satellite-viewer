class PeopleOrgVignette extends HTMLElement {
  set entity(entity) {
    this.innerHTML = `
      <div  class="list-group">
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${encodeHTMLEntities(
              truncate(entity.name.fr || entity.name.en || entity.name["@none"] + " (missing lang)" || "")
            )}</div>
          ${entity.type}
          <br> 
          <a href='${entity.uri}'>${entity.uri}</a>  
          ${
            entity.missing
              ? ` <br>  potential linked entities ${JSON.stringify(entity.missing)}`
              : ""
          }
          ${
            entity.partOf
              ? ` <br>  Graphs: ${JSON.stringify(entity.partOf)}`
              : ""
          }
          ${
             !entity.sameAs
              ? `        <br> <form method="post" action="http://api.artsdata.ca/mint" class="inline">
          <input type="hidden" name="classToMint" value="schema:${entity.type}">
          <input type="hidden" name="externalUri" value="${entity.uri}">
          <input type="hidden" name="publisher" value="https://graph.culturecreates.com/id/footlight">
          <button type="submit" class="btn btn-danger">Mint</button>
          </form>
`
              : ""
          }
         
        </div>
        <span class="badge bg-secondary rounded-pill">${
          entity?.sameAs?.[0].uri[0] ? getK(entity.sameAs?.[0].uri) : ""
        }</span>
        </div>
      </div>`;
  }
}

function encodeHTMLEntities(rawStr) {
  return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
}

function getK(rawStr) {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}

const truncate = (input) =>
  input.length > 100 ? `${input.substring(0, 100)}...` : input;

customElements.define("people-org-vignette", PeopleOrgVignette);
