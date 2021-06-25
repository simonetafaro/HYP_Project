# Group name: 4 Luppoli

## Project description

This was a course project of Hypermedia Applications (Web and Multimedia). The aim of it was building a working website of an ICT Company.
We had to satisfy some minimum requirements: at least 3 Areas, 30 Services and 20 People.

## Group Member

We are three computer science engineers and one communication designer working together on this project.

- [Andrea Manglaviti](######andrea-manglaviti) | 10610431 | andrea.manglaviti@mail.polimi.it
- [Isabella Possaghi](######isabella-possaghi) | 10570418 | isabella.possaghi@mail.polimi.it
- [Marco Acquati](######marco-acquati) | 10583134 | marco2.acquati@mail.polimi.it
- [Simone Tafaro](######simone-tafaro) | 10639032 | simone.tafaro@mail.polimi.it

### Work division

Here you can find a short description of the contribution that each of us gave to this project.

> ###### Andrea Manglaviti

<pre>
    |-- components
        |-- casestudy
            |-- CaseStudyMini.vue
        |-- team
            |-- MemberMini.vue
        |-- TheFooter.vue
    |-- pages
        |-- casestudy
            |-- _id.vue
            |-- index.vue
</pre>

> ###### Isabella Possaghi

Wireframe Layout Design: Design of the service user-experience by creating an interface prototype. Definition of an optimal layout, verifying its main functions.
User Flow Design: Definition of an interaction flow, describing in detail the individual steps -(therefore experimentation of scenarios) that a user performs when interacting with a digital service trying to reach his goal.
Design of UX and Ui Kit: creation of a set of visual components, to assemble the front-end of the website with consistency. Definition of the function of each single element and related graphics.
Graphic design: design of the visual elements of the project (logo, colors, images, fonts and more), trying to achieve an effective and consistent graphic style.
Illustrations: composition of figures to complete the graphic identity of the project and make the contents more explicit, accompanying the textual description.

> ###### Marco Acquati

<pre>
    |-- pages
        |-- team
            |-- index.vue
        |-- about.vue
</pre>

> ###### Simone Tafaro

I worked both on the backend and frontend part of the project.
Let's begin from the layouts present in the project (default and error). "default.vue" is the main layout of the Website that contains some components reused in every page such as TheHeader, TheFooter and Chat. This feature offered by nuxt allowed us to avoid code duplication and have cleaner code in every page.
We also have a funny layout, that as written in the nuxt documentation it should be treated as a page, displayed when a 404, 500, ... error occurs.

The header has been developed using html and css together in order to have a completely responsive component without code duplication.
Since we have several place where information are displayed using the same style I made a component also for Service and Area.
In ServiceMini some props are used to print information in page (title, image, ...) but others like serviceIndex and carouselCard are used to conditionally bind classes in order to display this component differenly based on some logic.

Let's now dive into pages.
The main page, index.vue contains an brief overview on the area of the company. In the desktop version there is a sticky bar that provide a navigation shortcut that allow user to quickly scroll to the desired area. Those buttons also dynamically highlight based on the actual displayed area. This has been developed using javascript.
Each of these areas has a dedicated page area/\_id.vue in which there areadynamic information retrieved from DB such as services, case studies and team members of the selected area.
The page service/index.vue contains all the services of the company grouped by area. Each row, that represents an area, has a carousel developed by me using javascript. Two function handle the click on arrow that allow users to scroll left and right and look to all the services available. Opening the page service/\_id.vue we can navigate through single service\'s details.

Beside the main components mentioned above, spread into various pages we can find others components. They are less important that the others since they do not represent crucial information but they still allow us to have more readable page and reuser same funcitonality and look in several page.
Here it is a list with a short description about them:

- DiscoverButton.vue: used to rapresent a button with a props that customize the path of the link
- DoubleColorTitle.vue: used to rapresent the title on two lines of different color. I made this component in order to avoid to rewrite the same code html + css in multiple page
- SpaceDivider.vue: this components has no props, is just used to conceptually divide sections in page
- GoUp.vue: this component shows up while scrolling down in the page in Mobile & Tablet and it's used for a fast scroll to top

In addition to the basic componenent I developed also the backend and frontend part of the Chatbot.

<pre>
	|-- components
    	 |-- area
    	 	|--AreaHomeMini.vue
    	 |-- service
    		|-- ServiceMini.vue
    	|-- utils
    		|-- DiscoverButton.vue
    		|-- DoubleColorTitle.vue
    		|-- GoUp.vue
    		|-- SpaceDivider.vue
    	|-- Chat.vue
    	|-- TheHeader.vue
    |-- layouts
    	|-- default.vue
    	|-- error.vue
    |-- mixins
    	|-- mmcc-mixins.js
    	|-- goTo-mixins.js
    |-- pages
    	|-- area
    		|-- _id.vue
    	|-- service
    		|-- _id.vue
    		|-- index.vue
        |-- team
            |-- _id.vue
    	|-- contact.vue
    	|-- index.vue
    |-- store
    	|-- index.js
</pre>

## Technical documentation

#### Routing

Thanks to Nuxt.js we didn't have to write router config since Nuxt generates the vue-router configuration for us based on the files inside pages.

We only added a router rules in order to have the page index.vue reachable also from the /home path.

```javascript
    router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'home',
        path: '/home',
        component: resolve(__dirname, 'pages/index.vue'),
      })
    },
  },
```

#### Store

As we know from Nuxt.js documentation a "store" is a container that holds application state. In our project we had to use the store to retrieve dynamic data from DB in a component.
More in details we have only the action nuxtServerInit() called from "TheHeader.vue" component. We used this trick to retrive area dinamically from store since components do not have an asyncData method. We decided to do keeps things dynamic and not to hardcode this information inside the component thinking a real scenatrio and his usability.
Store has also been used for the chatbot functionality.

#### mixins

Vue.js offers this flexible way to distribute reusable functionalities for Vue components. Inside general-mixins.js you can find some methods used in more than one page. Most of them are used to adjust frontend rendering at render time.
