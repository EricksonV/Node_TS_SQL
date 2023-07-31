import { Request, Response } from "express";
import Usuario from '../models/usuario';


export const getUsuarios = async( req:Request, res:Response ) => {
    
    const usuarios = await Usuario.findAll({
        offset: Number(0),
        limit: Number(3)
    });

    res.json({
        usuarios

    });
}


export const getUsuario = async( req:Request, res:Response ) => {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    
    if(usuario){
        res.json({
            usuario
        });
    }else{
        res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`
        })
    }
    
}

export const postUsuario = async ( req:Request, res:Response ) => {
    const body = req.body;

    try {
        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email'
            });
        }
        const usuario = await Usuario.create(body);

        res.json(usuario)
        
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
    
}

export const putUsuario = async ( req:Request, res:Response ) => {
    const{ id } = req.params;
    const { body } = req;
    try {
        const usuario = await Usuario.findByPk(id);

        if(!usuario ){
            return res.status(400).json({
                msg: 'no existe un usuario con el id'
            });
        }

        await usuario.update( body );

        res.status(200).json({
            usuario
        });
        
    } catch (error:any) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

export const deleteUsuario = async ( req:Request, res:Response ) => {
    const{ id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario ){
        return res.status(400).json({
            msg: 'no existe un usuario con el id'
        });
    }

    //await usuario.destroy();

    await usuario.update({ estado: false});

    res.json({
        usuario
    });
}
