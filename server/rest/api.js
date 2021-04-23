import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const {Area, Service, CaseStudy, TeamMember} = db._tables
  

  app.get('/area/:id', async (req, res) => {
    const { id } = req.params
    let area = await Area.findOne({
      where: { id },
      include: [
        { model: Service, as: 'services' }, 
        { model: CaseStudy, as: 'casestudies' }, 
        { model: TeamMember, as: 'teammembers' }
      ],
      
    })

    // const services = await Service.findAll({
    //   where: { areaID: id },
    //   include: { 
    //     model: CaseStudy
    //     }
    // })

    // const caseStudy = [];
    // services.forEach(service => {
    //   service.casestudies.forEach(casestudy => {
    //     caseStudy.push(casestudy)
    //   })
    // });

    // area.listOfCaseStudies = caseStudy
    return res.json(area)
  })

  app.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = await Service.findOne({
      where: { id },
      include: { 
        model: CaseStudy
        }
    })
    return res.json(service)
  })

  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll({
    })
    return res.json(areas)
  })

  app.get('/services', async (req, res) => {
    const services = await Service.findAll({
    })
    return res.json(services)
  })


  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url:
        'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
