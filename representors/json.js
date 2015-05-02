/*******************************************************
 * big-todo
 * Representation Service for plain JSON
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Keith Jarrett Charlie Haden "Last Dance"
 *            : King's Singers "Postcards"
 *******************************************************/

// json representor
module.exports = json;

function json(object) {
  
  // doesn't emit actions
  // just data, so...
  // drop action[] metadata
  // move data[] to top
  for(var p in object) {
    switch(p) {
      case "actions":
        delete object[p];
        break;
      case "category":
      case "task":
      case "user":
      case "home":
        object[p].actions = null;
        if(object[p].data) {
          object[p] = object[p].data;        
          object[p].data = null;
        }
        else {
          if(p==="home") {
            delete object[p];
          }
        }
        break;
    }
  }
  
  return JSON.stringify(object, null, 2); 
}
