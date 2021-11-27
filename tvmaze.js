/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

const MISSING_URL = "https://tinyurl.com/tv-missing";

async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.

  const results = await axios.get("https://api.tvmaze.com/search/shows", { params: { q: query } })
  const shows = [];

  for (let item of results.data) {
    shows.push({
      id: item.show.id,
      name: item.show.name,
      summary: item.show.summary,
      image: item.show.image ? item.show.image.medium : MISSING_URL
    });
  }



  return shows;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    // console.log(show.image)
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
        <div class="card" data-show-id="${show.id}">
          <img class="card-img-top" src="${show.image}">
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">${show.summary}</p>
              <button type="button" id="${show.id}">Episodes</button>
          </div>
        </div>
      </div>
      `);

    $showsList.append($item);
  }

}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);


  populateShows(shows);

  for (let show of shows) {

    $(`#${show.id}`).on('click', async function displayEpisodes(e) {
      const id = show.id;

      const episodes = await getEpisodes(id);

      $('#episodes-area').show();

      populateEpisode(episodes);

    })

  }


});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  const episResults = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)

  // TODO: return array-of-episode-info, as described in docstring above

  const episList = [];

  for (let episode of episResults.data) {
    episList.push({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    });
  }

  return episList


}

// Places the list of episodes on the DOM
function populateEpisode(episodes) {
  const $episodeList = $("#episodes-list");
  $episodeList.empty();

  // Creates li elements for episodes and appends to the DOM
  for (let episode of episodes) {
    let $episode = $(`<li><strong>${episode.name}</strong>: (Season:${episode.season}, Episode:${episode.number})</li>`);
    $episodeList.append($episode)
  }

}


