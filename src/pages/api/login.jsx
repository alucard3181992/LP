import jwt, { verify } from 'jsonwebtoken';
import { serialize } from 'cookie';
import prisma from '@/lib/prisma';

const LoginBD = async (req, res) => {
    const { method } = req;
    switch (method) {
        case "GET":
            try {
                const { acceso } = req.cookies
                if (!acceso) {
                    return res.status(200).json({ message: 'Sin Acceso', estado: false })
                } else {
                    const user = verify(acceso, 'secret')
                    //console.log("USER", user);
                    return res.status(200).json({ message: 'Acceso Concedido', datos: user.user, roles: user.roles, empresa: user.empresa, estado: user.estado })
                }

            } catch (error) {
                return res.status(200).json({ message: "ERROR: " + error })
            }

        case "POST":
            try {
                const { login, password } = req.body;
                /* const consulta = "select d.*,u.sexo,u.fecnac,p.ci,p.idpe,concat(p.nombre,' ',p.ap,' ',p.am) from datos d INNER JOIN usuario u ON u.idu=d.idu INNER JOIN persona p ON p.idpe=u.idpe  where d.login=$1 and d.contrasenia=$2 ";
                const lista = await pool.query(consulta, [login, password]) */
                let usuario = ""
                const consulta2 = await prisma.datos.findUnique({
                    where: {
                        login: login,
                        contrasenia: password
                    },
                    include: {
                        usuario: {
                            select: {
                                /* empresa: {
                                    select: {
                                        idem: true,
                                        nom: true,
                                    }
                                }, */
                                conf: true,
                                sexo: true,
                                fecnac: true,
                                persona: {
                                    select: {
                                        ci: true,
                                        idpe: true,
                                        nombre: true,
                                        ap: true,
                                        am: true,
                                    }
                                },
                                usurol: {
                                    select: {
                                        roles: {
                                            select: {
                                                nombre: true,
                                                rolmenu: {
                                                    select: {
                                                        menu: {
                                                            select: {
                                                                nom: true,
                                                                url: true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            }
                        }
                    }
                })
                if (consulta2) {
                    //console.log(consulta2);
                    usuario = consulta2.usuario.persona.nombre + " " + consulta2.usuario.persona.ap + " " + consulta2.usuario.persona.am
                    const datos = {
                        idu: consulta2.idu,
                        login: consulta2.login,
                        contrasenia: consulta2.contrasenia,
                        sexo: consulta2.usuario.sexo,
                        fecnac: consulta2.usuario.fecnac,
                        ci: consulta2.usuario.persona.ci,
                        idpe: consulta2.usuario.persona.idpe,
                        concat: usuario,
                        conf: consulta2.usuario.conf
                    }
                    const roles = consulta2.usuario.usurol.map((item) => {
                        return {
                            nombreR: item.roles.nombre,
                            menus: item.roles.rolmenu.map((menu) => {
                                return {
                                    nombreM: menu.menu.nom,
                                    url: menu.menu.url
                                };
                            })
                        };
                    });
                    const empresa = "LUZAM"//consulta2.usuario.empresa.nom
                    const data = [datos]
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                        user: data,
                        roles: roles,
                        estado: true,
                        empresa: empresa,
                    }, 'secret')
                    const serializado = serialize('acceso', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        path: '/'

                    })
                    return res.setHeader('Set-Cookie', serializado).status(200).json({ usuario: usuario, message: 'Usuario Permitido', logueo: true, data: data, rolmenu: roles });
                } else {
                    return res.status(200).json({
                        message: "Usuario no Encontrado", logueo: false
                    });
                }

            } catch (error) {
                return res.status(200).json({ message: "ERROR: " + error })
            }

        case "DELETE":
            try {
                //console.log("DELETE");
                const { acceso } = req.cookies
                if (!acceso) {
                    return res.status(200).json({ message: 'Sin Acceso' })
                } else {
                    verify(acceso, 'secret')
                    const serializado = serialize('acceso', null, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 0,
                        path: '/'

                    })
                    return res.setHeader('Set-Cookie', serializado).status(200).json({ message: 'Session Finalizada', logueo: false });
                }
            } catch (error) {
                return res.status(200).json({ message: "ERROR: " + error })
            }

        case "PUT":
            //console.log("PUT");
            const { id } = req.body;
            try {
                /* const consulta = "select p.base64 from persona p, usuario u where p.idpe=u.idpe and u.idu=$1"
                const lista = await pool.query(consulta, [id]) */
                const data = await prisma.persona.findUnique({
                    select: {
                        base64: true,
                    },
                    where: {
                        idpe: id
                    }
                })
                return res.status(200).json({ base64: data })
            } catch (error) {
                return res.status(200).json({ message: "ERROR: " + error })
            }
    }

}

/* async function obtenerListaDeRolesConMenus(id) {
    const pool = conn
    // Realizar la consulta a la base de datos
    const rolesQuery = await pool.query('select ur.*,r.*  from usurol ur INNER JOIN roles r ON r.idr=ur.idr where ur.idu=$1', [id]);

    // Iterar por los resultados de la consulta para obtener los menús de cada rol
    const rolesConMenus = rolesQuery.rows.map(async (rol) => {
        const menusQuery = await pool.query('select rm.*,m.* from rolmenu rm INNER JOIN menu m ON m.idm=rm.idm where rm.idr=$1', [rol.idr]);
        const menus = menusQuery.rows.map((menu) => {
            return { nombreM: menu.nom, url: menu.url };
        });
        return { nombreR: rol.nombre, menus };
    });

    // Esperar a que se completen todas las consultas asíncronas y devolver el resultado
    return Promise.all(rolesConMenus);
} */
/* if (lista.rowCount === 0) {
                    return res.status(200).json({
                        message: "Usuario no Encontrado", logueo: false
                    });
                } else {
                    usuario = lista.rows[0].concat
                    const listaDeRolesConMenus = await obtenerListaDeRolesConMenus(lista.rows[0].idu);
                    //console.log("LOS MENUS SON ", listaDeRolesConMenus);
                    //console.log(listaDeRolesConMenus);
                    const token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                        user: lista.rows,
                        roles: listaDeRolesConMenus,
                        estado: true,
                    }, 'secret')
                    const serializado = serialize('acceso', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 1000 * 60 * 60 * 24 * 30,
                        path: '/'

                    })

                    //res.setHeader('Set-Cookie', serializado)
                    return res.setHeader('Set-Cookie', serializado).status(200).json({ usuario: { usuario: usuario, DATOSUSUARIO1: lista.rows, DATOSUSUARIO2: datos, ROLES1: listaDeRolesConMenus, ROLES2: roles }, message: 'Usuario Permitido', logueo: true, data: lista.rows, rolmenu: listaDeRolesConMenus });

                } */
export default LoginBD