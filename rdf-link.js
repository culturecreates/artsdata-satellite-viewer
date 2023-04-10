class RdfLink extends HTMLElement {

  constructor() {
    super();
    console.log(`RDF link: ${this.innerText}`);
    if (this.innerText.startsWith('http')) {
      this.innerHTML = `<a href=${this.innerText}>${this.innerText}</a>`
    }
  }
}

customElements.define("rdf-link", RdfLink);