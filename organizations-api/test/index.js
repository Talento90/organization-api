const request = require('request-promise');

const bulkSize = 100;
const iterations = 1000;

for (let i = 0; i < iterations; ++i) {
	let relations = [];

	for (let j = 0; j < bulkSize; ++j) {
		relations.push({ "org_name": `Test Org ${i} ${j}` });
	}

	let body = {
		"org_name": "TestOrg",
		"daughters": relations
	};

	request({
		method: 'POST',
		uri: 'http://localhost:5000/api/organizations',
		body: body,
		json: true
	})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (err) {
			console.log(err);
		})
}


