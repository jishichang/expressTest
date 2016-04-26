var Browser = require('zombie'),
	assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function () {

	setup(function () {
		browser = new Browser();
	});

	test('requesting a group rate quote from the hood river tour pahe' + 'should populate the referrer field', function () {
		var referrer = 'http://192.168.2.167:3000/tours/hood-river';
		browser.visit(referrer, function () {
			browser.clickLink('.requestGroupRate', function () {
				assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	test('requesting a group rate from the oregon coast tour page should ' + 'populate the referrer field', function(done){
		var referrer = 'http://192.168.2.167:3000/tours/oregon-coast';
		browser.visit(referrer, function(){
			browser.clickLink('.requestGroupRate', function(){
				assert(browser.field('referrer').value=== referrer);
				done();
			});
		});
	});

	test('visiting the "request group rate" page dirctly should result ' + 'in an empty referrer field', function(done){
		browser.visit('http://192.168.2.167:3000/tours/request-group-rate', function(){
			assert(browser.field('referrer').value === '');
			done();
		});
	});
});

