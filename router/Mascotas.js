const express=require("express");
const router =express.Router();

const Mascota=require('../models/mascota');

router.get('/',async(req,res)=>{
   try {
    const arrayMascotas=await Mascota.find();
    console.log(arrayMascotas);
    res.render('mascotas',{
    listaMascotas:"Aqui iran todas las mascotas",
    arrayMascotas
    });
   } catch (error) {
    console.log(error);
   }
});

router.get('/crear',(req,res)=>{
   res.render('crear');
});



router.get('/:id', async(req,res)=>{
   const id=req.params.id;
   try {
      const mascotaDB= await Mascota.findOne({_id:id});
      console.log(mascotaDB);
      res.render('detalle',{
         mascota:mascotaDB,
         error:false
      });
      
   } catch (error) {
      console.log('erroooooooooor',error);
      res.render('detalle',{
         error:true,
         mensaje:'No se encuentra el documento ...'
      });
      
   }
});

router.post('/',async (req,res)=>{
   const body=req.body;
   console.log(body);
   try {
      const mascotaDB=new Mascota(body);
      await mascotaDB.save();
      res.redirect('/mascotas');
   } catch (error) {
      console.log('error',error);
   }
});

router.put('/:id',async(req,res)=>{
   const id = req.params.id;
   const body = req.body;

   console.log(id)
   console.log('body',body)
   try{
      const mascotaDB = await Mascota.findByIdAndUpdate(
         id, body, {useFindAndModify: false}
      )
      console.log(mascotaDB)
      res.json({
         estado: true,
         mensaje:'mascota editada'
      })
   }catch (error){
      console.log(error)
      res.json({
         estado:false,
         mensaje:'error al editar'
      })
   }
})

module.exports=router;