/**************************************************************
 * big-todo
 * SPA Client for JSON Object Provider (JS)
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Charlie Haden, Jim Hall "Montreal Jazz Festival" **************************************************************/
 
 var pg;
 
 window.onload = function() {
  pg = thisPage();
  pg.init();
 }
 
 // actual work all done in here
 function thisPage() {

  var dom = domHelp();
  
  var g = {};  
  g.root = location.origin; // http://localhost:8181";
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
  g.urls.userFindByUser = "/user/byuser/?q={q}";
  
  // constrain field representation on screen
  g.tables = {}
  g.tables.task = "title description category dateDue completeFlag actions";
  g.tables.category = "name";
  g.tables.user = "userName familyName givenName actions";
  
  // lists of divs to clear as needed
  g.divs = {};
  g.divs.task = "task-list task-add task-complete task-assign task-findbytitle task-findbycategory task-findbycomplete task-filters";
  g.divs.category = "category-list category-add category-findbyname category-filters";
  g.divs.user = "user-list user-add user-update user-changepw user-findbyname user-findbyuser user-filters";

  // match urls to dialogs
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
  
  // action descriptions
  g.actions = {
    "task" : [
      {title : "Mark Complete", href : g.urls.taskComplete, rel : "http://example.com/mark-complete"},
      {title : "Assign User", href : g.urls.taskAssignUser, rel : "http://example.com/rels/assign-user"}
    ],
    "category" : [],
    "user" : [
      {title : "Change Password", href : g.urls.userChangePW, rel : "http://example.com/rels/change-password"},
      {title : "Update User", href : g.urls.userUpdate, rel : "edit"}
   ]
  }
  
  function init() {
    registerEvents();
    showTasks();
  }
  
  function showTasks() {
    showSet('task');
    hideDialogs();
    getTaskCollection(g.root+g.urls.taskCollection);
  }
  function getTaskCollection(url) {
    var elm;
    
    elm = dom.find('task-list');
    if(elm) {
      dom.clear(elm);
      makeRequest(url, 
        'get', 
        null, 
        'taskCollection', 
        showTaskCollection);
    }
  }
  function showTaskCollection() {
    var elm;
    
    elm = dom.find('task-list');
    if(elm) {
      dom.clear(elm);
      makeTable(elm, 
        "Tasks", 
        "task", 
        g.rsp, 
        g.tables.task, 
        g.urls.taskItem, 
        getTaskItem,
        g.actions["task"]);
    }
  }
  function getTaskItem(url) {
    var elm;
    
    elm = dom.find('task-item');
    if(elm) {
      dom.clear(elm);
      makeRequest(url, 
        'get', 
        null, 
        'taskItem', 
        showTaskItem);
    }
  }
  function showTaskItem() {
    var elm;
    
    elm = dom.find('task-list');
    if(elm) {
      dom.clear(elm);
      makeTable(elm, 
        "Tasks", 
        "task", 
        g.rsp, 
        g.tables.task, 
        '',
        null,
        g.actions["task"]);
    }
  }
  function toggleTaskFilters(s) {
    var elm;
    
    showSet('task');
    hideDialogs();
    elm = dom.find("task-filters");
    toggleElm(elm,s);
  }
  
  function showCategories() {
    showSet('category');
    hideDialogs();
    getCategoryCollection(g.root+g.urls.categoryCollection);
  }
  function getCategoryCollection(url) {
    var elm;
    
    elm = dom.find('category-list');
    if(elm) {
      dom.clear(elm);
      makeRequest(url, 
        'get', 
        null, 
        'categoryCollection', 
        showCategoryCollection);
    }
  }
  function showCategoryCollection() {
    var elm;
    
    elm = dom.find('category-list');
    if(elm) {
      dom.clear(elm);
      makeTable(elm, 
        "Categories", 
        "category", 
        g.rsp, 
        g.tables.category, 
        g.urls.categoryItem, 
        showCategoryItem,
        g.actions["category"]);
    }
  }
  function showCategoryItem(href) {
    alert('showCategoryItem');
  }
  function toggleCategoryFilters(s) {
    var elm;
    
    showSet('category');
    hideDialogs();
    elm = dom.find("category-filters");
    toggleElm(elm,s);
  }
  
  function showUsers() {
    showSet('user');
    hideDialogs();
    getUserCollection(g.root+g.urls.userCollection);
  }
  function getUserCollection(url) {
    var elm;
    
    elm = dom.find('user-list');
    if(elm) {
      dom.clear(elm);
      makeRequest(url, 
        'get', 
        null, 
        'userCollection', 
        showUserCollection);
    }
  }
  function showUserCollection() {
    var elm;
    
    elm = dom.find('user-list');
    if(elm) {
      dom.clear(elm);
      makeTable(elm, 
        "Users", 
        "user", 
        g.rsp, 
        g.tables.user, 
        g.urls.userItem, 
        showUserItem,
        g.actions["user"]);
    }
  }
  function showUserItem(href) {
    alert('showUserItem '+href);
  }
  function toggleUserFilters(s) {
    var elm;
    
    showSet('user');
    hideDialogs();
    elm = dom.find("user-filters");
    toggleElm(elm,s);
  }
  
  // wire up static elements
  function registerEvents() {
    var elm, nodes, i, x;
    
    // top-level buttons
    elm = dom.find("task-button");
    if(elm) {
      elm.onclick = showTasks;
    }
    
    elm = dom.find("category-button");
    if(elm) {
      elm.onclick = showCategories;
    }
    
    elm = dom.find("user-button");
    if(elm) {
      elm.onclick = showUsers;
    }
    
    //filter links
    nodes = dom.classNodes("filter-link");
    for(i=0, x=nodes.length; i<x; i++) {
      nodes[i].onclick = selectFilter;
    }   
    
    // filter forms
    nodes = dom.classNodes("filter");
    for(i=0, x=nodes.length; i<x; i++) {
      if(nodes[i].nodeName==="FORM") {
        nodes[i].onsubmit = sendFilter;
      }
    }

    // cancel buttons forms
    nodes = dom.classNodes("cancel-button");
    for(i=0, x=nodes.length; i<x; i++) {
      nodes[i].onclick = hideDialogs;
    }   
  }
  
  // show only the selected divs
  function showSet(set) {
    var elm, coll;
    
    for(var d in g.divs) {
      if(d!==set) {
        coll = g.divs[d].split(' ');
        for(var i of coll) {
          elm = dom.find(i);
          if(elm) {
            elm.style.display="none";
          }
        }
      }
    }
  }

  // general toggle element display 
  function toggleElm(elm,s) {
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
    
  // hide UI dialogs
  function hideDialogs() {
    var nodes, i, x;
    
    nodes = dom.classNodes("dialog");
    for(i=0, x=nodes.length;i<x;i++) {
      nodes[i].style.display="none";
    }
  }
  
  // dispatch for adding items
  function addItem(title) {
    alert("adding "+title);
  }

  // dispatch for item-level actions
  function clickAction(e) {
    alert(e.target.title);
    return false;
  }
  
  // dispatch for unfiltered lists
  function allList(set) {
  
    hideDialogs();
    showSet(set);
    switch (set.toLowerCase()) {
      case "task":
        toggleTaskFilters("none");
        getTaskCollection(g.root+g.urls.taskCollection);
        break;
      case "category":
        toggleCategoryFilters("none");
        getCategoryCollection(g.root+g.urls.categoryCollection);
        break;
      case "user":
        toggleUserFilters("none");
        getUserCollection(g.root+g.urls.userCollection);
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
    elm = dom.find(id);
    toggleElm(elm);
  }
  
  // dispatch for filter execution
  function sendFilter(e) {
    var id, nodes, i, x, href, args, set;
    
    args = '{';
    id = e.target.id
    href = g.dialogs[id];
    set = id.split('-')[0];
    
    // collect inputs
    nodes = dom.tagNodes("input",document.forms[id]);
    for(i=0, x=nodes.length; i<x; i++) {
      if(nodes[i].name) {
        if(i!==0) {
          args += ",";
        }
        args += '"'+nodes[i].name+'":"'+escape(nodes[i].value)+'"';
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
  function makeTable(elm, title, set, data, fields, url, handler, actions) {
    var rows, flds, h2, btn, tbl, th, tr, td, a, z;
    
    flds = fields.split(' ');
    
    // show title
    h2 = dom.node('h2');
    h2.innerText = title;
    dom.push(h2,elm);
    
    // add button
    btn = dom.node('button');
    btn.innerText = "Add";
    btn.onclick = function(){addItem(set); return false;};
    dom.push(btn,elm);
    
    // filter button
    btn = dom.node('button');
    btn.innerText = "Filter";
    btn.onclick = function(){filterList(set); return false;};
    dom.push(btn,elm);

    // all button
    btn = dom.node('button');
    btn.innerText = "All";
    btn.onclick = function(){allList(set); return false;};
    dom.push(btn,elm);
    
    tbl = dom.node('table');
    
    // header row
    tr = dom.node('tr');
    for(var fld of flds) {
      th = dom.node('th');
      th.innerText = fld;
      dom.push(th,tr);
    }
    dom.push(tr,tbl);
    
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
    
    for(var row of rows) {
      z=0;
      tr = dom.node('tr');
      for(var fld of flds) {
        td = dom.node('td');
        if(fld==="actions" && actions!==null) {
          for(var ac of actions) {
            a = dom.node("a");
            a.href = ac.href;
            a.title = ac.title;
            a.rel = ac.rel;
            a.className = "action";
            dom.push(dom.text(ac.title),a);
            a.onclick = clickAction;
            dom.push(a,td);
          }
          dom.push(td,tr);
          break;
        }
        
        for(var p in row) {
          if(p===fld) {
            if(z++===0 && row.id) {
              a = dom.node('a');
              a.href = url.replace('{id}',row.id);
              dom.push(dom.text(row[p]),a);
              a.onclick = function() {handler(this.href); return false;};
              dom.push(a,td);
            }
            else {
              td.innerText = row[p];
            }
            break;
          }
          else {
            td.innerText = '';
          }
        }
        dom.push(td,tr);
      }
      dom.push(tr,tbl);
    }
    
    dom.push(tbl,elm);
    elm.style.display='block';
  }
  
  // handle network request/response
  function makeRequest(href, method, body, context, handler) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {

      ajax.onreadystatechange = function(){processResponse(ajax, context, handler);};

      if(body) {
        ajax.open(method,href);
        ajax.send(body);
      }
      else {
        ajax.open(method,href);
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
          case 'taskItem':
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
 
// **************************
// DOM helpers
// **************************
function domHelp() {

  function push(source,target) {
    target.appendChild(source);
  }

  function classNodes(name,elm) {
    if(elm) {
      rtn = elm.getElementsByClasName(name);
    }
    else {
      rtn = document.getElementsByClassName(name);
    }
    return rtn;
  }
  
  function tagNodes(tag,elm) {
    if(elm) {
      rtn = elm.getElementsByTagName(tag);
    }
    else {
      rtn = document.getElementsByTagName(tag);
    }
    return rtn;
  }

  function find(id) {
    return document.getElementById(id);
  }

  function text(txt) {
    return document.createTextNode(txt);
  }

  function node(type) {
    return document.createElement(type);
  }

  function clear(elm) {
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }
  }

  // publish
  that = {};
  that.push = push;
  that.tagNodes = tagNodes;
  that.find = find;
  that.text = text;
  that.node = node;
  that.clear = clear;
  that.classNodes = classNodes;

  return that;
}

