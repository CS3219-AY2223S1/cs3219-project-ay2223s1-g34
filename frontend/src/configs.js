const URI_USER_SVC = process.env.REACT_APP_URI_USER_SVC || "http://localhost:8000";
export const URI_COLLAB_SVC = process.env.REACT_APP_URI_COLLAB_SVC || 'http://localhost:8002'
export const URI_MATCHING_SVC =
    process.env.REACT_APP_URI_MATCHING_SVC || "http://localhost:8001";
const URI_QUESTION_SVC = process.env.REACT_APP_URI_QUESTION_SVC || "http://localhost:8003"

const PREFIX_USER_SVC = "/api/user";
const PREFIX_MATCHING_SVC = "/api/matching";
const PREFIX_QUESTION_SVC = "/api/question";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC;
export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCHING_SVC;
