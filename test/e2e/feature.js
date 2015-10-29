
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

    it('initialized with a title', function() {
      expect(browser.getTitle()).toEqual('Theme Me');
    });

    it('initialized with a name field', function() {
      expect(name.isDisplayed()).toBeTrue;
    });

    it('initialized with a message field', function() {
      expect(message.isDisplayed()).toBeTrue;
    });

    it('displays a choose song button', function() {
      expect(chooseSong.isDisplayed()).toBeTrue;
    });

    it('displays play random song button', function() {
      expect(playRandom.isDisplayed()).toBeTrue;
    });

    it('initialized with empty name field', function() {
      expect(name).toBeUndefined;
    });

    it('initialized with empty message field', function() {
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

    it('displays a search bar', function() {
      expect(searchTerm.isDisplayed()).toBeTrue;
    });

    it('initialized with empty search bar', function() {
      expect(searchTerm).toBeUndefined;
    });

    it('displays a search button', function() {
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

    it('displays friends unite header', function() {
      expect(playHeader.getText()).toContain('Friends')
    });

    it('displays username', function() {
      expect(username.isDisplayed()).toBeTrue;
    });

    it('displays comment', function() {
      expect(comment.isDisplayed()).toBeTrue;
    });

  });
});
