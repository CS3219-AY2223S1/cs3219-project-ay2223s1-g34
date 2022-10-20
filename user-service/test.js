import chai from "chai";
import chaiHttp from "chai-http";
import app from "./index.js";

const assert = chai.assert;
// Configure chai
chai.use(chaiHttp);
chai.should(); // Assertion style

// Creat Account
describe("POST", function () {
	this.timeout(50000);
	it("[Invalid Input] Create Account - Username too short", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "a",
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Invalid credentials!");
				done();
			});
	});
	it("[Invalid Input] Create Account - Username too long", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username:
					"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Invalid credentials!");
				done();
			});
	});
	it("[Valid Input] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "TestAccount",
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(201);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Created new user TestAccount successfully!"
				);
				done();
			});
	});
	it("[Invalid Input - Email already in use] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "TestAccount",
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Username or email address already in use!"
				);
				done();
			});
	});
	it("[Invalid Input - Missing fields] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Invalid Input - Missing fields] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "TestAccount",
				email: "threedoorcabinet@gmail.com",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Invalid Input - Missing fields] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "TestAccount",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Invalid Input - Invalid Email] Create Account", function (done) {
		chai.request(app)
			.post("/api/user/createacc")
			.send({
				username: "TestAccount2",
				email: "garbage",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Invalid credentials!");
				done();
			});
	});
});

// Verify Email
describe("POST", function () {
	let token = null;
	this.timeout(50000);
	it("[Valid Input] Send Verify Email", function (done) {
		chai.request(app)
			.post("/api/user/sendverify/threedoorcabinet@gmail.com")
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Email verification email sent!"
				);
				result.body.should.have.property("token");
				token = result.body.token;
				done();
			});
	});
	// Verify Email
	it("[Valid Input] Verify Email", function (done) {
		chai.request(app)
			.post(`/api/user/verify/${token}`)
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal("Email verified successfull!");
				done();
			});
	});
	// Verify Email
	it("[Invalid Input] Verify Email - Invalid token", function (done) {
		chai.request(app)
			.post(`/api/user/verify/garbageToken`)
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Email verified failed!");
				done();
			});
	});
	// Verify Email
	it("[Invalid Input] Verify Email - Missing Token", function (done) {
		chai.request(app)
			.post(`/api/user/verify/`)
			.end((error, result) => {
				result.should.have.status(404);
				done();
			});
	});
});

// Sign In
describe("POST", function () {
	let token = null;
	this.timeout(50000);
	it("[Valid Input] Sign In", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Successfully signed in as TestAccount!"
				);
				result.body.should.have.property("token");
				token = result.body.token;
				done();
			});
	});
	it("[Invalid Input] Sign In - Incorrect password", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "wrongpassword",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Email address or password incorrect/unverified!"
				);
				done();
			});
	});
	it("[Invalid Input] Sign In - Incorrect email", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "doesNotExist@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Email address or password incorrect/unverified!"
				);
				done();
			});
	});
	it("[Invalid Input] Sign In - Missing Fields", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Invalid Input] Sign In - Missing Fields", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				password: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
});

// Change Password
describe("POST", function () {
	let token = null;
	this.timeout(5000);
	it("[Valid Input] Sign In with Old Password", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123",
			})
			.end((error, result) => {
				token = result.body.token;
				done();
			});
	});
	it("[Valid Input] Change Password", function (done) {
		chai.request(app)
			.put("/api/user/changepw/threedoorcabinet@gmail.com")
			.set("Cookie", `token=${token}`)
			.send({
				old: "password123",
				new: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Change password successfull!"
				);
				done();
			});
	});
	it("[Invalid Input] Change Password - Wrong old password", function (done) {
		chai.request(app)
			.put("/api/user/changepw/threedoorcabinet@gmail.com")
			.set("Cookie", `token=${token}`)
			.send({
				old: "wrongpassword",
				new: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Incorrect old password");
				done();
			});
	});
	it("[Invalid Input] Change Password - Missing Fields", function (done) {
		chai.request(app)
			.put("/api/user/changepw/threedoorcabinet@gmail.com")
			.set("Cookie", `token=${token}`)
			.send({
				old: "password123",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Invalid Input] Change Password - Missing Fields", function (done) {
		chai.request(app)
			.put("/api/user/changepw/threedoorcabinet@gmail.com")
			.set("Cookie", `token=${token}`)
			.send({
				new: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Valid Input] Sign In with New Password", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Successfully signed in as TestAccount!"
				);
				result.body.should.have.property("token");
				done();
			});
	});
});

// Reset Password
describe("POST", function () {
	let token = null;
	this.timeout(50000);
	it("[Valid Input] Forgot Password", function (done) {
		chai.request(app)
			.post("/api/user/forgotpw/threedoorcabinet@gmail.com")
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal("Password reset email sent!");
				result.body.should.have.property("token");
				token = result.body.token;
				done();
			});
	});

	it("[Invalid Input] Reset Password - Wrong token", function (done) {
		chai.request(app)
			.put(`/api/user/resetpw/wrongtoken`)
			.send({
				new: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Reset password failed!");
				done();
			});
	});
	it("[Invalid Input] Reset Password - Missing Fields", function (done) {
		chai.request(app)
			.put(`/api/user/resetpw/${token}`)
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal("Please fill up all fields!");
				done();
			});
	});
	it("[Valid Input] Reset Password", function (done) {
		chai.request(app)
			.put(`/api/user/resetpw/${token}`)
			.send({
				new: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal("Reset password successfull!");
				done();
			});
	});
	it("[Valid Input] Sign In with New Password", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Successfully signed in as TestAccount!"
				);
				result.body.should.have.property("token");
				done();
			});
	});
});

// Delete Account
describe("POST", function () {
	let token = null;
	this.timeout(50000);
	it("[Valid Input] Sign In", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123456",
			})
			.end((error, result) => {
				token = result.body.token;
				done();
			});
	});
	it("[Invalid Input] Delete Account - Missing token", function (done) {
		chai.request(app)
			.delete("/api/user/deleteacc/threedoorcabinet@gmail.com")
			.end((error, result) => {
				result.should.have.status(401);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Missing authorization token!"
				);
				done();
			});
	});
	it("[Invalid Input] Delete Account - Wrong token", function (done) {
		chai.request(app)
			.delete("/api/user/deleteacc/threedoorcabinet@gmail.com")
			.set("Cookie", `token=wrongtoken`)
			.end((error, result) => {
				result.should.have.status(401);
				result.body.should.have.property("message");
				result.body.message.should.equal("Unauthorized action!");
				done();
			});
	});
	it("[Valid Input] Delete Account", function (done) {
		chai.request(app)
			.delete("/api/user/deleteacc/threedoorcabinet@gmail.com")
			.set("Cookie", `token=${token}`)
			.end((error, result) => {
				result.should.have.status(200);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Deleted threedoorcabinet@gmail.com successfull!"
				);
				done();
			});
	});
	it("[Invalid Input] Sign In - Deleted Account", function (done) {
		chai.request(app)
			.post("/api/user/signin")
			.send({
				email: "threedoorcabinet@gmail.com",
				password: "password123456",
			})
			.end((error, result) => {
				result.should.have.status(400);
				result.body.should.have.property("message");
				result.body.message.should.equal(
					"Email address or password incorrect/unverified!"
				);
				done();
			});
	});
});
