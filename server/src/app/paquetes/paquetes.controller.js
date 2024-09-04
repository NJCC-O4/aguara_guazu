const {
    Pool
} = require('pg')
var config = require('../../config/dbconfig');
const client = new Pool(config);



exports.getAll = async (req, res) => {
    try {

        const str = `
            SELECT * FROM dbo.paquetes

        `;

        const data = await client.query(str);
        const count = data.rows;
        // console.log(count, "Datos de candidatos");

        res.status(200).json(count);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error de la base de datos al obtener datos de candidatos",
        });
    }
}


// Agregar un nuevo paquete
exports.add = async (req, res) => {
    try {
        const { descripcion, costo } = req.body;
        const str = 'INSERT INTO dbo.paquetes (descripcion, monto) VALUES ($1, $2) RETURNING *';
        const data = await client.query(str, [descripcion, costo]);
        res.status(201).json(data.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error de la base de datos al agregar el paquete",
        });
    }
};



// Actualizar un paquete existente
exports.update = async (req, res) => {
    try {
        const { descripcion, costo } = req.body;
        const { id } = req.params;
        const str = 'UPDATE dbo.paquetes SET descripcion = $1, monto = $2 WHERE _id = $3 RETURNING *';
        const data = await client.query(str, [descripcion, costo, id]);
        if (data.rowCount === 0) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        res.status(200).json(data.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error de la base de datos al actualizar el paquete",
        });
    }
};



// Eliminar un paquete
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const str = 'DELETE FROM dbo.paquetes WHERE _id = $1 RETURNING *';
        const data = await client.query(str, [id]);
        if (data.rowCount === 0) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        res.status(200).json(data.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Error de la base de datos al eliminar el paquete",
        });
    }
};