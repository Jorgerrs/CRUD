const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let usuarios = [
    {id: 1, nombre: 'Ryu',  edad: 32, lugarProcedencia: 'Japón'},
    { id: 2, nombre: 'Chun-Li',  edad: 29, lugarProcedencia: 'China' },
  { id: 3, nombre: 'Guile',   edad: 35, lugarProcedencia: 'Estados Unidos' },
  { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
  { id: 5, nombre: 'Blanka',  edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
  });
  
  app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuario) {
      return res.status(404).json({ error: `Usuario ${nombre} no encontrado` });
    }
    res.json(usuario);
  });
  
  app.post('/usuarios', (req, res) => {
    const { nombre, edad, lugarProcedencia } = req.body;
    
    if (!nombre || !edad || !lugarProcedencia) {
      return res.status(400).json({
        error: 'Faltan datos del usuario. Se requieren nombre, edad y lugarProcedencia.'
      });
    }
    
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      edad,
      lugarProcedencia
    };
    
    usuarios.push(nuevoUsuario);
    
    res.status(201).json(nuevoUsuario);
  });
  
  app.put('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (index === -1) {
      return res.status(404).json({ error: `Usuario ${nombre} no encontrado` });
    }
    
    const { edad, lugarProcedencia, nombre: nuevoNombre } = req.body;
    
    if (nuevoNombre) usuarios[index].nombre = nuevoNombre;
    if (edad) usuarios[index].edad = edad;
    if (lugarProcedencia) usuarios[index].lugarProcedencia = lugarProcedencia;
    
    res.json(usuarios[index]);
  });
  
  app.delete('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (!usuario) {
      return res.status(404).json({ error: `Usuario ${nombre} no encontrado` });
    }
    
    usuarios = usuarios.filter(u => u.nombre.toLowerCase() !== nombre.toLowerCase());
    
    res.json({ mensaje: `Usuario ${nombre} eliminado` });
  });
  
  app.listen(3000, () => {
    console.log('Express está escuchando en el puerto 3000');
  });