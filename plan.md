# Plan

Things are probably going to chance on the fly and without warning.

Content on the website is rougly seperated into three categories: Boards, Threads and comments. A board is a container for threads sharing a common topic, and a thread is a container for an individual discussion on a topic, with comments as it's representation.

Order of threads is based on activity (bumping). users commenting on the thread bump it towards the top of active threads.

Discussions happen in a pseudo anonymous way: commenting and creation of threads requires the user to create an account and to be logged in, but that information is not shown to other users. Individuals in threads are represented by a number assigned to them when they first comment on the thread, based on how many people before them have commented. Creator of the thread, the OP (Original Poster) is represented by that tag in any further comments he makes in the thread.

## 1. Questions and problems

- Does a board need an ID or is the name enough
- How to implement pagination / thread archiving
- Should thread bumping be weighted in some way? (OP can't bump, first comment by new user > another comment by already partisipating user)
- How is userId tracked inside a thread?
- Consolidate some of the API endpoints, for example POST /api/threads and POST /api/boards/:name/threads

## 2. Tech stack

In a nutshell it's the MERN stack (MongoDB, express, React & nodejs)

Docker is used to host each service (Database, Backend, frontend) as a container.

Repository is stored in Github. Testing is done with jest both on back and frontend, and is run automaticallt on any changes to the repository with Github CI/CD pipeline. Development should happen in a seperate branch from aster, to keep the master branch always in production ready state. Merges to master should require all tests to pass.

### 2.1 Backend

Nodejs / express backend. Mongoose is used to interact with MongoDB. Jest is used to run tests.

## 3. MVP (Minimum Viable Product)

Bob visits the website and sees the frontpage with a sidebar containing a login / registration form, and a list of active boards. The center of the page has a container showing currently active threads from all the boards.

Bob is able to view the threads and comments, but without an account, he is unable to create new threads or to comment.

After bob registers and account and logs in, he is able to start new threads on the boards, and to leave comments. All content is text only.

## 4. Database 

- Dates are ISO formatted dates stored as strings.
- ids are mongoose objectids stored as strings

### 4.1 Models

#### User

|Field|Type|Description|
|-|-|-|
|id|string|ID of the user|
|username|string|Username chosen by the user|
|password_hash|string|hashed user chosen password|
|threads|Thread[]|Threads the user has started|
|comments|Comment[]|Comments the user has left|

#### Board

|Field|Type|Description|
|-|-|-|
|name|string|Name of the board|
|threads|Thread[]|Threads in the board|
|created|Date|When the board was created|

#### Thread

|Field|Type|Description|
|-|-|-|
|id|string|ID of the thread|
|title|string|Title of the thread|
|content|string|Text content of the thread|
|created|Date|When the thread was created|
|user|User|User who started the thread|
|boardName|string|Name of the board the thread was made in|

#### Comment

|Field|Type|Description|
|-|-|-|
|id|string|ID of the comment|
|content|string|Text content of the comment|
|created|Date|When the comment was created|
|user|User|User who left the comment|
|threadId|string|ID of the thread the comment was left in|

## 5. Backend

RESTful json api

|Method|Endpoint|Description|
|-|-|-|
|GET|/api/boards/|List of all boards|
|GET|/api/boards/:name|Specific board|
|GET|/api/boards/:name/threads|Threads started in that board|
|POST|/api/boards/:name/threads|Start a new thread in a board|
|GET|/api/boards/:name/comments|Comments left in a board|
|GET|/api/threads/|List of all threads|
|GET|/api/threads/:id|Specific thread|
|POST|/api/threads/:id/comments|Leave a comment|
|GET|/auth/me/|returns information related to the authorized user|
|POST|/auth/login|Logs the user in|
|POST|/auth/register|Registers a new user|

### GET /api/boards/

Returns an array of all boards, containing the board name, number of threads, number of comments and when it was created.

```JSON
[
  {
    "name": "random",
    "numThreads": 1,
    "numComments": 1,
    "created": "2011-10-05T14:48:00.000Z"
  }, {
    "name": "music",
    "numThreads": 2,
    "numComments": 3,
    "created": "2011-10-05T14:48:00.000Z"
  }
]
```

### GET /api/boards/:name

Returns a single board. Contains it's name, when it was created and an array of it's threads.

The threads contained in the threads array are a stripped down version of the full thread documents, with only the id, title, creation date, number of comments and latest comment in it shown.

- If there are no comments, latestComment is null.

```JSON
[
  {
    "name": "random",
    "created": "2011-10-05T14:48:00.000Z",
    "threads": [
      {
        "id": "56cb91bdc3464f14678934ca",
        "title": "Random thread",
        "created": "2011-10-05T14:48:00.000Z",
        "numComments": 3,
        "latestComment": {
          "id": "56cb91bdc3464f14678934ca",
          "userId": 3,
          "content": "Random comment",
          "created": "2011-10-05T14:48:00.000Z"
        }
      }, {
        "id": "56cb91bdc3464f14678934ca",
        "title": "Another thread",
        "created": "2011-10-05T14:48:00.000Z",
        "numComments": 0,
        "latestComment": null
      }
    ]
  }
]
```

- If there are no threads, threads is an empty array.

```JSON
[
  {
    "name": "music",
    "created": "2011-10-05T14:48:00.000Z",
    "threads": []
  }
]
```

### GET /api/boards/:name/threads

Returns all threads from a board.

The threads contained in the array are a stripped down version of the full thread documents, with only the id, title, creation date, number of comments and latest comment in it shown.

```JSON
[
  {
    "id": "56cb91bdc3464f14678934ca",
    "title": "Random thread",
    "created": "2011-10-05T14:48:00.000Z",
    "comments": [
      {
        "id": "56cb91bdc3464f14678934ca",
        "content": "Random comment",
        "created": "2011-10-05T14:48:00.000Z"
      }
    ]
  }
]
```

### GET /api/boards/:name/comments

Returns all comments from a board. The comments contain a threadId poiting to the thread the comments was left in

```JSON
[
  {
      "id": "56cb91bdc3464f14678934ca",
      "content": "Random comment",
      "created": "2011-10-05T14:48:00.000Z",
      "threadId": "56cb91bdc3464f14678934ca"
  }
]
```

### User object

The user object should not be returned by the API outside of the representation for the authenticated user.

### Board object

Contains the name of the board, when it was created, an array of stripped down representations of threads.

The thread objects contain only the thread id, it's title, when it was created, number of comments and the last comment made in it.

```JSON
{
  "name": "random",
  "created": "2011-10-05T14:48:00.000Z",
  "threads": [
    {
      "id": "56cb91bdc3464f14678934ca",
      "title": "Random thread",
      "created": "2011-10-05T14:48:00.000Z",
      "numComments": 3,
      "latestComment": {
        "id": "56cb91bdc3464f14678934ca",
        "content": "Random comment",
        "created": "2011-10-05T14:48:00.000Z"
      }
    }
  ]
}
```

### thread object

Contains the thread id, title, when it was created and comments made in it.

User id is based on the order of commenting users: When a user first comments on a thread, they get assigned a number based on the number of unique commentors. OP is always userId 0, with following commenters getting assigned numbers starting from 1

```JSON
{
  "id": "56cb91bdc3464f14678934ca",
  "title": "Random thread",
  "created": "2011-10-05T14:48:00.000Z",
  "comments": [
    {
      "id": "56cb91bdc3464f14678934ca",
      "userId": 1,
      "content": "Random comment",
      "created": "2011-10-05T14:48:00.000Z"
    }
  ]
}
```

### Comment object

```JSON
{
  "id": "56cb91bdc3464f14678934ca",
  "content": "Random comment",
  "created": "2011-10-05T14:48:00.000Z"
}
```

## 6. Frontend

### 6.1 Pages

#### Frontpage

- GET /api/boards/ to populate sidebar with a list of boards
- GET /api/threads to pupulate the latest threads
- GET /auth/me to pulate the stats in the sidebar
- POST /auth/login when user logs in
- POST /auth/register when user registers an account

Links to threads are formatted as /api/threads/:id with the id from the threads array from the /api/threads request
Links to boards are formatted as /api/boards/:name with name from the /api/boards request

![Frontpage](https://github.com/Hoopaugi/Message-Board/blob/main/images/Frontpage.png?raw=true)

#### Board Page

- GET /api/boards/:name to fetch that boards information, and to populate active threads
- POST /api/boards:name/threads to start a new thread

Links to threads are formatted as /api/threads/:id with the id from the threads array from the /api/boards:name request

![Board page](https://github.com/Hoopaugi/Message-Board/blob/main/images/Board.png?raw=true)

#### Thread Page

- GET /api/threads/:id to fetch the thread and it's comments
- POST /api/threads/:id/comments to leave a new comment

![Thread page](https://github.com/Hoopaugi/Message-Board/blob/main/images/Thread.png?raw=true)
