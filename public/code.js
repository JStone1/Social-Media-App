let posts = []; // array to store posts
let postID = 1;

// handler + event listener for input field
let postText = document.getElementById("post-text");
if (postText) {
  postText.addEventListener("input", checkText);
  postText.addEventListener("keypress", checkEnter);
}
let currentText = "";

// handler + event listener for post button
let postButton = document.getElementById("post-button");
if (postButton) {
  postButton.addEventListener("click", newPost);
}

// handler + event listener for retrieving post button
let getPosts = document.getElementById("get-posts");
if (getPosts) {
  getPosts.addEventListener("click", retrieveData);
}

let recentPosts = document.getElementById("recent-posts"); // handler for ul post list

// checks post text
function checkText(event) {
  currentText = event.target.value;
  console.log(currentText);
}

// checks if enter is pressed on input
function checkEnter(event) {
  if (event.key === "Enter" || event.which === 13) {
    newPost();
    event.preventDefault();
  }
}

// clears input field
function clearInput() {
  postText.value = "";
  currentText = "";
}

let date = Date().substring(4, 21);

// function w/ temp data structure and adds a post to the post array
function newPost() {
  if (currentText.length == 0) {
    console.log("Please enter text to post");
  } else {
    let newPost = {
      postID: postID,
      username: "John",
      userScore: 4,
      timePosted: date,
      postText: currentText,
      postScore: 2,
      postReview: "This is a review",
    };
    postWords(newPost);
    clearInput();
  }
}

// function that handles data posting to the backend
function postWords(post) {
  console.log(post);

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };
  fetch("/newPost", options)
    .then((response) => response.json())
    .then((serverData) => handleServerData(serverData));
  console.log("Posted");
}

// creates list item for new post to display on screen
function getPostData() {
  recentPosts.innerHTML = "";
  posts.forEach((post) => {
    let li = document.createElement("li");
    li.classList.add("post");
    let liName = document.createElement("h3");
    let liText = document.createElement("p");
    let liTime = document.createElement("p");
    liTime.textContent = `Posted on ${post.timePosted}`;
    liName.textContent = `${post.username}`;
    liText.textContent = `${post.postText}`;
    li.appendChild(liName);
    li.appendChild(liText);
    li.appendChild(liTime);
    recentPosts.appendChild(li);
  });
}

// fetches post data from the backend
function retrieveData() {
  fetch("/getPosts")
    .then((response) => response.json())
    .then((retrievedData) => handleServerData(retrievedData));
}

// takes new post data from the server and updates posts list
function handleServerData(data) {
  console.log(data);
  posts = data.posts;
  getPostData();
}
