describe("searchShows", function () {
    it("should return ans object", function () {
        expect(searchShows("star wars")).toBeInstanceOf(Object);
    });
})

describe("populateShows", function () {

    beforeEach(async function () {
        let shows = await searchShows("star wars")
        populateShows(shows);
    })

    it("should append a card to the DOM", function () {
        expect($("#shows-list")).not.toBe($("#shows-list").empty())
    })

    afterEach(function () {
        $("#shows-list").empty()
    })
})

describe("getEpisodes", function () {

    it("should return an Object", function () {
        expect(getEpisodes(1)).toBeInstanceOf(Object);
    })
})


describe("populateEpisode", function () {

    it("should append a list of episodes to the DOM", function () {
        expect($("#episodes-list")).not.toBe($("#episodes-list").empty())
    })
})
