/**
 * APPLICATION STARTING POINT
 */

require('./application.scss');


var $app      = document.getElementById('app'),
    IndexPage = require('./pages/index/index'),
    indexPage = new IndexPage();


// must set the root element to enable render
indexPage.setRootElement($app);


// get user repositories and render them
indexPage.getUserRepositories('mralexgray')
    .then((data) => indexPage.render(data))
    .catch((err) => {
        console.log('ERROR loading repositories...', err);
    });
