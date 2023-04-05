const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const servicioSchema =new Schema({
    nombreservicio:String,
    nombremascota:String,
    descripcionservicio:String,
    numero:Number
});

const Servicio=mongoose.model('Servicio',servicioSchema);

module.exports=Servicio;