import { updateClock } from './utils.js';

document.addEventListener("DOMContentLoaded", ()=>{
   updateClock();
   setInterval(updateClock, 6000);
});