import { hot } from 'react-hot-loader'

let Root = (process.env.NODE_ENV === 'production'
  ? require('./Root.dev') // Todo: sub in prod
  : require('./Root.dev'))

if (process.env.NODE_ENV !== 'production') {
  Root = hot(module)(Root)
}

export default Root
