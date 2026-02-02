// src/firebase.ts  (compat re-export)
import app, { auth, db, storage, functions, analyticsPromise } from "./lib/firebase";
export { app, auth, db, storage, functions, analyticsPromise };
export default app;