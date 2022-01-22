const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {              // we can also use destructuring like const {data}= info
  signUp: async (req, res) => {
      let result;
    try {
      const salt = await bcryptjs.genSalt(10);
      const hash = await bcryptjs.hash(req.body.password, salt);
      const users = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin:req.body.isAdmin||0
      };
        
      const exist= await db.user.findOne({ where: { email: req.body.email } });
      if(!exist){
         result = await db.user.create(users);
         
      }else{
        return res.status(400).json({
            success: false,
            message: "user already registered",
          });
      }
      

      
      return res.status(200).json({
        success: true,
        message: "user registerd Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
  login: async (req, res) => {
    try {
      console.log("entered", req.body);
      const user = await db.user.findOne({ where: { email: req.body.email } });
      if (!user) {
        res.status(200).json({
          success: false,
          message: "No User Found",
        });
      } else {
        bcryptjs.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                user_id: user.id,
                isAdmin:user.isAdmin
              },
              "secret",
              {expiresIn:'3d'}
            );
            res.status(200).json({
              success: true,
              message: "authentication successfull",
              token: token,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "invalid credentials",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }
  },
 
createmsg:async(req,res)=>{
  try{
    //if(req.body.message==""||null){
    const ans=await db.message.create({message:req.body.message})
    
    const allmsg=await db.message.findAll()
    res.status(200).json({
      success:true,
      message:allmsg
    })
  //}
  }catch(error){
    res.status(200).json({
      success:true,
      message:"please enter message"
    })

  }
},

displaymsg:async(req,res)=>{
  try{
    const allmsg=await db.message.findAll()
    res.status(200).json({
      success:true,
      message:allmsg
   })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"Someting went wrong"
  })
}
},

removeitem:async(req,res)=>{
try{
  let id=req.query.id;
  const rem=await db.message.destroy({where:{message_id:id}})
  const ans=await db.message.findAll()
  res.status(200).json({
    success:true,
    message:ans
  })

}catch(error){
  res.status(400).json({
    success:false,
    message:"Someting went wrong"
                    }) 
             }
 },
deleteuser:async(req,res)=>{
  console.log("delete function")
  try{
    let id=req.query.id
    console.log(id)
    const res=await db.message.destroy({where:{message_id:id}})
    console.log("ni")
    const ans=await db.message.findAll()
    console.log(ans)
    res.status(200).json({
      success:false,
      message:ans
    })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"not deleted"
    })

  }
},
msg:async (req,res)=>{
  try{
    let id=req.query.id;
    console.log(id)
    const ans=await db.message.findByPk(id)
    console.log("message",ans,id)
    res.status(200).json({
      success:true,
      message:"successfully deleted"
    })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"deleted unsuccessfl"
    })

  }
},
updatemsg:async (req,res)=>{
  try{
    console.log("update")
    let id=req.query.id;
    let newmsg=req.query.message;
    console.log(id)
    const ans=await db.message.update({message:newmsg},{where:{message_id:id}})
    const data=await db.message.findByPk(id)
    console.log("message",data,id)
    res.status(200).json({
      success:true,
      message:data
    })
  }catch(error){
    res.status(400).json({
      success:false,
      message:"Someting went wrong"
  })
}
}
}