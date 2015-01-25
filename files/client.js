/**************************************************************
 * big-todo
 * SPA Client for JSON Object Provider (JS)
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Charlie Haden, Jim Hall "Montreal Jazs Festival"
 **************************************************************/
 
 var pg;
 
 window.onload = function() {
  pg = thisPage();
  pg.init();
 }
 
 function thisPage() {

  var g = {};  
  g.root = "http://localhost:8181";
  g.rsp = {};
    
  // memorize all the urls
  g.urls = {};
  g.urls.taskAdd = "/task/";
  g.urls.taskItem = "/task/{id}";
  g.urls.taskComplete = "/task/complete/";
  g.urls.taskCollection = "/task/";
  g.urls.taskAssignUser = "/task/assign/";
  g.urls.taskFindByTitle = "/task/bytitle/?q={q}";
  g.urls.taskFindByCategory = "/task/bycategory/?q={q}";
  g.urls.taskFindByComplete = "/task/bycomplete/?q={q}";

  g.urls.categoryAdd = "/category/";
  g.urls.categoryItem = "/category/{id}";
  g.urls.categoryCollection = "/category/";
  g.urls.categoryFindByName = "/category/byname/?q={q}";

  g.urls.userAdd = "/user/";  
  g.urls.userItem = "/user/{id}";
  g.urls.userUpdate = "/user/{id}";
  g.urls.userChangePW = "/user/changepw/";
  g.urls.userCollection = "/user/";
  g.urls.userFindByName = "/user/byname/?fn={fn}&gn={gn}";
  g.urls.userFindByUser = "/user/byuser?q={q}";
  
  // constraint field representation on screen
  g.tables = {}
  g.tables.task = "title description category dateDue completeFlag";
  g.tables.category = "name";
  g.tables.user = "userName familyName givenName";
  
  // lists of divs to clear as needed
  g.divs = {};
  g.divs.task = "task-list task-add task-complete task-assign task-findbytitle task-findbycategory task-findbycomplete task-filters";
  g.divs.category = "category-list category-add category-findbyname category-filters";
  g.divs.user = "user-list user-add user-update user-changepw user-findbyname user-findbyuser user-filters";

  // urls for dialogs
  g.dialogs = { 
    "task-add" : g.urls.taksAddItem, 
    "task-complete" : g.urls.taskComplete,
    "task-assign" : g.urls.taskAssignUser,
    "task-findbycategory" : g.urls.taskFindByCategory, 
    "task-findbytitle" : g.urls.taskFindByTitle,
    "task-findbycomplete" : g.urls.taskFindByComplete,
    "category-add" : g.urls.categoryAdd,
    "category-findbyname" : g.urls.categoryFindByName,
    "user-add" : g.urls.userAdd,
    "user-update" : g.urls.userUpdate,
    "user-changepw" : g.urls.userChangePW,
    "user-findbyname" : g.urls.userFindByName,
    "user-findbyuser" :g.urls.userFindByUser
  };
  
  function init() {
    registerEvents();
    showTasks();
  }
  
  function showTasks() {
    showSet('task');
    hideDialogs();
    getTaskCollection();
  }
  function getTaskCollection(url) {
    var elm;
    
    if(!url) {
      url = g.urls.taskCollection;
    }
    
    elm = document.getElementById('task-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      elm.innerHtml = 'loading...';
      makeRequest(g.root + url, 'get', null, 'taskCollection', showTaskCollection);
    }
  }
  function showTaskCollection() {
    var elm;
    
    elm = document.getElementById('task-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      makeTable(elm, "Tasks", "task", g.rsp, g.tables.task, g.urls.taskItem, showTaskItem);
    }
  }
  function showTaskItem(href) {
    alert('showTaskItem '+href);
  }
  function toggleTaskFilters(s) {
    var elm;
    
    showSet('task');
    hideDialogs();
    elm = document.getElementById("task-filters");
    if(elm) {
      if(s) {
        elm.style.display=s;
      }
      else {
        if(elm.style.display==="block") {
          elm.style.display="none";
        }
        else {
          elm.style.display="block";
        }
      }
    }
  }
  
  function showCategories() {
    showSet('category');
    hideDialogs();
    getCategoryCollection();
  }
  function getCategoryCollection(url) {
    var elm;
    
    if(!url) {
      url = g.urls.categoryCollection;
    }
    
    elm = document.getElementById('category-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      elm.innerHtml = 'loading...';
      makeRequest(g.root + url, 'get', null, 'categoryCollection', showCategoryCollection);
    }
  }
  function showCategoryCollection() {
    var elm;
    
    elm = document.getElementById('category-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      makeTable(elm, "Categories", "category", g.rsp, g.tables.category, g.urls.categoryItem, showCategoryItem);
    }
  }
  function showCategoryItem(href) {
    alert('showCategoryItem');
  }
  function toggleCategoryFilters(s) {
    var elm;
    
    showSet('category');
    hideDialogs();
    elm = document.getElementById("category-filters");
    if(elm) {
      if(s) {
        elm.style.display=s;
      }
      else {
        if(elm.style.display==="block") {
          elm.style.display="none";
        }
        else {
          elm.style.display="block";
        }
      }
    }
  }
  
  function showUsers() {
    showSet('user');
    hideDialogs();
    getUserCollection();
  }
  function getUserCollection(url) {
    var elm;
    
    if(!url) {
      url = g.urls.userCollection;
    }
    
    elm = document.getElementById('user-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      elm.innerHtml = 'loading...';
      makeRequest(g.root + url, 'get', null, 'userCollection', showUserCollection);
    }
  }
  function showUserCollection() {
    var elm;
    
    elm = document.getElementById('user-list');
    if(elm) {
      while(elm.firstChild){elm.removeChild(elm.firstChild);}
      makeTable(elm, "Users", "user", g.rsp, g.tables.user, g.urls.userItem, showUserItem);
    }
  }
  function showUserItem(href) {
    alert('showUserItem '+href);
  }
  function toggleUserFilters(s) {
    var elm;
    
    showSet('user');
    hideDialogs();
    elm = document.getElementById("user-filters");
    if(elm) {
      if(s) {
        elm.style.display=s;
      }
      else {
        if(elm.style.display==="block") {
          elm.style.display="none";
        }
        else {
          elm.style.display="block";
        }
      }
    }
  }
  
  // wire up static elements
  function registerEvents() {
    var elm, coll, i, x;
    
    // top-level buttons
    elm = document.getElementById("task-button");
    if(elm) {
      elm.onclick = showTasks;
    }
    
    elm = document.getElementById("category-button");
    if(elm) {
      elm.onclick = showCategories;
    }
    
    elm = document.getElementById("user-button");
    if(elm) {
      elm.onclick = showUsers;
    }
    
    //filter links
    coll = document.getElementsByClassName("filter-link");
    for(i=0, x=coll.length; i<x; i++) {
      coll[i].onclick = selectFilter;
    }   
    
    // filter forms
    coll = document.getElementsByClassName("filter");
    for(i=0, x=coll.length; i<x; i++) {
      if(coll[i].nodeName==="FORM") {
        coll[i].onsubmit = sendFilter
      }
    }   

    // cancel buttons forms
    coll = document.getElementsByClassName("cancel-button");
    for(i=0, x=coll.length; i<x; i++) {
      coll[i].onclick = hideDialogs;
    }   
  }
  
  // show only the selected divs
  function showSet(set) {
    var elm, coll, i, x;
    for(var d in g.divs) {
      if(d!==set) {
        coll = g.divs[d].split(' ');
        for(i=0, x=coll.length;i<x;i++) {       
          elm = document.getElementById(coll[i]);
          if(elm) {
            elm.style.display="none";
          }
        }
      }
    }
  }
  
  // hide UI dialogs
  function hideDialogs() {
    var coll, i, x;
    
    coll = document.getElementsByClassName("dialog");
    for(i=0, x=coll.length;i<x;i++) {
      coll[i].style.display="none";
    }
  }
  
  // dispatch for adding items
  function addItem(title) {
    alert("adding "+title);
  }

  // dispatch for unfiltered lists
  function allList(set) {
  
    hideDialogs();
    showSet(set);
    switch (set.toLowerCase()) {
      case "task":
        toggleTaskFilters("none");
        getTaskCollection();
        break;
      case "category":
        toggleCategoryFilters("none");
        getCategoryCollection();
        break;
      case "user":
        toggleUserFilters("none");
        getUserCollection();
        break;
      default:
        alert("Unknown case ["+set+"]");
        break;
    }
  }
  
  // dispatch for filter lists
  function filterList(set) {
    
    switch (set.toLowerCase()) {
      case "task":
        toggleTaskFilters();
        break;
      case "category":
        toggleCategoryFilters();
        break;
      case "user":
        toggleUserFilters();
        break;
      default:
        alert("Unknown case ["+set+"]");
        break;
    }
  }
  
  // dispatch for toggling filter UI
  function selectFilter(e) {
    var id, set, elm;
    
    id = e.target.id.toLowerCase();
    id = id.replace("-","-find");
    set = id.split("-")[0];
    
    hideDialogs();
    elm = document.getElementById(id);
    if(elm) {
      if(elm.style.display==="block") {
        elm.style.display="none";
      }
      else {
        elm.style.display="block";
      }
    }
  }
  
  // dispatch for filter execution
  function sendFilter(e) {
    var id, coll, i, x, href, args, set;
    
    args = '{';
    id = e.target.id
    href = g.dialogs[id];
    set = id.split('-')[0];
    
    // collect inputs
    coll = document.forms[id].getElementsByTagName('input');
    for(i=0, x=coll.length; i<x; i++) {
      if(coll[i].name) {
        if(i!==0) {
          args += ",";
        }
        args += '"'+coll[i].name+'":"'+escape(coll[i].value)+'"';
      }
    }
    args += "}";
    
    // update url
    args = JSON.parse(args);
    for(var a in args) {
      href = href.replace('{'+a+'}',args[a]);
    }
    
    // make request
    switch(set) {
      case "task" :
        getTaskCollection(href);
        break;
      case "category" :
        getCategoryCollection(href);
        break;
      case "user" :
        getUserCollection(href);
        break;
      default:
        alert("unknown case ["+set+"]");
        break;
    }
    return false;
  }
  
  // generic table display of data
  function makeTable(elm, title, set, data, fields, url, handler) {
    var rows, flds, h2, btn, tbl, th, tr, td, a, i, x, j, y, z;
    
    flds = fields.split(' ');
    
    // show title
    h2 = document.createElement('h2');
    h2.innerText = title;
    elm.appendChild(h2);
    
    // add button
    btn = document.createElement('button');
    btn.innerText = "Add";
    btn.onclick = function(){addItem(set); return false;};
    elm.appendChild(btn);
    
    // filter button
    btn = document.createElement('button');
    btn.innerText = "Filter";
    btn.onclick = function(){filterList(set); return false;};
    elm.appendChild(btn);

    // all button
    btn = document.createElement('button');
    btn.innerText = "All";
    btn.onclick = function(){allList(set); return false;};
    elm.appendChild(btn);
    
    tbl = document.createElement('table');
    
    // header row
    tr = document.createElement('tr');
    for(var p in data[0]) {
      if(fields.indexOf(p)!==-1) {
        th = document.createElement('th');
        th.innerText = p;
        tr.appendChild(th);
      }
    }
    tbl.appendChild(tr);
    
    // get rows to process
    rows = [];
    for(var r in data) {
      switch (r) {
        case "task":
        case "category":
        case "user":
          rows = data[r];
          break;
      }
    }
    
    for(i=0, x=rows.length; i<x; i++) {
      z=0;
      tr = document.createElement('tr');
      // show the requested fields in order
      for(j=0, y=flds.length; j<y; j++) {
        td = document.createElement('td');
        for(var p in rows[i]) {
          if(p===flds[j]) {
            // first column will be tagged for with a link
            if(z++===0 && rows[i].id) {
              a = document.createElement('a');
              a.href = url.replace('{id}',rows[i].id);
              a.appendChild(document.createTextNode(rows[i][p]));
              a.onclick = function() {handler(this.href); return false};
              td.appendChild(a);
            }
            else {
              td.innerText = rows[i][p];
            }
            break;
          }
          else {
            td.innerText = '';
          }
        }
        tr.appendChild(td);
      }
      tbl.appendChild(tr);
    }
    elm.appendChild(tbl);
    elm.style.display='block';
  }
  
  // handle network request/response
  function makeRequest(href, method, body, context, handler) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {

      ajax.onreadystatechange = function(){processResponse(ajax, context, handler);};

      if(body) {
        ajax.open(method,href,false);
        ajax.send(body);
      }
      else {
        ajax.open(method,href,false);
        ajax.setRequestHeader("Accept","application/json");
        ajax.send(null);
      }
    }
  }
  function processResponse(ajax, context, handler) {

    if(ajax.readyState==4 || ajax.readyState==='complete') {
      if(ajax.status===200 || ajax.status===204) {
        switch(context) {
          case 'taskCollection':
          case 'categoryCollection':
          case 'userCollection':
            g.rsp = JSON.parse(ajax.responseText);
            handler();
            break;
          default:
            alert('unknown context:'+context);
            break;
        }
      }
      else {
        alert('*** ERROR: '+ajax.status+'\n'+ajax.statusText);
      }
    }
  }
    
  // publish interface
  var that = {};
  that.init = init;
  
  return that;
 }
