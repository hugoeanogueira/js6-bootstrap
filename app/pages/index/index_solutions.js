
// get scss
require('./index.scss');

var BaseView = require('../../base_view'),
    $ = require('../../bower_components/jquery/dist/jquery');



/**
 * List all repositories from:
 * https://api.github.com/users/mralexgray/repos
 */

class IndexPage extends BaseView {

    constructor(opts) {
        super(opts);
    }

    getUserRepositories(username) {

        var url = 'https://api.github.com/users/' + username + '/repos';

        return new Promise((resolve, reject) => {
            $.ajax(url, {
                success: function (data) {
                    resolve(data);
                    return this;
                },
                error: function (err) {
                    reject(err);
                    return this;
                }
            });
        }).then((repos) => {
            return {
                username: username,
                repos: repos
            };
        });
    }

    /**
     * Template
     * @param  {String} data.username
     * @param  {Array} data.repos
     * @chainable
     */
    template(data={}) {
        console.log('--- template ---\n', data);


        var reposHtml = data.repos.map((repo) => {
                return `<li>${repo.full_name}<li>`;
            });

        return `
            <div class="page page--index">
                <h1>${data.username}'s github repositories:</h1>
                <ul>
                    ${reposHtml}
                </ul>
            </div>
        `;
    }

}

module.exports = IndexPage;




