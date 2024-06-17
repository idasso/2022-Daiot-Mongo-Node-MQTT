const register = (router) => {
  router.get("/status", (req, resp) =>{
    
    const deviceData = {
      dispositivoId: 23,
      nombre: "Demo-ESP32-C3",
      ubicacion: "Francia",
      luz1: 0,
      luz2: 0,
      temperatura: 38,
      humedad: 28
    };
    resp.json(deviceData);
    resp.send.status(200);
    
  });

  //listar leds de la db
  router.get("/leds", (req, resp) => resp.json({ status: 200 }));
  return router;
};

module.exports = {
  register,
};
