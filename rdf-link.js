class RdfLink extends HTMLElement {

  constructor() {
    super();
    if (this.innerText.startsWith('http://kg.artsdata.ca/resource/')) {
      let adid = this.innerText.split('http://kg.artsdata.ca/resource/')[1]
      this.innerHTML = `<a href="http://artsdata-satellite-viewer.s3-website.ca-central-1.amazonaws.com/?adid=${adid}">${this.innerText}</a>`
    } else if (this.innerText.startsWith('http')) {
      this.innerHTML = `<a href=${this.innerText}>${this.innerText}</a>`
    }
  }
}

customElements.define("rdf-link", RdfLink);