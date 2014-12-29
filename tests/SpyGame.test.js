// beforeEach(function(done){});
describe("SpyGame", function() {

  describe("getPlayerRole", function() {
    it("return spy for spy", function() {

      var testGame = spy.Game();
      testGame.round = {
        'spy': 1,
        'cPlayer': 1
      };
      expect(testGame.getPlayerRole()).to.equal('You\'re the Spy');
    });
    it("returns location  for non-spy", function() {

      var testGame = spy.Game();
      testGame.round = {
        'spy': 1,
        'cPlayer': 2,
        'location': 'Test'
      };
      expect(testGame.getPlayerRole()).to.equal('Test');
    });
  });

  describe("generateRound", function() {
    it("should set the basics", function() {

      var testGame = spy.Game();
      testGame.round = {
        'number': 2,
        'spy': 1,
        'cPlayer': 1
      };
      testGame.generateRound();

      expect(testGame.round.number).to.equal(3);
      expect(testGame.round.cPlayer).to.equal(0);

    });
  });
  describe("getBasicInfo", function() {
    it("should return object of basics", function() {

      var testGame = spy.Game();
      testGame.round = {
        'number': 2,
        'spy': 1,
        'cPlayer': 1,
        'numberOfPlayers': 5

      };
      var actual = testGame.getBasicInfo();

      expect(actual.playerName).to.equal('Player 2');
      expect(actual.roundNumber).to.equal(2);
      expect(actual.playerCount).to.equal(5);

    });
  });
});