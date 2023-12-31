# Plan

Things are probably going to chance on the fly and without warning.

Content on the website is rougly seperated into three categories: Boards, Threads and comments. A board is a container for threads sharing a common topic, and a thread is a container for an individual discussion on a topic, with comments as it's representation.

Order of threads is based on activity (bumping). users commenting on the thread bump it towards the top of active threads.

Discussions happen in a pseudo anonymous way: commenting and creation of threads requires the user to create an account and to be logged in, but that information is not shown to other users. Individuals in threads are represented by a number assigned to them when they first comment on the thread, based on how many people before them have commented. Creator of the thread, the OP (Original Poster) is represented by that tag in any further comments he makes in the thread.

## 1. Questions, problems & notes

These need to be split and organized better

- Does a board need an ID or is the name enough
- How to implement pagination / thread archiving
- Should thread bumping be weighted in some way? (OP can't bump, first comment by new user > another comment by already partisipating user)
- How is userId tracked inside a thread?
- [x] Consolidate some of the API endpoints, for example POST /api/threads and POST /api/boards/:name/threads
- GET /api/threads/ should have an optional parameter for limiting the number of results returned
- Should threads have a field related to a bump "score"?
- How long should tokens be valid for?
- When new user is registered, should the response contain a token and log the user in automatically?
- [x] with mongoose, created field for documents could just be replaced with the automatic createdAt timestamp
- What to do when an user navigates to a thread they have hidden.
- Ability to follow threads. Would require the implementation of some sort of notification system
- Ability for users to show their username attached to comments and threads. (Would go against the anonymous principle)
- Document PUT and DELETE methods relating to updating and deleting threads and comments
- How to keep track of which comments, threads and users the user has hidden. (Most likely something in the frontend)
- Should threads and comments have a property indicating it's order by an incrementing number starting from 1
- Should the above property be the document id?
- Comment / thread posting options (Show username, show user role)
- Some sort of log for moderator actions. (Publicly visible?)
- Moderation actions (Banning, comment muting, thread muting)
- Moderators can give warnings to users (Would require some sort of notification / direct messaging)
- Tracking of how many times a thread has been viewed by users (Could play into bump order?)
- Allow users to report things
- Comment replying
- If the site were to be actually hosted, monetization would have to be figured out to keep the lights on
- Users should be able to share links to specific comments
- Editing a comment or a thread should mark it in some way. Should edits be tracked?

## 2. Tech stack & Development practices

In a nutshell it's the MERN stack (MongoDB, express, React & nodejs)

Docker is used to host each service (Database, Backend, frontend) as a container.

Repository is stored in Github. Testing is done with jest both on back and frontend, and is run automaticallt on any changes to the repository with Github CI/CD pipeline. Development should happen in a seperate branch from aster, to keep the master branch always in production ready state. Merges to master should require all tests to pass.

Any new features should be planned out in this document before a single line of code related to it is written. This should avoid a lot of wasted effort refactoring code as the feature develops.

### 2.1 Backend

Nodejs / express backend. Mongoose is used to interact with MongoDB. Jest is used to run tests.

## 3. Phases

### 3.1 Phase 1 - MVP (Minimum Viable Product)

Bob visits the website and sees the frontpage with a sidebar containing a login / registration form, and a list of active boards. The center of the page has a container showing currently active threads from all the boards, ranked by bump order.

Bob is able to view the threads and comments, but without an account, he is unable to create new threads or to comment.

After bob registers a new account and logs in, he is able to start new threads on the boards, and to leave comments in threads.

At this point, all content posted by users is text only.

#### Features

- Frontpage, Board & Thread pages
- User registration and authentication
- Ability to leave comments and to create threads

### 3.2 Phase 2 - Content moderation by the users

Bob is able to edit and remove his own comments and threads. When a comment is removed, it's content is no longer shown to users, and is instead replaced with a message telling others that "the comment was removed by the user"

When a thread is deleted, only the title and content of the thread are removed. Any comments on the thread will stay.

Bob is able to hide threads, individual comments and comments by users in a thread. Hiding comments by an user is thread specific, and other comments made by the same user on other threads will be shown to Bob. The content of a hidden comment will be replaced with a text "Comment hidden by user". A hidden thread will have it's content and title replaced with a text "Hidden by user" on pages showing a slim version of a thread.

#### Features

- Users can delete their own comments and threads
- Users can hide individual comments, comments by an user in a thread, and threads

### 3.x Phase x - Content moderation by staff

There is going to be some content that has to be scrubbed by dedicated janitors to avoid the hosting company getting raided. This is true even with just text content. In the future if multimedia content support is added, this is going to be come even more important, so laying a solid foundation for these systems should happen relatively early in the decelopment process.

Bill is a frequent user of the website and is deemed to act in good faith in the discussions he partakes in. He gets "hired" as a janny (he does it for free) for the website and gets granted the role of a moderator. This allows Bill to remove comments and threads he deems to go against the TOS. He is the judge, Jury and executioner of this little corner of the internet.

Comments and threads removed by a moderator should display a seperate text from the usual deletion notice by the owner.

### 3.y Phase y - Quality of life inprovements

When logged in, bob is allowed to follow threads so he will be notified when a new comment is left in the thread.

- User notification system
- Thread following
- Comment and thread editing. 

#### Features

- User roles. 
- Ability for staff members to remove comments and threads

## 4. Database 

- Dates are ISO formatted dates stored as strings.
- ids are mongoose objectids stored as strings
- automatic timestamps "createdAt" and "updatedAt" are enabled for all models, and formatted as "created" and "edited" on API requests as needed. For the user document, "createdAt" is formatted as "registered"
- fields are in camel case
- Every model has an id field of a mongoose objectid type

### 4.1 Models

Short descriptions of the database models and their fields

#### User

|Field|Type|Optional|Description|
|-|-|-|-|
|username|string||Username chosen by the user|
|email|string|X|Optional email address used for password recovery|
|passwordHash|string||Hashed user chosen password|
|threads|Thread[]||Threads the user has started|
|comments|Comment[]||Comments the user has left|

#### Board

|Field|Type|Description|
|-|-|-|
|name|string|Name of the board|
|threads|Thread[]|Threads in the board|

#### Thread

|Field|Type|Description|
|-|-|-|
|title|string|Title of the thread|
|content|string|Text content of the thread|
|user|User|User who started the thread|
|board|Board|Board the thread was made in|

#### Comment

|Field|Type|Description|
|-|-|-|
|content|string|Text content of the comment|
|user|User|User who left the comment|
|thread|Thread|Thread the comment was left in|

## 5. Backend

### 5.1 /api endpoints

Content related endpoints

|Method|Endpoint|Authorization|Description|Frontend interaction|
|-|-|-|-|-|
|GET|/api/boards||List of all boards|Sidebar|
|GET|/api/boards/:name||Specific board|Board Page|
|GET|/api/threads||List of all threads|Frontpage|
|GET|/api/threads/:id||Specific thread|Thread Page|
|POST|/api/boards/:name/threads|X|Start a new thread in a board|Board Page|
|POST|/api/threads/:id/comments|X|Leave a comment|Thread Page|

#### GET /api/boards/

Returns an array Board objects, containing the board name, number of threads, number of comments and when it was created.

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

#### GET /api/boards/:name

Returns a single Board object that contains it's name, when it was created and an array of it's threads.

The Thread objects contained in the threads array are a stripped down version of the full Thread documents, with only the id, title, content, creation date, number of comments, number of unique commentors and latest comment in it shown. numCommentors will always be equal or greater than one, as OP is counted as a commentor.

Threads array contains all threads on the board, ranked by bumping.

- If there are no comments, latestComment is null.

```JSON
{
  "name": "random",
  "created": "2011-10-05T14:48:00.000Z",
  "threads": [
    {
      "id": "56cb91bdc3464f14678934ca",
      "title": "Random thread",
      "content": "A random thread on the random board",
      "created": "2011-10-05T14:48:00.000Z",
      "numComments": 3,
      "numCommentors": 2,
      "latestComment": {
        "id": "56cb91bdc3464f14678934ca",
        "userId": 3,
        "content": "Random comment",
        "created": "2011-10-05T14:48:00.000Z"
      }
    }, {
      "id": "56cb91bdc3464f14678934ca",
      "title": "Another thread",
      "content": "A second thread",
      "created": "2011-10-05T14:48:00.000Z",
      "numComments": 0,
      "numCommentors": 1,
      "latestComment": null
    }
  ]
}
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

#### GET /api/threads/

Returns an array Thread objects across all boards, containing the title, content, name of the board, creation date, number of comments, number of commentors and the latest comment. Threads are ordered based on bumping.

```JSON
[
  {
    "id": "56cb91bdc3464f14678934ca",
    "title": "Random thread",
    "content": "A random thread on the random board",
    "board": {
      "name": "random"
    },
    "created": "2011-10-05T14:48:00.000Z",
    "numComments": 3,
    "numCommentors": 2,
    "latestComment": {
      "id": "56cb91bdc3464f14678934ca",
      "userId": 3,
      "content": "Random comment",
      "created": "2011-10-05T14:48:00.000Z"
    }
  }, {
    "id": "56cb91bdc3464f14678934ca",
    "title": "Another thread",
    "content": "A thread about music",
    "board": {
      "name": "random"
    },
    "created": "2011-10-05T14:48:00.000Z",
    "numComments": 0,
    "numCommentors": 1,
    "latestComment": null
  }
]
```

#### GET /api/threads/:id

Returns a apecific Thread, containing the title, content, creation date and the comments ranked by creation date.

```JSON
{
  "id": "56cb91bdc3464f14678934ca",
  "title": "Random thread",
  "content": "A thread about music",
  "created": "2011-10-05T14:48:00.000Z",
  "comments": [
    {
      "id": "56cb91bdc3464f14678934ca",
      "userId": 1,
      "content": "Random comment",
      "created": "2011-10-05T14:48:00.000Z"
    }, {
      "id": "56cb91bdc3464f14678934ca",
      "userId": 2,
      "content": "Another random comment",
      "created": "2011-10-05T14:48:00.000Z"
    }
  ]
}
```

#### POST /api/boards/:name/threads

Request to start a new thread on a board.

Request body:

```JSON
{
  "title": "A new thread",
  "content": "The threads text content"
}
```

#### POST /api/threads/:id/comments

Request for leaving a new comment in a thread

Request body:

```JSON
{
  "content": "A new comment"
}
```

### 5.2 /auth endpoints

Authentication and user registration related endpoints

|Method|Endpoint|Authorization|Description|Frontend interaction|
|-|-|-|-|-|
|GET|/auth/me|X|returns information related to the authorized user|Sidebar|
|POST|/auth/login|X|Logs the user in|Sidebar|
|POST|/auth/register|X|Registers a new user|Sidebar|

#### GET /auth/me

Request for fetching information related to the authorized user.

Response body:

```JSON
{
  "username": "newuser",
  "numComments": 3,
  "numThreads": 1,
  "registered": "2011-10-05T14:48:00.000Z"
}
```

#### POST /auth/login

Request for receiving a authorization token

The request should include an authorization header containing the users token

Request body:

```JSON
{
  "username": "newuser",
  "password": "secret"
}
```

Request response with valid credentials:

```JSON
{
  "username": "newuser",
  "token": "averylongstring"
}
```

#### POST /auth/register

Request for registering a new user. Email is an optional parameter, which should still be included in the request, with it's value either being an email address, or null

The request should include an authorization header containing the users token

Request body:

```JSON
{
  "username": "newuser",
  "password": "secret",
  "email": null
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

![Frontpage](https://github.com/Hoopaugi/Message-Board/blob/main/plan/images/Frontpage.png?raw=true)

#### Board Page

- GET /api/boards/:name to fetch that boards information, and to populate active threads
- POST /api/boards:name/threads to start a new thread

Links to threads are formatted as /api/threads/:id with the id from the threads array from the /api/boards:name request

![Board page](https://github.com/Hoopaugi/Message-Board/blob/main/plan/images/Board.png?raw=true)

#### Thread Page

- GET /api/threads/:id to fetch the thread and it's comments
- POST /api/threads/:id/comments to leave a new comment

![Thread page](https://github.com/Hoopaugi/Message-Board/blob/main/plan/images/Thread.png?raw=true)
