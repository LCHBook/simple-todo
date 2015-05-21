{
  "_links": {
    "profile": {
      "href": "http://api.example.org/big-todo-alps.json"
    },
    "curies": [
      {
        "name": "todo",
        "href": "http://api.example.org/rels/{rel}",
        "templated": true
      }
    ],
    "todo:home": {
      "href": "http://api.example.org/",
      "title": "Home"
    },
    "todo:userCollection": {
      "href": "http://api.example.org/user/",
      "title": "All Users"
    },
    "todo:userAdd": {
      "href": "http://api.example.org/user/",
      "title": "Add User"
    },
    "todo:userFindByName": {
      "href": "http://api.example.org/user/",
      "title": "Users by Name"
    },
    "todo:userFindByUser": {
      "href": "http://api.example.org/user/",
      "title": "Users by UserName"
    }
  },
  "_embedded": {
    "user": [
      {
        "_links": {
          "self": "http://api.example.org/user/lee",
          "todo:userChangePW": {
            "href": "http://api.example.org/user/changepw/lee",
            "title": "Change Password"
          },
          "todo:userUpdate": {
            "href": "http://api.example.org/user/update/lee",
            "title": "Update User"
          }
        },
        "userName": "lee",
        "familyName": "Amundsen",
        "givenName": "Lee",
        "password": "p@ss",
        "webUrl": "http://amundsen.com/lee",
        "avatarUrl": " ",
        "id": "lee",
        "dateCreated": "2015-01-06T01:41:24.331Z",
        "dateUpdated": "2015-01-27T20:29:05.726Z"
      },
      {
        "_links": {
          "self": "http://api.example.org/user/mamund",
          "todo:userChangePW": {
            "href": "http://api.example.org/user/changepw/mamund",
            "title": "Change Password"
          },
          "todo:userUpdate": {
            "href": "http://api.example.org/user/update/mamund",
            "title": "Update User"
          }
        },
        "userName": "mamund",
        "familyName": "Amundsen",
        "givenName": "Mike",
        "password": "p@ss",
        "webUrl": "http://amundsen.com/blog/",
        "avatarUrl": "https://pbs.twimg.com/profile_images/340449683/madmen_icon_normal.jpg",
        "id": "mamund",
        "dateCreated": "2015-01-06T01:38:55.147Z",
        "dateUpdated": "2015-01-25T02:28:12.402Z"
      }
    ]
  }
}
