const express = require('express')

const app = express()
const { Router } = express
const routerProductos = Router()


app.use('/api', routerProductos)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

/* ------------------------------------------------------ */


let productos = [

    {
        "id": 1,
        "Nombre": "inter",
        "Url": "https://i.ibb.co/dgjzjvK/images-q-tbn-ANd9-Gc-TUtrjy-hxo-S7itymm994-PWb1-o-SLUZMo38-Fg-usqp-CAU.jpg",
        "Precio": 2000
    },
    {
        "id": 2,
        "Nombre": "defensa y justicia",
        "Url": "https://i.ibb.co/WBzHNLv/images-q-tbn-ANd9-Gc-Rxu-I5t-AXdtt-Izamd-RH9-AMzkt-WTbk-Opk-TRk-Jg-usqp-CAU.jpg",
        "Precio": 1500

    },
    {
        "id": 3,
        "Nombre": "atletico madrid",
        "Url": "https://i.ibb.co/Z2zDQ6y/images-q-tbn-ANd9-Gc-Re-FPQu-FEjev-D6-YS2-NTIug-Fx-X-fsjkr-Jucp-BQ-usqp-CAU.jpg",
        "Precio": 2500
    }
]

routerProductos.get('/productos', (req, res) => {
    res.json(productos)
})
routerProductos.get('/productos/:id', (req, res) => {
    if (productos.find(e => e.id === parseInt(req.params.id))) {
        res.json(productos[req.params.id - 1])
    }
    else {
        res.send('no existe')

    }
})

routerProductos.post('/productos', (req, res) => {
    
    const valor = Math.max(...productos.map(o => o.id), 0);
    req.body.id = valor + 1
    productos = [...productos, req.body]
    res.json(productos)
})

routerProductos.put('/productos/:id', (req, res) => {
    let prueba=productos.findIndex(a=> a.id ===req.body.id)
    if(prueba !== undefined){
        productos[prueba].Nombre=req.body.Nombre
        productos[prueba].Url=req.body.Url
        productos[prueba].Precio=req.body.Precio
        res.json(productos)
    }
    else{
        res.send('no existe')
    }

    /*
        Actualizacion mediante postman

        Se envia formato json con esta estructura:
           {
        "id": 3,
        "Nombre": "atttttttttttletico madrid",
        "Url": "https://i.ibb.co/Z2zDQ6y/images-q-tbn-ANd9-Gc-Re-FPQu-FEjev-D6-YS2-NTIug-Fx-X-fsjkr-Jucp-BQ-usqp-CAU.jpg",
        "Precio": 2500
    }
    */
    
})

routerProductos.delete('/productos/:id', (req, res) => {
    let index=productos.findIndex(a=> a.id ===parseInt(req.params.id))
    if(index!==-1){
    productos.splice(index,1)
    res.json(req.body)
    }
    else{
        res.send('no existe')

    }
})



/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))