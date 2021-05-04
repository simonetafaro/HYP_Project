const { Sequelize, DataTypes } = require('sequelize')

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

  const ServiceCaseStudy = db.define('servicecasestudy')

  const PersonCaseStudy = db.define('personcasestudy')

  Area.hasMany(Service, { foreignKey: 'areaID' })
  Area.hasMany(CaseStudy, { foreignKey: 'areaID' })
  Area.hasMany(TeamMember, { foreignKey: 'areaID' })

  Service.belongsToMany(CaseStudy, { through: ServiceCaseStudy })
  Service.hasMany(TeamMember, { foreignKey: 'serviceID' })

  CaseStudy.belongsToMany(Service, { through: ServiceCaseStudy })
  CaseStudy.belongsToMany(TeamMember, { through: PersonCaseStudy })

  TeamMember.belongsToMany(CaseStudy, { through: PersonCaseStudy })

  db._tables = {
    Area,
    Service,
    CaseStudy,
    TeamMember,
    ServiceCaseStudy,
    PersonCaseStudy,
  }
}

async function insertRealData() {
  const { Service, CaseStudy, Area, TeamMember } = db._tables

  //** ------------------------------------------------------------ AREAS --------------------------------------------------------------- */

  //**INSERT AREAS */
  const Security = await Area.create({
    title: 'Security Area',
    subTitle:
      'Wherever your business goes, whoever it works with, you need cybersecurity that covers it all.',
    description:
      'Anytime. Anywhere. We create cybersecurity tailored to your specific business needs. We defend against cyberattacks with proactive, focused,  industry-relevant threat intelligence to give you the confidence that  comes from knowing your business is secure.',
    banner:
      'https://www.orion.on.ca/wp-content/uploads/2019/05/cybersecurity-banner.jpg',
    evocativeImage: '',
    servicesTitle: 'Discover our services ',
    servicesDescription: '',
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
    banner:
      'https://it.insight.com/content/dam/insight-web/it_IT/learn/articoli/azure-iot-banner.jpg',
    evocativeImage: '',
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
    banner: '',
    evocativeImage: '',
    servicesTitle: 'Discover our Cloud Computing services ',
    servicesDescription:
      "As a result of the on-going digital revolution, the Cloud and business environment have become inseparable. Providing a foundation strong enough to support millions of operations at the same time, cloud computing has played a major role in the development of today's information-driven enterprises. Join them to: - Accelerate your company's digital transformation - Reduce workload and operational costs - Improve the performance of your systems and applications",
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  const CustomerExperience = await Area.create({
    title: 'CustomerExperience Area',
    subTitle: 'CustomerExperience area, non so cosa scrivere',
    description: '',
    banner: '',
    evocativeImage: '',
    servicesTitle: 'Discover our services ',
    servicesDescription: '',
    caseStudyTitle: 'Read about our case studies',
    caseStudyDescription: 'TODO',
    teamTitle: 'Meet our team',
    teamDescription: 'TODO',
  })
  const BigDataAnalysis = await Area.create({
    title: 'BigDataAnalysis Area',
    subTitle: 'BigDataAnalysis area, non so cosa scrivere',
    description:
      'The science of analyzing raw data in order to make conclusions about that information, revealing reveal trends and metrics. Through our specialist your company will be more efficient in taking decisions. This process of analysis allows to operate a predictive analysis, that is, it allows to know in advance what will happen: this becomes possible because if we have a model and we have enough historical data we can determine what will happen in the near future with bases or statistical foundations.',
    banner: '',
    evocativeImage: '',
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
  })
  await Security.addService(ModernFraudProtection.id)

  const ManagedSecurity = await Service.create({
    title: 'Managed security',
    subTitle:
      'Helping clients rapidly scale security and compliance operations through innovative technology, as-a-Service capabilities and cybersecurity  services.',
  })
  await Security.addService(ManagedSecurity.id)
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
  await IoT.addService(Healthcare.id)

  const IndustrialManufacturing = await Service.create({
    title: 'IndustrialManufacturing',
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
    p1Name: '',
    p1Logo: '',
    p2Name: '',
    p2Logo: '',
    p3Name: '',
    p3Logo: '',
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
  const ServiceName1 = await Service.create({
    title: 'CUSTOMER EXPERIENCE service name',
    subTitle: '',
    description: '',
    banner: '',
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
  await CustomerExperience.addService(ServiceName1.id)
  //**END OF CUSTOMER EXPERIENCE  SERVICES */

  //** ------------------------------------------------------------ CASE STUDIES --------------------------------------------------------------- */

  //**SECURITY CASE STUDIES */
  const cs3 = await CaseStudy.create({
    title: 'cs3 title',
    subTitle: 'cs3 subtitle',
    teamsTitle: 'Team a caso',
    banner:
      'https://www.creativemotions.it/wp-content/uploads/2020/06/Il-segreto-per-scrivere-un-case-study-che-converte.png',
  })
  await Security.addCasestudy(cs3.id)
  await ManagedSecurity.addCasestudy(cs3.id)

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
  const casestudy1 = await CaseStudy.create({
    title: 'BIG DATA ANALYSIS case study',
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
  await BigDataAnalysis.addCasestudy(casestudy1.id)
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
  const casestudy3 = await CaseStudy.create({
    title: 'CUSTOMER EXPERIENCE CASE STUDIES',
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
  await CustomerExperience.addCasestudy(casestudy3.id)
  //**END OF CUSTOMER EXPERIENCE CASE STUDIES */

  //**IOT CASE STUDIES */
  const iotC1 = await CaseStudy.create({
    title: 'Retail Sensor Platform',
    subTitle:
      'Businesses can leverage the real-time data coming from IoT sensors to know when a product is about to go out-of-stock, or what their customers have bought that day.',
    banner:
      'https://www.intel.com/content/dam/www/public/us/en/images/iot/16x9/rss-rfid-power-of-data-16x9.jpg.rendition.intel.web.576.324.jpg',
    descriptiveText: 'RFID tags are placed on all the items in the store. Data readings are forwarded to Intel gateways, and then pushed back to back office systems for cloud-based analytics. RFID antennas are always on, gathering and disseminating the Stock Keeping Unit (SKU)-level data on a constant basis. Since the system is continuously scanning for products, it is able to locate and account for every item on the sales floor at any one time. The system provides alerts to allow stock to be replenished when running low. Intel has designed its reader to be simple to set up and calibrate. Once the plug-and-play device is connected to an Intel gateway via one wire, it begins collecting and forwarding the inventory information.',
    challengeTitle: 'Reduce lossess for retailers world-wide',
    challengeDescription: 'According to McKinsey & Co, inventory distortion - in the form of overstock, stock-out and shrinkage - represents just over $1 trillion worth of losses for retailers world-wide. Furthermore, McKinsey estimates that the potential impact of IoT on retail will range from $410 billion to over $1 trillion per year by 2025.',
    solutionTitle: 'Improved understanding of customer behaviour',
    solutionDescription: 'The system records not only when the item has been sold, but also what items have been touched and tried on. In addition, as well as being fully informed about their stocks, store staff gain a better understanding of customer traffic and local demand. The retailer is able to identify premium traffic areas, learn how customers interact with specific items, and learn which products are abandoned and which are preferred. McKinsey estimates that optimising store layouts can increase productivity by 5 percent',
    teamsTitle: 'IoT Department',
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
    subTitle: 'Capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    banner: 'https://simplecore.intel.com/insight-tech/wp-content/uploads/sites/45/2020/05/retail-data-computer-vision-0.jpg',
    descriptiveText: 'With an IoT smart retail package, building operators can map scenarios such as space or comfort monitoring in their entirety or in a modular way. Retail building operators can now seamlessly capture data, improve customer service quality, and reduce costs by using space and resources more effectively.',
    challengeTitle: 'Reduce energy consumption',
    challengeDescription: 'The owner of a large fast-food chain, needed to significantly reduce energy consumption in all stores.',
    solutionTitle: 'IoT smart retail package',
    solutionDescription: 'Energy sensors were installed on A/Cs, refrigerators and lighting. After one month, the branches displayed different energy consumption patterns. Researching this further, they discovered that the refrigeration equipment in one of the branches was faulty and the compressors were overworked. The customer installed door sensors in the refrigerators to send an alert if doors weren’t fully closed after a set time interval. Often times, employees push the door closed without the door actually sealing, and the refrigerator needs to work harder to keep food cool. Leaving the door open overnight often results in food wastage. The goal was to develop a guest ‘comfort score.’ Sensors were installed to monitor noise, smell, air quality, and restaurant temperature. Data from each sensor were given a score and all scores were tallied up to create a guest comfort score that could be proactively monitored across locations. Alerts were sent if guest comfort scores dropped below an acceptable level. This system integrator is currently working on an extension to improve guest satisfaction. They are researching technology to track the time it takes guests to get their meal from the moment they enter the restaurant.',
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
    subTitle: 'The concept of Industry 4.0 is based on several foundations, including technology, processes, organization, and operational and business models.',
    banner: 'https://www.decision.com/wp-content/uploads/2020/12/Smart-Factory-1-1024x444.png',
    descriptiveText: 'In discussion about Industry 4.0, it is difficult to draw a clear distinction between business and technological aspects. The development of supporting technologies has a direct influence on the business operations of manufacturing companies. This can be observed by looking at the cycle of activity in which cyber-physical systems play a major role, making it possible for those systems to communicate and process vast amounts of data. The end result of this cycle is a concrete step into the physical world (such as the creation of an end product)..',
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
  await IoT.addCasestudy(iotC7.id)
  await SmartLighting.addCasestudy(iotC7.id)
  await SmartCities.addCasestudy(iotC7.id)

  const iotC8 = await CaseStudy.create({
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
  await IoT.addCasestudy(iotC8.id)
  await Healthcare.addCasestudy(iotC8.id)
  //  await SmartRetail.addCasestudy(iotC9.id)

  //**END OF IOT CASE STUDIES */

  //** ------------------------------------------------------------ TEAM MEMBER --------------------------------------------------------------- */
  const person1 = await TeamMember.create({
    memberNameAndOccupation: 'Gianpiero Gasperini - Lead security',
    personalQuote: 'Lorem ipsum dolor sit amet',
    personalDescription:
      ' Jane Goodall had long been an idol of mine before I had the opportunity to meet her personally. I have been a member of one of her international Jane-Goodall-Institutes (JGI) for a couple of years now. I have read some of her books and like her idea of teaching children all over the world about environmental conservation and wild animal care so much that I hope to do it personally one day, too. As the greatest and most popular scientist of chimpanzees in the world and today also an active member of the UN Security Council and close friend of Kofi Anan, she is very busy and always travelling, so the chance to see her is quite rare. ',
    workField: 'Security',
    teamsTitle: 'IoT Department',
    personName: 'Gian Piero Gasperini',
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
    teamsTitle: 'IoT Department',
    personName: 'Luke Cobezzo',
    personJob: '',
    personPhoto:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg',
    teamImage: '',
    areaID: '1',
    serviceID: '1',
  })

  IoT.addTeammember(person1)
  Security.addTeammember(person2)
  

  iotC1.addTeammember(person1)
  iotC1.addTeammember(person2)
  iotC2.addTeammember(person1)
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
