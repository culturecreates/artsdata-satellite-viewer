import { DisplayList } from "../utils/bilingual-array.js";
import { DateFormat } from "../utils/date-format.js";
import { LinkUrl, MintUrl } from  "../api.js";

class EventVignette extends HTMLElement {
  set entity(entity) {
    this.innerHTML = `
      <div  class="list-group">
        <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold">${encodeHTMLEntities(DisplayList(entity.name))}
            </div>
            <a href='${entity.uri}'>${entity.uri}</a>  
            <br>
            ${entity.type} -  ${DateFormat(entity.startDate['@value'])}  
            <br>
            ${DisplayList(entity.location)} 
          
            ${DisplaySimilarEvents(entity.missing, entity?.sameAs?.[0].uri, entity.type)}
        
            ${
             !entity.sameAs
              ? ` <br> <form method="post" action="${MintUrl}" class="inline">
              <input type="hidden" name="classToMint" value="schema:${entity.type}">
              <input type="hidden" name="externalUri" value="${entity.uri}">
              <input type="hidden" name="publisher" value="https://graph.culturecreates.com/id/footlight">
              <button type="submit" class="btn btn-danger">Mint</button>
              </form> `
              : ""
            }
            ${
              entity.partOf
                ? ` <br>  Graphs: ${JSON.stringify(entity.partOf)}`
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
  if (rawStr) {
    return rawStr.replace(/[\u00A0-\u9999<>\&]/g, (i) => `&#${i.charCodeAt(0)};`);
  } else {
    return "no string"
  }
 
}

function getK(rawStr) {
  return rawStr.replace(/http:\/\/kg.artsdata.ca\/resource\//g, "");
}



let DisplaySimilarEvents = (links, adUri, classToLink) => {
  let html = '';
  if (links) {
    if ( !Array.isArray(links) ) {
      links = new Array(links)
    } ;
    
      html += '<br>Matching date and place: <ul>';
      links.forEach(element => {
        html += `<li>`
        if (adUri && element.uri &&  element.uri.split("/").at(-1)[0] != "K" &&  element.sameAs == null ) {
          html += `<form method="post" action="${LinkUrl}" class="inline">
            <input type="hidden" name="classToLink" value="schema:${classToLink}">
            <input type="hidden" name="externalUri" value="${element.uri}">
            <input type="hidden" name="adUri" value="${adUri}">
            <input type="hidden" name="publisher" value="https://graph.culturecreates.com/id/footlight">
            <button type="submit" class="btn btn-info">Link ${element.uri.split("/").at(-1)} to ${adUri} </button>
          </form>`
        }
       
        html += JSON.stringify(element) ;
      });
      html += '</ul>';
  }
 return html;
}

customElements.define("event-vignette", EventVignette);
