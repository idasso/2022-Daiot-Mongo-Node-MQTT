const dispositivo = require("../prueba.router/models/dispositivos");
const register = (router) => {
  //router.get("/status", (req, resp) => resp.json({ status: 200 }));

router.get('/status/:topic/:id', async function (req, res) {
        topicoElegido = "/"+req.params.topic+"/";
	parametro = req.params.id;
	const listado = await dispositivo.find({topic: topicoElegido, dispositivoId: parametro});
        if (!listado) return res.json({ data: null, error: 'No hay datos en la Base de Datos.' });
        if (listado) {
		dispoSelec = listado[0];
		const deviceData = {
                        dispositivoId: dispoSelec.dispositivoId,
                        nombre: dispoSelec.nombre,
                        ubicacion: dispoSelec.ubicacion,
                        luz1: dispoSelec.luz1,
                        luz2: dispoSelec.luz2,
                        temperatura: dispoSelec.temperatura,
                        humedad: dispoSelec.humedad
                };
//		return res.json({ data: listado, error: null});
		res.json(deviceData);

	}

    });
/*	router.get('/status', (req, res) => {
  	// Acá vamos a obtener los datos de temperatura y humedad desde una base de datos.
/*
	  	const buscarDispositivo = dispositivo.findOne({
		topic: "/daiot",
		nombre: "Demo-ESP32-C3",
		});

		horaMedicion = new Date().getTime();
		const deviceData = {
			dispositivoId: buscarDispositivo.nodoId,
			nombre: buscarDispositivo.nombre,
			ubicacion: buscarDispositivo.ubicacion,
			luz1: buscarDispositivo.luz1,
			luz2: buscarDispositivo.luz2,
			temperatura: buscarDispositivo.temperatura,
			humedad: buscarDispositivo.humedad,
			hora: horaMedicion
	  	};
	  	res.json(deviceData);
*/
	// Código para testeo de la conexión desde el frontend
  	/*	 const deviceData = {
    			dispositivoId: 23,
    			nombre: "Demo-ESP32-C3",
    			ubicacion: "Francia",
    			luz1: 0,
    			luz2: 0,
    			temperatura: 38,
    			humedad: 28
  		};
  		res.json(deviceData); 
	});*/
  //listar leds de la db
  router.get("/leds", (req, resp) => resp.json({ status: 200 }));
  return router;
};

module.exports = {
  register,
};
