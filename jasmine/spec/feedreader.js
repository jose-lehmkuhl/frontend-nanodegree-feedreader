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

        // checks if all feeds have url by adding 1 for each feed with url and 
        // comparing the result with allFeeds length
        it('Urls are defined', function() {
            let feedsWithUrl = 0;
            for (const feed of allFeeds) {
                if(feed.url.length > 0) {
                    feedsWithUrl++;
                }
            }
            
            expect(allFeeds.length).toBe(feedsWithUrl);
        });

        // checks if all feeds have names by adding 1 for each feed with name and 
        // comparing the result with allFeeds length
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


        // checks if menu is hiden by default checking if the body has the 
        // menu-hidden class
        it('Menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        // checks if menu is toggled(has menu-hidden) after clicks
        it('Menu toggles on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        
        //Loads initial feed
        beforeEach(function(done) {
            loadFeed(0,function() {
                done();
            });
        });

        //checks if any of its children has the entry class
        it(`Feed container has at least 1 entry`, function(done) {
            expect($('.feed').children('.entry-link').children('.entry').length > 0).toBe(true);
            done();
        });

    });


    describe('New Feed Selection', function() {

        let feed0;

        // sets the first loadFeed function callback to store current feed html and call
        // loadFeed again with a new index
        beforeEach(function(done) {
            loadFeed(0,function() {
                feed0 = $('.feed').html();
                loadFeed(1,function() {
                    done();
                });
            });
        });

        // compares initial feed html with the new one 
        it(`Content should change after new feed is loaded`, function(done) {
            expect($('.feed').html()).not.toBe(feed0);
            done();
        });     
    });
}());
