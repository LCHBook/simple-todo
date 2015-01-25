/*******************************************************
 * big-todo
 * Transition models
 * January 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Percussion Bitter Sweet : Max Roach
 *******************************************************/

module.exports = main;

var trans = [];

function main(name) {
  if(trans[name]) {
    rtn = trans[name];
  }
  else {
    rtn = {};
  }
  
  return rtn;
}

// home transitions
trans.homeLink = {
  name : "homeLink", 
  type : "safe", 
  kind : "home",
  key : "",
  target : "list",
  prompt : "Home"
};

// task transitions
trans.taskCollectionLink = {
  name : "taskCollectionLink", 
  type : "safe", 
  kind : "task",
  key : "",
  target : "list",
  prompt : "All Tasks"
};
trans.taskItemLink = {
  name : "taskItemLink", 
  type : "safe", 
  kind : "task",
  key : "{id}",
  target : "item",
  prompt : "Task",
  inputs : [
    {name : "id", prompt : "ID"}
  ]
};
trans.taskAddLink = {
  name : "taskAddLink",
  type : "safe",
  kind : "task",
  key : "add",
  target : "list",
  prompt : "Add Task"
};
trans.taskAddForm = {
  name : "taskAddForm", 
  type : "unsafe",
  kind : "task",
  key : "",
  prompt : "Add Task",
  inputs : [
    {name : "title", prompt : "Title"},
    {name : "description", prompt : "Description"},
    {name : "category", prompt : "Category"},
    {name : "completeFlag", prompt : "Complete"},
    {name : "dateDue", prompt : "Due Date"},
    {name : "userName", prompt : "Assigned User"}
  ]
};
trans.taskCompleteLink = {
  name : "taskCompleteLink",
  type : "safe",
  kind : "task",
  key : "complete",
  target : "item",
  prompt : "Mark Complete"
};
trans.taskCompleteForm = {
  name : "taskCompleteForm",
  type : "unsafe",
  kind : "task",
  key : "complete",
  target : "item",
  prompt : "Mark Complete",
  inputs : [
    {name: "id", prompt:"Task ID"},
    {name: "completeFlag", prompt:"Complete Status"}
  ]
};
trans.taskAssignUserLink = {
  name : "taskAssignUserLink",
  type : "safe",
  kind : "task",
  key : "assign",
  target : "item",
  prompt : "Assign User"
};
trans.taskAssignUserForm = {
  name : "taskAssignUserForm",
  type : "unsafe",
  kind : "task",
  key : "assign",
  target : "item",
  prompt : "Assign User",
  inputs : [
    {name : "id", prompt : "Task ID"},
    {name : "userName", prompt : "User Name"}
  ]
};
trans.taskFindByTitleLink = {
  name : "taskFindByTitleLink",
  type : "safe",
  kind : "task",
  key : "bytitle",
  prompt : "Find Tasks by Ttile"
};
trans.taskFindByTitleForm = {
  name : "taskFindByTitleForm", 
  type : "safe", 
  kind : "task",
  key : "bytitle",
  target : "list",
  prompt : "Tasks by Title", 
  inputs : [
    {name : "q", prompt : "Title"}
  ]
};
trans.taskFindByCategoryLink = {
  name : "taskFindByCategoryLink",
  type : "safe",
  kind : "task",
  key : "bycategory",
  target : "list",
  prompt : "Find Tasks by Category"
};
trans.taskFindByCategoryForm = {
  name : "taskFindByCategoryForm", 
  type : "safe", 
  kind : "task",
  key : "bycategory",
  target : "list",
  prompt : "Tasks by Category", 
  inputs : [
    {name : "q", prompt : "Category"}
  ]
};
trans.taskFindByCompleteLink = {
  name : "taskFindByCompleteLink",
  type : "safe",
  kind : "task",
  key : "bycomplete",
  target : "list",
  prompt : "Find Tasks by Complete Status"
};
trans.taskFindByCompleteForm = {
  name:"taskFindByCompleteForm", 
  type:"safe", 
  kind : "task",
  key : "bycomplete",
  target : "list",
  prompt:"Tasks by Complete Status", 
  inputs:[
    {name:"q", prompt:"Complete"}
  ]
};

