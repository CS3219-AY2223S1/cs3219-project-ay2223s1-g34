const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'
const URI_COLLAB_SVC = process.env.URI_COLLAB_SVC || 'http://localhost:8002'
const PREFIX_USER_SVC = '/api/user'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
