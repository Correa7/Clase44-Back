const UserService = require('../services/users.service');
const Service = new UserService()


const getUser = async (req,res)=>{
    try{
        const users = await Service.getAll();
        return res.status(200).json({
            status: 'success',
            msg: 'Users founds',
            data: users,
        })
    }
    catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
}

const getUserById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
        return user? 
        res.status(200).json({
            status: 'success', 
            msg: 'User Get by ID',
            data:user,
        }):
        res.status(200).json({
            status: 'error',
            msg: 'User not found',                                                             
            data: user,
        })
    } 
    catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
      });
    }
}

const postUser = (req, res) => {
    res.redirect('/session/login')
} 

const rolUserById = async (req,res)=>{
    // Modificar para que solo pueda ser premium si:
    // el usuario tiene cargado en document:
    // Identificación, Comprobante de domicilio, Comprobante de estado de cuenta

    try{
        let _id = req.params.uid
        const user = await  Service.getById(_id)
        if(user.rol === 'User'){
            user.rol= 'Premium' 
            await Service.updateOne(_id,user) 
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: Premium',
                
            });
 
        }else{
            user.rol= 'User'
            await Service.updateOne(_id,user) 
            return res.status(201).json({
                status: 'success',
                msg: 'User update rol: User',
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}

const delUserById =  async (req, res) => {
    try {
    const uid = req.params.uid;
    await Service.deletedOne(uid)
    return res.status(200).json({
        status: 'success',
        msg: 'User deleted',
        data: {},
    });
    } catch (e) {
    console.log(e);
    return res.status(500).json({
        status: 'error',
        msg: 'something went wrong :(',
        data: {},
    });
    }
}

const putUserById = async (req, res) => { 
    try {
        const uid = req.params.uid;
        const data= req.body
        await Service.updateOne(uid,data)
        return res.status(201).json({
            status: 'success',
            msg: 'User update',
            data:data,
        });
    } 
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }
}
const userDocuments = async (req,res) => {
    // Crear un endpoint en el router de usuarios api/users/:uid/documents 
    // con el método POST que permita subir uno o múltiples archivos. 
    // Utilizar el middleware de Multer para poder recibir los documentos que se carguen 
    // y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.
    try{
        const uid = req.params.uid;
        const user= await  Service.getById(uid)
       const documents=[]
        const file =req.files
        for(const e in file){
            if(file[e][0].fieldname === 'image'){
                continue
            }
            else{
                let name=file[e][0].fieldname
                let reference=file[e][0].path
                documents.push({name:name,reference:reference})
            }
        }
       console.log(documents)
   

        return res.status(201).send('Route :api/users/:uid/document')
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        });
    }

}
 
module.exports = {
    getUser,
    getUserById,
    postUser,
    delUserById,
    putUserById,
    rolUserById,
    userDocuments
}
