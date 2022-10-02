import chai from "chai";
import chaiHttp from "chai-http";
import app from "./index.js";

const assert = chai.assert;
// Configure chai
chai.use(chaiHttp);
chai.should(); // Assertion style

// Sign In
describe("POST", function () {
	this.timeout(5000);
	it("[valid Input] Sign In", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "hogantan98@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
                result.body.message.should.equal('Successfully signed in as hogan!')
				result.body.should.have.property("token");
				done();
			});
	});
});

// Change Password
describe("POST", function () {
	let token = null;
	this.timeout(5000);
	it("[valid Input] Sign In", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "hogantan98@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				token = result.body.token;
				done();
			});
	});
	it("[valid Input] Change Password", function (done) {
		chai.request(app)
			.put("/api/user/changepw/hogantan98@gmail.com")
            .set('Cookie', `token=${token}`)
			.send({
				old: "password123",
                new: "password123",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
                result.body.message.should.equal('Change password successfull!')
				done();
			});
	});
});
