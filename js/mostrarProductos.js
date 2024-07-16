import { conexionApi } from "./conexionApi.js";

const lista = document.querySelector("[data-productos]")
 const form= document.querySelector("[data-form]");
 const error =document.querySelector(".error")


function crearCard(nombre, precio, imagen, id) {

    const producto = document.createElement("div");
    producto.classList.add("card")

    producto.innerHTML = `  
   
        <img src="${imagen}">

        <div class=" card-contenido"> 
            <div class="card-title">
             <p>${nombre}</p>
            </div>
        
            <div class="informacion">
                <p> $ ${precio}</p>
                 <img src="./assets/img/eliminar.png"  data-id="${id}"alt="">
            </div>
        </div>
         
         `
         const btnEliminar = producto.querySelector("[data-id]");
         btnEliminar.addEventListener("click", async (e) => {
             e.preventDefault();
             const confirmacion = confirm("¿Desea eliminar el producto?");
             if (confirmacion) {
                 try {
                     await conexionApi.eliminarProductos(id);
                     producto.remove(); 
                     
                 } catch (error) {
                     console.error('Error al eliminar producto:', error);
                 }
             }
         });
     
      

    lista.appendChild(producto)
    return producto;

}

const render = async () => {
    try {
        const listado = await conexionApi.listarProductos();

        listado.forEach(producto =>
            lista.appendChild(crearCard(producto.nombre, producto.precio, producto.imagen, producto.listarProductos)))

    } catch (error) {
        console.log(error)
    }
}


 form.addEventListener("submit",(event)=>{

    event.preventDefault();


    const nombre = document.querySelector("[data-nombre ]").value;
    const precio = document.querySelector("[data-precio ]").value;
    const imagen = document.querySelector("[data-imagen]").value;

   
    error.textContent = ''; 

    if(nombre !== '' && precio !== '' && imagen !== ''){
        
   conexionApi.crearProductos(nombre, precio, imagen).
   then((res)=> console.log(res)).catch((err));
    }
    else{
        error.textContent='Los campos deben estar completos';
    }

    
 });
 const inputLimpiar = document.getElementById('input_limpiar');
inputLimpiar.addEventListener('click', function() {
    document.querySelector("[data-nombre]").value = '';
    document.querySelector("[data-precio]").value = '';
    document.querySelector("[data-imagen]").value = '';
    error.textContent = ''; // Limpiar mensaje de error al limpiar los campos
});



render();

