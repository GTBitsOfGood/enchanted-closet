import RootDev from './Root.dev'
import RootProd from './Root.prod'

const Root = (process.env.NODE_ENV === 'production'
  ? RootProd // Todo: sub in prod
  : RootDev)

export default Root
