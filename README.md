# Zipline Browser Extension
An extension to create short URLs using [Zipline](https://zipline.diced.tech/). This extension has been tested on Brave, Chrome, Edge, and Firefox.

![Chrome](https://github.com/alrra/browser-logos/blob/main/src/chrome/chrome_64x64.png?raw=true)
![Firefox](https://github.com/alrra/browser-logos/blob/main/src/firefox/firefox_64x64.png?raw=true)
![Brave](https://github.com/alrra/browser-logos/blob/main/src/brave/brave_64x64.png?raw=true)
![Edge](https://github.com/alrra/browser-logos/blob/main/src/edge/edge_64x64.png?raw=true)

<br>
<br>

### Please see [Github Wiki](https://github.com/spencerhooks/ziplineextension/wiki) for additional documentation.

<br>
<br>
<br>

### The extensions are now published in the [Chrome Web Store](https://chrome.google.com/webstore/detail/zipline-url-shortener/aiohifpcfjjjfalokkbddcfnfdhgihld) and [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/zipline-url-shortener/).

<br>
<br>

## Release Notes
Version 1.0: Creating release to publish

Version 0.9.2: There is a known bug in the shorten api in v3.7.0-rc3 of Zipline. This bug causes Zipline to return an incorrect url to the extension, which is then copied to the users clipboard. This bug has been fixed in newer versions of Zipline (starting with v3.7.0-rc4), so please update your server.

<br>
<br>

***

## Screenshots

<kbd><img src="https://h8ks.me/u/78uOHA.png"></kbd> &nbsp; &nbsp; <kbd><img src="https://h8ks.me/u/n2Xs1x.png"></kbd>
<br>
<br>
***


<br>
<br>

_Security note: The API token is stored in storage.sync. Google does not recommend this for sensitive data, but their solution is to use storage.session, which is deleted when you close the browser. That's not very user friendly and would mean having to add your token after each browser start. If you're worried about this security issue don't use the extension. Any ideas for a better solution?_


***
## Attribution
(not sure where to put these in the extension)  
<a target="_blank" href="https://icons8.com/icon/2969/settings">Settings</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a> <br>
<a target="_blank" href="https://icons8.com/icon/7703/cancel">Cancel</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
