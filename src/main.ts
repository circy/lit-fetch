import { LitElement, html } from 'lit-element'
import { litFetch } from './../lib/lit-fetch.js'

class MyElement extends litFetch(LitElement, '/api/data/:id', 'test') {
   
    override connectedCallback(): void {
        super.connectedCallback();
        this.te({ id: '123' });
    }

    render() {
        return html`
            <h1>Hello, World!</h1>
        `
    }
}