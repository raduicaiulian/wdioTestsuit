const MainPage = require('../pageobjects/main.page');

const expectChai = require('chai').expect;
const location = 'Dubai Marina';

describe('Verify results match the search criteria', () => {
    it('open bayut.com page', async () => {
        await MainPage.open();
    });

    it('extract required data', async () => {
        await MainPage.search(location);
        await MainPage.extractAllSearchResults();
    });

    it('check if data match the pattern', async () => {
        const ll = await MainPage.listOfLocations;

        for(const i of ll)
            await expectChai(i).to.have.string(location);
    });
});