"use strict";
var getImplicitRole_1 = require("../utils/getImplicitRole");
var JsxAttribute_1 = require("../utils/JsxAttribute");
var chai = require("chai");
/**
 * Unit test for getImplicitRole
 */
describe('getImplicitRole', function () {
    describe('a tag', function () {
        it('with href attribute, the implicit role is link', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<a href="hrefValue" />', 'a'))).to.equal('link');
        });
        it('without href attribute, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<a />', 'a'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('area tag', function () {
        it('with href attribute, the implicit role is link', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<area href="hrefValue" />', 'area'))).to.equal('link');
        });
        it('without href attribute, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<area />', 'area'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('article tag', function () {
        it('the implicit role is article', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<article />', 'article'))).to.equal('article');
        });
    });
    describe('aside tag', function () {
        it('the implicit role is complementary', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<aside />', 'aside'))).to.equal('complementary');
        });
    });
    describe('body tag', function () {
        it('the implicit role is document', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<body />', 'body'))).to.equal('document');
        });
    });
    describe('button tag', function () {
        it('the implicit role is button', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<button />', 'button'))).to.equal('button');
        });
    });
    describe('datalist tag', function () {
        it('the implicit role is listbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<datalist />', 'datalist'))).to.equal('listbox');
        });
    });
    describe('dd tag', function () {
        it('the implicit role is definition', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<dd />', 'dd'))).to.equal('definition');
        });
    });
    describe('details tag', function () {
        it('the implicit role is group', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<details />', 'details'))).to.equal('group');
        });
    });
    describe('dialog tag', function () {
        it('the implicit role is dialog', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<dialog />', 'dialog'))).to.equal('dialog');
        });
    });
    describe('dl tag', function () {
        it('the implicit role is list', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<dl />', 'dl'))).to.equal('list');
        });
    });
    describe('dt tag', function () {
        it('the implicit role is listitem', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<dt />', 'dt'))).to.equal('listitem');
        });
    });
    describe('footer tag', function () {
        it('with a ancestor of an article or section element, the implicit role is undefined', function () {
            var code1 = "\n      <article>\n        <footer />\n      </article>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code1, 'footer'))).to.equal(undefined, 'should undefined');
            var code2 = "\n      <section>\n        <div>\n          <footer />\n        </div>\n      </section>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code2, 'footer'))).to.equal(undefined, 'should undefined');
        });
        it('without a ancestor of an article or section element, the implicit role is contentinfo', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<footer></footer>', 'footer'))).to.equal('contentinfo');
        });
    });
    describe('form tag', function () {
        it('the implicit role is form', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<form> </form>', 'form'))).to.equal('form');
        });
    });
    describe('h1 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h1 />', 'h1'))).to.equal('heading');
        });
    });
    describe('h2 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h2 />', 'h2'))).to.equal('heading');
        });
    });
    describe('h3 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h3 />', 'h3'))).to.equal('heading');
        });
    });
    describe('h4 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h4 />', 'h4'))).to.equal('heading');
        });
    });
    describe('h5 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h5 />', 'h5'))).to.equal('heading');
        });
    });
    describe('h6 tag', function () {
        it('the implicit role is heading', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<h6 />', 'h6'))).to.equal('heading');
        });
    });
    describe('header tag', function () {
        it('with a ancestor of an article or section element, the implicit role is undefined', function () {
            var code1 = "\n      <article>\n        <header />\n      </article>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code1, 'header'))).to.equal(undefined, 'should undefined');
            var code2 = "\n      <section>\n        <header />\n      </section>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code2, 'header'))).to.equal(undefined, 'should undefined');
        });
        it('without a ancestor of an article or section element, the implicit role is banner', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<header></header>', 'header'))).to.equal('banner');
        });
    });
    describe('hr tag', function () {
        it('the implicit role is separator', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<hr />', 'hr'))).to.equal('separator');
        });
    });
    describe('img tag', function () {
        it('with alt attribute, the implicit role is img', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<img alt="altValue" />', 'img'))).to.equal('img');
        });
        it('without alt attribute, the implicit role is img', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<img />', 'img'))).to.equal('presentation');
        });
    });
    describe('input tag', function () {
        it('when type attribute value is button, image, reset or submit, the implicit role is button', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="button" />', 'input'))).to.equal('button');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="image" />', 'input'))).to.equal('button');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="reset" />', 'input'))).to.equal('button');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="submit" />', 'input'))).to.equal('button');
        });
        it('when type attribute value is pasword, the implicit role is textbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="password" />', 'input'))).to.equal('textbox');
        });
        it('when type attribute value is checkbox, the implicit role is checkbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="checkbox" />', 'input'))).to.equal('checkbox');
        });
        it('when type attribute value is radio, the implicit role is radio', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="radio" />', 'input'))).to.equal('radio');
        });
        it('when type attribute value is range, the implicit role is slider', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="range" />', 'input'))).to.equal('slider');
        });
        it('when type attribute value is number, the implicit role is spinbutton', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="number" />', 'input'))).to.equal('spinbutton');
        });
        it('when type attribute value is search and has no list attribute, the implicit role is searchbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="search" />', 'input'))).to.equal('searchbox');
        });
        it('when type attribute value is email, tel, text or url and has no list attribute, the implicit role is textbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="email" />', 'input'))).to.equal('textbox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="tel" />', 'input'))).to.equal('textbox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="text" />', 'input'))).to.equal('textbox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="url" />', 'input'))).to.equal('textbox');
        });
        it('when type attribute value is  email, tel, text or url and has list attribute, the implicit role is combobox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="search" list />', 'input')))
                .to.equal('combobox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="email" list />', 'input')))
                .to.equal('combobox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="tel" list />', 'input'))).to.equal('combobox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="text" list />', 'input'))).to.equal('combobox');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="url" list />', 'input'))).to.equal('combobox');
        });
        it("when type attribute value is color, date, datetime, file, hidden, month, time or week,\n      the implicit role is undefined", function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="color" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="date" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="datetime" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="file" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="hidden" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="month" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="time" />', 'input'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<input type="week" />', 'input'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('li tag', function () {
        it('with a parent of ol or ul element, the implicit role is listitem', function () {
            var code1 = "\n      <ol>\n        <li />\n      </ol>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code1, 'li'))).to.equal('listitem');
            var code2 = "\n      <ul>\n        <li />\n      </ul>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code2, 'li'))).to.equal('listitem');
        });
        it('without a parent of ol or ul element, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<li />', 'li'))).to.equal(undefined, 'should undefined');
            var code1 = "\n      <ul>\n        <div>\n          <li />\n        </div>\n      </ul>";
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode(code1, 'li'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('link tag', function () {
        it('with href attribute, the implicit role is link', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<link href="hrefValue" />', 'link'))).to.equal('link');
        });
        it('without href attribute, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<link />', 'link'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('main tag', function () {
        it('the implicit role is main', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<main />', 'main'))).to.equal('main');
        });
    });
    describe('math tag', function () {
        it('the implicit role is math', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<math />', 'math'))).to.equal('math');
        });
    });
    describe('menu tag', function () {
        it('when type attribute value is toolbar, the implicit role is toolbar', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menu type="toolbar" />', 'menu'))).to.equal('toolbar');
        });
        it('when type attribute value is not toolbar, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menu type="" />', 'menu'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menu />', 'menu'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('menuitem tag', function () {
        it('when type attribute value is command, the implicit role is menuitem', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menuitem type="command" />', 'menuitem')))
                .to.equal('menuitem');
        });
        it('when type attribute value is checkbox, the implicit role is menuitemcheckbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menuitem type="checkbox" />', 'menuitem')))
                .to.equal('menuitemcheckbox');
        });
        it('when type attribute value is radio, the implicit role is menuitemradio', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menuitem type="radio" />', 'menuitem')))
                .to.equal('menuitemradio');
        });
        it('without type attribute or type attribute value is undefined value, the implicit role is undefined', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menuitem type="" />', 'menuitem'))).to.equal(undefined, 'should undefined');
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<menuitem />', 'menuitem'))).to.equal(undefined, 'should undefined');
        });
    });
    describe('meter tag', function () {
        it('the implicit role is progressbar', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<meter />', 'meter'))).to.equal('progressbar');
        });
    });
    describe('nav tag', function () {
        it('the implicit role is navigation', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<nav />', 'nav'))).to.equal('navigation');
        });
    });
    describe('ol tag', function () {
        it('the implicit role is list', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<ol />', 'ol'))).to.equal('list');
        });
    });
    describe('optgroup tag', function () {
        it('the implicit role is group', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<optgroup />', 'optgroup'))).to.equal('group');
        });
    });
    // need to improve ref https://www.w3.org/TR/html-aria/
    describe('option tag', function () {
        it('the implicit role is option', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<option />', 'option'))).to.equal('option');
        });
    });
    describe('output tag', function () {
        it('the implicit role is status', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<output />', 'output'))).to.equal('status');
        });
    });
    describe('progress tag', function () {
        it('the implicit role is progressbar', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<progress />', 'progress'))).to.equal('progressbar');
        });
    });
    describe('section tag', function () {
        it('the implicit role is region', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<section />', 'section'))).to.equal('region');
        });
    });
    describe('select tag', function () {
        it('the implicit role is listbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<select />', 'select'))).to.equal('listbox');
        });
    });
    describe('summary tag', function () {
        it('the implicit role is button', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<summary />', 'summary'))).to.equal('button');
        });
    });
    describe('table tag', function () {
        it('the implicit role is table', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<table />', 'table'))).to.equal('table');
        });
    });
    describe('tbody tag', function () {
        it('the implicit role is rowgroup', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<tbody />', 'tbody'))).to.equal('rowgroup');
        });
    });
    describe('textarea tag', function () {
        it('the implicit role is textbox', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<textarea />', 'textarea'))).to.equal('textbox');
        });
    });
    describe('tfoot tag', function () {
        it('the implicit role is rowgroup', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<tfoot />', 'tfoot'))).to.equal('rowgroup');
        });
    });
    describe('thead tag', function () {
        it('the implicit role is rowgroup', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<thead />', 'thead'))).to.equal('rowgroup');
        });
    });
    describe('td tag', function () {
        it('the implicit role is cell', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<td />', 'td'))).to.equal('cell');
        });
    });
    describe('th tag', function () {
        it('the implicit role is columnheader', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<th />', 'th'))).to.equal('columnheader');
        });
    });
    describe('tr tag', function () {
        it('the implicit role is row', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<tr />', 'tr'))).to.equal('row');
        });
    });
    describe('ul tag', function () {
        it('the implicit role is list', function () {
            chai.expect(getImplicitRole_1.getImplicitRole(JsxAttribute_1.getJsxElementFromCode('<ul />', 'ul'))).to.equal('list');
        });
    });
});
