module.exports = class Page {

    open (path) {
        return browser.url(`${path}`);
    };

    async scroll(xVal, yVal){
        await browser.execute(
            (xVal, yVal) => window.scrollTo(window.scrollX + xVal, window.scrollY + yVal)
        ,xVal, yVal);
    };

    //scroll to until a specific element is visible at the top of the viewport
    async scrollTo(selector){
        await browser.execute(
            (selector) => document.querySelector(selector).scrollIntoView(true/*alignToTop*/)
        ,selector);
    };
}
