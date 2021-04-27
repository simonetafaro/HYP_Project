const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize('', {})
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
function defineDBStructure(){
  

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
      descriptiveText: DataTypes.STRING,
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
      caseStudyDescription: DataTypes.TEXT,
      caseStudyHeading: DataTypes.STRING,
      serviceDescription: DataTypes.TEXT,
      teamsTitle: DataTypes.STRING,
      personName: DataTypes.STRING,
      personJob: DataTypes.TEXT,
      personPhoto:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      caseStudyImage:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      teamImage:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    },
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
      description:DataTypes.TEXT,
      servicesTitle: DataTypes.STRING,
      servicesDescription:DataTypes.TEXT,
      //nome e descrizione dei servizi li prendiamo dalla tabella Area
      caseStudyTitle: DataTypes.STRING,
      caseStudyDescription:DataTypes.TEXT,
      
      teamTitle: DataTypes.STRING,
      teamDescription:DataTypes.TEXT,
      //nome e job dei team member li prendiamo dalla tabella dei teamMember
    },
    {
      timestamps: false,
    },
  )

  Area.hasMany(Service, { foreignKey: 'areaID' })
  Area.hasMany(CaseStudy, { foreignKey: 'areaID' })
  Area.hasMany(TeamMember, { foreignKey: 'areaID' })

  Service.hasMany(CaseStudy, { foreignKey: 'serviceID' })
  Service.hasMany(TeamMember, { foreignKey: 'serviceID' })
  // potrebbe non servire, abbiamo già areaID nel servizio e da questo ID possiamo recuperare le info sull'area
  // Service.hasOne(Area, { foreignKey: 'serviceID' })
  

  db._tables = {
    Area,
    Service,
    CaseStudy,
    TeamMember
  }

}

