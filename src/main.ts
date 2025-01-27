import { LitElement, html } from 'lit-element'
import { litFetch } from './../lib/lit-fetch.js'

class MyElement extends litFetch(LitElement, 'lisam', '/api/data/:id/:lisa') {
   
    override connectedCallback(): void {
        super.connectedCallback();
        this.lisamData
        this.lisamFetch({ name: 'dd'});
        this.
    }

    render() {
        return html`
            <h1>Hello, World!</h1>
        `
    }
}