const middleware = {}

middleware['isMobile'] = require('../middleware/isMobile.js')
middleware['isMobile'] = middleware['isMobile'].default || middleware['isMobile']

export default middleware
