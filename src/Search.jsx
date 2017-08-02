// @flow
import React from 'react'
import {
  componentFromStream,
  createEventHandler,
  setObservableConfig,
} from 'recompose'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/startWith'

import wiki from './wiki'
import Item from './Item'

setObservableConfig({
  fromESObservable: Observable.from,
})

const Search = componentFromStream(props$ => {
  const startWith = 'React'
  const { handler: textChange, stream: textChange$ } = createEventHandler()
  const search$ = textChange$
    .map(e => e.target.value)
    .debounceTime(250)
    .distinctUntilChanged()
    .startWith(startWith)
    .flatMap(wiki.search)

  return Observable.combineLatest([props$, search$])
    .map(([props, search]) => (
      <div {...props}>
        <div>
          <input
            placeholder="Search..."
            defaultValue={startWith}
            onChange={textChange}
            style={{
              width: '100%',
              marginBottom: '10px',
              borderRadius: '3px',
              padding: '3px',
              border: '1px solid #aaa',
            }}
          />
        </div>
        {search.map(e => <Item key={e.title} {...e} />)}
      </div>
    ))
})

export default Search
