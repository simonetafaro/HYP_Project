# Group name: 4 Luppoli

## Project description

This was a course project of Hypermedia Applications (Web and Multimedia). The aim of it was building a working website of an ICT Company.
We had to satisfy some minimum requirements: at least 3 Areas, 30 Services and 20 People.

## Group Member

We are three computer science engineers and one communication designer working together on this project.

- [Andrea Manglaviti](#andrea-manglaviti) | 10610431 | andrea.manglaviti@mail.polimi.it
- [Isabella Possaghi](#isabella-possaghi) | 10570418 | isabella.possaghi@mail.polimi.it
- [Marco Acquati](#marco-acquati) | 10583134 | marco2.acquati@mail.polimi.it
- [Simone Tafaro](#simone-tafaro) | 10639032 | simone.tafaro@mail.polimi.it

### Work division

Here you can find a short description of the contribution that each of us gave to this project. Andrea, Marco and Simone worked on the technical implementation, both frontend and backend, while Isabella worked on the design part of the project.

> ###### Andrea Manglaviti

I worked mainly on the section regarding case studies, both from components point of view and pages view).
Indeed, I developed the CaseStudyMini component that consist of a preview of the case study. Going more in depth, this component contains the area to which it belongs, meaning that these are not cross-area. Moreover, it contains the Title, a descriptiveText and an image which represents the topic.
Then, i developed the MemberMini component which consists in the representation of a person working at the company. Indeed, this component has the image of the person, their name and occupation inside the company.
Finally, I developed the footer which contains the name and logo of the company and other useful information like the company’s headquarters and creators of the project.
Then, going to the pages section I developed casestudy_id and casestudy_index.
The casestudy_index page is the page containing all case studies of the company and has a filter bar to let the user filter case studies by area.
The casestudy_id page is the page of the single case study and contains all the information regarding the case study ( e.g. title, subTitle, descriptiveText, Author etc.) but also related ones. Indeed, there are also related case studies which are the ones from the same area, there are related services and the people that worked on that project.
Finally i have managed the accessibility of the whole website addressing alternative text to images and performed the maximum points on all pages.

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

My work was focused mainly on the development of the team page, the about us page and the implementation of the chatbot's logic (json).
The team page is used to display every member of the company grouped by the area they work in, accessible through a filter bar. 
The filter bar adapts its design based on the display that the user is using, becoming a dropdown if the site is accessed via tablet or smartphone.
The development of the team page has been achieved using html, css and javascript to obtain a fully resizable page without code redundancy.
To show the team members I used the MemberMini component developed by my teammate Andrea in order to attain a layout as consistent as possible.
Initially I developed an overlay to highlight a single member, however in the end we decided to discard it since its design wasn't efficiently adaptable to the variety of component that a dynamic website require. Nevertheless I am pretty enthusiastic with the things i learned diring its development.

The second page that took my efforts is the about us page. 
This page is used to show different aspects about the composition of our company.
The aspect that I found more difficult during its development was to position every element in the right spot on the page using CSS. I am happy with the result achieved thanks to the wireframe that I followed during the development process.

The third element that was under my responsibility is the json used to implement the chatbot's logic.
It required a few days to fully understand how the framework actually worked in order to correctly express the functioning I had in mind. Once I understood the right way to develop the json it has been quite natural to implement new activities to implement the features required by the sepcifications.

<pre>
    |-- pages
        |-- team
            |-- index.vue
        |-- about.vue
</pre>

> ###### Simone Tafaro

Let's begin from the layouts present in the project (default and error). "default.vue" is the main layout of the Website that contains some components reused in every page such as TheHeader, TheFooter and Chat. This feature offered by nuxt allowed us to avoid code duplication and have cleaner code in every page.
We also have another usefull layout, that as written in the nuxt documentation it should be treated as a page, displayed when a 404, 500, ... error occurs.

The header has been developed using html and css together in order to have a completely responsive component without code duplication.
Since we have several place where information are displayed using the same style I made a component also for Service and Area.
In ServiceMini some props are used to print information in page (title, image, ...) but others like serviceIndex and carouselCard are used to conditionally bind classes in order to display this component differenly based on some logic.

Let's now dive into pages.
The main page, index.vue contains an brief overview on the areas of the company. In the desktop version there is a sticky bar that provide a navigation shortcut that allow user to quickly scroll to the desired area. Those buttons also dynamically highlight based on the actual displayed area. This has been developed using javascript.
Each of these areas has a dedicated page area/\_id.vue in which there are dynamic information retrieved from DB such as services, case studies and team members of the selected area.
The page service/index.vue contains all the services of the company grouped by area. Each row, that represents an area, has a carousel developed by me using javascript. Two function handle the click on arrow that allow users to scroll left and right and look to all the services available. Opening the page service/\_id.vue we can navigate through single service\'s details.

Beside the main components mentioned above, spread into various pages we can find others components. They are less important then the others since they do not represent crucial information but they still allow us to have more readable page and reuse same functionality and look in several page.
Here it is a list with a short description about them:

- DiscoverButton.vue: used to represent a button with props that customize the path of the link and label.
- DoubleColorTitle.vue: used to represent the title on two lines of different color. I made this component in order to avoid to rewrite the same code html + css in multiple page where this style is present.
- SpaceDivider.vue: this components has no props, is just used to conceptually divide sections in page.
- GoUp.vue: this component shows up while scrolling down in the page in Mobile & Tablet and it's used for a fast scroll to top

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

\*CHATBOT IMPLEMENTATION - EXTRA \*

In addition to the basic componenent I developed also the backend and frontend part of the Chatbot.
We can find the Chat.vue component in the default layout since we want to offer the possibility to talk with the chatbot in every page of the website.
Every single time the user sends a message to the chatbot, this message will be pushed in store.state.messages using the mutation addMessage() called in the Chat.vue component.

```javascript
    this.$store.commit('addMessage', {
          sender: false,
          content: this.messageToSend,
    })
    ....
    addMessage(state, message) {
        const messages = state.messages
        messages.push(message)
        vue.set(state, 'messages', messages)
    },
```

Since we are talking with the chatbot we also expect a response from it. When the chatbot send to us a response this message will be pushed in in store.state.messages using the same mutation we saw above with the difference that the value sender is true. This value will be used for the render parte in page.

```javascript
this.$store.commit('addMessage', {
  sender: true,
  content: message.utterance,
})
```

In the default layout, at line 6, we call the Chat component binding the props chatList with list. "list" is a data() from the mmcc-mixins.js included in the default layout.
We use the watch option to update the list of messages every time a new message is pushed into store.state.messages both from user and chatbot.

```javascript
    data() {
        const list = []
    }
    ....
    watch: {
    '$store.state.messages'() {
      this.list = this.$store.state.messages
    },
  },
```

## Technical documentation

#### Database

We implemented a MySql Database to store the contents of the site. The queries to handle the user requests are executed trough sequelize in order to prevent dangerous SQL injections and other potential vulnerabilities.

#### Server

In this application we use SSR (Server side rendering) rather than CSR. Server-side rendering means that our page is rendered on the server when it is requested by the user. When the user opens a page in a browser the browser sends a request to the server requesting that page. The page is rendered on the server and sent back to the browser with all its content. Furthermore, every request sends to the server is handled by a specific API that retrieves the correct informations from the database and redirects the user to the correct page dynamically generated.

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
