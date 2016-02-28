/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
		/* This is our first test suite - a test suite just contains
		* a related set of tests. This suite is all about the RSS
		* feeds definitions, the allFeeds variable in our application.
		*/
		describe('RSS Feeds', function() {
				/* This is our first test - it tests to make sure that the
				 * allFeeds variable has been defined and that it is not
				 * empty.
				 */
				it('are defined', function() {
						expect(allFeeds).toBeDefined();
						expect(allFeeds.length).not.toBe(0);
				});


				/* A test that loops through each feed
				 * in the allFeeds object and ensures it has a URL defined
				 * and that the URL is not empty.
				 */
				it('have a defined URL', function() {
						allFeeds.forEach(function(feed) {
								expect(feed.url).toBeDefined();
								expect(feed.url.length).not.toBe(0);
						});
				});


				/* A test that loops through each feed
				 * in the allFeeds object and ensures it has a name defined
				 * and that the name is not empty.
				 */
				it('have a defined name', function() {
						allFeeds.forEach(function(feed) {
								expect(feed.name).toBeDefined();
								expect(feed.name.length).not.toBe(0);
						});
				});
			
		});


		// A test suite for the menu
		describe('The menu', function() {


				// A test that ensures the menu element is hidden by default.
				it('is hidden by default', function() {
						expect($('body').hasClass('menu-hidden')).toBe(true);
				});


				/* A test that ensures the menu changes
				 * visibility when the menu icon is clicked.
				 */
				it('changes visibility when the icon is clicked', function() {
						var menuIcon = $('.menu-icon-link');

						menuIcon.click();
						expect($('body').hasClass('menu-hidden')).toBe(false);

						menuIcon.click();
						expect($('body').hasClass('menu-hidden')).toBe(true);
				});
			
		});

		// A test suite for the initial feed.
		describe('Initial Entries', function() {

				/* A test that ensures when the loadFeed
				 * function is called and completes its work, there is at least
				 * a single .entry element within the .feed container.
				 */
				beforeEach(function(done) {
						loadFeed(0, function() {
								done();
						});
				});


				it('exist', function() {
						expect($('.feed').find('.entry').length).not.toBe(0);
				});

		});
	
		// A test suite for entries' URLs.
		describe('URLs', function() {

				// A test that ensures that each entry's URL is valid.
				beforeEach(function(done) {
						loadFeed(0, function() {
								done();
						});
				});


				it('are valid', function() {
						/* Using Diego Perini's Regular Expression for URL validation.
					 	* https://gist.github.com/dperini/729294
					 	*/
						var re_weburl = new RegExp(
								"^" +
										// protocol identifier
										"(?:(?:https?|ftp)://)" +
										// user:pass authentication
										"(?:\\S+(?::\\S*)?@)?" +
										"(?:" +
											// IP address exclusion
											// private & local networks
											"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
											"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
											"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
											// IP address dotted notation octets
											// excludes loopback network 0.0.0.0
											// excludes reserved space >= 224.0.0.0
											// excludes network & broacast addresses
											// (first & last IP address of each class)
											"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
											"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
											"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
										"|" +
											// host name
											"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
											// domain name
											"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
											// TLD identifier
											"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
											// TLD may end with dot
											"\\.?" +
										")" +
										// port number
										"(?::\\d{2,5})?" +
										// resource path
										"(?:[/?#]\\S*)?" +
								"$", "i"
						);
						
						$('.entry-link').each(function() {
								expect($(this).attr('href').match(re_weburl)).not.toBe(null);
						});
					
				});

		});
		
		// A test suite for loading feeds.
		describe('New Feed Selection', function() {

				/* A test that ensures when a new feed is loaded
				 * by the loadFeed function that the content actually changes.
				 * Remember, loadFeed() is asynchronous.
				 */
				var initialTitle, secondTitle;
				// Randomizing between 1 and 3 the id of the feed that will be loaded.
				var feedIndex = Math.floor(Math.random() * 3) + 1;

				beforeEach(function(done) {
						initialTitle = $('.header-title').text();
						loadFeed(feedIndex, function() {
								done();
						});
				});

				it('replaces the previous one', function() {
						secondTitle = $('.header-title').text();
						expect(secondTitle).not.toEqual(initialTitle);
				});

		});

}());