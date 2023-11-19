import { mySqlConnection } from "../DB/DB_connection.js";
import { Router } from "express";

export const routerUsuario = Router();

routerUsuario.delete("/api/eliminar-cuenta", (req, res) => {
  if (!req.session.usuario) {
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaDeEliminacion = `DELETE FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;
    mySqlConnection.query(consultaDeEliminacion, (err, rows, fields) => {
      if (err) {
        res.res.status(500).json({
          exito: false,
          mensaje: "No se pudo eliminar tu cuenta",
          err: err,
        });
      } else {
        res
          .status(200)
          .json({ exito: true, mensaje: "¡La cuenta ha sido eliminada!" });
      }
    });
  }
});

routerUsuario.get("/api/perfil", (req, res) => {
  if (!req.session.usuario) {
    console.log(req.session.usuario)
    res.status(403).json({ exito: false, mensaje: "Se debe inicar sesion." });
  } else {
    const consultaDeObtencionDeDatos = `SELECT Usuario,Nombre,ApellidoP,ApellidoM,CorreoElectronico FROM usuario WHERE idUsuario = ${req.session.usuario.idUsuario}`;
    mySqlConnection.query(consultaDeObtencionDeDatos, (err, rows, fields) => {
      if (err) {
        res.status(500).json({
          exito: false,
          mensaje: "No se pudieron obtener los datos del usuario.",
          err: err,
        });
      } else {
        res.status(200).json({
          exito: true,
          mensaje: "Datos obtenidos correctamente",
          datosUsuario: {...rows[0]}
        });
      }
    });
  }
});
