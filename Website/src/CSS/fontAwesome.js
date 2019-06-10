/** fontAwesome.js
 *  This file creates a fontAwesome library of icons that can be used across multiple views.
 *  The main advantage of this file is to only require importing the icons once instead of have to import the in every view.
 */

import { library } from '@fortawesome/fontawesome-svg-core'

// Import the fontAwesome icons
import { faUser, faLock, faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

// Add the Icons to the Library so they can be used in multiple components
library.add(
  faUser,
  faLock,
  faCoffee,
  faHeart,
  faGithub
)