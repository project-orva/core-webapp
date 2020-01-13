# Front-end
## Purpose?
This front-end basically acts as a visual interface for all of the orva core services. 

## Flow
Role systems will be in place, when a user logs into the system part of the response will be the the role.

### Layout
As for the layout, this page (along with mostly all of the other pages excluding the login) should have a menu for navigating the other service screens. 

## Pages:
- Login
- Home
- Accounts 
- Memory
- Skills
- Profile SubApp
- Core Real-Time-Chat

### Login
If a user is not root or admin then the a prompt that the sys admin has been notified will be shown- additionally, a post request should be made to the `/tango` route with the user information relevant to the spec. (Ideally these instances should be handled on the server side, but for learning sake we will do them client side).  

### Home
After successful login, a user should be presented with an analytics dashboard. 

__Dashboard MVP__
- active users in pie graph of total
- requests for the some time set
- code service traces 
- errors from services

### Accounts
The accounts screen should show a list of all of the accounts in a table along with information about the account like.
- Profile Visualization Button
- Memory Visualization Button
- Creation Date
- Requests per month
- Name
- Role

When either the profile visualization or memory visualization buttons are clicked, they should route to the correct tool.

### Memory
Memory page should handle displaying each memory per user as well as give analytics on the request set.

Memory should be visualized on a timestamp basis on possibly a line graph? When a memory stamp is selected details regarding the contents of the message. 

### Skills
For skills, a basic table should be displayed for each of the skills. The skills page should also include a button for adding a new skill following the skill protobuf file. Lastly, this skill page should basic analytics for skill usage.

### Profile
Profile page should be the visualization for the profiles. This should just having mappings of history via a timeline, along with account interpersonal relationships.

### Core Real-Time-App
This should be a chat screen that allows the user to test the core service with debug tracing visualized within the web app.