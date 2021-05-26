const { Sequelize, DataTypes, Op } = require('sequelize')

// Development
const db = new Sequelize('mysql://root:4LUPPOLI@localhost:3306/dbtest', {})
// Production
// const pg = require('pg')
// pg.defaults.ssl = true
// const db = new Sequelize(process.env.DATABASE_URL, {
//   ssl: true,
//   dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
// })

/**
 * Function to define the structure of the database
 */
function defineDBStructure() {
  const Service = db.define(
    'service',
    {
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      description: DataTypes.TEXT,
      evocativePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serviceTitle: DataTypes.STRING,
      serviceDescription: DataTypes.TEXT,
      partnerTitle: DataTypes.STRING,
      partnerDescription: DataTypes.TEXT,
      s1Name: DataTypes.STRING,
      s1Description: DataTypes.STRING(1000),
      s1Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s2Name: DataTypes.STRING,
      s2Description: DataTypes.STRING(1000),
      s2Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      s3Name: DataTypes.STRING,
      s3Description: DataTypes.STRING(1000),
      s3Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p1Name: DataTypes.STRING,
      p1Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p2Name: DataTypes.STRING,
      p2Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      p3Name: DataTypes.STRING,
      p3Logo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      caseStudyTitle: DataTypes.STRING,
      realtedServiceTitle: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  )
  const CaseStudy = db.define(
    'casestudy',
    {
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descriptiveText: DataTypes.STRING(800),
      challengeTitle: DataTypes.STRING,
      challengeDescription: DataTypes.TEXT,
      solutionTitle: DataTypes.STRING,
      solutionDescription: DataTypes.TEXT,
      teamsTitle: DataTypes.STRING,
      personName: DataTypes.STRING,
      personJob: DataTypes.TEXT,
      serviceTitle: DataTypes.STRING,
      serviceHeading: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  )
  const TeamMember = db.define(
    'teammember',
    {
      memberNameAndOccupation: DataTypes.STRING,
      personalQuote: DataTypes.STRING,
      personalDescription: DataTypes.TEXT,
      workField: DataTypes.STRING,
      teamsTitle: DataTypes.STRING,
      personName: DataTypes.STRING,
      personJob: DataTypes.TEXT,
      personPhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      caseStudyImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      teamImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  )
  const Area = db.define(
    'area',
    {
      banner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: DataTypes.STRING,
      subTitle: DataTypes.TEXT,
      evocativeImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: DataTypes.TEXT,
      servicesTitle: DataTypes.STRING,
      servicesDescription: DataTypes.TEXT,
      //nome e descrizione dei servizi li prendiamo dalla tabella Area
      caseStudyTitle: DataTypes.STRING,
      caseStudyDescription: DataTypes.TEXT,

      teamTitle: DataTypes.STRING,
      teamDescription: DataTypes.TEXT,
      //nome e job dei team member li prendiamo dalla tabella dei teamMember
    },
    {
      timestamps: false,
    }
  )
  const Partner = db.define(
    'partner',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      website: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  )

  const ServiceCaseStudy = db.define('servicecasestudy')

  const PersonCaseStudy = db.define('personcasestudy')

  Area.hasMany(Service, { foreignKey: 'areaID' })
  Area.hasMany(CaseStudy, { foreignKey: 'areaID' })
  Area.hasMany(TeamMember, { foreignKey: 'areaID' })

  Service.belongsToMany(CaseStudy, { through: ServiceCaseStudy })
  Service.hasMany(TeamMember, { foreignKey: 'serviceID' })

  CaseStudy.belongsToMany(Service, { through: ServiceCaseStudy })
  CaseStudy.belongsToMany(TeamMember, { through: PersonCaseStudy })
  CaseStudy.belongsTo(Area, { foreignKey: 'areaID' })
  TeamMember.belongsToMany(CaseStudy, { through: PersonCaseStudy })

  db._tables = {
    Area,
    Service,
    CaseStudy,
    TeamMember,
    ServiceCaseStudy,
    PersonCaseStudy,
    Partner,
  }
}

async function insertRealData() {
  const { Service, CaseStudy, Area, TeamMember, Partner } = db._tables

  //** ------------------------------------------------------------ AREAS --------------------------------------------------------------- */

  //**INSERT AREAS */
  const Security = await Area.create({
    title: 'Security Area',
    subTitle:
      'Wherever your business goes, whoever it works with, you need cybersecurity that covers it all.',
    description:
      'Anytime. Anywhere. We create cybersecurity tailored to your specific business needs. We defend against cyberattacks with proactive, focused,  industry-relevant threat intelligence to give you the confidence that  comes from knowing your business is secure.',
    banner:
      'https://i.ibb.co/X5FrLTP/Frame-6.png',
    evocativeImage: 'https://i.ibb.co/Ny7F40s/security.png',
    servicesTitle: 'Discover our Security services',
    servicesDescription:
      'We are unique among IT security consulting firms. We combine security technology engineering, intelligence expertise and our data science DNA to help companies manage digital risk end-to-end.',
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  const IoT = await Area.create({
    title: 'Internet Of Things',
    subTitle:
      'Acting as the bridge between the physical and the digital world, IoT offers a huge opportunity for companies.',
    description:
      'We help clients effectively capitalize on IoT technology and solutions, linking technology, vendors and customers through a holistic business model. IoT describes the connection of devices to the internet using embedded software and sensors to communicate, collect and exchange data with one another. IoT combines connectivity with sensors, devices and people, enabling a form of free-flowing conversation between man and machine, software and hardware. With IoT, the world is wide open, offering a virtually endless array of opportunities and connections at home, at work or at play.',
    banner: 'https://i.ibb.co/Pwt4Z5J/Frame-5.png',
    evocativeImage: 'https://i.ibb.co/zRPbmf1/iot.png',
    servicesTitle: 'Discover our IoT services ',
    servicesDescription:
      'The growth of IoT is paving the path for new business avenues. The pertinent question for enterprises is no longer if their business benefits from IoT adoption - but rather what IoT functionalities can be best used to their advantage.',
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  const CloudComputing = await Area.create({
    title: 'Cloud Computing',
    subTitle: 'Modernize your IT environment and improve business efficiency',
    description:
      'Having been a major driving force of the ongoing digital revolution, the Cloud has completely changed the way enterprises run their operations - from IT infrastructure management, through financial administration, to data exchange. At ??COMPANY NAME??, we can move your existing IT environment to the Cloud, as well as provide a wide range of cloud-driven applications to help your company gain a competitive advantage. Scroll through this space to learn more.',
    banner: 'https://i.ibb.co/crjyD7n/Frame-7.png',
    evocativeImage: 'https://i.ibb.co/hf3LHBb/cloud.png',
    servicesTitle: 'Discover our Cloud Computing services ',
    servicesDescription:
      "As a result of the on-going digital revolution, the Cloud and business environment have become inseparable. Providing a foundation strong enough to support millions of operations at the same time, cloud computing has played a major role in the development of today's information-driven enterprises. Join them to: - Accelerate your company's digital transformation - Reduce workload and operational costs - Improve the performance of your systems and applications",
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  // isi
  const CustomerExperience = await Area.create({
    title: 'CustomerExperience Area',
    subTitle:
      'Understanding what customer experience is and why it’s no longer enough. We are reinventing business through this.',
    description:
      'The way we interact with brands and companies has changed. We typically associate the customer experience with a traditional and interaction directly found inside a store with a specific aesthetic. he world has changed, and so has the business model: digitalisation had an huge impact on our existence, leading companies to shape a whole new entrepreneurial perspective. But it’s not just because of this. Many customer behaviour patterns have evolved and the company must be able to understand their needs and needs, possibly anticipating and surprising them.',
    banner: 'https://i.ibb.co/XpSgKYj/ce-grande.png',
    evocativeImage: 'https://i.ibb.co/pxH7fJ1/customer-experience.png',
    servicesTitle: 'Explore our tailor-made services about Customer Experience',
    servicesDescription:
      'Hear how businesses have transformed how they work: Great experiences are no longer only a business accessory, they are of vital importance.',
    caseStudyTitle: 'Experience our clients’ success',
    caseStudyDescription:
      'Reimagining business through experience. The following case studies demonstrate how our company is an expert in the business of creating comprehensive experiences from start to finish.',
    teamTitle: 'Meet our team',
    teamDescription:
      'Ideate, innovate, change the world, repeat. Meet our team of talented people using design thinking to create experiences that win awards and make headlines.',
  })
  const BigDataAnalysis = await Area.create({
    title: 'Big Data Analytics',
    subTitle:
      'Analyze data from your database with a data driven approach to take important decisions inside your company.',
    description:
      'The science of analyzing raw data in order to make conclusions about that information, revealing reveal trends and metrics. Through our specialist your company will be more efficient in taking decisions. This process of analysis allows to operate a predictive analysis, that is, it allows to know in advance what will happen: this becomes possible because if we have a model and we have enough historical data we can determine what will happen in the near future with bases or statistical foundations.',
    banner:
      'https://i.ibb.co/F3W2W73/Frame-8.png',
    evocativeImage:
      'https://i.ibb.co/KDhJdh0/data.png',
    servicesTitle: 'Discover our services ',
    servicesDescription:
      'AI is only as smart as the insights that fuel it. We can help you unlock powerful analytics insights by tapping into data you did not even know you had.',
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  //**END OF AREAS */

  //** ------------------------------------------------------------ SERVICES --------------------------------------------------------------- */

  //**SECURITY SERVICES */
  const ModernFraudProtection = await Service.create({
    title: 'Modern fraud protection software',
    subTitle:
      'offers a variety of services from information security consulting to assessing, testing and improving the protection of applications and networks for companies operating in healthcare, manufacturing, banking, retail, telecommunications, and other industries.',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await Security.addService(ModernFraudProtection.id)

  const ManagedSecurity = await Service.create({
    title: 'Managed security',
    subTitle:
      'Helping clients rapidly scale security and compliance operations through innovative technology, as-a-Service capabilities and cybersecurity  services.',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'Achieve more-secure applications, compliant environments and safer systems development with industrialized and repeatable processes.',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })

  const NetworkProtection = await Service.create({
    title: 'Network protection',
    subTitle:
      '"COMPANY NAME" offers a variety of services from information security consulting to assessing, testing and improving the protection of applications and networks for companies operating in healthcare, manufacturing, banking, retail, telecommunications, and other industries.',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'We apply multiple defense layers to protect your corporate network and the sensitive data stored within it. Our security engineers know various ways to keep your proprietary information safe and reduce the probability that you will have to experience successful attack attempts against your network.',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })

  const DataSecurity = await Service.create({
    title: 'Data security',
    subTitle:
      'Our security experts develop a personal approach to each customer based on best practices and enriched with our own experience. We are ready to  support our clients at all project stages.',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      "Our custom data security services help you incorporate a risk-balanced strategy with leading data protection technology to safeguard your organization's critical data. With both consulting and integration services, we help you optimize control over data using market-leading loss prevention and encryption technologies.",
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })

  const IdentityAccessManagement = await Service.create({
    title: 'Identity access management',
    subTitle: '',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'Our Identity & Access Management comes with world-class methods for authentication, authorization, identity lifecycle and accountability. Its modular architecture makes it easy to adapt to specific types of organizations across hierarchies and geographies.',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })

  const SecurityAssessmentAndPlanning = await Service.create({
    title: 'Security assessment and planning',
    subTitle: '',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'We deliver full-scale security assessment and planning services for the components of IT infrastructures such as web, mobile and desktop applications, employee behaviour and remote access software.',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })

  await Security.addService(ModernFraudProtection.id)
  await Security.addService(NetworkProtection.id)
  await Security.addService(DataSecurity.id)
  await Security.addService(IdentityAccessManagement.id)
  await Security.addService(SecurityAssessmentAndPlanning.id)

  //**END OF SECURITY SERVICES */

  //**IOT SERVICES */
  const SmartCities = await Service.create({
    title: 'Smart Cities',
    subTitle:
      'A smart city system gathers and analyzes data from sensors and smart devices to enable efficient management of urban processes (e.g., transportation, lighting). With 9-year experience in IoT, ??CompanyName?? designs and implements end-to-end IoT solutions to bring smart city vision to reality.',
    description:
      'Municipalities of all sizes around the world are adopting smart city concepts based on Internet of Things (IoT) systems to optimize the efficient management of community assets, resources, operations and services. Smart cities foster service-oriented, sustainable local governance equipped to improve transportation systems, build energy-efficient infrastructure, decrease environmental pressures, maintain effective disaster response, and provide state-of-the-art security in public spaces. We work to serve each community with the appropriate smart city services and solutions according to its individual needs and unique vision.',
    banner:
      'https://kritikalsolutions.com/wp-content/uploads/2019/10/smart-cities-banner.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'Our services have been developed to ensure that wireless technology used in smart city strategies complies with established interoperability, cyber security, data privacy, operational safety, and performance reliability standards. We provide you the expertise you need in supplying, planning, building, and sustaining a connected and effective smart city. We serve you with comprehensive smart city services from a single source to save you time and money.',
    s1Name: 'Road Traffic',
    s1Description:
      'Our smart traffic systems take intelligent actions based on the careful “study” of traffic flow, bringing human intervention down to a minimum.',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Lighting',
    s2Description:
      'Connecting sensors, across the street lighting system, helps to consume less energy and bringing down energy costs.',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Safety',
    s3Description:
      'For enhancing public safety, we connect cameras, microphones and movement sensors to a smart city platform and power it with robust analytics tools.',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    partnerTitle: '',
    partnerDescription:
      'Since user apps are an integral part of a smart city, we offer mobile consulting, UI/UX design, native (iOS, Android) and cross-platform (Cordova/PhoneGap, Xamarin, React Native) development, as well as mobile testing.',
    p1Name: 'Flutter',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: 'Salesforce',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '......',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(SmartCities.id)

  const SmartLighting = await Service.create({
    title: 'Smart-lighting',
    subTitle:
      'Flexible and scalable smart IoT lighting solution for cities as well as municipal and enterprise buildings. It can be easily integrated with existing infrastructure or extended by 3rd party systems and it always remains a platform for further extensions.',
    description:
      'Illumination systems are an essential part of urban infrastructure. They contribute to the sense of security in public areas and highlight the architectural beauty of cities around the world. Today we can go one step further by embracing a combination of modern IoT solutions and illumination systems. This combination creates smart city technology and  is used as innovative smart street lighting system.',
    banner:
      'https://statetechmagazine.com/sites/statetechmagazine.com/files/styles/cdw_hero/public/articles/StateTech/201710/ST_Smart_Street_Lights_GettyImages-173553089.jpg?itok=rktclHwy',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'Organizations and government agencies across the world are facing increased pressure to find ways to become more energy efficient while reducing costs. Outdoor lighting is a great place to start as public and commercial lighting infrastructure is expensive and one of the greatest contributors to energy waste. The Internet of Things (IoT) makes it easy for public and private organizations to conserve more energy with smart lighting systems.',
    partnerTitle: '',
    partnerDescription: '',
    s1Name: 'Reduce energy costs',
    s1Description:
      'With connected lighting, your organization can monitor usage and provide lighting as needed in different areas based on their unique needs.',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Make your city a safer place',
    s2Description:
      'Smart lighting provides a greater sense of security and overall better experience for citizens as it helps cities enhance public safety',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Remote maintenance of smart lights',
    s3Description: 'HexTech Smart Lighting Solution allows secure and reliable short distance communication, distributed control and remote smartlights management',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: '......',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '..........',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '.........',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(SmartLighting.id)

  const Automotive = await Service.create({
    title: 'Automotive',
    subTitle:
      '??COMPANY NAME?? IoT Connected Vehicle Insights is connected car software that integrates real-time data about drivers, vehicles and the environment to optimize the in-car experience. The dedicated cloud service streams data from vehicle sensors and uses analytics and AI to understand driver behavior. It links with other information systems in the cloud, such as weather and traffic, to add context and situational awareness.',
    description:
      'Cars have become one of the fastest-growing mobile device category, with every vehicle turning into a node in a much larger network and ecosystems. The ongoing (re)evolution in terms of connectivity, electric, autonomous and mobility trends is full of great opportunities to achieve new revenue streams and improve quality of life in the near future. Yet, as with all new opportunities, challenges, disruptions and risks arise.',
    banner:
      'https://www.consorziosicurezza.com/wp-content/uploads/2018/10/smart-car-resized.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'The potential for connected vehicles during the interim, however, is an exciting, multi-faceted and high-growth area in the IoT’s development – enabling enhanced road safety, smart traffic management, advanced navigation assistance, passenger entertainment and much more.',
    partnerTitle: '',
    partnerDescription: '',
    s1Name: 'Automotive-grade M2M technology',
    s1Description:
      'A new lifestyles offering a suite of advanced features including mobile Wi-Fi hotspot, Internet radio, Web services and an improved navigation system.',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Thales Automotive Connectivity',
    s2Description:
      'Automotive-grade eSIMs leadership position, to identify vehicles, encrypt and secure communications. eSIMs also ensure remote connectivity provisioning as well as seamless connectivity.',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Customer Engagement',
    s3Description: 'Modern customers must have smarter, ‘connected’ cars, and appreciate innovative marketing as much as they like innovations with their vehicles.',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: '........',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '......',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '.....',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(Automotive.id)

  const SmartRetail = await Service.create({
    title: 'Smart Retail',
    subTitle:
      'Adaptive retail is the new imperative for retailers. With global disruption, external pressures and responsibilities, retailers need to be able to adapt. Adapting means evolving, and evolution is how to stay resilient.',
    description:
      'The increasing number of connected devices will lead to the emergence of a so-called connected ecosystem as a new paradigm of the interaction among manufacturers, sellers, and consumers, offering totally new opportunities and challenges to all the parties involved.',
    banner:
      'https://www.zerynth.com/wp-content/uploads/2020/02/smart-retail.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'Retail was among the first industries to adopt IoT. According to a research, in the coming years, retailers will further increase their spend on IoT, which is expected to reach $2.5 billion. Below, we list the trends that will drive a new, consumer-centric retail model enabled by IoT technology.',
    partnerTitle: '',
    partnerDescription:
      'No challenge is out of reach. We extend our industry expertise and comprehensive IoT services through a vast global network of market leaders and innovators.',
    s1Name: 'Automation',
    s1Description:
      'Smart price tags will adjust prices in real time, based on the item’s popularity, expiry date, and other factors. ',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Agile workforce',
    s2Description:
      'With the advancement of technologies, courses and webinars are already accessible for anyone, anytime, and from any device.',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Connectivity platforms',
    s3Description:
      'In the retail industry, connectivity platforms may take multiple forms: from large marketplaces, such as Amazon and Alibaba, to online payment systems and device communication hubs.',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: 'Amazon Web Services',
    p1Logo: 'https://www.channelfutures.com/files/2015/05/aws_0.jpg',
    p2Name: 'Arduino',
    p2Logo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/ArduinoLogo_%C2%AE.svg/1200px-ArduinoLogo_%C2%AE.svg.png',
    p3Name: 'Arm Intel',
    p3Logo:
      'https://internetofbusiness.com/wp-content/uploads/2018/10/Intel-ARM-Licensing-Deal-640x400.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(SmartRetail.id)

  const Healthcare = await Service.create({
    title: 'IoT Solutions for Healthcare',
    subTitle:
      'Medical IoT facilitates monitoring patient health state and tracking medical staff and assets through the network of smart devices and sensors connected to the cloud. With 9 years in IoT, "COMPANY NAME" provides reliable IoMT solutions to improve patient care, asset use, and staff productivity.',
    description:
      'The health industry has been an early adopter of the internet of things (IoT). Nearly half (46%) of executives who participated in the survey said their organization is actively using IoT, and another 21% stated they have IoT projects in development. Their main ambition is efficiency: 54% already use IoT to improve operations, and another 21% plan to do so in the next two years. Overall, health industry execs are optimistic, with 90% believing that IoT’s benefits outweigh its risks. In addition, 79% believe that IoT will help them grow revenue or increase profits.',
    banner:
      'https://iotbusinessnews.com/WordPress/wp-content/uploads/digital-health.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription:
      'What we are approaching is a world where basic healthcare would become out of reach to most people, a large section of society would go unproductive owing to old age and people would be more prone to chronic disease. While technology can’t stop the population from ageing or eradicate chronic diseases at once, it can at least make healthcare easier on a pocket and in term of accessibility. Technology can move the routines of medical checks from a hospital (hospital-centric) to the patient’s home (home-centric).',
    partnerTitle: '',
    partnerDescription: '',
    s1Name: 'Locating and managing assets',
    s1Description:
      'Knowing the exact location of life-saving devices and essential equipment like infusion pumps results in fewer delays for patients and helps optimize machine use.',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Capturing data to drive better outcomes',
    s2Description:
      'Home monitoring of patients using connected blood pressure, glucose and other devices, which enables doctors and nurses to track patients more closely and identify individuals who are at risk.',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Enhancing the employee and patient experience',
    s3Description:
      'Medical teams can track the location of patients wearing wristbands with sensors and deliver relevant information to families via their smartphones.',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: '....',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '.....',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '........',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(Healthcare.id)

  const IndustrialManufacturing = await Service.create({
    title: 'Industrial Manufacturing',
    subTitle:
      'Industrial manufacturers are using IoT across the business: 60% on projects within their facilities, 57% with supply chain and other partners, 42% with end consumers and 58% with their business customers. Their top focus areas are logistics, supply chain and employee and customer operations.',
    description:
      'Industrial manufacturing firms are addressing these concerns by improving the tech infrastructure, deploying better data management methods and addressing workforce culture and change management. They also are taking steps to mitigate IoT’s challenges. For example, 60% are addressing AI bias, ethics and responsibility, 58% are working with partners to better manage ecosystems and 44% are developing more robust policies to address the impact of AI and IoT on data privacy.',
    banner:
      'https://www.sensrtrx.com/wp-content/uploads/2019/06/IoT-Manufacturing-Future.png',
    evocativePhoto: '',
    serviceTitle: 'Making operations self-sufficient',
    serviceDescription:
      'Most (81%) industrial manufacturers surveyed reported that they are making operations more efficient through the use of IoT. Forty-three percent have already benefited from using IoT-based asset management, and 41% expect to do so within two years. Many use sensors to monitor and access everything—from the operational state of machinery to getting alerts when storage tanks, trash dumpsters, exit signs and smoke alarms need to be serviced.',
    partnerTitle: '',
    partnerDescription: '',
    s1Name: 'Making operations self-sufficient',
    s1Description:
      'Many use sensors to monitor and access everything—from the operational state of machinery to getting alerts when storage tanks, trash dumpsters, exit signs and smoke alarms need to be serviced.',
    s1Logo:
      'https://i.ibb.co/Rczq8Pv/sol-1.png',
    s2Name: 'Optimizing factory conditions',
    s2Description:
      'IoT-enabled predictive maintenance can help prevent equipment from malfunctioning. Dashboards can provide deep visibility within a partner ecosystem and supply chain.',
    s2Logo:
      'https://i.ibb.co/KwskLjv/sol-2.png',
    s3Name: 'Monitoring the supply chain',
    s3Description:
      'IoT solutions can monitor the condition of products from when they are made in a factory (or grown on a farm) to the arrival at their final destination.',
    s3Logo:
      'https://i.ibb.co/b77D3Fm/sol-3.png',
    p1Name: '.....',
    p1Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p2Name: '.....',
    p2Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    p3Name: '....',
    p3Logo: 'https://i.ibb.co/vsSqSdP/Partner.png',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await IoT.addService(IndustrialManufacturing.id)
  //**END OF IOT SERVICES */

  //**BIG DATA ANALYSIS SERVICES */
  const OptimizeDigitalMarketing = await Service.create({
    title: 'Optimize digital marketing',
    subTitle:
      'Give users what they are searching just when they land on your page in order to maximize sales.',
    description:
      'In order to grow your enterprise, you need to do more than keep your existing customers happy — you need to find new business. Big data can help you find new audiences and determine which groups are more likely to buy.    ',
    banner: 'https://landerapp.com/blog/wp-content/uploads/2018/09/1-2.png',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(OptimizeDigitalMarketing.id)

  const PredictiveAnalyticsInHealthcare = await Service.create({
    title: 'Predictive analytics in healthcare',
    subTitle:
      'As the health care industry begins to use new technologies such as predictive analytics, government health agencies, doctors, and primary health providers must be aware of risks and agree on standards.',
    description:
      'Health care has a long track record of evidence-based clinical practice and ethical standards in research. However, the extension of this into new technologies such as the use of predictive analytics, the algorithms behind them, and the point where a machine process should be replaced by a human mental process is not clearly regulated or controlled by industry standards. Government health agencies, doctors, and primary health givers need to be aware of the risks emerging and agree on levels of assurance as society continues to move into a new era of decision-making supplemented, and at times replaced, by evidence from digital technologies. More specifically, this paper will look at the various ethical issues and moral hazards that need to be navigated following the adoption and use of predictive analytics in the health care sector with an emphasis on accountable algorithms.',
    banner:
      'https://images.techhive.com/images/article/2015/07/health-analytics-ts-100599204-large.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(PredictiveAnalyticsInHealthcare.id)

  const PredictionScenarioAnalysis = await Service.create({
    title: 'Prediction & Scenario Analysis',
    subTitle: 'From rear-view analysis to forward-looking projection.',
    description:
      'We analyze datasets through classification, clustering, and pattern recognition techniques to move from a historical static description of the past to a forward-looking actionable projection in the future. We implement this solution in predictive maintenance, incident analysis, early-warning, customer satisfaction, churn prediction, production planning, risk assessment, attribution modeling and more.',
    banner:
      'https://image.shutterstock.com/image-photo/predictive-analytics-big-data-analysis-260nw-1348992500.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(PredictionScenarioAnalysis.id)

  const BigDataAutomation = await Service.create({
    title: 'Big Data Automation',
    subTitle:
      'Automation enables you to manage big data and innovate at the pace of business.',
    description:
      'Big data automation is growing as a need for almost every organization, with the IoT driving the stream velocity of data. While users require fast availability of data for analysis, the true value of data can only be extracted and managed via intelligent and advanced data automation.',
    banner: 'https://www.sygmatechnology.com/hubfs/shutterstock_1133982038.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(BigDataAutomation.id)

  const BIDWHConsulting = await Service.create({
    title: 'BI and DWH consulting',
    subTitle:
      'We analyze your particular business needs and give recommendations on designing, developing, implementing or upgrading your analytics solution.',
    description:
      'We provide analytics consulting services for our customers to benefit from integrated solutions that rely on the optimal technology stack, allowing companies to save their costs, improve performance and grow their business.',
    banner:
      'https://www.smartdatacollective.com/wp-content/uploads/2020/11/business-intelligence-future-in-coming-years.jpg',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(BIDWHConsulting.id)

  const PricingOptimization = await Service.create({
    title: 'Pricing optimization',
    subTitle:
      'Pricing is the top profit lever, yet remains underdeveloped in most companies. We can help you build dynamic pricing capabilities that help you set and get the right price, every time, and capitalize on in-year revenue opportunities. ',
    description:
      "Pricing can boost profits far more than increasing sales or cutting costs. And the results of a smarter pricing strategy can fall to the bottom line very quickly.  Yet at least half of all companies leave money on the table because they don't charge the right price or make sure customers actually pay it.   ",
    banner:
      'https://associationsnow.com/wp-content/uploads/2018/12/GettyImages-940692576_hrvcc-600x360.jpg',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await BigDataAnalysis.addService(PricingOptimization.id)
  //**END OF BIG DATA ANALYSIS SERVICES */

  //**CLOUD COMPUTING SERVICES */
  const EInvoice = await Service.create({
    title: 'e-Invoice',
    subTitle:
      'The easiest way to electronic invoicing is through the Cloud. Send e-invoices to your business partners & public administration entities in no time - wherever they are.',
    description:
      'In the light of the current national and EU legislation, Comarch e-Invoicing Cloud stands out as a simple and affordable tool that enables global, legally-compliant exchange of invoice documents with business partners and public administration entities. No matter your industry or product, our platform was designed to help you create, process, and store e-invoices, thus significantly improve your business efficiency. Plus, being a cloud-based solution, it does not require a long and cost-intensive implementation process. Instead, it gives you instant access to a virtual environment that is easy to navigate.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'E-Invoicing Service',
    serviceDescription:
      'Companies active in many countries or worldwide need to support and process a large number of different E-Invoicing standards. With ??COMPANY NAME?? you are on the safe side. We support E-Invoicing compliance in more than 55 countries. In recent years, E-Invoicing initiatives have been started in many countries to simplify the exchange of invoicing data between companies („B2B“), and between companies and authorities („B2G“), and to increase tax revenues. The defined standards within the scope of these initiatives are already widespread. Some are already regulated by national governments.',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await CloudComputing.addService(EInvoice.id)

  const CloudServices = await Service.create({
    title: 'Cloud App Development Services',
    subTitle:
      'With cloud application development services, businesses can build applications that are technically and architecturally adapted to being smoothly hosted and maintained by the cloud infrastructure and take advantage of the capabilities and services offered by PaaS (platform-as-a-service) and IaaS (infrastructure-as-a-service) providers.',
    description:
      '94% of companies already use cloud services reducing IT costs, granting their users reliability and availability and refocusing from routine maintenance to more strategic initiatives. Let us help you get cloud applications designed for high security, performance efficiency, and operational excellence while ensuring the optimal resource consumption.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'Application modernization services',
    serviceDescription: '',
    partnerTitle: '',
    partnerDescription: '',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: '',
    realtedServiceTitle: '',
  })
  await CloudComputing.addService(CloudServices.id)
  //**END OF CLOUD COMPUTING SERVICES */

  //**CUSTOMER EXPERIENCE SERVICES */

  //1
  const Immersive = await Service.create({
    title: 'Immersive Technologies',
    subTitle:
      'Learn how immersive technology can increase revenue and streamline the event planning process.',
    description:
      'The Immersive and Innovative Experiences practice helps clients transform experiences for this world of unlimited possibility. We blend cutting-edge immersive technology with human creativity and strong ethical governance. We break down barriers between brands and their customers.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'Immersive Technologies solutions',
    serviceDescription:
      'We help brands tell stories and craft experiences in innovative and immersive ways, opening up new kinds of interaction, new ways to work and learn, and new revenue streams. It’s an emerging space for all to play in. Let us help you take a lead in next-generation experience.',
    //detailTitle1: 'Spatial storytelling',
    //detailDescription1: 'Designing 360o story worlds, including non-linear narrative and character development.',
    //detailTitle2: 'Experiential marketing',
    //detailDescription2: 'Creating interactive brand engagement through immersive content, shared experiences and location-based activations.',
    //detailTitle3: 'Immersive Commerce',
    //detailDescription3: 'Bringing products to life in 3D through digital twin models, augmenting the commerce experience with virtual ways to shop and buy.',
    //detailTitle4: 'Immersive Learning and Training',
    //detailDescription4: 'Building new ways to process information, master skills and improve performance through virtually simulated environments and situations.',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: 'Adobe',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(Immersive.id)

  //2
  const UserInterfaces = await Service.create({
    title: 'User Interfaces',
    subTitle:
      'Leading creative, business analysis, and advanced technology in user research',
    description:
      'Design a new way to communicate. How to create brand new costumer’s experiences with the latest trend of user interfaces. An interface is the link between the corporate and the user, it must respond to customers’ new, often unmet and frequently changing needs and enable them to achieve their desired outcomes.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: 'Adobe',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(UserInterfaces.id)

  //3
  const DigitalCustomer = await Service.create({
    title: 'Customer Experience Engine',
    subTitle:
      'Your customers are always connected. Shouldn’t their experiences be too? The Customer Experience Engine turns touchpoints into a story: unify the moments. Own the experience.',
    description: '',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'Customer Experience Engine solutions',
    serviceDescription:
      'Our experience-led approach helps ensure that organizations have the right experience architecture to allow customers to create their own journey on their own terms. We view technology as the enabler of the customer experience, not the driver.',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    //detailTitle1: 'Single view of the customer',
    //detailDescription1: 'Lines of business and stakeholder groups have the visibility into how the business is interacting with customers to drive connected experiences.',
    //detailTitle2: 'Seamless plug and play with the latest tech',
    //detailDescription2: 'CXE solves the technology impediment to allow organizations to focus on delivering unforgettable and impactful experiences.',
    //detailTitle3: 'Omnichannel power across platforms',
    //detailDescription3: 'CXE unifies your applications across marketing, commerce, sales and service, turning touchpoints into a story.',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(DigitalCustomer.id)

  //4
  const Campaign = await Service.create({
    title: 'Campaign Management',
    subTitle: '...',
    description: '',
    banner: '',
    evocativePhoto: '',
    serviceTitle: '',
    serviceDescription: '',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(Campaign.id)

  //5
  const AICustomer = await Service.create({
    title: 'Customer Service AI',
    subTitle:
      'Make every customer feel like the only customer: Change the customer experience with conversational AI.',
    description:
      'Solutions.AI for Customer Engagement is built for putting AI at the frontline of every interaction streamlines service, better equips agents, and enhances the overall experience with personalized, precise, and empathetic care. It helps brands quickly and responsibly use data to understand and predict customer needs and arm agents behind the screen with the right message and offers. And it improves the original product and service by analyzing and incorporating insights from customer interactions through a constant feedback loop.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'Customer Service AI solutions',
    serviceDescription:
      'With our range of pre-built AI modules and ecosystem of technology partners, we are able to quickly scale hyper-personalized experiences to help clients anticipate and address their customers needs.',
    //detailTitle1: 'Patented conversational AI platform',
    //detailDescription1: 'Rapidly design and execute automated conversations, compatible with any existing technology partner.',
    //detailTitle2: 'Intent discovery and analytics',
    //detailDescription2: 'Apply a data-driven approach to identify and prioritize customer intents for automation.',
    //detailTitle3: 'Customer and journey analytics',
    //detailDescription3: 'Responsibly establish a strong foundation of customer and journey data to generate insights around specific business inefficiencies that unlock value.',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(AICustomer.id)

  //6
  const CreativeMarketingServices = await Service.create({
    title: 'Creative Marketing Services',
    subTitle:
      'Build your brand and drive demand through high-impact, creative customer experiences. Discover the transformative power of a story.',
    description:
      'We take a holistic approach that combines creative, content, data and technological expertise to translate brand vision and business goals into customer engagement strategies and business results. With our help, you wll delight your customers with relevant, elegant, and intuitive experiences. Our insights into audiences and markets help us create effective brand strategies that drive real engagement for every customer across every channel.',
    banner: '',
    evocativePhoto: '',
    serviceTitle: 'Creative Marketing Services solutions',
    serviceDescription:
      'What does it mean to build a brand? We take it from the ground up—from strategy and content to activation.',
    //detailTitle1: 'Intent discovery and analytics',
    //detailDescription1: 'We deliver strategy for new client brands and develop creative assets and identities.',
    //detailTitle2: 'Content strategy and activation';
    //detailDescription2: 'We develop creative content across channels to drive consumer experiences.',
    //detailTitle3: 'Omnichannel strategy and activation';
    //detailDescription3: 'We activate and optimize programs that deliver high engagement and return on investment.',
    partnerTitle: 'Alliances and partners',
    partnerDescription:
      'At ?company name?, together with our Partners, we are re-imagining the business Deliver with unforgettable customer experiences',
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
    caseStudyTitle: 'Read about our case studies',
    realtedServiceTitle: 'You might be interested also to these services.',
  })
  await CustomerExperience.addService(CreativeMarketingServices.id)

  //**END OF CUSTOMER EXPERIENCE  SERVICES */

  //** ------------------------------------------------------------ CASE STUDIES --------------------------------------------------------------- */

  //**SECURITY CASE STUDIES */
  const OnlineFraudDetection = await CaseStudy.create({
    title: 'Next generation online fraud detection for banks',
    subTitle: 'A new generation bank',
    teamsTitle: 'Team a caso',
    banner:
      'https://www.creativemotions.it/wp-content/uploads/2020/06/Il-segreto-per-scrivere-un-case-study-che-converte.png',
    descriptiveText:
      'Customers Bank is one of the fast-growing “new-generation” European banks. The Bank’s mission was set to offer a wide range of financial products and services for individuals, families and businesses with a strong focus on delivering new levels of quality, service and efficiency, while also providing the best possible user experience “without losing the human connection,”as articulated in their mission statement.',
    challengeTitle: 'Effective and convenient fraud detection solution',
    challengeDescription:
      'The need for the Bank to deliver a new paradigm in user experience for online banking provided several challenges to their security team, as they were requested to minimize customer friction while supporting instant payment and open banking initiatives, andensure regulatory compliance (PSD2). In particular, the anti-fraud team had to select and implement the best fraud detection solution to ensure the Bank would quickly gain an excellent reputation in the market by delivering the best customer satisfaction in terms of protection against online frauds.',
    solutionTitle: 'application-transparent approach',
    solutionDescription:
      'Our application-transparent approach does not require instrumenting or even touching applications. "COMPANY NAME" passive and dynamic delivery of controls allows security to be decoupled from application development & deployment, and is a critical functionality that can be independently delivered and managed by the security team.',
    teamsTitle: 'Security departement',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await Security.addCasestudy(OnlineFraudDetection.id)
  await ManagedSecurity.addCasestudy(OnlineFraudDetection.id)

  const cs1 = await CaseStudy.create({
    title: 'cs1 title',
    subTitle: 'cs1 subtitle',
    banner:
      'https://www.creativemotions.it/wp-content/uploads/2020/06/Il-segreto-per-scrivere-un-case-study-che-converte.png',
    teamsTitle: 'Team a caso',
  })
  await Security.addCasestudy(cs1.id)
  await ManagedSecurity.addCasestudy(cs1.id)
  //**END OF SECURITY CASE STUDIES */

  //**BIG DATA ANALYSIS CASE STUDIES */
  const bdaC1 = await CaseStudy.create({
    title: 'BI implementation for 200 healthcare centers',
    subTitle:
      'The Customer is an American company that offers software to help 200 healthcare centers and retirement homes to process data related to patients and medication as well as build various types of reports.',
    banner:
      'https://www.scnsoft.com/boss/images/02d65838-eb3a-4d54-b7aa-b6b7aa0c1d47bi_healthcare.png',
    descriptiveText:
      'The Customer commissioned ScienceSoft to rewrite the software – a Java application used by the healthcare centers for management and reporting of data on medication inventory, clinical services, patient data, marketing activities and others. Within the project, the Customer also wanted the tool to allow its users to enable quality population health analytics with prompt reports.',
    challengeTitle: 'BI IMPLEMENTATION',
    challengeDescription:
      'The Customer commissioned ScienceSoft to rewrite the software – a Java application used by the healthcare centers for management and reporting of data on medication inventory, clinical services, patient data, marketing activities and others. Within the project, the Customer also wanted the tool to allow its users to enable quality population health analytics with prompt reports.',
    solutionTitle: 'Implented system',
    solutionDescription:
      '"To ensure scalability and short query response time, ScienceSoft’s BI implementation team built an analytical Microsoft SQL Server data warehouse which would use a Transact-SQL script to load data from the relational database. The latter was consolidated from 200 databases during the application development process and totaled 12GB."',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC1.id)
  await BIDWHConsulting.addCasestudy(bdaC1.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC1.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC1.id)

  const bdaC2 = await CaseStudy.create({
    title: 'Price optimization for e-commerce',
    subTitle:
      'This will be a glimpse of what you can achieve by sharing your sales data with us. We could perform an opportunity summary report in line with this use case, and uncover your own opportunities regarding price optimization. So, fasten your seatbelt and get ready for the take-off.',
    banner:
      'https://tryolabs.com/blog/images/blog/social/2018-09-24-price-optimization-machine-learning.d59ca712.jpg',
    descriptiveText:
      'We have discussed how a data-driven price optimization is no longer an option for retailers, but a question of how and when to do it. With a world that’s moving towards changing prices more and more dynamically, static pricing strategies can’t keep up, and data-driven approaches have arrived to stay. In this post, we’ll be focusing on how to perform data-driven price optimization, using a case study to showcase what can be done using sales data to predict demand and optimize prices.',
    challengeTitle: 'Analyzing an E-Commerce Sales Data',
    challengeDescription:
      '"Having our data ready, we proceed to train the demand forecasting models. Our goal is to be able to build the demand curve for each item. The models will learn the relation between the demand and several factors such as the price, holidays/events, and macroeconomics. During this phase, the collaboration with the business team is particularly important. Business insights help to validate the selected features and ensures that we are not missing any important aspect that can be potentially used to forecast the demand."',
    solutionTitle: 'Price optimized',
    solutionDescription:
      '"Combining their available dataset and other publicly available information, such as holidays/events data and macroeconomic series, we have been able to estimate demand curves for a subset of the items which would allow them to take optimal pricing decisions. The remaining items should undergo an exploration phase where new prices would be tried in order to be able to estimate their demand curves accurately. The exploration strategy is generally decided jointly with the client. For this example, given the data available and our past experience, we would suggest performing weekly price changes during the exploration phase. Furthermore, we have shown that there is plenty of room for inventory management improvement since there seems to be an important amount of revenue lost due to understock."',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC2.id)
  await PricingOptimization.addCasestudy(bdaC2.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC2.id)
  await BigDataAutomation.addCasestudy(bdaC2.id)

  const bdaC3 = await CaseStudy.create({
    title: 'Integrated BDA Platform',
    subTitle: 'Big Data automation platform enables new sides of powerful data',
    banner:
      'https://www.xenonstack.com/images/blog/need-of-modern-big-data-integration-platform.png',
    descriptiveText:
      'The essential feature of big data automation (BDA) is the realization that doing a lot more with a lot less is the new reality for IT organizations, and that smart IT organizations, in response to that reality, will seek to spend their scarce human talent  building value that their internal customers within the organization perceive to be valuable: new, enabling, differentiating. Today, that ingenuity is trapped, because IT teams are spending most or all of their time performing routine internally focused tasks, many of them invisible to internal business constituents, and most of them either susceptible to automation or acceleration.',
    challengeTitle: 'Replacing Artistry with Automation',
    challengeDescription:
      'As big data technologies become an increasingly important part of our enterprise decision support environments — whether as staging areas, data engineering environments, sandboxes for data scientists and advanced analytics projects, or as a data management platform co-equal with our enterprise data warehouses — we should avoid making the same mistakes we made, with enterprise data warehousing, and instead build big data automation into our environment from the outset. That big data automation infrastructure cannot, we think, come from the open source community or the Hadoop distribution vendors. Those companies have no real experience with, or understanding of, the existing enterprise data warehousing environment, or commercial decision-making in general.',
    solutionTitle: 'Developed platformfor BDA',
    solutionDescription:
      'We embrace  the very behaviors that got commercial IT organizations into such difficulties in enterprise data warehousing, by encouraging the broad-based, large-scale use of hand-coding techniques, in proprietary languages, using complex, poorly integrated tool chains, with little or no support for operations and management of production big data infrastructure, and no understanding of the essential role that rich, well-managed metadata plays into the effective operation, and modification, of production-grade analytics environments.',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC3.id)
  await BigDataAutomation.addCasestudy(bdaC3.id)
  await BIDWHConsulting.addCasestudy(bdaC3.id)
  await PricingOptimization.addCasestudy(bdaC3.id)

  const bdaC4 = await CaseStudy.create({
    title: 'Predictive analytics in healthcare ',
    subTitle: 'Our prediction can help you in everyday life',
    banner:
      'https://www.clicdata.com/wp-content/uploads/2018/08/predictive-analytics-healthcare.jpg',
    descriptiveText:
      'Predictive analytics can provide alerts to everyone from clinician and financial experts to administrative staff to inform them when events they are concerned with are likely to happen. As a result, they can make more informed, more timely, and usually better choices at times when small nuance can have big consequences.',
    challengeTitle: 'Moving to the future in healthcare industry',
    challengeDescription:
      'Much of medicine is about anticipating and reducing risk based on current and historical patient data. How likely is this cancer patient to suffer complications if we perform surgery? What is the chance that this pneumonia patient will be readmitted to the intensive care unit (ICU) within 48 hours if she is discharged? Clinicians have always had to make decisions without absolute certainty – but with the advance of predictive analytics in healthcare, these decisions promise to be better informed than ever.  Predictive analytics aims to alert clinicians and caregivers of the likelihood of events and outcomes before they occur, helping them to prevent as much as cure health issues. Driven by the rise of Artificial Intelligence (AI) and the Internet of Things (IoT), we now have algorithms that can be fed with historical as well as real-time data to make meaningful predictions.',
    solutionTitle: 'Prediction has been useful to help people',
    solutionDescription:
      'Predictive analytics can combine data from multiple sources – including hospital-based electronic medical records, fall detection pendants, and historical use of medical alert services – to identify seniors who are at risk of emergency transport in the next 30 days. This allows healthcare providers to reach out to a senior person even before a fall or other medical complication occurs, preventing unnecessary hospital readmissions and reducing costs of transportation, acute care, and rehabilitation. In a similar vein, one medical home network in the US reported using machine learning to identify individuals with a heightened risk of developing severe complications from COVID-19. Rather than calling all 122,000 of their members to check in on their well-being, the home network took a more targeted, data-driven approach to focus their initial outreach on the 4.4 percent at-risk patients. By educating this group on when and where they should seek medical care, providers sought to proactively help at-risk patients while managing strain on healthcare organizations"',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC4.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC4.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC4.id)
  await BIDWHConsulting.addCasestudy(bdaC4.id)

  const bdaC5 = await CaseStudy.create({
    title: 'Optimise digital marketing',
    subTitle: 'Finding the right digital marketing agency isn’t easy.',
    banner:
      'https://deoriunde.com/wp-content/uploads/2019/11/Digital-marketing.jpg',
    descriptiveText:
      'The challenge for us was helping Intuit build visibility and become known for services outside of the main ones for which they are known. Plus there was some concern around their highly-specialized competitors like GoDaddy.',
    challengeTitle: 'A good understanding of your customer’s behavior.',
    challengeDescription:
      'At its core, marketing is all about communicating with your customers in their own language on the platforms where they hang out. Before you can do that, you need to understand your audience. Not just surface level stuff like “they need help with SEO,” but a deeper understanding.',
    solutionTitle: 'Improved understanding of customer behaviour',
    solutionDescription:
      'When you’re starting a business, it’s all about hustling. You’re just trying to generate revenue however you can. But as you grow, you must develop more documentation and processes around your workflows. For example, you might need to have documentation for how to run a PR, social media, or paid advertising campaign.',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC5.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC5.id)
  await PricingOptimization.addCasestudy(bdaC5.id)
  await PredictiveAnalyticsInHealthcare.addCasestudy(bdaC5.id)

  const bdaC6 = await CaseStudy.create({
    title:
      'Real-time traffic prediction via highly automated fleet communication',
    subTitle:
      'Providing drivers and highly automated vehicles with a view of the road ahead that is as comprehensive as possible is the main idea of the project. ',
    banner:
      'https://www.carhs.de/newsletter-archive/images/news/ipgflottenkommunikationbig.jpg',
    descriptiveText:
      'Driving onto the highway and knowing in advance how slow the rush hour traffic will move or whether the two-hour buildup will clear up that moment, ensuring smooth driving – in the research project “Providentia – Pro-active video-based use of telecommunications technologies in innovative autobahn scenarios”, a real-time view of the highway traffic ahead is tested using corresponding sensors and big data. Via the highly precise localization of traffic objects within the system, driver and self-driving cars are provided with information, increasing the safety, efficiency, and comfort of driving. ',
    challengeTitle: 'Simulation software CarMaker by HEXTECH.',
    challengeDescription:
      'The main aim of the project is to provide drivers and highly automated vehicles with a comprehensive view of the road ahead. Successful implementation requires a cellular network for data transfer and Car2X receivers, which process and transfer the relevant data. The ‘digital twin’ of the infrastructure is therefore always up-to-date and enables derivations of all relevant information for each vehicle in real time and under adverse weather conditions.',
    solutionTitle: 'Development of the system',
    solutionDescription:
      'For the development of the system, the simulation software CarMaker by IPG Automotive offers important support. On-road field tests on the digital test bed on the German highway A9 are realistically transferred to the virtual world with CarMaker. Real traffic situations and objects are virtually modeled in real time which allow for realistic tests of the entire system in virtual test driving while taking uncertainties into account. If the interaction of sensors, Car2X components, and advanced driver assistance systems works in the scenarios, the real-time visualization in the vehicle is tackled in the next step. Data obtained in reality is then displayed on a laptop in the car while driving, and the information supply of the connected vehicles is tested in actual traffic scenarios on the test track.',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await BigDataAnalysis.addCasestudy(bdaC6.id)
  await PredictionScenarioAnalysis.addCasestudy(bdaC6.id)
  await OptimizeDigitalMarketing.addCasestudy(bdaC6.id)
  await BigDataAutomation.addCasestudy(bdaC6.id)
  //**END OF BIG DATA ANALYSIS CASE STUDIES */

  //**CLOUD COMPUTING CASE STUDIES */
  const casestudy2 = await CaseStudy.create({
    title: 'CLOUD COMPUTING CASE STUDIES',
    subTitle: '',
    banner: '',
    descriptiveText: '',
    challengeTitle: '',
    challengeDescription: '',
    solutionTitle: '',
    solutionDescription: '',
    teamsTitle: 'Team a caso',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await CloudComputing.addCasestudy(casestudy2.id)
  //**END OF CLOUD COMPUTING CASE STUDIES */

  //**CUSTOMER EXPERIENCE CASE STUDIES */
  //1
  const ceC1 = await CaseStudy.create({
    title: 'Reimagining guest experiences on the high seas',
    subTitle:
      'Carnival Corporation connects high-touch technology and the human touch to create hyper-relevant experiences for thousands of guests at a time.',
    banner: '',
    descriptiveText:
      'Carnival Corp.’s CEO Arnold Donald has dubbed today “the golden age of cruising.” With growth in guest numbers, fleet sizes, ticket prices and a sea of new competitors, the description certainly fits. However, as dynamic as the industry is, the cruise travel category remains under penetrated. The company’s leadership knew to expand the market for cruise vacations, the cruise model itself had to change. The focus needed to go beyond building and marketing new ships to leveraging the company’s scale to create a new and sustainable competitive advantage. With the world’s largest fleet spanning nine distinct brands, Carnival Corp. envisioned a new model that elevated guest experience enablement above the physical ship platform. ',
    challengeTitle:
      'Our challenge - Deliver personalized, cost-effective experiences to keep passengers coming back to sea on their ships.',
    challengeDescription:
      'It’s no wonder that Carnival Corporation’s CEO Arnold Donald calls today “the golden age of cruising.” Forbes predicts that 27 million people will take a cruise this year, with $65 billion in ships on order over the next decade.',
    solutionTitle:
      'The solution we provided - Connecting every guest to personalized experiences',
    solutionDescription:
      'Each guest receives a free Medallion. The light, quarter-sized disc enables frictionless payment, keyless stateroom access, accelerated embarkation and much more.',
    teamsTitle: 'Meet our team',
    personName: 'Sean Hyland',
    personJob: 'Digital Technical Architect',
    serviceTitle: 'Immersive technologies',
    serviceHeading:
      'From novelty to utility. Excelling in digital commerce requires engaging product and service expertise that give confidence to consumer buying.',
  })
  await CustomerExperience.addCasestudy(ceC1.id)

  //2
  const ceC2 = await CaseStudy.create({
    title:
      'illycaffè - Finding the perfect blend for the digital customer experience',
    subTitle:
      'illycaffè, the premium Italian coffee brand, offers a unique taste and aroma that’s recognized by coffee lovers around the world, the company sells its products and services to consumers and trade customers in 140 different countries.',
    banner: '',
    descriptiveText:
      'Our data-driven, comprehensive and consistent social media strategy is optimizing the creative effort, ensuring premium content with that unique “illycaffè” blend reaches the right audience at the right time on the right channel. Social media activities have increased engagement and reach by 15 percent.',
    challengeTitle: 'Our challenge - Business approach reimagination',
    challengeDescription:
      'Looking to capitalize on its success at home and expand its growth internationally, illycaffè decided to embark on a radical reimagination of its digital customer experience. Combining the power of digital with a customer-centric mindset, illycaffè wanted to offer truly memorable personalized experiences on both B2B and B2C channels. The ultimate goal? To delight and engage its customers, bringing them ever closer to the brand—and fueling new growth for the illycaffè business.',
    solutionTitle:
      'The solution we provided - A whole brand new client approach',
    solutionDescription:
      'Leveraging knowledge from across Interactive design and beyond—in strategy, technology, digital experiences and more—we’re helping illycaffè every step of the way as it drives its transformation forward. Beginning with a digital transformation roadmap, we’re setting the business on a path to transform customer experience in everything from the website to the contact center, putting a customer-centric mindset at the core',
    teamsTitle: 'Meet our team',
    personName: 'Hari Murakami',
    personJob: 'Lead – Immersive Experiences, Interactive',
    serviceTitle: 'Immersive technologies',
    serviceHeading:
      'From novelty to utility. Excelling in digital commerce requires engaging product and service expertise that give confidence to consumer buying.',
  })
  await CustomerExperience.addCasestudy(ceC2.id)

  //3
  const ceC3 = await CaseStudy.create({
    title: 'Subway - A data-driven recipe for delighting customers',
    subTitle:
      'Reinventing experiences: Subway CDO on personalization. Delivering meaningful insights that are helping them delight customers every day.',
    banner: '',
    descriptiveText:
      'For today’s fast-food consumers, mobile and online ordering are must-haves. But delivering them effectively can be a tall order even for hugely successful brands. As part of a broader digital transformation, we helped Subway® restaurants make sure all their customer touchpoints were hitting the mark by creating a new data-driven experience optimization operating model.',
    challengeTitle:
      'Our challenge - How to make sure every touchpoint hits the mark?',
    challengeDescription:
      'In the hyper-competitive quick service restaurant industry, getting customer experience right matters more than ever. So, as part of a complete transformation of their digital services, Subway wanted to make sure every digital touchpoint was as effective as it could possibly be. And that called for something new: a commitment to continuous consumer experimentation and a data-driven culture of daily user testing whether online, on their mobile app, or in store.',
    solutionTitle:
      'The solution we provided - Building up a new operating model, layer by layer',
    solutionDescription:
      '"Using our deep experience of both organizational design and personalization, we helped Subway devise a completely new recipe for success – an operating model that would continuously optimize customer experiences through a dedication to scientific experimentation Leveraging the technologies of Adobe Analytics and Target, the new model enables Subway to run vast numbers of user experience tests across digital channels – everything from changing the color of a single button to revising homepage promotional messaging – and see the results instantly. That’s providing statistically meaningful insights into how design changes affect customer behavior – and company revenue.',
    teamsTitle: 'Meet our team',
    personName: 'Sean Green',
    personJob: 'Lead – Interactive Technology',
    serviceTitle: 'Immersive technologies',
    serviceHeading:
      'From novelty to utility. Excelling in digital commerce requires engaging product and service expertise that give confidence to consumer buying.',
  })
  await CustomerExperience.addCasestudy(ceC3.id)

  //4
  const ceC4 = await CaseStudy.create({
    title: 'Dutch Flowers - Bouquet of innovation, personalization and service',
    subTitle:
      'A digital platform with exceptional, personalized customer experience so business continues to bloom.',
    banner: '',
    descriptiveText:
      'Webshops, much like floral arrangements, can be delicate: one faulty order or misplaced orchid is all it takes to keep a customer from returning. So, when an opportunity sprouted up for Dutch Flowers to fortify their online channel’s technical capabilities, they acted quickly.',
    challengeTitle:
      'Our challenge - Renew the global leader in the floriculture industry',
    challengeDescription:
      'The challenge was clear: finding a solid e-commerce platform to handle this sheer volume of new products and prices on a daily basis. On top of this, Dutch Flowers wanted to continue providing an exceptional customer experience — one that was both personalized and allowed floral wholesale companies to maintain, customize and control their brand identity in the individual websites and assortments for their customers.',
    solutionTitle:
      'The solution we provided - User research and experience mapping',
    solutionDescription:
      'Working with us, Dutch Flowers kicked things off by leveraging design thinking and agile delivery methods, like user research and story mapping, to determine how the ideal customer journey would look as they peruse and purchase flowers online. Together, we developed a minimal viable product (MVP) based on the latest SAP Commerce Cloud Version 2.',
    teamsTitle: 'Meet our team',
    personName: 'Sean Green',
    personJob: 'Lead – Interactive Technology',
    serviceTitle: 'Immersive technologies',
    serviceHeading:
      'From novelty to utility. Excelling in digital commerce requires engaging product and service expertise that give confidence to consumer buying.',
  })
  await CustomerExperience.addCasestudy(ceC4.id)

  //**END OF CUSTOMER EXPERIENCE CASE STUDIES */

  //**IOT CASE STUDIES */
  const iotC1 = await CaseStudy.create({
    title: 'Retail Sensor Platform',
    subTitle:
      'Businesses can leverage the real-time data coming from IoT sensors to know when a product is about to go out-of-stock, or what their customers have bought that day.',
    banner:
      'https://www.intel.com/content/dam/www/public/us/en/images/iot/16x9/rss-rfid-power-of-data-16x9.jpg.rendition.intel.web.576.324.jpg',
    descriptiveText:
      'RFID tags are placed on all the items in the store. Data readings are forwarded to Intel gateways, and then pushed back to back office systems for cloud-based analytics. RFID antennas are always on, gathering and disseminating the Stock Keeping Unit (SKU)-level data on a constant basis. Since the system is continuously scanning for products, it is able to locate and account for every item on the sales floor at any one time. The system provides alerts to allow stock to be replenished when running low. Intel has designed its reader to be simple to set up and calibrate. Once the plug-and-play device is connected to an Intel gateway via one wire, it begins collecting and forwarding the inventory information.',
    challengeTitle: 'Reduce lossess for retailers world-wide',
    challengeDescription:
      'According to McKinsey & Co, inventory distortion - in the form of overstock, stock-out and shrinkage - represents just over $1 trillion worth of losses for retailers world-wide. Furthermore, McKinsey estimates that the potential impact of IoT on retail will range from $410 billion to over $1 trillion per year by 2025.',
    solutionTitle: 'Improved understanding of customer behaviour',
    solutionDescription:
      'The system records not only when the item has been sold, but also what items have been touched and tried on. In addition, as well as being fully informed about their stocks, store staff gain a better understanding of customer traffic and local demand. The retailer is able to identify premium traffic areas, learn how customers interact with specific items, and learn which products are abandoned and which are preferred. McKinsey estimates that optimising store layouts can increase productivity by 5 percent',
    teamsTitle: 'IoT Departement',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC1.id)
  await SmartRetail.addCasestudy(iotC1.id)

  const iotC2 = await CaseStudy.create({
    title: '7-Eleven - Reliable and user-friendly IT system',
    subTitle:
      'A highly sophisticated IT/store solution that supports the global business model and store management activities of 7-Eleven.',
    banner:
      'https://www.viewsonic.com/library/wp-content/uploads/2019/08/LB0040-hero-compressed.png',
    descriptiveText:
      'Through its long years of relationship with ?Company Name?, a trusted partner that had a true understanding of the store business process of the ground reality, 7-Eleven was able to build a reliable and user-friendly IT system. Specifically, ?Company Name? realized a robust framework that supported the store management of each franchisee: providing merchandising support on ordering and product assortment, while improving the store operation efficiency.',
    challengeTitle: 'Promote global expansion',
    challengeDescription:
      "7-Eleven's challenge is to further promote its active global expansion and area licensee movement to the matured and emerging retail markets. In order to achieve such business goal, 7-Eleven required a solution partner that had a true understanding of its business strategy and process, thereby providing the most appropriate support that corresponded to each need of the specific country or region.",
    solutionTitle: 'Retailer Initiative',
    solutionDescription:
      '7-Eleven has come to gain a ‘No. 1 Convenience Store’ status in many countries and regions around the world. Such remarkable result was achieved by adapting the concept of Retailer Initiative supported by highly sophisticated IT and network technologies in order to adjust to the specific conditions and situations of each region. In the US, the average sales figures for franchise stores incorporating this advanced business model have soared by 43 percent.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC2.id)
  await SmartRetail.addCasestudy(iotC2.id)

  const iotC3 = await CaseStudy.create({
    title: 'Transforming Retail Pain into Smart Gain',
    subTitle:
      'Capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    banner:
      'https://simplecore.intel.com/insight-tech/wp-content/uploads/sites/45/2020/05/retail-data-computer-vision-0.jpg',
    descriptiveText:
      'With an IoT smart retail package, building operators can map scenarios such as space or comfort monitoring in their entirety or in a modular way. Retail building operators can now seamlessly capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    challengeTitle: 'Reduce energy consumption',
    challengeDescription:
      'The owner of a large fast-food chain, needed to significantly reduce energy consumption in all stores.',
    solutionTitle: 'IoT smart retail package',
    solutionDescription:
      'Energy sensors were installed on A/Cs, refrigerators and lighting. After one month, the branches displayed different energy consumption patterns. Researching this further, they discovered that the refrigeration equipment in one of the branches was faulty and the compressors were overworked. The customer installed door sensors in the refrigerators to send an alert if doors weren’t fully closed after a set time interval. Often times, employees push the door closed without the door actually sealing, and the refrigerator needs to work harder to keep food cool. Leaving the door open overnight often results in food wastage. The goal was to develop a guest ‘comfort score.’ Sensors were installed to monitor noise, smell, air quality, and restaurant temperature. Data from each sensor were given a score and all scores were tallied up to create a guest comfort score that could be proactively monitored across locations. Alerts were sent if guest comfort scores dropped below an acceptable level. This system integrator is currently working on an extension to improve guest satisfaction. They are researching technology to track the time it takes guests to get their meal from the moment they enter the restaurant.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC3.id)
  await SmartRetail.addCasestudy(iotC3.id)

  const iotC4 = await CaseStudy.create({
    title: 'Building a connected car ecosystem',
    subTitle:
      '??COMPANY NAME??, with its Automotive division, constantly develops solutions for innovation trends such as e-mobility and ACES (for cars intended to be autonomous, connected, electric and shared)',
    banner:
      'https://images.acvmagazine.com/file/BIT-Magazine-Images/feature_cover_06.jpg',
    descriptiveText:
      'In a time of e-mobility, we recognize the necessity of expanding the ecosystem to include third-party providers such as Alexa Auto. That is why the deployment of ŠKODA Connect Alexa Skill is the perfect example of building a connected car ecosystem.  Our work in these fields includes software development and external testing services.',
    challengeTitle: 'Voice assistants for cars',
    challengeDescription:
      'Voice assistants are mostly associated with smart home solutions rather than with remote management for cars. But what if we were able to integrate cars and voice assistants? Indeed, that was the main goal to enable ŠKODA car owners to communicate with their vehicles remotely, using nothing more than the Alexa Echo home speaker or the Alexa smartphone app. In this case, reduced time to market was crucial to fulfil the challenge. ',
    solutionTitle: 'Alexa Skill - New implementation af Alexa for Skoda',
    solutionDescription:
      'The idea was to understand the client’s needs and obtain feedback to effectively move from proof of concept to the final product. For this purpose, we adopted an iterative agile approach. With many years of experience using this methodology, we have established a dedicated scrum team, consisting not only of developers, but also of user experience/ interface designers. Their involvement allowed the creation of an intuitive voice user interface. As a result, we delivered a Skill, which allows the end-user to manage their car remotely.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC4.id)
  await Automotive.addCasestudy(iotC4.id)

  const iotC5 = await CaseStudy.create({
    title: 'Abnox AG - 4.0 Industry',
    subTitle:
      'The concept of Industry 4.0 is based on several foundations, including technology, processes, organization, and operational and business models.',
    banner:
      'https://www.decision.com/wp-content/uploads/2020/12/Smart-Factory-1-1024x444.png',
    descriptiveText:
      'In discussion about Industry 4.0, it is difficult to draw a clear distinction between business and technological aspects. The development of supporting technologies has a direct influence on the business operations of manufacturing companies. This can be observed by looking at the cycle of activity in which cyber-physical systems play a major role, making it possible for those systems to communicate and process vast amounts of data. The end result of this cycle is a concrete step into the physical world (such as the creation of an end product)..',
    challengeTitle: 'Transition to Industry 4.0',
    challengeDescription:
      'Abnox AG is a Swiss company which manufactures specialized devices for dispensing lubricants used in several types of industry. These products are often made in small batches or in multiple versions. The specific nature of production focused on diversity causes numerous problems, such as frequent changes in the production documentation. As a result, mistakes are hard to avoid and there is a risk that employees will miss some components or steps in the process. Abnox’s specific style of production makes the processes more complicated. Issues arise at the stage of setting up workstations, designing tools and collecting and verifying the data needed at each manufacturing stage. Owing to the integration of IoT solutions with the ERP system',
    solutionTitle: 'Industrial connected displays',
    solutionDescription:
      'The solution was based on dedicated industrial displays which were connected to the LAN network already existing in the plant. The displays present assembly instructions for, employees, to ensure that no steps of the process are missed. The digitization of manufacturing made possible by IoT and ERP reduced the problem of delegating tasks at workstations, made the production processes more efficient, and brought better communication between the machines, systems and employees.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC5.id)
  await IndustrialManufacturing.addCasestudy(iotC5.id)

  const iotC6 = await CaseStudy.create({
    title: 'Boston Children’s Hospital and smarter healthcare',
    subTitle:
      'Healthcare is one of the richest areas of opportunity for the Internet of Things. ',
    banner:
      'https://peerbits-wpengine.netdna-ssl.com/wp-content/uploads/2018/07/benefits-of-iot-health-applications-of-iot.jpg',
    descriptiveText:
      'Shwetak Patel, a MacArthur Fellow and a Professor of Computer Science and Engineering at the University Washington who specializes in developing Internet of Things technologies says, “the next wave of the Internet of Things is going to have a huge impact in healthcare. For example, health sensing in the home is critical for managing chronic diseases.” One of the diseases Patel is targeting with the Internet of Things is chronic obstructive pulmonary disease, or COPD.',
    challengeTitle: 'Give access to everybody',
    challengeDescription:
      'The disease is diagnosed and treated using devices called spirometers, which measure air flow in and out of the lungs. Spirometers cost thousands of dollars, are only available in hospitals and occasionally at doctor’s offices, and many COPD sufferers do not have easy access to them. To solve this problem, Patel created an Internet of Things-based alternative to spirometers, using the most abundant networked sensors in the world: the microphones in telephones.',
    solutionTitle: 'Lung health measured by an algorithm ',
    solutionDescription:
      'Today there are nearly nine billion phones, most of them cell phones. Patel’s team developed an algorithm that measures lung health by analyzing the sound of someone blowing on a phone’s microphone. This replicates a spirometer without the expense and hospital visit. All a COPD sufferer has to do is call a toll-free number and blow on their phone. Networked computers take care of the rest by performing complex calculations, then delivering the results a few seconds later via a voice or text message. The early versions of the algorithm only worked on expensive smart phones, but Patel and his team refined it over time until it could work on any phone. Diagnosing and treating COPD provides a glimpse of how the Internet of Things will improve healthcare in the future.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC6.id)
  await Healthcare.addCasestudy(iotC6.id)

  const iotC7 = await CaseStudy.create({
    title: 'Internet of Medical Things',
    subTitle:
      'Ensure that the right people are assigned to the right places to efficiently deliver quality care while improving staff morale and patient satisfaction.',
    banner: 'https://img.lovepik.com/photo/50056/0961.jpg_wh860.jpg',
    descriptiveText:
      'IoT in health care can dramatically optimize workflow and staffing. Even a basic IoT solution can collect and bring together such data as staff location and expertise, patient acuity and location, and availability and location of critical diagnostic and therapeutic equipment. Once modeled, this data can help staffing managers improve workflows and make better staffing and scheduling decisions.',
    challengeTitle: 'Customized therapies and interaztions',
    challengeDescription:
      'Patients today expect more personalized interactions as well as customized therapies that are effective and cost-efficient. Health care systems can be overwhelmed by the flood of rich new data sources, including social media, wearables and medical devices (known as the Internet of Medical Things, or IoMT). The digitization of the health care industry – from patients to clinical infrastructure – provides unprecedented opportunities to transform delivery and meet the challenges of cost, quality and access.',
    solutionTitle: 'IoT Analytics',
    solutionDescription:
      "Manage and analyze your IoMT data where, when and how it works best for your patient. Deliver the best patient experience – in real-time. Understand which data is relevant and private, so you'll know what to store and what to protect. SAS delivers trusted, automated IoT analytics solutions that can help you: - Maximize value from IoMT data. Identify and leverage data sources that provide tangible insights into enhancing patient care, streamlining processes and delivering cost optimization strategies. - Drive innovation in patient care and operations. Develop new business models and opportunities for data sharing and monetization with a more dynamic, open and agile platform. - Embed IoMT analytics within decision support systems. Reduce alarm fatigue, improve patient safety, optimize staff and patient flow, and accelerate the adoption of value-based health care and personalized medicine.",
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC7.id)
  await Healthcare.addCasestudy(iotC7.id)

  const iotC8 = await CaseStudy.create({
    title: 'Innovation to the streets of Jamshedpur',
    subTitle:
      'Optimise infrastructure services in Jamshedpur. Specific areas that involved safety and additional manual effort due to scale, took priority',
    banner:
      'https://hub.beesmart.city/hubfs/04-insights/07-blog-posts-solutions/toplist-smart-lighting-solutions/top-smart-lighting-solutions-for-smart-cities.jpeg',
    descriptiveText:
      'With more than 16000 street lights installed across the city, the monitoring and maintenance of these street lights were both tedious and repetitive. Jamshedpur’s civil twilight starts at 6:30 PM and enters through the night at 8:00 PM to end at 5:30 AM.',
    challengeTitle: 'Energy conservation',
    challengeDescription:
      'This meant that JUSCO need not operate the street lights at 100 percent efficiency all throughout the scheduled operating time. It wanted to implement a smart lighting solution that could drive energy conservation, monitor, and automate fault detection to ensure uninterrupted civil services, all from the central JUSCO command centre. What JUSCO was looking for in a solution is deeper than it’s functional benefits; they were exploring the market for partners in disruptive transformation through innovation and technology, with an acute understanding of the needs of a smart city. ',
    solutionTitle: 'Smart lighting IoT solution',
    solutionDescription:
      'Enabled by the underlying Low Power Wide Area Network (LPWAN) based on Semtech’s LoRa® devices and wireless radio frequency technology (LoRa Technology) that is developed to support multiple smart city use cases at scale, Tata Communications and its device partners deployed smart sensors on the street lights of Jamshedpur. The solution tracked and optimised energy consumption with the automated switching of street lights, along with the capability to control light intensity based on the external lighting conditions. JUSCO realised the power of IoT byc transferring complete control of smart lights to its command centre. It also enjoys the assurance of enterprise-grade SLAs from Tata Communications. The command centre could centrally operate, monitor and optimise all of its smart lights through a web-based application. This integrated view allowed JUSCO to significantly improve their response time and minimise disruption in service and safety. The command centre could accurately identify the smart lights that must be promptly serviced, delivering a better quality of life to the residents of Jamshedpur. All of this is achieved at lower cost and effort.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC8.id)
  await SmartLighting.addCasestudy(iotC8.id)
  await SmartCities.addCasestudy(iotC8.id)

  const iotC9 = await CaseStudy.create({
    title: 'Building health monitoring',
    subTitle:
      'The Customer received an easy-to-use IoT solution to monitor the state of a construction in real time. The tool automatically notifies the operator about a sensor failure or a construction defect and can be integrated with external systems',
    banner: '',
    descriptiveText:
      'The Customer is a large company that provides construction sites with complex automation and security systems. The company offers design solutions and performs supply, installation and commissioning for various types of construction projects.',
    challengeTitle: 'Continuous and efficient technical control',
    challengeDescription:
      'In order to provide a continuous and efficient technical control and thus increased security of constructions and complex engineering objects, the Customer decided to develop a smart construction monitoring system for collecting and processing data through sensors installed on the key elements of a building. The solution was designed to automate regular data collection and processing.',
    solutionTitle: 'Procesing and calculations on sensor data',
    solutionDescription:
      "HexTech development team designed and developed a smart solution to collect sensor data and aggregate it on a central server for processing and further calculations of a building’s state. Data processing and averaging make it possible to boost system performance and reduce data volumes. The user-friendly interface presents the data from connected through intuitive color coding – the green, yellow and red lights indicate the state of a building. Additionally, the system allows a flexible configuration of threshold values to regulate the transition from one status to another. To aggregate the data – suppose, for calculating a construction deformation, ScienceSoft developed a system of virtual sensors collecting information from several physical sensors. It allows users to monitor specific parameters which can be used only in the aggregate.",
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC9.id)
  await SmartCities.addCasestudy(iotC9.id)
  
  const iotC10 = await CaseStudy.create({
    title: 'Remote patient monitoring software',
    subTitle:
      'The development team optimized the measurement API server and decreased the load on the system by introducing the following features: aggregation of requests, grouping of data, NGINX server settings, optimization of queries and MySQL. The solution for remote software deployment to SNA devices enabled the distribution order of install, delete and update commands as per specifics of Android OS by building a queue of commands and sending them to the devices.',
    banner: '',
    descriptiveText:
      'The Customer is a US-based provider of healthcare solutions with development centers in Israel and Belarus.',
    challengeTitle: 'Remote patient monitoring solution',
    challengeDescription:
      'The Customer wanted to deliver a sophisticated remote patient monitoring solution for clinics of North America. The solution should help to improve medical staff performance, avoid routine visits, and increase the quality of care. For that reason, the Customer needed a team of savvy professionals in R&D and healthcare IT.',
    solutionTitle: 'App and Web Dashboard',
    solutionDescription:
      "The developers reviewed and analyzed available approaches and frameworks and picked WebRTC technology as the best one for platform-independent voice and video communication. Several Android-powered hardware devices were selected to implement central communication module or Sensor Network Appliances (SNAs). The development process was split into 2 major parts: the development of apps for Android and iOS devices and Web dashboard implementation. \n 1) ScienceSoft’s team delivered apps for both patients and medical staff. Gradle flavors were used to build the apps’ variations fully compatible with different screen sizes: wide screen (for doctors), tablet (for nurses) and smartphone (for healthcare services consumers). Patients could smoothly access numerous sensors in order to monitor data and synchronize it with the server. Medical staff members could diagnose and treat patient remotely and receive automated alerts and notifications, when, for example patient state suddenly changes. \n 2) A Web Dashboard assisted medical professionals in monitoring the overall status of patients drilling down on personal medical data. It sent alerts on poor health indicators and maintains the doctor-patient connection. The central communication module was built upon a TV-connected Android-powered device. ",
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC10.id)
  await Healthcare.addCasestudy(iotC10.id)
  
  const iotC11 = await CaseStudy.create({
    title: 'Image analysis software for automated optical inspections',
    subTitle:
      'HexTech’s team has successfully developed image analysis software for automated optical inspection of printed circuit assemblies. The application offers considerable opportunities for the SMT manufacturing industry, providing a fast and reliable solution for PCA quality control.',
    banner:
      '',
    descriptiveText:
      'ScienceSoft has developed an application for the electronics industry aimed at ensuring the quality of printed circuit assemblies (PCAs) by means of machine vision.',
    challengeTitle: 'Faster and more efficient inspection',
    challengeDescription:
      'The application was to perform fast and efficient quality inspection of printed circuit assemblies right on the conveyor belt and detect if any of the PCA components were missing.',
    solutionTitle: 'Industrial connected displays',
    solutionDescription:
      'A team of a project manager, a business analyst, 3 senior С++ developers, a senior UI designer, and a software testing engineer have delivered a desktop application based on image analysis algorithms, complemented with a simple and intuitive GUI. In particular, ORB algorithm has been used for feature detection, and a combination of algorithms (perceptual hash algorithm, PSNR and histograms comparing) have been employed to compare regions of interest in the reference template and in the image under inspection. The user provides a reference board template, putting on all the elements to be inspected with a tool that allows marking objects of three main shapes: \n-Elements with a round cross-section (mainly capacitors) \n-Rectangular elements (chips, diodes, transistors) \n-Dumbbell-shaped elements (resistors) \n After preparing the reference template with all the elements located, the user can proceed to the analysis of printed circuit assemblies of the same type as the reference PCA. Comparing these images with the reference assembly, the application defines defected ones and shows the locations of missing components in detail.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC11.id)
  await IndustrialManufacturing.addCasestudy(iotC11.id)

  const iotC12 = await CaseStudy.create({
    title: 'Control Unit for Automotive Tier-I Supplier',
    subTitle:
      'We were able to successfully deliver a robust telematics solution within the desired timeframe.he customer was able to deliver the proof of concept (PoC) within 6 months. This helped them initiate demos with the OEMs and Suppliers earlier than expected.',
    banner:
      '',
    descriptiveText:
      'Our customer is a leading Tier-I Supplier of Infotainment Systems, Head-up Display (HUD) Solutions, Digital Instrument Clusters and Battery Management Systems (BMS) for Electric Vehicles.',
    challengeTitle: 'Integrate Hextech features in their Digital Instrument Cluster product.',
    challengeDescription:
      'Business Challenge:\n-The customer desired to integrate Telematics features in their Digital Instrument Cluster product.\n-This Instrument Cluster solution has been designed for passenger vehicles (four-wheelers, two-wheelers, auto rickshaws and electric vehicles).\n-In order to launch this product along with the integrated Telematics Features, the support of Subject Matter Experts (SME) was required in areas of Cloud, Firmware, Device Drivers, and end-to end IoT Technology Stack.\n-The customer decided that their in-house teams should focus on the core product development activities and the telematics feature integration activity should be outsourced.\n-This made the role of the Product Engineering Services partner very critical.',
    solutionTitle: ' IoT Sensor Network design and Cloud Interface development',
    solutionDescription:
      'Our more than a decade long expertise in the Automotive domain along with proven production grade Cloud-Telematics reference designs encouraged the customer to partner with us for this project. We leveraged our expertise in IoT Sensor Network design and Cloud Interface development, in order to enable the collection of data like speed, GPS location and more. This was facilitated with the help of MQTT protocol based communication interface. Our expertise in the automotive domain ensured that we achieve compliance with all the necessary standards while selecting components for hardware design. Additionally, we have leveraged our expertise in firmware, SPI, I2C and CAN protocols.',
    teamsTitle: 'IoT Department',
    personName: '',
    personJob: '',
    serviceTitle: '',
    serviceHeading: '',
  })
  await IoT.addCasestudy(iotC12.id)
  await Automotive.addCasestudy(iotC12.id)

  //**END OF IOT CASE STUDIES */

  //** ------------------------------------------------------------ TEAM MEMBER --------------------------------------------------------------- */

  //**SECURITY TEAM MEMBER */
  const person1 = await TeamMember.create({
    memberNameAndOccupation: 'Alex Yasol - Lead security',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      ' Jane Goodall had long been an idol of mine before I had the opportunity to meet her personally. I have been a member of one of her international Jane-Goodall-Institutes (JGI) for a couple of years now. I have read some of her books and like her idea of teaching children all over the world about environmental conservation and wild animal care so much that I hope to do it personally one day, too. As the greatest and most popular scientist of chimpanzees in the world and today also an active member of the UN Security Council and close friend of Kofi Anan, she is very busy and always travelling, so the chance to see her is quite rare. ',
    workField: 'Security',
    teamsTitle: 'IoT Department',
    personName: 'Alex Yasol',
    personJob: '',
    personPhoto:
      'https://image.freepik.com/free-photo/funny-man-looking-camera_23-2147799042.jpg',
    teamImage: '',
    areaID: '1',
    serviceID: '1',
  })

  const person2 = await TeamMember.create({
    memberNameAndOccupation: 'Luke Cobezzo - Lead security',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Mary is as beautiful as a Hollywood star. Her thick, wavy, long black hair gracefully falls down to her shoulders and encircles her diamond-shaped face. A golden suntan usually brings out her smooth, clear complexion and high cheek bones. Her slightly arched chestnut brown eyebrows highlight her emotions by moving up and down as she reacts to her world around her. Her large deep blue eyes, remind me of a lake on a stormy day. Her curved nose gives her a little girl look that makes me want to smile when she talks. And her mouth is a small mouth outlined by puffy lips that she often accentuates with glossy pink lipstick. When she smiles, which is often, her well formed and even, white teeth brighten up her whole face. I guess you can tell that I am head over heals in love with Mary.',

    workField: 'Security',
    teamsTitle: 'Security Departement',
    personName: 'Luke Cobezzo',
    personJob: '',
    personPhoto:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg',
    teamImage: '',
    areaID: '1',
    serviceID: '1',
  })

  const person3 = await TeamMember.create({
    memberNameAndOccupation: 'Rori Duboff - Security Engineer',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Mary is as beautiful as a Hollywood star. Her thick, wavy, long black hair gracefully falls down to her shoulders and encircles her diamond-shaped face. A golden suntan usually brings out her smooth, clear complexion and high cheek bones. Her slightly arched chestnut brown eyebrows highlight her emotions by moving up and down as she reacts to her world around her. Her large deep blue eyes, remind me of a lake on a stormy day. Her curved nose gives her a little girl look that makes me want to smile when she talks. And her mouth is a small mouth outlined by puffy lips that she often accentuates with glossy pink lipstick. When she smiles, which is often, her well formed and even, white teeth brighten up her whole face. I guess you can tell that I am head over heals in love with Mary.',

    workField: 'Security',
    teamsTitle: 'Security Departement',
    personName: 'Rori Duboff',
    personJob: '',
    personPhoto:
      'https://healthix.org/wp-content/uploads/2019/05/Todd-Rogow-High-Resolution-717x1024.jpg',
    teamImage: '',
    areaID: '1',
    serviceID: '1',
  })

  const person4 = await TeamMember.create({
    memberNameAndOccupation: 'John Molton - Security Engineer',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Mary is as beautiful as a Hollywood star. Her thick, wavy, long black hair gracefully falls down to her shoulders and encircles her diamond-shaped face. A golden suntan usually brings out her smooth, clear complexion and high cheek bones. Her slightly arched chestnut brown eyebrows highlight her emotions by moving up and down as she reacts to her world around her. Her large deep blue eyes, remind me of a lake on a stormy day. Her curved nose gives her a little girl look that makes me want to smile when she talks. And her mouth is a small mouth outlined by puffy lips that she often accentuates with glossy pink lipstick. When she smiles, which is often, her well formed and even, white teeth brighten up her whole face. I guess you can tell that I am head over heals in love with Mary.',

    workField: 'Security',
    teamsTitle: 'Security Departement',
    personName: 'John Molton',
    personJob: '',
    personPhoto:
      'https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg',
    teamImage: '',
    areaID: '1',
    serviceID: '1',
  })

  Security.addTeammember(person1)
  Security.addTeammember(person2)
  Security.addTeammember(person3)
  Security.addTeammember(person4)
  /** END OF SECURITY TEAM MEMBER */

  //**IOT TEAM MEMBER */
  const iotP1 = await TeamMember.create({
    memberNameAndOccupation: 'Olivier Haren - Chair of the IoT Board',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Olivier joined us as an RF engineer in 1997. Since 2016, Olivier is the R&D manager for the IoT Business Unit. Previously Olivier spent 11 years as the manager of the Electronic and Software Department of the Legrand Group’s Radio Frequency & Voice, Data and Image Competencies Center and 10 years in the wired and RF telecommunication field in various R&D positions as electronic designer or project leader. \n Olivier holds a master’s degree in electronic embedded systems from the Institut National Polytechnique de Grenoble, France.',
    workField: 'Internet of things',
    teamsTitle: 'IoT Department',
    personName: 'Olivier Haren',
    personJob: 'Chair of the IoT Board',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-welldressed-mature-businessman-picture-id1141508234?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP1)
  iotC1.addTeammember(iotP1)
  iotC7.addTeammember(iotP1)

  const iotP2 = await TeamMember.create({
    memberNameAndOccupation: 'Jean Orsaten | Chief of Smart Cities department ',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'He has over 30 years of experience in the home automation industry, within industry alliances and EU regulatory bodies. He is Director of the Smart Cities Department at ??COMPANY NAME??, overseeing technology partnerships, connectivity and wireless networking technologies and overall system architectures. With a strong focus on Interoperability, he has been deeply involved in the development of protocols with other leading home equipment manufacturers. The department he is heading deals with wireless protocols developments, focusing io-homecontrol, Thread, Zigbee and other open standard solutions for the Somfy Group.',
    workField: 'Internet of things',
    teamsTitle: 'IoT Department',
    personName: 'Jean Orsaten',
    personJob: 'Chief of Smart Cities department',
    personPhoto:
      'https://media.gettyimages.com/photos/closeup-smiling-male-leader-wearing-eyeglasses-picture-id1179627340?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP2)
  iotC2.addTeammember(iotP2)
  iotC3.addTeammember(iotP2)

  const iotP3 = await TeamMember.create({
    memberNameAndOccupation: 'Kristen DiCerba',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Kristen DiCerbo, Ph.D. is the head of Smart Retail department. In this role, she is responsible for driving and communicating our marketingstrategy for Khan HexTech’s services, content, and product to improve clients, partners engagement and outcomes. She ensures pedagogical coherence of our overall offering and ensures a research-informed design across product, content, and solutions.',
    workField: 'Internet of things',
    teamsTitle: 'IoT Smart Retail Department',
    personName: 'Kristen DiCerba',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/mature-female-ceo-with-arms-crossed-picture-id1179627362?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP3)
  iotC3.addTeammember(iotP3)
  iotC4.addTeammember(iotP3)
  iotC5.addTeammember(iotP3)

  const iotP4 = await TeamMember.create({
    memberNameAndOccupation: 'Michael Johnson',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Michael Johnson is the employer of the year at HexTech. He brings his teoretichal and operational experience to lead a cross-functional team of Business & Product Analytics. He looks across the organization to bring strategic insights and help drive critical business decision to help accelerate developing outcomes while ensuring compliance.',
    workField: 'Chief',
    teamsTitle: 'IoT Automotive Departement',
    personName: 'Michael Johnson',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/bearded-businessman-against-gray-background-picture-id1179627332?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP4)
  iotC6.addTeammember(iotP4)
  iotC7.addTeammember(iotP1)

  const iotP5 = await TeamMember.create({
    memberNameAndOccupation: 'Peter Glynn',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Peter has a degree in Computer Engineering from Dublin’s Trinity College and has 18 years’ experience in the TMT industry. Peter has helped large scale enterprises deliver on sales and market making activities across a number of large scale system integration, application services and outsourcing projects that had significant transformational business cases. Peter also has extensive experience with software and platform clients; managing and growing them from the ground up resulting in them becoming major accounts.',
    workField: 'Internet of things',
    teamsTitle: 'Industrial Manufacturing Departement',
    personName: 'Peter Glynn',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-senior-businessman-smiling-picture-id985138660?s=2048x2048',
    teamImage: '',
  })
  
  IoT.addTeammember(iotP5)
  iotC8.addTeammember(iotP5)
  iotC12.addTeammember(iotP5)

  const iotP6= await TeamMember.create({
    memberNameAndOccupation: 'Donald Leen',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      ' Donal has over 8 years of experience in providing advisory and consulting services with a particular focus on large scale transformation programmes within the healtcare services industry. Prior to working in consulting, Donal was a finance manager for six magazines at Conde Nast Publications in New York, and held a number of finance and accounting positions at Aer Lingus in both New York and Dublin. Donal received his MBA (Finance) qualification from Fordham University, New York.',
    workField: 'Internet of things',
    teamsTitle: 'Healtcare Departement',
    personName: 'Donald Leen',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP6)
  iotC9.addTeammember(iotP6)
  iotC10.addTeammember(iotP6)

  const iotP7 = await TeamMember.create({
    memberNameAndOccupation: 'Adam Jentzsch',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Adam is a Full-Stack Developer experienced in building content management solutions, mobile applications, POS systems, and reporting engines. During his career, he has accumulated deep expertise developing in .NET, C#, and Angular. Prior to Fresh, Adam worked as both a freelance mobile app developer and as a full-stack developer at a multi-level marketing company. As a full-stack developer, he provided content management software solutions for large clients, as well as wrote their reporting engine.',
    workField: 'Internet of things',
    teamsTitle: 'Smart Cities Departement',
    personName: 'Adam Jentzsch',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/young-man-standing-confidently-picture-id973481352?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP7)
  iotC10.addTeammember(iotP7)


  const iotP8 = await TeamMember.create({
    memberNameAndOccupation: 'Michelle Tore',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      'Michelle is a Certified LabVIEW developer working as a Controls System Engineer at Fresh. Having recently completed her master’s degree in Mechanical Engineering at the University of Washington, Michelle focuses on control system theory and design. Her previous engineering experience includes a start-up developing a ventilation/monitoring system to detect and prevent manhole explosions.',
    workField: 'Internet of things',
    teamsTitle: 'Smart Lighting Departement',
    personName: 'Michelle Tore',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/businesswoman-with-blond-hair-on-white-background-picture-id1053401356?s=612x612',
    teamImage: '',
  })
  IoT.addTeammember(iotP8)
  iotC11.addTeammember(iotP8)

  /** END OF IOT TEAM MEMBER */

  //**BiG DATA ANALYTICS TEAM MEMBER */

  const bdaP1 = await TeamMember.create({
    memberNameAndOccupation:
      'Haru Nayaki - Chief Executive Officer of Analytics',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Haru Nayaki',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/m-happy-with-where-my-career-is-heading-picture-id1138617116?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP1)
  bdaC4.addTeammember(bdaP1)
  bdaC1.addTeammember(bdaP1)
  bdaC6.addTeammember(bdaP1)

  const bdaP2 = await TeamMember.create({
    memberNameAndOccupation: 'Juliè Harmon - Expert in Data Science',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Juliè Harmon',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/portrait-of-woman-smiling-on-white-background-picture-id1092658874?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP2)
  bdaC2.addTeammember(bdaP2)
  bdaC3.addTeammember(bdaP2)

  const bdaP3 = await TeamMember.create({
    memberNameAndOccupation: 'Raùl Sirte - Expert in business intelligence',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Raùl Sirte',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/nigel-farage-leader-of-the-uk-independence-party-leaves-the-northern-picture-id470057490?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP3)
  bdaC1.addTeammember(bdaP3)
  bdaC4.addTeammember(bdaP3)

  const bdaP4 = await TeamMember.create({
    memberNameAndOccupation: 'Francesca Rizzo - Manager of the department',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Francesca Rizzo',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/confident-mature-businesswoman-on-white-background-picture-id1132314350?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP4)
  bdaC6.addTeammember(bdaP4)
  bdaC3.addTeammember(bdaP4)

  const bdaP5 = await TeamMember.create({
    memberNameAndOccupation: 'Jeff Peterson - Chair of Big Data department',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Jeff Peterson',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/man-looking-at-camera-on-street-picture-id1197870409?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP5)
  bdaC3.addTeammember(bdaP5)

  const bdaP6 = await TeamMember.create({
    memberNameAndOccupation: 'Nina Morkov - Expert in Marketing',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Nina Morkov',
    personJob: '',
    personPhoto:
      'https://media.istockphoto.com/photos/young-longhaired-smiling-woman-in-white-shirt-picture-id965523228?k=6&m=965523228&s=612x612&w=0&h=qeVmQfjRq1QWxaLdxLdF_IaXahI-dqt9UYcunaHUqA4=',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP6)
  bdaC2.addTeammember(bdaP6)
  bdaC5.addTeammember(bdaP6)

  const bdaP7 = await TeamMember.create({
    memberNameAndOccupation: 'Isi ホイップポップ - Designer of the group',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Isi ホイップポップ',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/mature-female-ceo-with-arms-crossed-picture-id1179627362?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP7)
  bdaC2.addTeammember(bdaP7)
  bdaC4.addTeammember(bdaP7)

  const bdaP8 = await TeamMember.create({
    memberNameAndOccupation: 'Omar Zizou - Expert in Communication',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription: '',

    workField: 'Big Data Analytics',
    teamsTitle: 'Analytics Departement',
    personName: 'Omar Zizou',
    personJob: '',
    personPhoto:
      'https://media.gettyimages.com/photos/beautiful-italian-man-picture-id489171250?s=612x612',
    teamImage: '',
  })
  BigDataAnalysis.addTeammember(bdaP8)
  bdaC5.addTeammember(bdaP8)
  bdaC6.addTeammember(bdaP8)

  //** ------------------------------------------------------------ PARTNERS --------------------------------------------------------------- */

  //**INSERT PARTNERS */
  const CocaCola = await Partner.create({
    name: 'CocaCola',
    description: 'Taste the feeling',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
  const p1 = await Partner.create({
    name: 'P1',
    description: 'Test partner',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
  const p2 = await Partner.create({
    name: 'P2',
    description: 'Test partner',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
  const p3 = await Partner.create({
    name: 'P3',
    description: 'Test partner',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
  const p4 = await Partner.create({
    name: 'P4',
    description: 'Test partner',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
  const p5 = await Partner.create({
    name: 'P5',
    description: 'Test partner',
    image:
      'https://www.radiosenisecentrale.it/wp-content/uploads/2019/12/a8c15493781667d05e628e2f76d65b3a.jpg',
    website: 'https://www.coca-cola.com/',
  })
}

/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDBStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: true })
  // Call the function to insert some fake data
  await insertRealData()
  return db
}

export default initializeDatabase
