# Workout Manager 🏋️‍♀️

App built to organize your workouts.

Try it [here!](https://flamboyant-golick-e73a92.netlify.app/)

# Table Of Contents

- [Workout Manager 🏋️‍♀️](#workout-manager-️️)
- [Table Of Contents](#table-of-contents)
  - [Background](#background)
  - [Technology Used](#technology-used)
  - [Learnings](#learnings)

## Background

If you're like me, you have different workouts and over time you tweak them because
you may like one exercise over the other, or you have to switch things up due to equipment access.
This app keeps all of the different workouts for different situations in one place.

## Technology Used

- Frontend: **JS / React**
- Web Server: **NodeJS / Express**
- Database: **MongoDB**
- Cloud Hosting (Backend): **Heroku**
- Cloud Hosting (Frontend): **Netlify**

## Learnings

The biggest thing this project provided me with was learning how to use external cloud hosting for my webapp - particularly Heroku and MongoDB. At some points, the app would lag or not respond, only to find out my backend wasn't working because I needed to update my heroku application, or my database wasn't connected due to long periods of inactivity.

**Challenge:**
My codebase quickly became confusing as I worked on different unfinished features, implementing then abandoning different services along the way. When something didn't go right on the master branch, I didn't even want to fix it as that meant I'd have to sift through all of my changes to get to the original issue. Clearly, I was going about things the wrong way.

**Resolution:**
I overcame this issue by using `git switch -c <new-branch>` to move my existing work to a new branch. Then I cleaned up the master branch. I make sure to keep all features in their own self-contained branches now and to keep the repo clean.

**Challenge:**
The second challenge I faced was with MongoDB. I setup my app to poll the database for workouts. However, I didn't like the speed at which the app read the data. It wasn't instantaneous like I wanted. And when the database wasn't touched for a long time, my clusters would become inactive. That led to even longer wait times. I also needed to implement some sort of user functionality because initially, and even now, there's only one prod database. That means everyone would be using the same database to submit their workouts to a shared data collection. That's not ideal, but I didn't want to implement users just yet.

**Resolution:**
I ended up circumventing this by making my app only save workouts in the prod database after 5 workouts were created. Before that, it used localstorage. So if someone were just testing the app, the database wouldn't even be touched. And their data would be saved in their browser. That was my hack for allowing individuals to have their own data. Of course, this falls apart if someone creates 6 workouts. That 6th one would be added to the mongoDB database, and would be visible by everyone. So that's an issue I will have to address once users are implemented.
