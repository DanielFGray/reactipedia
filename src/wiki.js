import superagent from 'superagent'
import {
  map,
  memoize,
  path,
  pipe,
  tail,
  transpose,
  zipObj,
} from 'ramda'

const wiki = {
  q: memoize(o =>
    superagent
      .get('https://en.wikipedia.org/w/api.php')
      .query({ ...o, origin: '*', format: 'json' })
      .then(x => x.body)),
  search: search =>
    wiki.q({
      action: 'opensearch',
      profile: 'fuzzy',
      limit: 50,
      search,
    }).then(pipe(
      tail,
      transpose,
      map(zipObj(['title', 'description', 'url'])),
    )),
  retrieve: page =>
    wiki.q({
      action: 'parse',
      page,
    }).then(path(['parse', 'text', '*'])),
}

export default wiki
