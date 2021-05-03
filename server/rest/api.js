import express from 'express'
import initializeDatabase from '../db-conn'
import { Op, where } from 'sequelize'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()
  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Service, CaseStudy, TeamMember, ServiceCaseStudy } = db._tables

  app.get('/area/:id', async (req, res) => {
    const { id } = req.params
    let area = await Area.findOne({
      where: { id },
      include: [
        { model: Service, as: 'services' },
        { model: CaseStudy, as: 'casestudies' },
        { model: TeamMember, as: 'teammembers' },
      ],
    })
    return res.json(area)
  })

  app.get('/service/:id', async (req, res) => {
    const { id } = req.params
    const service = await Service.findOne({
      where: { id },
      include: {
        model: CaseStudy,
      },
    })
    return res.json(service)
  })

  app.get('/casestudy/:id', async (req, res) => {
    const { id } = req.params
    const casestudy = await CaseStudy.findOne({
      where: { id },
      include: {
        model: Service,
      },
    })
    return res.json(casestudy)
  })

  app.get('/casestudyservices/:casestudyID', async (req, res) => {
    const { casestudyID } = req.params
    const relatedService = await Service.findAll({
      include: {
        model: CaseStudy,
        where: {
          id: casestudyID,
        },
      },
    })
    return res.json(relatedService)
  })

  app.get('/relatedServices/:areaID/:serviceID', async (req, res) => {
    const { areaID, serviceID } = req.params
    const relatedService = await Service.findAll({
      where: {
        areaID: areaID,
        id: {
          [Op.ne]: serviceID,
        },
      },
    })
    return res.json(relatedService)
  })

  app.get('/areas', async (req, res) => {
    const areas = await Area.findAll({})
    return res.json(areas)
  })

  app.get('/services', async (req, res) => {
    const services = await Service.findAll({})
    return res.json(services)
  })
}

init()

export default app
