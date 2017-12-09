// spec.js
// Write the functions here to test with protractor

describe('Get Title', function() {
    it('should have a title', function() {
    browser.get('http://localhost:4000');
    expect(browser.getTitle()).toEqual('MEAN STACK');
    });
    });
