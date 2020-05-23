var socket = io();

// recibir nombre por parametro de la URL
var params = new URLSearchParams(window.location.search);

// verficar si ese parametro es un nombre
if(!params.has('nombre') || !params.has('sala')){
window.location = "index.html";    
throw new Error('El nombre y la sala son necesarios')
}

var usuario = {
 nombre: params.get('nombre'),   
 sala: params.get('sala')
}


socket.on('connect', function(){

// mandar el usuario que se conecto
socket.emit('EntrarChat', usuario, function(resp){
console.log(resp);
});
});


socket.on('disconnect', function(){
console.log('servidor desconectado');
});


// recibir mensaje del servidor
socket.on('crearMensaje', function(data){
console.log(data);
});


// recibir las personas conectadas
socket.on('listaPersonas', function(data){
console.log(data);
});


//Mensajes Privados
socket.on('mensajePrivado', function(mensaje){
console.log('mensaje privado para:', mensaje)
});