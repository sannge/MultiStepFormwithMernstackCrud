const express = require('express');
const router = express.Router();
const { Athlete } = require("../models/Athlete");
const checkError = require('../util/checkErrors')

   router.post("/add-athlete",(req,res) => {
       
       
       let payload = JSON.parse(req.fields.jspayload);
       const image64 = req.fields.file
       payload = {...payload,image: image64};
       
       const errors = checkError(payload)
       if(Object.keys(errors).length > 0) {
           console.log(errors)
           res.status(400).send({error: errors})
       }else {
        const athlete = new Athlete(payload);
       
        athlete.save((err) => {
            if(err) throw new Error(err);
            return res.status(200).json({
                success: true
            })
        })
       }
   })

   router.get("/get-athletes",(_,res) => {
       let athleteMap = {};
       Athlete.find({},(err,athletes) => {
         
           if(err) res.json({success: false, err})
           athletes.forEach((athlete) => athleteMap[athlete._id] = athlete)
           res.status(200).json(athleteMap)
       })
   })

   router.delete("/delete-athlete/:id",(req,res) => {
    //    const {id} = req.body;
       const id = req.params.id;
       
       Athlete.findOne({_id: id}, (err,doc) => {
           if(err) throw new Error(err);
           doc.delete();
           return res.status(200).json({
               success: true
           })
       })
   })

   router.get("/get-athlete/:id",(req,res) => {
       const id = req.params.id;

       Athlete.findOne({_id: id}, (err,doc) => {
           if(err) throw new Error(err);
           return res.status(200).json({
               doc
           })
       })
   })

   router.patch("/update-athlete",async (req,res) => {
       let load = JSON.parse(req.fields.data);
       const image64 = req.fields.image
       load = {...load,image: image64};
       const {_id,location,desc,image} = load;

       const errors = checkError({location,desc,image})
       if(Object.keys(errors).length > 0) {
           console.log(errors)
           res.status(400).send({error: errors})
       } else {
        try {
            const updatedProfile = await Athlete.findOneAndUpdate({_id:_id},{location,desc,image})
            return res.status(200).json({
                success: true,
                profile: updatedProfile
            })
           }
           catch(err) {
               throw new Error(err);
           }
       }
   })

module.exports = router;