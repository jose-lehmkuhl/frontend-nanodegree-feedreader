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

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('Urls are defined', function() {
            let feedsWithUrl = 0;
            for (const feed of allFeeds) {
                if(feed.url.length > 0) {
                    feedsWithUrl++;
                }
            }

            expect(allFeeds.length).toBe(feedsWithUrl);
        });

        it('Names are defined', function() {
            let feedsWithName = 0;
            for (const feed of allFeeds) {
                if(feed.name.length > 0) {
                    feedsWithName++;
                }
            }

            expect(allFeeds.length).toBe(feedsWithName);
        });
    });

    describe('The menu', function () {

        it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('Menu toggles on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        it(`Feed container has at least 1 entry`, function(done) {
            expect($('.feed').children('.entry-link').children('.entry').length > 0).toBe(true);
            done();
        });

    });


    describe('New Feed Selection', function() {

        let feed0;
        beforeEach(function(done) {
            loadFeed(0,function() {
                feed0 = $('.feed').html();
                loadFeed(1,function() {
                    done();
                });
            });
        });

        it(`Content should change after new feed is loaded`, function(done) {
            expect($('.feed').html()).not.toBe(feed0);
            done();
        });     
    });
}());
