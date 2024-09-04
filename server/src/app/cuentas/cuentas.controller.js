const { Pool } = require('pg');
const config = require('../../config/dbconfig');
const client = new Pool(config);


exports.getPaquetes = async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM dbo.paquetes 
      `;
      const result = await client.query(query);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

// Obtener todos los clientes
exports.getAll = async (req, res) => {
    try {
      const query = `
        SELECT c._id, c.name, c.last_name, c.phone, c.estado, c.fecha_ingreso, c.fecha_pagado, c.fecha_vencimiento,
               c.paquete_id, p.descripcion as paquete_descripcion, p.monto as paquete_monto
        FROM dbo.customers c
        LEFT JOIN dbo.paquetes p ON c.paquete_id = p._id;
      `;
      const result = await client.query(query);
      res.json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

// Obtener un cliente por ID
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
      const query = `
        SELECT c._id, c.name, c.last_name, c.phone, c.estado, c.fecha_ingreso, c.fecha_pagado, 
               c.paquete_id, p.descripcion as paquete_descripcion
        FROM dbo.customers c
        LEFT JOIN paquetes p ON c.paquete_id = p._id
        WHERE c._id = $1;
      `;
      const result = await client.query(query, [id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

// Agregar un nuevo cliente
exports.create = async (req, res) => {
    const { name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id } = req.body;
    try {
      const query = `
        INSERT INTO dbo.customers (name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const result = await client.query(query, [name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

// Actualizar un cliente
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id,  } = req.body;
    //console.log(req.body);
    
    try {
      const query = `
        UPDATE dbo.customers 
        SET name = $1, 
            last_name = $2, 
            phone = $3, 
            estado = $4, 
            fecha_ingreso = $5, 
            fecha_pagado = $6, 
            paquete_id = $7
        WHERE _id = $8
        RETURNING *;
      `;
      const result = await client.query(query, [name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id,id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  

 // Actualizar un pago
exports.updatepay = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id, fecha_proximo_pago } = req.body;
    console.log(req.body);
    
    try {
      const query = `
        UPDATE dbo.customers 
        SET name = $1, 
            last_name = $2, 
            phone = $3, 
            estado = $4, 
            fecha_ingreso = $5, 
            fecha_pagado = $6, 
            paquete_id = $7,
            fecha_vencimiento = $8
        WHERE _id = $9
        RETURNING *;
      `;
      console.log(query);
      
      const result = await client.query(query, [name, last_name, phone, estado, fecha_ingreso, fecha_pagado, paquete_id, fecha_proximo_pago, id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }; 
  

// Eliminar un cliente (cambiar estado a inactivo)
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
      const query = `
        DELETE FROM dbo.customers 
        WHERE _id = $1
        RETURNING *;
      `;
      const result = await client.query(query, [id]);
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
