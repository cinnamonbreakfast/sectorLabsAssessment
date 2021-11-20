## The project

I picked NextJs - a React framework - because it already comes with some cool stuff (like env's, SSG, SSR, SCSS support, built-in routing module etc...) and it is very easy to use. Basically it's still **React**, but it also acts like a Node server (also you can write APIs, but we don't need it for today).
For styling I went with SCSS because it's better organized and easy to read rather than the classic CSS. The syntax is almost the same and in the end it's compiled in CSS (check <head> at the bottom with DevTools in browser). Extra, each component has its own styling file (check `styles` directory).
Worth noting that I went with Yarn instead of NPM. There's not huge differenes when you make simple projects, but I personally like it more.
  
## SETUP

In order to run this application `.env.local` must be present within the project and it must have the following structure:

```
NEXT_PUBLIC_GIST_API_URL=https://api.github.com
NEXT_PUBLIC_GIT_ACCESS_TOKEN=GITHUB_ACCESS_TOKEN (not really required)
NEXT_PUBLIC_GIT_OAUTH_APP_CLIENT_ID=GITHUB_OAUTH_CLIENT_ID (required)
```

The calls can be authorized via `NEXT_PUBLIC_GIT_ACCESS_TOKEN`, but this requires some other authorizations, otherwise we will end up with CORS errors. A workaround for this is to create a GitHub OAuth App and use its client id. This action takes less than 3 minutes. So, every REST call will be authorized by using `NEXT_PUBLIC_GIT_OAUTH_APP_CLIENT_ID` in the following way:

`GET /users/<user_login>/gists?my_client_id=<NEXT_PUBLIC_GIT_OAUTH_APP_CLIENT_ID>`

Now we have about 5k calls/hour
  
## Improvements
  
First of all, fetching the data at the page request time via `getServerSideProps` function. This can be seen in `/pages/index.js Line 38`. What basically this function does, it fetches the data at the request time, so when the user opens the page, the data is already rendered and no loaders are displayed. In this moment, this function is used just to have a nice display at the first page access. When changing the pages, REST calls are working in the background and a loader is displayed.

When searching for an user or changing the page, the page number and the search string are added to the URL, so the search and page navigation is kept in the browser history. This is also an UX improvement, as the user can share the search result.
  
File preview is done with the `/components/FileAccordion.js` component. This component renders the file name and an accordion with the file contents (Shows the contents when clicking on the file/hides it). To reduce the spam and make only one API call, the component keeps the file contents/API call result in it's state, more exactly `fileContents` state. Thus, we make sure that we don't need to call again when we switch the code to show/hide contents. Note that the contents is lost after the component is unmounted (close browser tab, go to another page or another URL etc...).
  
Forks are fetched by the `ForkList`. This component fetches the forks when it gets mounted the first time and then keeps the result in a state. The list is truncated to 3 results and at the end a label says how many forks are there but not displayed (in terms of visuals here).

Calls are made through `service/GistService` class, even if we get URLs from others calls. We still pass them to GistService, as we may need to pass default Headers or Params (like the ones for auth to remove the calls limit). Also we might want to configure axios or anything else, this class allows us to make **configurations or changes in only one place**.

Also, I went with RSuite because it's a nice UI Kit and it provides a lot of cool stuff, even more that MaterialUI, but I also wanted to prove that I know how to work with the column system (in this case its 24 columns); for smaller components I aligned the objects inside with flex. A good example is at `styles/components/GistRecord.module.scss line 17`. This aligns the user avatar with the username on the center vertically (direction row). The application is, i'd say, 95% responsive.
  
## Extra unnecessary stuff, but nice to have
  
Deployment to Vercel. This literally took 2 minutes. Just picked my github repo, configured the local env for prod and clicked 'PUBLISH'. Now every time we commit or merge to master, a deployment is made. We can see the build status in GitHub. *I thought of adding this so you can see the application without having to clone the repo, install n run*. What's in the repo is also running in Vercel.

You can access the app via: https://sector-labs-assessment.vercel.app/
