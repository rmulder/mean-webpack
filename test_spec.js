// spec.js


describe('Get Title', function() {
    it('should have a title', function() {
    browser.get('http://localhost:4000/');
    expect(browser.getTitle()).toEqual('MEAN STACK');
    });
    });

