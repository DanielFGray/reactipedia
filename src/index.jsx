// @flow
import React from 'react'
import { render } from 'react-dom'
import 'normalize.css'
import './style.sss'

import Search from './Search'

const App = () => (
  <Search />
)

render(<App />, document.getElementById('main'))

