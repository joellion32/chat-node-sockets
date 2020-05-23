
class Usuarios {

constructor(){
    this.personas = [];
}


// funcion para agregar persona 
agregarPersona(id, nombre, sala){
let persona = {id, nombre, sala}

// agregar persona al arreglo de personas
this.personas.push(persona);


return this.personas;
}


// recibir persona por id
getPersona(id){
let persona = this.personas.filter(persona => persona.id === id)[0];    

return persona;
}


// recibir todas las personas
getPersonas(){
    return this.personas;
}


// mostrar personas por sala
getPersonasSala(sala){
    let personasSala = this.personas.filter(persona => persona.sala === sala);

    return personasSala;
}


//eliminar persona
borrarPersona(id){
    // para notificar la persona que se borro
    let personaBorrada = this.getPersona(id)

    // para borrar la persona del arreglo
    this.personas = this.personas.filter(persona => persona.id != id)

    return personaBorrada;
}


}



module.exports = {
    Usuarios
}