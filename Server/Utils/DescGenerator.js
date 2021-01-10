var Handlebars = require('handlebars');
export const descGenerator = function descGenerator(descArray) {
    let html = '';
    descArray.forEach(descObj => {
        switch (descObj.type) {
            case 'PARAGRAPH':
                html = html.concat(`<p class="desc-p">${descObj.value}</p>`) ;
                break;
        }
    });
    return new Handlebars.SafeString(html);
};