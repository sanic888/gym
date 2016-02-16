module.exports.get1 = function(req, res){
	if (/Bearer .+/.test(req.headers.authorization)) {
		const response = {
			data: {
				type: 'accounts',
				id: '1',
				attributes: {
					login: 'letme',
					name: 'Some person'
				}
			}
		};

		// delay this a bit so we see the loading template
		setTimeout(function() {
			console.log(response);
			res.status(200).send(response);
		}, 1000);
	} else {
		res.status(401).end();
	}
}