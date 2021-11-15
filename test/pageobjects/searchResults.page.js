const Page = require('./page');

class ResultsPage extends Page {
    get links_list() { return $('div div._41d30143 div._617311a2 div._5a12e6f6._9b01d0a7 ul._22762832 li._76ddbf32.af2d23c9 a._78d325fa');
    // get inputLocation() { return $('input.a41c4dcc') };
    // get dropDownOptions() {return $('div ul[role="listbox"] li button') };
    // get findButton() { return $('a.c3901770') };
    // get listOfElements() {return $('div.bbfbe3d2 ul._357a9937') };//88
    // get list() { return $$('div.bbfbe3d2 ul._357a9937 li.ef447dde') };
    // get nextArrow() { return $('a[title="Next"]') };
    // get elementLocation() {return $('div[aria-label="Location"]') }; // the location of first element
    
    //driver.findElements
    //get resultsList() { return $$('div.bbfbe3d2 ul._357a9937 li.ef447dde')};
    //get inputUsername () { return $('#username') }
    //get inputPassword () { return $('#password') }
    //get btnSubmit () { return $('button[type="submit"]') }

    async search (location) {
        //await this.inputUsername.setValue(username);
        //await this.inputPassword.setValue(password);
        //

        await this.inputLocation.setValue(location);
        await this.dropDownOptions.click();
        await this.findButton.click();

        //should close Trucheck tutorial
        //aria-label="Trucheck tutorial"
        //should click on parent div //class="a8090250 _277fb980"
        var i=0;
        //for(i=0;i<89;i++){
            await this.listOfElements.waitForDisplayed();
            console.log("lungimea listei este: " + await this.listOfElements.length);
            await browser.pause(5000);
            await this.resultsList.getElementText();
            expect(await this.list).toBeElementsArrayOfSize(10);
            console.log(await this.list);
            
            browser.debug();
            //console.log(await this.elementLocation.getText());//:nth-child(2)
            browser.debug();
            console.log("done");

        //  await this.nextArrow.click();
        //}
    }

    open () {
        return super.open('Bayut_%20UAE%27s%20Largest%20Real%20Estate%20Portal.html');
    }
}
//may be usefull 
//await browser.pause(5000);

module.exports = new LoginPage();
