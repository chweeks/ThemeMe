
describe("themeMe", function() {

  var name = element(by.model('name'));
  var message = element(by.model('message'));
  var chooseSong = element(by.id('chooseSong'));
  var playRandom = element(by.id('playRandom'));
  var searchTerm = element(by.model('searchTerm'));
  var searchButton = element(by.id('searchSC'));
  var playHeader = element(by.id('playHeader'));
  var username = element(by.id('username'));
  var comment = element(by.id('comment'));

  describe("On startup", function() {
    beforeEach(function() {
      browser.get('http://localhost:8080/www/index.html');
    });

    it('has a title', function() {
      expect(browser.getTitle()).toEqual('Theme Me');
    });

    it('has a name field', function() {
      expect(name.isDisplayed()).toBeTrue;
    });

    it('has a message field', function() {
      expect(message.isDisplayed()).toBeTrue;
    });

    it('has a choose song button', function() {
      expect(chooseSong.isDisplayed()).toBeTrue;
    });

    it('has a play random song button', function() {
      expect(playRandom.isDisplayed()).toBeTrue;
    });

    it('name field is empty', function() {
      expect(name).toBeUndefined;
    });

    it('message field is empty', function() {
      expect(message).toBeUndefined;
    });
  });

  describe('when name and message are input', function() {

    beforeEach(function() {
      browser.get('http://localhost:8080/www/index.html');
      name.sendKeys('test');
      message.sendKeys('testy testy');
      chooseSong.click();
    });

    it('redirects you to the set song page', function() {
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/www/index.html#/setsong')
    });

    it('has a search bar', function() {
      expect(searchTerm.isDisplayed()).toBeTrue;
    });

    it('search bar is empty', function() {
      expect(searchTerm).toBeUndefined;
    });

    it('has a search button', function() {
      expect(searchButton.isDisplayed()).toBeTrue;
    });

  });

  describe('when random song button is pressed', function() {

    beforeEach(function(){
      browser.get('http://localhost:8080/www/index.html');
      playRandom.click();
    });

    it('redirects you to the play page', function() {
      expect(browser.getCurrentUrl()).toEqual('http://localhost:8080/www/index.html#/playtheme')
    });

    it('has friends unite header', function() {
      expect(playHeader.getText()).toContain('Friends')
    });

    it('has friends unite header', function() {
      expect(username.isDisplayed()).toBeTrue;
    });

    it('has friends unite header', function() {
      expect(comment.isDisplayed()).toBeTrue;
    });

  });
});
