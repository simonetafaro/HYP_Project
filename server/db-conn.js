const { Sequelize, DataTypes } = require('sequelize')

// Development
const db = new Sequelize('mysql://xxx:xxxxxx@address:port/xxxx', {
})
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
    subTitle: 'Security area, non so cosa scrivere',
  })
  const IoT = await Area.create({
    title: 'IoT Area',
    subTitle: 'IoT area, non so cosa scrivere'
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
    title: 'ModernFraudProtection title',
    subTitle: 'ModernFraudProtection subtitle'
  })
  const ManagedSecurity = await Service.create({
    title: 'ManagedSecurity title',
    subTitle: 'ManagedSecurity subtitle'
  })
  //**END OF SECURITY SERVICES */

  //**IOT SERVICES */
  const SmartCities = await Service.create({
    title: 'SmartCities title',
    subTitle: 'SmartCities subtitle'
  })
  const SmartLighting = await Service.create({
    title: 'SmartLighting title',
    subTitle: 'SmartLighting subtitle'
  })
  const Automotive = await Service.create({
    title: 'Automotive title',
    subTitle: 'Automotive subtitle'
  })
  //**END OF IOT SERVICES */


  const cs1 = await CaseStudy.create({
    title: 'cs1 title',
    subTitle: 'cs1 subtitle',
  })
  const cs2 = await CaseStudy.create({
    title: 'cs2 title',
    subTitle: 'cs2 subtitle',
  })
  const cs3 = await CaseStudy.create({
    title: 'cs3 title',
    subTitle: 'cs3 subtitle',
  })
  

  await Security.addService(ModernFraudProtection.id)
  await Security.addService(ManagedSecurity.id)
  await IoT.addService(SmartCities.id)
  await IoT.addService(SmartLighting.id)
  await IoT.addService(Automotive.id)
  
  await Security.addCasestudy(cs1.id)
  await Security.addCasestudy(cs3.id)
  await IoT.addCasestudy(cs2.id)

  await ManagedSecurity.addCasestudy(cs1.id);
  await ManagedSecurity.addCasestudy(cs3.id);
  await SmartCities.addCasestudy(cs2.id);

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
