import { combineReducers } from "redux";

import { reducer as authReducer } from '@/redux/auth';
import { reducer as teamReducer } from '@/redux/team';

const rootReducer = combineReducers({
    auth: authReducer,
    team: teamReducer,
});

export default rootReducer;