/**
 * Base view
 */
class BaseView {

    constructor(opts={}) {
        this.setRootElement(opts.el);
    }

    setRootElement(el) {
        this.el = el;
    }

    /**
     * Compiles the data through the template generating
     * the final html.
     * @param {Object} data  Data to compile
     * @return {String}      HTML
     */
    template(data) {

        var html = '';

        html += '<div>insert content here!</div>';

        return html;
    }

    /**
     * Render template into target element
     * @param  {Object} el    Target element
     * @param  {Object} data  Data to be compiled
     * @chainable
     */
    render(data={}) {

        var html = this.template(data);

        if (this.el) {
            this.el.innerHTML = html;
        }

        return this;
    }
}

module.exports = BaseView;
