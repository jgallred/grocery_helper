var AppHomepage = function () {
    this.mealFilter = element(by.model('search'));

    this.get = function () {
        this.protractor = browser.get('http://www.app.192.168.56.103.xip.io/#/');
    };

    this.setFilter = function (name) {
        this.mealFilter.sendKeys(name);
    };

    this.getMealsList = function () {
        return element.all(by.repeater('meal in meals'));
    };
};

describe('The meals homepage', function () {
    var page,
        ptor = protractor.getInstance();

    beforeEach(function () {
        page = new AppHomepage();
        page.get();
    });

    it('should list all the meals', function () {
        page.getMealsList().then(function (items) {
            expect(items.length).toBe(1);
        });
    });

    describe('filter input', function () {
        it('should display all meals when empty', function () {
            page.getMealsList().then(function (items) {
                expect(items.length).toBe(1);
            });
        });

        it('should exclude meals whose name does not match', function () {
            page.setFilter('rolls');
            page.getMealsList().then(function (items) {
                expect(items.length).toBe(0);
            });
        });

        it('should include meals whose name does match', function () {
            page.setFilter('taco');
            page.getMealsList().then(function (items) {
                expect(items.length).toBe(1);
            });
        });
    });

    describe('meal edit button', function () {
        var edit_button;

        beforeEach(function () {
            browser.waitForAngular().then(function () {
                edit_button = element(by.css('.edit-meal'));
            });
        });

        it('should create anchor with a link to edit the meal', function () {
            expect(edit_button.getAttribute('href')).toContain('edit/');
        });

        it('should allow you to edit a given recipe', function () {
            edit_button.click().then(function (button) {
                browser.waitForAngular().then(function () {
                    expect(browser.getCurrentUrl()).toContain('edit/');
                });
            });
        });
    });

    describe('meal delete button', function () {
        var delete_button;

        beforeEach(function () {
            browser.waitForAngular().then(function () {
                delete_button = element(by.css('.delete-meal'));
            });
        });

        it('should comfirm with the user ', function () {
            delete_button.click().then(function (button) {
                var confirm_box = ptor.switchTo().alert();
                expect(confirm_box.getText()).toContain('delete');
            });
        });
    });
});