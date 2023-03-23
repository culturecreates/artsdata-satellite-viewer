export const DisplayList = (list) => {
  var html = "";
  if (Array.isArray(list)) {
    list.forEach((item) => {
      if (item.name != undefined) {
        let id;
        if (item.uri) {
          id = ` (${item.uri.split('/').at(-1)}) ` 
        }
      html += `${item.name.fr || item.name.en || ""}${id}<br>`;
    }
    });
  
  } else {
    html += `${list?.fr || list?.en ||  list?.["@none"] + " (missing lang)" || ""}   `;
  }

  return html;
};
