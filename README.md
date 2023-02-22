# Zipline Chrome Extension
A Chrome extension to create short URLs using [Zipline](https://zipline.diced.tech/). This extension is being developed and tested (so far) using Brave v1.48.167. I don't really know what I'm doing, so feedback is welcome. It's basically working as is.

_Security note: The API token is stored in storage.sync. Google does not recommend this for sensitive data, but their solution is to use storage.session, which is deleted when you close the browser. That's not very user friendly and would mean having to add your token after each browser start. If you're worried about this security issue don't use the extension. Any ideas for a better solution?_
<br>
<br>
***
## Screenshots (In Development)

![Main Page](https://h8ks.me/u/yHmiQE.png) ![Settings Page](https://h8ks.me/u/FRpc7u.png)
<br>
<br>
***
## To Do List
1. Add vanity functionality
1. Add error handling for failed requests
1. Add error handling for server address input
1. Add a new page to show after the request with the result?
1. Add effect to buttons to show that they've been pushed?
1. Investigate another storage solution with better security
1. Possibly change token input box to password type so that it is obscured. If I do, I'd like to make one that has a visible button.

<br>
<br>

***
## Attribution
(not sure where to put these in the app)  
<a target="_blank" href="https://icons8.com/icon/2969/settings">Settings</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> <br>
<a target="_blank" href="https://icons8.com/icon/7703/cancel">Cancel</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>