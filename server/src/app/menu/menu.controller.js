const {
    Pool
} = require('pg')
const config = require('../../config/dbconfig')

const client = new Pool(config);




exports.test = async (req, res) => {


    
    var query = `

    SELECT * FROM dbo.users

     `
     try {
        const data = await client.query(query)
        const mydata = data.rows;
        console.log(mydata, "prueba de datos")
        if (mydata.length === 0) {
            res.status(400).json({
                error: "No existe listados",
            });
        } else {
            res.status(200).json(mydata);
        }
    } catch (err) {
        console.error (err)
        res.status(500).json({
            error: "Error connecting with Database", //Database connection error
        });
    };
}