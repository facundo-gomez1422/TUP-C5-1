import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
    { id: 1, nombre: 'Ana', apellido: 'Gomez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Luis', apellido: 'Martinez', edad: 32, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Carlos', apellido: 'Perez', edad: 45, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Maria', apellido: 'Lopez', edad: 29, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Elena', apellido: 'Diaz', edad: 34, borrado: false, actualizado: Date.now() },
]

app.get('/personas', (req, res) => {
    const personas = datos.filter(persona => !persona.borrado)
    res.status(200).json(personas)
});

app.put('/personas', (req, res) => {

    const persona = req.body
    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id)
        if (index === -1) {
            res.status(404).send('Persona no encontrada')
        } else {
            datos[index] = { ...datos[index], ...persona, actualizado: Date.now() }
            res.status(201).json(datos[index])
        }
    } else {
        const nuevaPersona = {
            id: datos.length ? datos[datos.length - 1].id + 1 : 1,
            ...persona,
            borrado: false,
            actualizado: Date.now()
        }
        datos.push(nuevaPersona)
        res.status(201).json({ id: nuevaPersona.id })
    }
})

export default app