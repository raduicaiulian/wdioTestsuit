const Page = require('./page');

class MainPage extends Page {
    get inputLocation() { return $('ul[aria-label="Location filter"] > input') };//

    get findButton() { return $('div[aria-label="Mini form"] a[aria-label="Find button"]') };
    get buyButton() {return $('div[role="listbox"] > span > button[aria-label="Buy"]')};

    get popularSearchesSection() {return $('div[aria-label="Popular properties"] div.fa2044b7')};
    get selectedLocationLable() {return $('span[aria-label="Filter label"]')};
    get porpouseFilter() { return $('div[aria-label="Purpose filter"]')};
    get purposeCurentValue() {return $('div[aria-label="Purpose filter"] div[role="button"] > span > span')};
    get dealOfTheWeek() { return $('div[aria-label="Deal of the week listing"] div[aria-label="Location"]')};
    get toRentButton() { return $('div._2fddc99a > div:nth-child(2) > div > div > div:nth-child(2)')};
    get footerLinksList() {return $$('div._2f24c5e3 > div > div:nth-child(1) > div._892154cd._6c5bbfd9._97cf2f2e > div > div > div._617311a2 > div:nth-child(1) > ul > li > a')};
    get listOfElements() {return $$('div.bbfbe3d2 ul._357a9937 li[aria-label="Listing"] div[aria-label="Location"]') };
    get list() { return $('div.bbfbe3d2 ul._357a9937 li[aria-label="Listing"]') };
    get nextArrow() { return $('div[role="navigation"] a[title="Next"]') };
    get elementLocation() {return $('div[aria-label="Location"]') }; // the location of first element
    get searchDubaiMarinaUrl() {return '/for-sale/property/dubai/dubai-marina/page-' };
    //------------------------optional selectors-----------------------
    //get trueCheckBanner() { return $('div[aria-label="Trucheck tutorial"]')};
    // get outsideTrueCheckBanner() { return $('div[aria-label="Trucheck tutorial"]').parentElement().parentElement()};
    
    async countPagesNumber(){
        

        //var page = 2;
        var page = 140;

        while(! await this.isLastPage(page)){

            if(await this.pageExist(page))
                page = page*2
            else
                page = await this.binarySearch(Math.floor(page/2),page)
        }

        console.log("count of pages is: " + page);
        //should lawnch multiple instances in order to process the results quicker
    }

    async search (location) {
        const input = await this.inputLocation;//we need wait for selector promise to be resolved
        await input.setValue(location);
        await browser.pause(400);//The js from the client side needs a little bit of time to return the right results
        await browser.keys('Enter');// select first entry by pressing ENTER
        await this.checkIfTheCorectLableWasChosen(location);

        //select to buy(aka the old for-sale)
        const dropDown = await this.porpouseFilter;
        await dropDown.click();
        const buy = await this.buyButton;
        await buy.waitForExist();
        await buy.click();
        //check that buy is selected
        await this.checkIfThePurposeWasChangedTo('Buy');
        
        await this.findButton.click();
    }

    async extractAllSearchResults(){
        this.listOfLocations=[];      
        var i=0;
        await browser.pause( 400);
        const aDealOfTheWeek = await this.dealOfTheWeek;
        await browser.pause( 400);
        this.listOfLocations.push(await aDealOfTheWeek.getText());//deal of the week is special so we parese it separately
        //-------------neeeds a lot of optimization
        while(await ((await this.nextArrow).isDisplayed())) {

            await this.porcessResultsList(i);

            const anextArrow = await this.nextArrow;
            //await anextArrow.waitForDisplayed();
            await browser.pause(200);
            await anextArrow.click();
            await browser.pause(200);
            //reduce range for debugging
            // if(i==1){
            //     //max 189
            //     await browser.url(`https://www.bayut.com/for-sale/property/dubai/dubai-marina/page-188/`)
            //     i=189
            // }else
                i++
        }
        await this.porcessResultsList(i);
        //should close Trucheck tutorial(becouse we are not scrolin, there is no need to worry abou it)
        //await outsideTrueCheckBanner().click();
        //trueCheckBanner.waitForDisplayed({reverse: true});
    }

        async porcessResultsList(i) {
        console.log(i+" tiems");

        var entireList = await this.list;
        await entireList.waitForDisplayed();        
        var lista = await this.listOfElements;

        for (const element of lista) {
            var placeLocation = await element.getText();
            this.listOfLocations.push(placeLocation);
        }
    }

    async checkIfTheCorectLableWasChosen(location){
        const aselectedLocationLable = await this.selectedLocationLable;
        await expect(aselectedLocationLable).toHaveText(location);
    }

    async checkIfThePurposeWasChangedTo(value){
        const purposeVal = await this.purposeCurentValue;
        await expect(purposeVal).toHaveText(value,
            { message: 'The purpose is different from the expected one!', });
    }

    // async binarySearch(lboundary, rboundary){
    //     //console.log("***************" + lboundary + "  " + rboundary)

    //     var mboundary = Math.floor((lboundary + rboundary) / 2); 
    //     if (! await this.isLastPage(mboundary)) {
    //         if(await this.pageExist(mboundary))
    //             return await this.binarySearch(mboundary+1, rboundary)
    //         else
    //             return await this.binarySearch(lboundary, mboundary-1)
    //     }else
    //         return mboundary;
    // }

    // async pageExist(page){
    //     var gUrl = this.searchDubaiMarinaUrl + page + '/'
    //     await browser.url(gUrl);

    //     const title = await browser.getTitle()

    //     if(title.includes("Not found")){
    //         //console.log("page " + page + "exist")
    //         return false
    //     }
    //     //console.log("page " + page + " does NOT exist")
    //     return true
    // }

    // async isLastPage(page){

    //     if((!await this.pageExist(page+1) && await this.pageExist(page))){
    //         //console.log("page " + page + "is the last")
    //         return true
    //     }
    //     //console.log("page " + page + "is NOT the last")
    //     return false
    // }

    async simplyWait(secondsCount){
        await browser.pause(secondsCount*1000);
    }
    
    async scrollToDubaiApartaments(){
        //super.scroll(0, 1874);//this approach is buggy because it is not general enough
        await super.scrollTo(this.popularSearchesSection.selector);
    }

    open () {
        return super.open('/')
    }
}

module.exports = new MainPage();