async function insertRealData() {
  const {Service, CaseStudy, Area, TeamMember} = db._tables

  //**INSERT AREAS */
  const Security = await Area.create({
    title: 'Security Area',
    subTitle: 'Wherever your business goes, whoever it works with, you need cybersecurity that covers it all.',
    description: 'Anytime. Anywhere. We create cybersecurity tailored to your specific business needs. We defend against cyberattacks with proactive, focused,  industry-relevant threat intelligence to give you the confidence that  comes from knowing your business is secure.',
    banner: "https://www.orion.on.ca/wp-content/uploads/2019/05/cybersecurity-banner.jpg"
  })
  const IoT = await Area.create({
    title: 'Internet Of Things',
    subTitle: 'Acting as the bridge between the physical and the digital world, IoT offers a huge opportunity for companies.',
    description: 'We help clients effectively capitalize on IoT technology and solutions, linking technology, vendors and customers through a holistic business model. IoT describes the connection of devices to the internet using embedded software and sensors to communicate, collect and exchange data with one another. IoT combines connectivity with sensors, devices and people, enabling a form of free-flowing conversation between man and machine, software and hardware. With IoT, the world is wide open, offering a virtually endless array of opportunities and connections at home, at work or at play.',
    banner: 'https://it.insight.com/content/dam/insight-web/it_IT/learn/articoli/azure-iot-banner.jpg'
  })
  const CloudComputing = await Area.create({
    title: 'CloudComputing Area',
    subTitle: 'CloudComputing area, non so cosa scrivere'
  })
  const CustomerExperience = await Area.create({
    title: 'CustomerExperience Area',
    subTitle: 'CustomerExperience area, non so cosa scrivere'
  })
  const BigDataAnalysis = await Area.create({
    title: 'BigDataAnalysis Area',
    subTitle: 'BigDataAnalysis area, non so cosa scrivere'
  })
  //**END OF AREAS */

  //**SECURITY SERVICES */
  const ModernFraudProtection = await Service.create({
    title: 'Modern fraud protection software',
    subTitle: 'offers a variety of services from information security consulting to assessing, testing and improving the protection of applications and networks for companies operating in healthcare, manufacturing, banking, retail, telecommunications, and other industries.',
    banner: 'https://www.comarch.com/files-com/file_545/c1.png'
  })
  const ManagedSecurity = await Service.create({
    title: 'Managed security',
    subTitle: 'Helping clients rapidly scale security and compliance operations through innovative technology, as-a-Service capabilities and cybersecurity  services.'
  })
  //**END OF SECURITY SERVICES */

  //**IOT SERVICES */
  const SmartCities = await Service.create({
    title: 'Smart Cities',
    subTitle: 'A smart city system gathers and analyzes data from sensors and smart devices to enable efficient management of urban processes (e.g., transportation, lighting). With 9-year experience in IoT, ??CompanyName?? designs and implements end-to-end IoT solutions to bring smart city vision to reality.',
    description: 'Municipalities of all sizes around the world are adopting smart city concepts based on Internet of Things (IoT) systems to optimize the efficient management of community assets, resources, operations and services. Smart cities foster service-oriented, sustainable local governance equipped to improve transportation systems, build energy-efficient infrastructure, decrease environmental pressures, maintain effective disaster response, and provide state-of-the-art security in public spaces. We work to serve each community with the appropriate smart city services and solutions according to its individual needs and unique vision.',
    banner: 'https://kritikalsolutions.com/wp-content/uploads/2019/10/smart-cities-banner.jpg'
  })
  const SmartLighting = await Service.create({
    title: 'Smart-lighting',
    subTitle: 'Flexible and scalable smart IoT lighting solution for cities as well as municipal and enterprise buildings. It can be easily integrated with existing infrastructure or extended by 3rd party systems and it always remains a platform for further extensions.',
    description: 'Illumination systems are an essential part of urban infrastructure. They contribute to the sense of security in public areas and highlight the architectural beauty of cities around the world. Today we can go one step further by embracing a combination of modern IoT solutions and illumination systems. This combination creates smart city technology and  is used as innovative smart street lighting system.',
    banner: 'https://statetechmagazine.com/sites/statetechmagazine.com/files/styles/cdw_hero/public/articles/StateTech/201710/ST_Smart_Street_Lights_GettyImages-173553089.jpg?itok=rktclHwy'
  })
  const Automotive = await Service.create({
    title: 'Automotive',
    subTitle: '??COMPANY NAME?? IoT Connected Vehicle Insights is connected car software that integrates real-time data about drivers, vehicles and the environment to optimize the in-car experience. The dedicated cloud service streams data from vehicle sensors and uses analytics and AI to understand driver behavior. It links with other information systems in the cloud, such as weather and traffic, to add context and situational awareness.',
    description: 'Cars have become one of the fastest-growing mobile device category, with every vehicle turning into a node in a much larger network and ecosystems. The ongoing (re)evolution in terms of connectivity, electric, autonomous and mobility trends is full of great opportunities to achieve new revenue streams and improve quality of life in the near future. Yet, as with all new opportunities, challenges, disruptions and risks arise.',
    banner: 'https://www.consorziosicurezza.com/wp-content/uploads/2018/10/smart-car-resized.jpg'
  })
  const SmartRetail = await Service.create({
    title: 'Smart Retail',
    subTitle: 'Adaptive retail is the new imperative for retailers. With global disruption, external pressures and responsibilities, retailers need to be able to adapt. Adapting means evolving, and evolution is how to stay resilient.',
    description: 'The increasing number of connected devices will lead to the emergence of a so-called connected ecosystem as a new paradigm of the interaction among manufacturers, sellers, and consumers, offering totally new opportunities and challenges to all the parties involved.',
    banner: 'https://www.zerynth.com/wp-content/uploads/2020/02/smart-retail.jpg'
  })
  //**END OF IOT SERVICES */


  const cs1 = await CaseStudy.create({
    title: 'cs1 title',
    subTitle: 'cs1 subtitle',
    banner: 'https://www.creativemotions.it/wp-content/uploads/2020/06/Il-segreto-per-scrivere-un-case-study-che-converte.png'
  })
  const iotC2 = await CaseStudy.create({
    title: '7-Eleven - Reliable and user-friendly IT system',
    subTitle: 'A highly sophisticated IT/store solution that supports the global business model and store management activities of 7-Eleven.',
    banner: 'https://www.viewsonic.com/library/wp-content/uploads/2019/08/LB0040-hero-compressed.png'
  })
  const cs3 = await CaseStudy.create({
    title: 'cs3 title',
    subTitle: 'cs3 subtitle',
    banner: 'https://www.creativemotions.it/wp-content/uploads/2020/06/Il-segreto-per-scrivere-un-case-study-che-converte.png'
  })
  const iotC1 = await CaseStudy.create({
    title: 'Retail Sensor Platform',
    subTitle: 'Businesses can leverage the real-time data coming from IoT sensors to know when a product is about to go out-of-stock, or what their customers have bought that day.',
    banner: 'https://www.intel.com/content/dam/www/public/us/en/images/iot/16x9/rss-rfid-power-of-data-16x9.jpg.rendition.intel.web.576.324.jpg'
  })
  

  await Security.addService(ModernFraudProtection.id)
  await Security.addService(ManagedSecurity.id)
  await IoT.addService(SmartCities.id)
  await IoT.addService(SmartLighting.id)
  await IoT.addService(Automotive.id)
  await IoT.addService(SmartRetail.id)
  
  await Security.addCasestudy(cs1.id)
  await Security.addCasestudy(cs3.id)
  
  await IoT.addCasestudy(iotC2.id)
  await IoT.addCasestudy(iotC1.id)

  await ManagedSecurity.addCasestudy(cs1.id)
  await ManagedSecurity.addCasestudy(cs3.id)
  await SmartRetail.addCasestudy(iotC2.id)
  await SmartRetail.addCasestudy(iotC1.id)
  

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
