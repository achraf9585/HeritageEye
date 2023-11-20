import Parse from "parse";

import { API_KEY, API_URL, APP_ID } from "./config";

Parse.initialize(APP_ID, API_KEY);
Parse.serverURL = API_URL;