// collection transitions
trans.categoryCollectionLink = {
  name : "categoryCollectionLink", 
  type : "safe", 
  kind : "category",
  key : "",
  target : "list",
  prompt : "All Categories"
};
trans.categoryItemLink = {
  name : "categoryItemLink", 
  type : "safe", 
  kind : "category",
  key : "{id}",
  target : "item",
  prompt : "Category", 
  inputs : [
    {name : "id",prompt : "Task ID"}
  ]
};
trans.categoryAddLink = {
  name : "categoryAddLink", 
  type : "safe", 
  kind : "category",
  key : "add",
  target : "list",
  prompt : "Add Category"
};
trans.categoryAddForm = {
  name : "categoryAddForm", 
  type : "unsafe", 
  kind : "category",
  key : "",
  target : "list",
  prompt : "Add Category", 
  inputs : [
    {name : "name", prompt : "Category Name"}
  ]
};
trans.categoryFindByNameLink = {
  name : "categoryFindByNameLink", 
  type : "safe", 
  kind : "category",
  key : "byname",
  target : "list",
  prompt : "Categories by Name" 
};
trans.categoryFindByNameForm = {
  name : "categoryFindByNameForm", 
  type : "safe", 
  kind : "category",
  key : "byname",
  target : "list",
  prompt : "Categories by Name", 
  inputs : [
    {name : "q", prompt : "Category Name"}
  ]
};

// user transitions
trans.userCollectionLink = {
  name : "userCollectionLink",
  type : "safe", 
  kind : "user",
  key : "",
  target : "list",
  prompt : "All Users"
};
trans.userItemLink = {
  name : "userItemLink",
  type : "safe",
  key : "{id}",
  target : "item",
  prompt : "User",
  inputs : [
    {name : "id", prompt : "User ID"}
  ]
}
trans.userFindByNameLink = {
  name : "userFindByNameLink", 
  type : "safe", 
  kind : "user",
  key : "byname",
  target : "list",
  prompt : "Find Users by Name" 
};
trans.userFindByNameForm = {
  name : "userFindByName", 
  type : "safe", 
  kind : "user",
  key : "byname",
  target : "list",
  prompt : "Users by Name", 
  inputs : [
    {name : "fn", prompt : "Family Name"},
    {name : "gn", prompt : "Given Name"}
  ]
};
trans.userFindByUserLink = {
  name : "userFindByUserLink", 
  type : "safe", 
  kind : "user",
  key : "byuser",
  target : "list",
  prompt:"Find Users by UserName"
};
trans.userFindByUserForm = {
  name : "userFindByUserForm", 
  type : "safe", 
  kind : "user",
  key : "byuser",
  target : "list",
  prompt : "Users by UserName", 
  inputs : [
    {name : "q", prompt : "User Name"}
  ]
};
trans.userAddLink = {
  name : "userAddLink",
  type : "safe",
  kind : "user",
  key : "add",
  target : "list",
  prompt : "Add User"
};
trans.userAddForm = {
  name : "userAdd",
  type : "unsafe",
  kind : "user",
  key : "",
  target : "list",
  prompt : "Add User",
  inputs : [
    {name : "userName", prompt : "User Name"},
    {name : "password", prompt : "Password"},
    {name : "familyName", prompt : "Family Name"},
    {name : "givenName", prompt : "Given Name"},
    {name : "webUrl", prompt : "Web URL"},
    {name : "avatarUrl", prompt : "Avatar URL"}
  ]
};
trans.userChangePWLink = {
  name : "userChangePWLink",
  type : "safe",
  kind : "user",
  key : "changepw",
  target : "item",
  prompt : "Change Password"
};
trans.userChangePWForm = {
  name : "userChangePWForm",
  type : "unsafe",
  kind : "user",
  key : "changepw",
  target : "item",
  prompt : "Change Password",
  inputs : [
    {name : "id", prompt : "User ID"},
    {name : "oldPass", prompt : "Old Password"},
    {name : "newPass", prompt : "New Password"},
    {name : "checkPass", prompt : "Check Password"}
  ]
};
trans.userUpdateLink = {
  name : "userUpdateLink",
  type : "safe",
  kind : "user",
  key : "update",
  target : "item",
  prompt : "Update User"
};
trans.userUpdateForm = {
  name : "userUpdateForm",
  type : "unsafe",
  kind : "user",
  key : "update",
  target : "item",
  prompt : "Update User",
  inputs : [
    {name : "id", prompt : "User ID"},
    {name : "familyName", prompt : "Family Name"},
    {name : "givenName", prompt : "Given Name"},
    {name : "webUrl", prompt : "Web URL"},
    {name : "avatarUrl", prompt : "Avatar URL"}
  ]
};
