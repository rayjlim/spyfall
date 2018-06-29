/**
 * @module Spy
 */
(function(Game, $, console) {
  "use strict";
  /**
   * Trying jsdocs
   * @public
   */
  let playerWeights = [],
    locationWeighting = [],
    playerSpyWeightDiff = 4,
    playerStartingWeight = 10,
    locationWeightDiff = 1,
    locationStartingWeight = 1,
    locations = [];
  /**
   * Locations available in game
   * @type array
   */

  let locationOptions = [];
  locationOptions.push({
    name: "Base Set",
    list: [
      "Airplane",
      "Bank",
      "Beach",
      "Casino",
      "Church",
      "Circus tent",
      "Work Office party",
      "Castle",
      "Day spa",
      "Hospital",
      "Hotel",
      "Military base",
      "Movie studio",
      "Cruise Ship",
      "Passenger train",
      "Pirate ship",
      "Polar station",
      "Police station",
      "Restaurant",
      "Car Repair Shop",
      "Space station",
      "Submarine",
      "Supermarket",
      "Broadway Theatre",
      "Grade School",
      "University"
    ]
  });
  locationOptions.push({
    name: "Secondary Set",
    list: [
      "Amusement Park",
      "Ballet",
      "Night club",
      "Harbor / Boat Dock",
      "Field Stadium",
      "Skyscraper",
      "Bridge",
      "Cemetery",
      "Factory",
      "Farm",
      "Camp Site",
      "Golf Course",
      "Christmas Party",
      "Forth of July Party",
      "Thanksgiving Party",
      "Halloween Party",
      "Fire station",
      "Car Race Track",
      "Horse Race Track",
      "You're the Spy"
    ]
  });
  locationOptions.push({
    name: "Third Set",
    list: [
      "Art Museum",
      "Candy Factory",
      "Carnival",
      "Cat Show",
      "Coal Mine",
      "Constructions Site",
      "Ice Hocky Stadium",
      "Embassy",
      "Gas Station",
      "Jail",
      "Jazz Club",
      "Library",
      "Retirement Home",
      "Rock Concert",
      "Sight Seeing Bus",
      "Subway",
      "The U.N.",
      "Vineyard",
      "Wedding",
      "Zoo"
    ]
  });
  locationOptions.push({
    name: "Things... My Set",
    list: [
      "Things for Breakfast",
      "Things you hate to eat",
      "Things that are gross",
      "Animals at the Zoo",
      "Things you ride",
      "Things in your drawer",
      "Things that make you go Hmm",
      "Animals on a farm",
      "Things that hurt",
      "Things that are wet",
      "Things that are dry",
      "Things that are flat",
      "Things that are round",
      "Things that are red",
      "Things that are blue",
      "Things that are clear",
      "Things that are tall",
      "Things that are short",
      "Things that are funny",
      "Things that are old",
      "Things that are new",
      "Things that are borrowed",
      "Things that are hot",
      "Things that are cold",
      "Things that are sad",
      "Things that are scary",
      "Things that are delicious",
      "Things that smell bad"
    ]
  });
  // https://collectifbdp.com/the-game-of-things-flash-cards/
  locationOptions.push({
    name: "Things... collectifbdp Set",
    list: [
      "Things A CHIMP THINKS ABOUT WHEN HE SEES YOU AT THE ZOO",
      "Things A COW THINKS ABOUT WHEN A FARMER MILKS IT",
      "Things A DOCTOR SHOULDNT DO WHILE PERFORMING SURGERY",
      "Things A LADY SHOULDNT DO",
      "Things ABOUT MEN THAT FRUSTRATE YOU",
      "Things ABOUT PEOPLE THAT FRUSTRATE YOU",
      "Things AN IDEAL MATE WOULD DO FOR YOU",
      "Things ASTRONAUTS COMPLAIN ABOUT IN SPACE",
      "Things BIG DOGS THINK ABOUT WHEN THEY SEE A CHIHUAHUA",
      "Things CANNIBALS THINK ABOUT WHILE DINNING",
      "Things CATS THINK ABOUT HUMANS",
      "Things CHILDREN SHOULDNT PLAY WITH",
      "Things DOGS ARE ACTUALLY SAYING WHEN THEY BARK",
      "Things FISH THINK ABOUT AS THEY SWIM IN THEIR AQUARIUM",
      "Things GROWN-UPS WISH THEY COULD STILL DO",
      "Things KIDS KNOW MORE ABOUT THAN ADULTS",
      "Things MEN KNOW MORE ABOUT THEN WOMEN",
      "Things NOT TO TELL YOUR MOTHER",
      "Things PEOPLE DO WHEN NO ONE IS LOOKING",
      "Things PEOPLE LIKE ABOUT YOU",
      "Things PEOPLE THINK THEY UNDERSTAND",
      "Things THAT PROVE YOURE IN A BAD RESTAURANT",
      "Things THAT ARE BETTER LATE THAN NEVER",
      "Things THAT ARE DIRTY",
      "Things THAT ARE EMBARRASSING TO SAY",
      "Things THAT ARE GOOD",
      "Things THAT ARE HARDER THAN THEY LOOK",
      "Things THAT ARE IMPOSSIBLE TO MEASURE",
      "Things THAT ARE NAUGHTY",
      "Things THAT ARE NONE OF YOUR BUSINESS",
      "Things THAT ARE USELESS",
      "Things THAT ARE WILD",
      "Things THAT ARE YOUR FAVORITE FOODS",
      "Things THAT CONFIRM THAT YOUR LIFE IS GOING DOWNHILL",
      "Things THAT CONFIRM YOU ARE GUILTY",
      "Things THAT CONFIRM YOU ARE LOSING YOUR MIND",
      "Things THAT CONFIRM YOU HAVE BEEN ABDUCTED BY ALIENS",
      "Things THAT CONFIRM YOU HAVE HAD TOO MUCH TO DRINK",
      "Things THAT CONFIRM YOU STILL HAVENT GROWN UP",
      "Things THAT CONFIRM YOUR CAR IS A LEMON",
      "Things THAT CONFIRM YOUR LIFE IS GOING DOWNHILL",
      "Things THAT CONFIRM YOUR SMALL TOWN IS BACKWARD",
      "Things THAT COULD GET YOU ARRESTED",
      "Things THAT COULD RESULT IN A WAR",
      "Things THAT COULD SPOIL YOUR APPETITE",
      "Things THAT COULD USE A GOOD CLEANING",
      "Things THAT DONT LAST VERY LONG",
      "Things THAT DONT EXIST BUT YOU WISH THEY DID",
      "Things THAT DONT LAST VERY LONG",
      "Things THAT DONT MAKE SENSE",
      "Things THAT DRIVE YOU MAD",
      "Things THAT EXHAUST YOU",
      "Things THAT GO BAD",
      "Things THAT HANG",
      "Things THAT HAPPEN IN VEGAS THAT SHOULD STAY IN VEGAS",
      "Things THAT HAPPEN ONCE IN A BLUE MOON",
      "Things THAT HURT",
      "Things THAT HURT YOUR BACK",
      "Things THAT MAKE A GOOD SANDWICH",
      "Things THAT MAKE PEOPLE JEALOUS",
      "Things THAT MAKE YOU ANGRY",
      "Things THAT MAKE YOU CRY",
      "Things THAT MAKE YOU FEEL YOUNG",
      "Things THAT MAKE YOU GAG",
      "Things THAT MAKE YOU GO AAAAHH",
      "Things THAT MAKE YOU GO OOOHH",
      "Things THAT MAKE YOU JUMP",
      "Things THAT MAKE YOU NERVOUS",
      "Things THAT MAKE YOU SCREAM",
      "Things THAT MUST BE MAGIC.",
      "Things THAT PEOPLE SURPRISINGLY PAY FOR",
      "Things THAT PROVE YOURE IN A BAD RESTAURANT",
      "Things THAT REALLY NEED A REFEREE",
      "Things THAT REQUIRE AN ASSISTANT",
      "Things THAT SCARE YOU",
      "Things THAT SHOULD COME WITH A MANUAL",
      "Things THAT SHOULD HAVE AN EXPIRATION DATE",
      "Things THAT SHOULDNT BE MADE INTO VIDEO GAMES",
      "Things THAT SHOULDNT GO INTO A TIME CAPSULE",
      "Things THAT SMELL TERRIBLE",
      "Things THAT SQUIRT",
      "Things THAT TAKE COURAGE",
      "Things THAT TIRE YOU OUT",
      "Things THAT USUALLY MAKE YOU FEEL BETTER",
      "Things THAT VERY OLD PEOPLE SHOULDNT DO",
      "Things THAT WARRANT AN APOLOGY",
      "Things THAT WOULD BE CONSIDERED A BAD HABIT",
      "Things THAT WOULD GET YOU DISCHARGED FROM THE ARMY/MILITARY",
      "Things THAT WOULD GET YOU FIRED",
      "Things THAT WOULD GET YOU SENT TO THE PRINCIPALS OFFICE",
      "Things THAT YOU CAN TRIP OVER",
      "Things THAT YOU EAT ALIVE",
      "Things THAT YOU SUCK ON",
      "Things THAT YOU WILL FIND IN a BATHROOM",
      "Things THAT YOU WILL FIND IN a KITCHEN",
      "Things THERE SHOULD BE AN AWARD FOR",
      "Things WOMEN KNOW MORE ABOUT THAN MEN",
      "Things WOMEN TALK ABOUT WHEN THEY GO TO THE RESTROOM TOGETHER",
      "Things WOULDNT WANT TO BE ALLERGIC TO",
      "Things YOU CALL YOUR MATE",
      "Things YOU CAN DO TO GET RID OF UNWANTED GUESTS",
      "Things YOU CAN NEVER FIND",
      "Things YOU CANT STOP",
      "Things YOU COULD USE AS AN EXCUSE ON JUDGMENT DAY",
      "Things YOU DIDNT REALIZE UNTIL IT WAS TOO LATE",
      "Things YOU DO TO GET A JOB",
      "Things YOU DO TO RELIEVE STRESS",
      "Things YOU DO TO STAY WARM",
      "Things YOU DONT LIKE ABOUT FAMILY GATHERINGS",
      "Things YOU DONT LIKE ABOUT FAMILY GET-TOGETHERS",
      "Things YOU DREAM ABOUT",
      "Things YOU EAT IN A SALAD",
      "Things YOU COMPLAIN ABOUT IN HOSPITAL",
      "Things YOU HATE AS PUNISHMENT",
      "Things YOU HATE TO BE CALLED",
      "Things YOU HOPE YOU CAN STILL DO WHEN YOU ARE 85",
      "Things YOU JUST CANT BEAT",
      "Things YOU KEEP HIDDEN",
      "Things YOU KEEP HIDDEN FROM OTHERS",
      "Things YOU KEEP IN YOUR CAR",
      "Things YOU KNOW NOTHING ABOUT",
      "Things YOU LOVE TO SHOP FOR",
      "Things YOU MIGHT COMPLAIN ABOUT IN HELL",
      "Things YOU MIGHT FIND IN A LIBRARY",
      "Things YOU NAME HOME BREWED BEER",
      "Things YOU NEVER HEAR ON THE RADIO",
      "Things YOU NEVER REMEMBER",
      "Things YOU NEVER SEE IN THE CITY",
      "Things YOU NEVER SEE IN THE COUNTRY",
      "Things YOU SHOULD KEEP TO YOURSELF",
      "Things YOU SHOULDNT ACCEPT FROM STRANGERS",
      "Things YOU SHOULDNT ATTEMPT AT YOUR AGE",
      "Things YOU SHOULDNT BITE",
      "Things YOU SHOULDNT CALL YOUR CHILDREN",
      "Things YOU SHOULDNT CAPTURE ON VIDEOTAPE",
      "Things YOU SHOULDNT CELEBRATE",
      "Things YOU SHOULDNT CELEBRATE ON YOUR BIRTHDAY",
      "Things YOU SHOULDNT COLLECT",
      "Things YOU SHOULDNT DISPLAY IN YOUR CHINA CABINET",
      "Things YOU SHOULDNT DO AT A PARTY",
      "Things YOU SHOULDNT DO AT THE BEACH",
      "Things YOU SHOULDNT DO AT THE CIRCUS",
      "Things YOU SHOULDNT DO AT THE DINNER TABLE",
      "Things YOU SHOULDNT DO AT THE THEATRE",
      "Things YOU SHOULDNT DO AT YOUR WEDDING",
      "Things YOU SHOULDNT DO BABYSITTING",
      "Things YOU SHOULDNT DO IF YOU WANT TO MAKE A GOOD FIRST IMPRESSION",
      "Things YOU SHOULDNT DO IN A CAR",
      "Things YOU SHOULDNT DO IN A CEMETERY",
      "Things YOU SHOULDNT DO IN A GROUP OF PEOPLE",
      "Things YOU SHOULDNT DO IN AN ELEVATOR",
      "Things YOU SHOULDNT DO IN THE BATHTUB",
      "Things YOU SHOULDNT DO IN THE OFFICE",
      "Things YOU SHOULDNT DO IN THE SHOWER",
      "Things YOU SHOULDNT DO IN YOUR BACKYARD",
      "Things YOU SHOULDNT DO ON A BUS",
      "Things YOU SHOULDNT DO ON A FIRST DATE",
      "Things YOU SHOULDNT DO ON AN AIRPLANE",
      "Things YOU SHOULDNT DO ON YOUR BIRTHDAY",
      "Things YOU SHOULDNT DO ON YOUR DESK",
      "Things YOU SHOULDNT DO ON YOUR FIRST DAY ON THE JOB",
      "Things YOU SHOULDNT DO ON YOUR HONEYMOON",
      "Things YOU SHOULDNT DO QUICKLY",
      "Things YOU SHOULDNT DO RIGHT AFTER YOU EAT",
      "Things YOU SHOULDNT DO WHEN HAVING DINNER",
      "Things YOU SHOULDNT DO WHEN HAVING DINNER WITH THE QUEEN",
      "Things YOU SHOULDNT DO WHILE GOLFING",
      "Things YOU SHOULDNT DO WHILE WRITING A FINAL EXAM",
      "Things YOU SHOULDNT DO WITH A COMPUTER",
      "Things YOU SHOULDNT DO WITH GLUE",
      "Things YOU SHOULDNT DO WITH YOUR MOUTH OPEN",
      "Things YOU SHOULDNT DO WITH YOUR TONGUE",
      "Things YOU SHOULDNT DO YOUR FIRST DAY ON THE JOB",
      "Things YOU SHOULDNT DOODLE ON",
      "Things YOU SHOULDNT EAT",
      "Things YOU SHOULDNT EXPERIMENT WITH",
      "Things YOU SHOULDNT FORGET",
      "Things YOU SHOULDNT GIVE AS A GIFT",
      "Things YOU SHOULDNT HAVE TO PAY FOR",
      "Things YOU SHOULDNT KEEP IN YOUR POCKETS",
      "Things YOU SHOULDNT LAUGH AT",
      "Things YOU SHOULDNT LEAVE OPEN",
      "Things YOU SHOULDNT LEND",
      "Things YOU SHOULDNT MESS AROUND WITH",
      "Things YOU SHOULDNT PICK UP",
      "Things YOU SHOULDNT POST ON INTERNET",
      "Things YOU SHOULDNT PUT IN YOUR MOUTH",
      "Things YOU SHOULDNT PUT ON THE FRONT LAWN",
      "Things YOU SHOULDNT PUT ON THE KITCHEN TABLE",
      "Things YOU SHOULDNT SAY IN GROUP THERAPY",
      "Things YOU SHOULDNT SAY TO A FLIGHT ATTENDANT",
      "Things YOU SHOULDNT SAY TO A POLICE OFFICER",
      "Things YOU SHOULDNT SAY TO BREAK THE SILENCE IN A CONVERSATION",
      "Things YOU SHOULDNT SAY TO THE FIRST LADY",
      "Things YOU SHOULDNT SAY TO THE PRIME MINISTERS SPOUSE",
      "Things YOU SHOULDNT SAY TO YOU DENTIST",
      "Things YOU SHOULDNT SAY TO YOU GRANDMOTHER",
      "Things YOU SHOULDNT SAY TO YOUR BOSS",
      "Things YOU SHOULDNT SAY TO YOUR DOCTOR",
      "Things YOU SHOULDNT SAY TO YOUR FATHER",
      "Things YOU SHOULDNT SAY TO YOUR IN-LAWS",
      "Things YOU SHOULDNT SAY TO YOUR MOTHER",
      "Things YOU SHOULDNT SAY TO YOUR SPOUSE",
      "Things YOU SHOULDNT SAY TO YOUR TEACHER",
      "Things YOU SHOULDNT SAY TO YOUR TROOPS BEFORE THEY GO INTO BATTLE",
      "Things YOU SHOULDNT SAY WHEN TRYING TO MAKE A GOOD IMPRESSION",
      "Things YOU SHOULDNT SAY WHEN WALKING OUT OF THE BATHROOM",
      "Things YOU SHOULDNT SEND IN THE MAIL",
      "Things YOU SHOULDNT SEND YOUR FRIENDS IN A PIC",
      "Things YOU SHOULDNT SHARE",
      "Things YOU SHOULDNT TIE TO THE ROOF OF YOUR CAR",
      "Things YOU SHOULDNT TITLE A CHILDRENS BOOK",
      "Things YOU SHOULDNT TRY TO DO IN THE DARK",
      "Things YOU SHOULDNT TRY TO HOLD ON TO",
      "Things YOU SHOULDNT USE AS AN OPENING LINE",
      "Things YOU SHOULDNT WRITE ON A VALENTINES CARD",
      "Things YOU SING ABOUT",
      "Things YOU USE TO REMOVE SNOW FROM YOUR CAR",
      "Things YOU WANT TO DO BEFORE YOU DIE",
      "Things YOU WILL NEVER SEE IN YOUR LIFETIME",
      "Things YOU WISH FOR",
      "Things YOU WISH GREW ON TREES",
      "Things YOU WISH HAD BEEN TAUGHT IN SCHOOL",
      "Things YOU WISH PEOPLE WOULD STOP TALKING ABOUT",
      "Things YOU WISH WERE DELIVERED.",
      "Things YOU WISH WERE INCLUDED IN A DIVORCE SETTLEMENT",
      "Things YOU WISH WORKED BY REMOTE CONTROL",
      "Things YOU WISH YOU COULD BORROW",
      "Things YOU WISH YOU COULD BORROW FROM A LIBRARY",
      "Things YOU WISH YOU COULD BUY OUT OF VENDING MACHINES",
      "Things YOU WISH YOU COULD DO IN YOUR SLEEP",
      "Things YOU WISH YOU COULD DO WITH YOUR FEET",
      "Things YOU WISH YOU COULD ERASE",
      "Things YOU WISH YOU COULD PREDICT",
      "Things YOU WISH YOU DIDNT KNOW",
      "Things YOU WONT FIND IN THE DICTIONARY",
      "Things YOU WOULD ASK A PSYCHIC",
      "Things YOU WOULD BUY IF YOU WERE RICH",
      "Things YOU WOULD DO IF YOU HAD SUPER-HUMAN POWERS",
      "Things YOU WOULD DO IF YOU WERE A DICTATOR",
      "Things YOU WOULD DO IF YOU WERE A GIANT",
      "Things YOU WOULD DO IF YOU WERE INVISIBLE",
      "Things YOU WOULD DO WITH A MILLION DOLLARS",
      "Things YOU WOULD HATE TO DO FOR A LIVING",
      "Things YOU WOULD HAVE A ROBOT DO",
      "Things YOU WOULD LIKE TO ADD TO THE TEN COMMANDMENTS",
      "Things YOU WOULD LIKE TO ASK A PSYCHIC",
      "Things YOU WOULD LIKE TO CHANGE",
      "Things YOU WOULD LIKE TO DO IN A BLACKOUT",
      "Things YOU WOULD LIKE TO DO WITH A BALD HEAD",
      "Things YOU WOULD LIKE TO DO WITH CHOCOLATE",
      "Things YOU WOULD LIKE TO MAKE SOMEONE DO UNDER HYPNOSIS",
      "Things YOU WOULD LIKE TO SEE IN YOUR HOROSCOPE",
      "Things YOU WOULD LIKE TO STUDY",
      "Things YOU WOULD LIKE TO TRY",
      "Things YOU WOULD LIKE TO WAKE UP TO",
      "Things YOU WOULD RATHER BE DOING RIGHT NOW",
      "Things YOU WOULD RATHER PUT OFF TILL TOMORROW",
      "Things YOU WOULD SAY TO A PIG IF IT COULD TALK",
      "Things YOU WOULD SAY TO YOUR DOG; BUT NOT YOUR GIRLFRIEND",
      "Things YOU WOULD WISH FOR IF YOU FOUND A GENIE IN A BOTTLE",
      "Things YOU WOULD WISH FOR IF YOU WERE STRANDED ON AN ISLAND",
      "Things YOU WOULDNT WANT TO BE ALLERGIC TO",
      "Things YOU WOULDNT WANT TO FIND IN YOUR ATTIC",
      "Things YOU WOULDNT WANT TO FIND IN YOUR CHRISTMAS STOCKING",
      "Things YOU WOULDNT WANT TO KNOW ABOUT YOUR GRANDMOTHER",
      "Things YOU WOULDNT WANT YOUR MOTHER TO TALK ABOUT WITH YOUR GIRLFRIEND/BOYFRIEND",
      "Things YOUVE PAID TOO MUCH FOR",
      "Things A CHICKEN THINKS ABOUT WHEN THE FARMER PICKS UP THE EGGS",
      "Things TO NEVER PUT IN YOUR PANTS",
      "Things PEOPLE EAT RAW"
    ]
  });
  // https://quizlet.com/8888703/game-of-things-flash-cards/

  /*
    "Things THAT MAKE SEX FUN",
    "Things THAT YOU SHOULDNT PUT IN YOUR BUTT",
    "Things THAT WOULD MAKE YOUR LOVE LIFE MORE EXCITING",
    "Things THAT YOU PEE ON",
    "Things YOU WOULD DO IF YOU CHANGED GENDERS FOR A DAY",
      "Things YOUR FRIENDS TEXT YOU",
            "Things YOU WOULD SMOKE",
    "Things YOU CANT BELIEVE THAT SOMEONE ACTUALLY DID",
      "Things YOU CANT BELIEVE THAT SOMEONE ACTUALLY SAID",
      "Things YOU SHOULDNT SAY ABOUT YOUR CHILDREN",
    "Things YOU SHOULDNT DO WHEN YOU ARE NAKED",
Things that you will find in (name room of house..bathroom, kitchen, etc)
Things to wear to (occasion ...wedding, funeral, etc)
*/
  locationOptions.push({
    name: "Things... 1-100 Set",
    list: [
      "Things cannibals think about while dinning",
      "Things dogs are actually saying when they bark",
      "Things grown-ups wish they could still do",
      "Things you should never put in your mouth",
      "Things not to do in a hospital",
      "Things not to do while driving",
      "Things not to tell your mother",
      "Things paramedics shouldn't say to a patient on the way to the hospital",
      "Things people do when no one is looking",
      "Things that are harder than they look",
      "Things that are your favorite foods",
      "Things that you can use for transport (car, bike, bus, plane etc)",
      "Things that confirm your house is haunted",
      "Things that confirm your life is going downhill",
      "Things that go bad",
      "Things that happen in vegas that should stay in vegas",
      "Things that jiggle",
      "Things that make you feel stupid",
      "Things that make you giggle",
      "Things that make you uncomfortable",
      "Things that must be magic",
      "Things that shouldn't be made into video games!",
      "Things that shouldn't be passed from one generation to the next",
      "Things that smell terrible",
      "Things that squirt",
      "Things that you can trip over",
      "Things that you love to watch on tv!",
      "Things that you shouldn't do in public",
      "Things that you shouldn't swallow",
      "Things that you shouldn't throw off of a building",
      "Things that your parents would kill you for",
      "Things that would be fun to do in an elevator",
      "Things that would keep you out of heaven",
      "Things wouldn't want to be allergic to",
      "Things you can never find",
      "Things you do to get a job",
      "Things you do to relieve stress",
      "Things you do to stay warm",
      "Things you don't want to find in your bed",
      "Things you might find in a library",
      "Things you name home brewed beer",
      "Things you return from your christmas gifts",
      "Things you shop for on black friday",
      "Things you should be thankful for",
      "Things you should do to get ready for winter",
      "Things you should give as birthday gifts",
      "Things you shouldn't attempt to juggle",
      "Things you shouldn't do on your birthday",
      "Things you shouldn't do while babysitting",
      "Things you shouldn't do when naked",
      "Things you shouldn't do with glue",
      "Things you shouldn't give trick-or-treaters",
      "Things you shouldn't lick",
      "Things you shouldn't play catch with",
      "Things you shouldn't say to your boss",
      "Things you shouldn't say when walking out of the bathroom",
      "Things you shouldn't send your friends in a pic",
      "Things you shouldn't tie to the roof of your car",
      "Things you shouldn't wear to a wedding",
      "Things you shouldn't wear to a funeral",
      "Things you shouldn't carve into a pumpkin",
      "Things you use to remove snow from your car",
      "Things you wish for",
      "Things you wish were included in a divorce settlement",
      "Things you would ask a psychic",
      "Things you would buy if you were rich",
      "Things you would do if you were a giant",
      "Things you would rather forget",
      "Things you would rather put off till tomorrow",
      "Things you would wish for if you were stranded on an island",
      "Things you wouldn't do for a million dollars",
      "Things you wouldn't want made into a movie",
      "Things you wouldn't want to do in cemetery",
      "Things your friends text you",
      "Things your parents forgot to tell you",
      "Things you'll do when you retire",
      "Things that would get a doctor sued for malpractice",
      "Things you shouldn't do in front of a crowd",
      "Things that give you a headache",
      "Things you wouldn't want to clean",
      "Things children shouldn't know",
      "Things a gentleman shouldn't do",
      "Things women know more about than men",
      "Things you shouldn't give as a gift",
      "Things that make you go ahhhh",
      "Things you would consider strange to include on a resume",
      "Things there should be an award for"
    ]
  });
  locationOptions.push({
    name: "Things... 101-200 Set",
    list: [
      "Things people do when no one is looking",
      "Things you shouldn't do when having dinner with the Queen",
      "Things you shouldn't make fun of",
      "Things you shouldn't teach your pets to do",
      "Things you shouldn't photograph",
      "Things you shouldn't do in the office",
      "Things that make ballet more exciting",
      "Things men know more about then women",
      "Things you would say to a pig if it could talk",
      "Things you can do to get rid of unwanted guests",
      "Things you notice about yourself as you get older",
      "Things you would line up to see",
      "Things you shouldn't pay any attention to",
      "Things a chicken thinks about when the farmer picks up the eggs",
      "Things you wish grew on trees",
      "Things you shouldn't say to you dentist",
      "Things that confirm you are guilty",
      "Things that tire you out",
      "Things you wish you could borrow from a library",
      "Things you shouldn't do while writing a final exam",
      "Things you shouldn't teach your parrot to say",
      "Things that go bad",
      "Things that shouldn't go into a time capsule",
      "Things that hurt your back",
      "Things you shouldn't mix",
      "Things you just cant believe",
      "Things that are politically incorrect",
      "Things that happen once in a blue moon",
      "Things about women that frustrate you",
      "Things that are harder than they look",
      "Things kids know more about than adults",
      "Things that cause trouble",
      "Things that make you relax",
      "Things you wouldn't want to be allergic to",
      "Things you shouldn't shout at the top of your lungs",
      "Things you need to survive",
      "Things you shouldn't do in a car",
      "Things you would like to play with",
      "Things you can't stop",
      "Things you shouldn't do on vacation",
      "Things you would wish for if you found a genie in a bottle",
      "Things that seem to take an eternity",
      "Things that confirm you are losing your memory",
      "Things you shouldn't display in your china cabinet",
      "Things you would like as your last words",
      "Things firemen do between fires",
      "Things you shouldn't put off until tomorrow",
      "Things that shouldn't be lumpy",
      "Things fish think about as they swim in their aquarium",
      "Things that confirm that your life is going downhill",
      "Things you could use as an excuse on judgement day",
      "Things that would make golf more exciting",
      "Things you shouldn't advertise in the classified ads",
      "Things you shouldn't do in the house",
      "Things that would make work more exciting",
      "Things that are wild",
      "Things that require an assistant",
      "Things you would like to say to the President",
      "Things you would like to ask a psychic",
      "Things you shouldn't encourage your children to do",
      "Things you wish you could do with your feet",
      "Things you never see on television",
      "Things you wish worked by remote control",
      "Things you shouldn't exaggerate",
      "Things a waiter shouldn't do",
      "Things you shouldn't collect",
      "Things that confirm you still haven't grown up",
      "Things you shouldn't touch",
      "Things you shouldn't attempt at your age",
      "Things that confirm your small town is backward",
      "Things that would make school more exciting",
      "Things you shouldn't tie to the roof of your car",
      "Things you shouldn't send in the mail",
      "Things that usually make you feel better",
      "Things you would like to do on vacation",
      "Things you would have said to Eve had she tricked you into eating the apple",
      "Things that cause an accident",
      "Things you shouldn't say to get out of a speeding ticket",
      "Things you shouldn't hold while riding a bike",
      "Things you wish you could predict",
      "Things that hurt",
      "Things you shouldn't give away",
      "Things you hate as punishment",
      "Things you shouldn't advertise on a billboard",
      "Things that are embarrassing",
      "Things that require a lot of patience",
      "Things you shouldn't let an amateur do",
      "Things you wish you could erase",
      "Things you say to a telemarketer",
      "Things you wouldn't want to find in your sandwich",
      "Things you shouldn't do at a funeral"
    ]
  });

  /**
   * Object definition sets up base vars
   * @memberOf Spy
   */
  Game.init = false;
  Game.setting = { useSpyGetsLocation: false, useSpyPlayer1: false };

  locations = locationOptions[0].list;
  Game.round = {
    number: 0,
    spy: 0,
    cPlayer: 0,
    location: "",
    numberOfPlayers: 1
  };
  Game.initialize = function(numberOfPlayers) {
    locations = [];

    Game.round.number = 0;
    Game.round.numberOfPlayers = Game.setting.useSpyPlayer1
    ? 2
    : numberOfPlayers;
    playerWeights = [];

    for (let i = 0; i < numberOfPlayers; i++) {
      playerWeights.push(playerStartingWeight);
    }

    //locations setup
    $.each(Game.getLocationOptions(), function(key, val) {
      if (Game.setting[`useSet${key}`]) {
        locations = $.merge(locations, Array.from(val.list));
      }
    });

    if (locations.length == 0) {
      locations = $.merge(locations, Game.getLocationOptions()[0].list);
      Game.setting[`useSet0`] = true;
    }
    locationWeighting = locations.map(function(x) {
      return locationStartingWeight;
    });
    Game.init = true;
  };
  /**
   * common data for majority of pages
   * @memberOf Spy.Game
   * @return {object} basic fields
   */
  Game.getBasicInfo = function() {
    var basic = {};
    basic.playerName = "Player " + (parseInt(Game.round.cPlayer) + 1);
    basic.roundNumber = Game.round.number;
    basic.playerCount = Game.round.numberOfPlayers;
    basic.playerWeights = playerWeights;
    basic.locationWeighting = locationWeighting;
    return basic;
  };
  Game.getLocations = function() {
    return locations;
  };
  Game.getLocationOptions = function() {
    return locationOptions;
  };

  Game.generateRound = function() {
    // TODO: validate playerWeights array
    // if round.number % (num players * 8) == 0

    Game.round.number++;
    Game.round.cPlayer = Game.setting.useSpyPlayer1 ? 1 : 0; //start on second player
    var locationIndex = chooseRandomWeighted(Math.random(), locationWeighting);
    Game.round.location = locations[locationIndex];

    locationWeighting[locationIndex] = calculateNewWeight(
      locationWeighting[locationIndex],
      locationWeightDiff
    );
    const spyIndex = Game.setting.useSpyPlayer1
      ? 0
      : chooseRandomWeighted(Math.random(), playerWeights);

    Game.round.spy = spyIndex;
    playerWeights[spyIndex] = calculateNewWeight(
      playerWeights[spyIndex],
      playerSpyWeightDiff
    );
  };
  Game.nextPlayer = function() {
    Game.round.cPlayer++;
  };
  Game.beginSameRound = function() {
    Game.round.cPlayer = 0;
  };
  Game.getPlayerRole = function() {
    let spyText = "You're the Spy";
    if (Game.setting.useSpyGetsLocation) {
      //get random location
      spyText = this.round.location;
      do {
        let random = Math.floor(Math.random() * locations.length);
        spyText = locations[random];
      } while (spyText == this.round.location);
    }
    return this.round.cPlayer === this.round.spy
      ? spyText
      : this.round.location;
  };
  function calculateNewWeight(weightArrayIndex, diff) {
    return weightArrayIndex > diff ? weightArrayIndex - diff : 0;
  }
  function chooseRandomWeighted(randNum, _weightedArray) {
    let i;
    var sumOfWeights = _weightedArray.reduce(function(total, num) {
      return total + num;
    }, 0);
    // TODO: validate if sum is < 0, then ... reinit all?
    var randomWeight = Math.floor(randNum * sumOfWeights);
    for (i = 0; i < _weightedArray.length; i++) {
      randomWeight -= _weightedArray[i];
      if (randomWeight <= 0) {
        break;
      }
    }
    return i;
  }
})((window.Game = window.Game || {}), jQuery, console);
