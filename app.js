const express = require('express');

const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'}); 


//4 -seteamos el directorio de assets o publico
//es publica para que funcione en cualquier sitio
app.use(express.static('public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// 8 - Invocamos a la conexion de la DB

const connection = require('./database/db');
const { response } = require('express');

//9 - establecemos las rutas
app.get('/registro', (req, res) => {
	res.sendFile('C:\Users\LENOVO\OneDrive\Escritorio\QUINTO SEMESTRE\Aplicaciones Web1\RESIDENCIA UNIVERSITARIA\RESIDENCIA\src\assets\public\index_registro.html')
})
app.get('/sesion', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/index_iniciosesión.html')
})
app.get('/inicio', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/index_inicio.html')
})
app.get('/contacto', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/contacto.html')
})
app.get('/galeria', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/galeria.html')
})
app.get('/alquiler', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/alquiler.html')
})
app.get('/pago', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/pago.html')
})
app.get('/perfil', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/perfil.html')
})
app.get('/detalle_simple', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/Detalle_simple.html')
})
app.get('/detalle_doble', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/Detalle_doble.html')
})
app.get('/detalle_triple', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/Detalle_triple.html')
})
app.get('/detalle_familiar', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/Detalle_familiar.html')
})
app.get('/detalle_cuadruple', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/Detalle_cuadruple.html')
})
app.get('/perfil_inicio', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/perfilinicio.html')
})
app.get('/reserva', (req, res) => {
	res.sendFile('C:/Users/LENOVO/OneDrive/Escritorio/QUINTO SEMESTRE/Aplicaciones Web1/RESIDENCIA UNIVERSITARIA/public/reserva.html')
})

//10 - Método para la REGISTRACIÓN
app.post('/registro', async (req, res)=>{
	const nombre = req.body.nombre;
	const correo = req.body.correo;
    const password = req.body.password;

	let passwordHash = await bcrypt.hashSync(password, 10);
    connection.query('INSERT INTO registro SET ?',{nombre:nombre, correo:correo, password:passwordHash}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{
			res.redirect('/inicio');
			// res.render('index_registro', {
			// 	alert: true,
			// 	alertTitle: "Registration",
			// 	alertMessage: "¡Successful Registration!",
			// 	alertIcon:'success',
			// 	showConfirmButton: false,
			// 	timer: 1500,
			// 	ruta: ''
			// });
        }
	});
})

app.post('/sesion', async (req, res)=>{
	const correo = req.body.correo;
	const password = req.body.password;
	let passwordHash = await bcrypt.hash(password, 10);
	if (correo && password) {
		connection.query('SELECT * FROM registro WHERE correo = ?', [correo], async (error, results, fields) => {
		if( results.length == 0 ){
			res.render('login', { 
				alert: true,
				alertTitle: "Error",
				alertMessage: "Correo y/o contraseña incorrectas",
				alertIcon: 'error',
				showConfirmButton: true,
				timer: false,
				ruta: 'sesion'
			});
		} else {
		bool = await bcrypt.compareSync(password, results[0].password)
		console.log(password)
		console.log(results[0].password)
		console.log(bool)
			if(bool == false){
				res.render('login', {
					alert: true,
					alertTitle: "Error",
					alertMessage: "Correo y/o password incorrectas",
					alertIcon: 'error',
					showConfirmButton: true,
					timer: false,
					ruta: 'sesion'
				});
			}else{
				res.redirect('/perfil')
			}
		}
		})
	}
})
app.post('/reserva', async (req, res)=>{
	const name = req.body.name;
	const lastname = req.body.lastname;
    const dni = req.body.dni;
	const room = req.body.room;

    connection.query('INSERT INTO reserva SET ?',{name:name, lastname:lastname, dni:dni, room:room}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{
			res.redirect('/reserva');
        }
	});
})
app.post('/contacto', async (req, res)=>{
	const nombre = req.body.nombre;
	const correo = req.body.correo;
    const telefono = req.body.telefono;
    connection.query('INSERT INTO contacto SET ?',{nombre:nombre, correo:correo, telefono:telefono}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{ 
			res.redirect('/contacto'); 
			
        }
	});
})
app.post('/pago', async (req, res)=>{
	const tarjeta = req.body.tarjeta;
	const name = req.body.name;
    
    connection.query('INSERT INTO pago SET ?',{tarjeta:tarjeta, name:name}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{
			res.redirect('/alquiler');
			
        }
	});
})
app.post('/alquiler', async (req, res)=>{
	const name = req.body.name;
	const lastname = req.body.lastname;
    const dni = req.body.dni; 
	const room = req.body.room;
	const cost = req.body.cost;

    connection.query('INSERT INTO alquiler SET ?',{name:name, lastname:lastname, dni:dni, room:room, cost:parseFloat(cost)}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{
			res.redirect('/inicio');
        }
	});
})
app.listen(4200)

 