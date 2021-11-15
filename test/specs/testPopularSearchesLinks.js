const MainPage = require('../pageobjects/main.page');

const expectChai = require('chai').expect;
const location = 'Dubai Marina';

describe('Verify Popular Searches links work correctly', async () => {
    it('open bayut.com page', async () => {
        await MainPage.open();
    });

    it('Scroll down to the \'Popular searches\' section', async () =>{
        await MainPage.scrollToDubaiApartaments();//optional step, because click event autogenerates scroll
    });
    
    it('Open the \'To rent\' tab', async () =>{
        const atoRentButton = await MainPage.toRentButton;
        //await MainPage.simplyWait(0.4);
        //await atoRentButton.click();//clicking on a button makes sure that you are automaticaly scrolling to that button
    });

    it('checking links under \'Dubai apartments\' are functioning correctly', async () =>{

        const list =  await MainPage.footerLinksList;    
        urls = [];
        atext = [];
        
        //extract the path and the content of the links
        for(i of list) {
            var u = await i.getProperty("href");
            var v = await i.getText();
            urls.push(u);
            atext.push(v);
        };

        //check that each link is loading correctly
        for(let i = 0; i < list.length; i++){
            await browser.url(urls[i]);
            await (await MainPage.selectedLocationLable).waitForExist();
            
            //check the last element separately because it does not follow the same pattern
            if(!(atext[i] =='Dubai Production City - IMPZ' && 
                await (await MainPage.selectedLocationLable).getText() == 'Dubai Production City (IMPZ)'))
                await expect(await MainPage.selectedLocationLable).toHaveTextContaining(atext[i]);
            await MainPage.checkIfThePurposeWasChangedTo('Rent')
        }
    });

 });