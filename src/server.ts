import express from 'express'
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
import { prismaClient } from './database/prismaClient'

const router = express.Router()

router.get('/product', async (req, res) => {

    const productList = await prismaClient.product.findMany()

    res.json(productList)
})

router.get('/product/:id', async (req, res) => {
    const id = req.params.id

    const product = await prismaClient.product.findUnique({
        where: {
            id
        }
    })

    res.json(product)
})

router.post('/product', async (req, res) => {

    const product = await prismaClient.product.create({
        data: {
            name: 'Test',
            bar_code: "00012313145123",
            price: 10,
        }
    })

    res.status(201).json(product)
})

router.put('/product', async (req, res) => {
    const productData = req.body

    const product = await prismaClient.product.create({
        data: productData
    })

    res.status(200).json(product)
})

app.use(router)

app.listen(process.env.PORT || 3333)