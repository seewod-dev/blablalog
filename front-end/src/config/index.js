import dev from './config.dev'
import prod from './config.prod'
const cfg = process.env.NODE_ENV === 'production' ? prod : dev
export default cfg
