const {io} = require('../../server/app');
const {Usuarios} = require('../clasess/usuarios');
const {crearMensaje} = require('../helpers/helpers')

const usuarios = new Usuarios();


io.on('connection', (client) => {
console.log(`usuario ${client.id} conectado`);


// recibir cual usuario esta conectado
client.on('EntrarChat', (usuario, callback) => {
if(!usuario.nombre || !usuario.sala){
    return callback({
     error: true,
     mensaje: 'El nombre/sala es requerido'   
    })
}

// conectar un usuario a una sala 
client.join(usuario.sala);


usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);

//mandar toda la lista de personas conectadas
client.broadcast.to(usuario.sala).emit('listaPersonas', usuarios.getPersonasSala(usuario.sala));
callback(usuarios.getPersonasSala(usuario.sala));
});

// escuchar los cambios cada vez que se envia un mensaje
client.on('crearMensaje', (data)=> {
// obtener usuario
let persona = usuarios.getPersona(client.id);

let mensaje = crearMensaje(persona.nombre, data.mensaje);
client.broadcast.emit('crearMensaje', mensaje);
});



// Mensajes privados
client.on('mensajePrivado', (data) => {
let persona = usuarios.getPersona(client.id);   
client.broadcast.to(data.id).emit('mensajePrivado', crearMensaje(persona, data.mensaje))
});



// desconectar usuario
client.on('disconnect', ()=> {
    console.log(`usuario ${client.id} desconectado`);
    let personaBorrada = usuarios.borrarPersona(client.id);


    // enviar mensaje a cliente de usuario desconectado pero solamente a la sala donde estaba ese usuario
    client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
    client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasSala(personaBorrada.sala));
});
    
});

