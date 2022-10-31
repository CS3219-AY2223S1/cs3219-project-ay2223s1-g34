// Import the dependencies for testing
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from "./index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();  // assertion style

// General running
describe("General", function () {
    this.timeout(50000);

    // Test general server
    describe("GET /", function () {
        // Test the server is running correctly
        it("server is running correctly", (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(404);    // this is expected
                    done();
                });
        });
    });

    // Test other path
    describe("GET /some/other/path", function () {
        // Test the server does not crash when accessing an inaccessible path
        it("inaccessible path handled correctly", (done) => {
            chai.request(app)
                .get('/some/other/path')
                .end((err, res) => {
                    res.should.have.status(404);    // this is expected
                    done();
                });
        });
    });
});


// API testing
describe("API endpoint /api/question", function () {
    this.timeout(50000);
    const endpoint = '/api/question';

    // Test general endpoint
    describe("GET /", function () {
        // Test the API endpoint is running correctly
        it("API endpoint is running correctly", (done) => {
            chai.request(app)
                .get(endpoint)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.eql("Hello World from question-service");
                    done();
                });
        });
    });

    // Test getQuestion
    describe("GET /getQuestion", function () {
        getQuestion = endpoint + '/getQuestion';

        // Test wrong difficulty
        it("wrong difficulty covered: appropiate message", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'wrong', 'topic': 'I/O' })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Database failure when getting the question!");
                    done();
                });
        });

        // Test wrong topic
        it("wrong topic covered: appropiate message", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 'wrong' })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Database failure when getting the question!");
                    done();
                });
        });

        // Test wrong topic type
        it("wrong topic covered: appropiate message", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 213 })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Database failure when getting the question!");
                    done();
                });
        });

        // Works when difficulty & topic
        it("difficulty and topic works", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 'I/O' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("question");
                    res.body.question.should.be.a('object');
                    done();
                });
        });

        // Works when qid
        it("qid works", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'qid': 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("question");
                    res.body.question.should.be.a('object');
                    done();
                });
        });

        // Test all three given
        it("all three choices given in query does not crash", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 'I/O', 'qid': 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("question");
                    res.body.question.should.be.a('object');
                    done();
                });
        });
    }); res.body.should.be.a('array');

    // Test getQuestionsByFilter
    describe("GET /getQuestionsByFilter", function () {
        getQuestionsByFilter = endpoint + '/getQuestionsByFilter';

        // Works as intended
        it("works as intended", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 'I/O', 'qid': 3 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("questions");
                    res.body.questions.should.be.a('array');
                    done();
                });
        });

        // Returns everything with no filters
        it("get all questions", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("questions");
                    res.body.questions.should.be.a('array');
                    done();
                });
        });

        // Filters too specific, no question returned
        it("filters too specific", (done) => {
            chai.request(app)
                .get(getQuestion)
                .send({ 'difficulty': 'Hard', 'topic': 'I/O', 'qid': 1 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("questions");;
                    res.body.questions.length.should.be.eql(0)
                    done();
                });
        });
    });
});