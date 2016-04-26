var fortuneCookies = [
	"price 01",
	"price 02",
	"price 03",
	"price 04",
	"price 05"
];

exports.getFortune = function () {
	var idx = Math.floor(Math.random() * fortuneCookies.length);
	return fortuneCookies[idx];
};
