describe("SpyController", function() {
    var MockMobile = function() {
        var current_page;
    };
    MockMobile.prototype.changePage = function(location) {
        this.current_page = location;
    };

    beforeEach(function() {
        $.mobile = new MockMobile();
    });

    describe("showStart", function() {
        it("send to right page", function() {
            var controller = new lpt.SpyController();
            controller.showStart();
            expect($.mobile.current_page).to.eql('#setup');
        });
    });
    describe("showGamePlay", function() {
        it("send to right page", function() {
            var controller = new lpt.SpyController();
            controller.showGamePlay();
            expect($.mobile.current_page).to.eql('#gamePlay');
        });
    });

    describe("showLocations", function() {
        it("send to right page", function() {
            var newgame = spy.Game();
            var controller = new lpt.SpyController(newgame);

            controller.showLocations();
            expect($.mobile.current_page).to.eql('#locations');
        });
    });
});