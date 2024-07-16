

async function listarProductos(){

    const conexion= await fetch("http://localhost:3000/productos");
    
    const conexionConvertida = conexion.json();

    //console.log(conexionConvertida)
    return conexionConvertida

};

 const crearProductos= (nombre, precio, imagen)=>{

    return fetch("http://localhost:3000/productos",{

     method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
         nombre,
        precio,
         imagen,

    })

     });

 }

 const eliminarProductos = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
}








export const conexionApi={
    listarProductos,
    crearProductos,
    eliminarProductos,
}

