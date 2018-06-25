/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as Calendar} from './calendar'
export {default as AllEvents} from './all-events'
export {default as SingleBox} from './single-box'
export {default as AddForm} from './add-form'
export {default as EditForm} from './edit-form'
export {Login, Signup} from './auth-form'
