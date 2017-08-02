import React from 'react'
import {
  withHandlers,
  withState,
} from 'recompose'
import { compose } from 'ramda'
import wiki from './wiki'

const Entry = compose(
  withState('data', 'dataChange', null),
  withState('toggled', 'toggleBody', false),
  withState('loading', 'toggleLoading', false),
  withHandlers({
    click: p => e => {
      e.preventDefault()
      if (p.toggled) {
        p.toggleBody(false)
      } else {
        p.toggleLoading(true)
        wiki.retrieve(p.title)
          .then(p.dataChange)
          .then(() => p.toggleLoading(false))
          .then(() => p.toggleBody(true))
      }
    },
  }),
)(({ toggled, loading, data, click, url, title, description }) => (
  <li>
    <a href={url} onClick={click}>{title}</a> - {description}
    {loading && <div>Loading...</div>}
    {toggled &&
      <div
        style={{
          border: '1px solid #999',
          borderRadius: '5px',
          padding: '10px',
          background: '#eee',
        }}
        dangerouslySetInnerHTML={{ __html: data }}
      />}
  </li>
))

export default Entry
