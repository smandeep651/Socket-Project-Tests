<img width="150px" src="https://www.nscc.ca/img/aboutnscc/visual-identity-guidelines/artwork/nscc-jpeg.jpg" >  
  

# APPD 5015 - Exercise 3 

##  NodeJS - Events - Part 3
 
### Instructions:  

- Clone this repository locally and open it in VS Code as shown in class.
- When satisfied that you have completed all the required changes to the repository folder, **commit & push** the entire folder's contents up to GitHub as shown in class. 
- You must ensure that your solution has been pushed to GitHub in order to get credit for the exercise. 

### Note: Copy in your Files from Exercise 2 as a Starting Point!!

### Overview

Events are an integral part of programming in a vast majority of programming languages. They provide a mechanism for the programmer to respond to other actions that can happen at any random moment in time. Responding in code to a button click is probably the simplest example of an event that one can code against.

This exercise (as well as the previous two) has you working with events using an npm package called `socket.io`. This package provides functionality to program real-time communication between server and clients. This example will have us create a web-based chat application whereby users (clients) can communicate with other users (clients) with the messages being managed by a central location (server).

The big takeaway for these exercises is not to master the `socket.io` library. Instead, it is primarily meant to *demonstrate the application of an event-driven paradigm* into the code that you write.

*NOTE: As with most programming tasks, there are various ways to accomplish the same goal. There is not only one fixed way to accomplish these, so solutions may vary slightly from student to student.*

### Tasks

#### Enhancement 1 - Add functionality to show the number of actively connected users at any given moment.
Given the client-server nature of this type of application, the premise is that multiple clients may be connected to the chat at any given moment to exchange chat messages. It would be informative to have a display of the number of currently connected clients. As clients connect or disconnect to the server, the server would inform all clients of a change in the number of clients connected.

##### Enhancement Instructions

Instructions can be generally described as follows:

* On the server, define a new variable which will hold the number of currently connected clients at any given moment.
* When a new client connects: 
   * Increase the value of that new variable by 1
   * Send notification to all clients that the number of clients has changed. Be sure to send along the new number of currently connected clients.
   * Capture that event on the client and update the UI to show the current number of people in the chat.
* When any client disconnects:
   * Decrease the value of the variable by 1
   * Send notification to all clients that the number of clients has changed. Be sure to send along the new number of currently connected clients.
   * Capture that event on the client and update the UI to show the current number of people in the chat.

Example of UI after Enhancement 1 implementation:  
<img width="400px" src="https://w0244079.github.io/nscc/courses/appd5015/lab-nodejsbasics-events/numberofconnections.png" >

#### Enhancement 2 - Add Connect and Disconnect buttons
At present, when the client page loads in, it immediately initiates a connection to the server. Modify the client such that a connection doesn't immediatley occur. IE, the socket is declared but not immediately initialized when the page loads. Connection to the server should happen when a `Connect` button is clicked on the UI. You'll have to add this button to the UI. In addition, the only current way to disconnect from the server is to either close the browser tab or the entire browser window. Modify the client such that the client is disconneced programatically without closing the client tab or window. Disconnection should happen when a `Disconnect` button is clicked on the UI. You'll also have to add this button to the UI.

##### Enhancement Instructions

Instructions can be generally described as follows:

* Modify the client code such that the page no longer initializes a connection automatically when the page loads, but rather when a Connect button is clicked.
   * NOTE: getting this to work can be a bit tricky. Remember that all of the events for that instance of the socket need to be in the same scope as where it is initialized. You may have to consider relocating some existing code in order to make this fully work.
* Add a `Connect` button to your UI and have it trigger the connection to the server when it is clicked. 
* Add a `Disconnect` button to your UI and have it trigger the disconnecton to the server when it is clicked.
  * The `socket` that you use to communicate with the server has a `disconnect` method that you can call at any time.

#### Enhancement 3 - Enhance the UI to reflect when a client is connected vs disconnected.
In may user interfaces, the presentation of the UI will depend on some external factor. In our case, that factor will be whether or not the client is currently connected or not. Add some UI functionality that will prevent the user from acting on the UI depending on whether the client is currently connected or not.

##### Enhancement Instructions

Instructions can be generally described as follows:

* When the client is not connected to the server (IE, When the client first loads OR when the user clicks the `Disconnect` button):
  * The `Connect` button should be enabled.
  * The `Disconnect` button should be disabled.
  * The number of currently connected clients should be cleared out.
  * The `Current Server Time` should be cleared out.
  * The `Your Name` textbox should be disabled.
  * The `Your Message` textbox should be disabled.
  * The `Send Message` button should be disabled.
* When the client is connected to the server (IE, When the client receives the `Welcome` message from the server):
  * The `Connect` button should be disabled.
  * The `Disconnect` button should be enabled.
  * The `Your Name` textbox should be enabled.
  * The `Your Message` textbox should be enabled.
  * The `Send Message` textbox should be enabled.

You may want to consider defining functions called something like `EnableUI` and `DisableUI` which would contain all of the code to do the tasks defined above. That way, you can simply call the function to either enable or disable the UI based on current connection status.

Example of UI after Enhancements 2 & 3:  
Before connection  
<img width="500px" src="https://w0244079.github.io/nscc/courses/appd5015/lab-nodejsbasics-events/before-connect.png" >

After connection  
<img width="500px" src="https://w0244079.github.io/nscc/courses/appd5015/lab-nodejsbasics-events/after-connect.png" >


#### Marking Scheme  

Final Grade | Requirement  
:---: | ---  
|**10/10**  | Exercise is correctly done (for the most part) and is completed within the allotted in-class time.  
|**8/10**  | Exercise is correctly done (for the most part) and is completed within a 12-hour grace period beginning immediately following the end of in-class time.  
|**6/10**  | Exercise is correctly done (for the most part) and is completed and submitted after the 12-hour grace period has elapsed.   
|**0/10**  | Exercise is not submitted or is largely incomplete.  
  

> Written with [StackEdit](https://stackedit.io/).  
