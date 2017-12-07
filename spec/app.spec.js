let Request = require('request');

describe("Server", () => {
    let server;
    let firstRestaurantId;

    beforeAll(() => {
        server = require("../app");
        console.log(process.env.TEST_VALID_TOKEN);
    });
    afterAll(() => {
    });

    describe("GET /restaurants", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/restaurants", (error, response, body) => {
                data.status = response.statusCode;console.log(data.body);
                data.body = JSON.parse(body);
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.length).toBe(6);
        });
    });


    describe("POST /restaurants", () => {
        let data = {};
        // add a new recipe to our database
        beforeAll((done) => {
            Request(
                { method: 'POST'
                , uri: 'http://localhost:3000/restaurants'
                , json: true
                , body: {
                    name:"Hof van Cleve", 
                    locatie:"Riemegemstraat 1, 9770 Kruishoutem"
                }
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check body", () => {
            expect(data.body.name).toBe("Hof van Cleve");
            expect(data.body.locatie).toBe("Riemegemstraat 1, 9770 Kruishoutem");
            expect(data.body.reacties.length).toBe(0);
            expect(data.body._id).toBeDefined();
            firstRestaurantId = data.body._id;
        });
    });

    describe("GET /restaurants", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/restaurants", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                console.log(data.body);
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.length).toBe(7);
            let restaurant = data.body[0];
            expect(restaurant.name).toBe("Naam");
            expect(restaurant.reacties.length).toBe(4);
        });
    });
    
    describe("POST /restaurant/restaurantid/reacties", () => {
        let data = {};
        beforeAll((done) => {
            Request(
                { method: 'POST'
                , uri: `http://localhost:3000/restaurants/${firstRestaurantId}/reacties`
                , json: true
                , body: {
                    tekst: "Super goed gegeten, goede bediening",
                    score: "5",
                }
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.TEST_VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check body", () => {
            expect(data.body.tekst).toBe("Super goed gegeten, goede bediening");
            expect(data.body.score).toBe(5);
            expect(data.body._id).toBeDefined();
        });
    });
});