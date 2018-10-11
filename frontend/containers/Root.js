import RootDev from './Root.dev'

const Root = (process.env.NODE_ENV === 'production'
  ? RootDev // Todo: sub in prod
  : RootDev)

export default Root
