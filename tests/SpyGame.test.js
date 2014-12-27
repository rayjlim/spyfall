// beforeEach(function(done){});
describe("SpyGame", function() {
 
  describe("getPlayerRole", function() {
    it("return spy for spy", function() {

      var testGame = new Spy.Game();
      var newround = {
        'spy': '1',
        'cPlayer': '1'
      };
      testGame.setRound(newround);
      expect(testGame.getPlayerRole()).to.equal('Spy');
    });
    it("returns location  for non-spy", function() {

      var testGame = new Spy.Game();
      var newround = {
        'spy': '1',
        'cPlayer': '2',
        'location': 'Test'
      };
      testGame.setRound(newround);
      expect(testGame.getPlayerRole()).to.equal('Test');
    });
  });

  describe("generateRound", function() {
    it("should set the basics", function() {

      var testGame = new Spy.Game();
      var newround = {
        'number': '2',
        'spy': '1',
        'cPlayer': '1'
      };
      testGame.setRound(newround);
      testGame.generateRound();
      var newRound = testGame.getRound();
      expect(newRound.number).to.equal(3);
      expect(newRound.cPlayer).to.equal(0);
      console.log('newRound');
      console.log(newRound);
    });
  });
});