const precio1 = 500;
const precio2 = 600;
let precioFinal = 0;

const entradas = [];
class Entrada{
    constructor(precio,evento) {
        this.precio = precio;
        this.cantidad = 0;
        this.evento = evento;
        this.total = 0;
    }

    ingresoDeCantidad(cantidad){        
        this.cantidad = cantidad;
    }
    precioTotal(){
        this.total = this.cantidad*this.precio; 
        return this.total;
              
    }   
}
const edicionPrimavera = new Entrada(precio1, 'Primavera');
const edicionVerano = new Entrada(precio2,'Verano');

class Ticket{
    constructor(precio,precioTotal,evento,cantidad) {
        this.precio=precio;
        this.precioTotal = precioTotal;
        this.cantidad = cantidad;
        this.evento = evento;       
    }

}




const containerTickets = document.getElementById('muestraDeTickets');
const cargarBoton = document.getElementById('cargarBoton');
const inputCantidadEntradas = document.querySelector('.cantidadEntradas');
const inputSeleccionEvento = document.querySelector('.seleccionEvento');
const form = document.getElementById('myForm');

cargarBoton.addEventListener('click',mostrarTicket);

function mostrarTicket(evento) {
    evento.preventDefault(); 
    var cantidadEntradas = Number(inputCantidadEntradas.options[inputCantidadEntradas.selectedIndex].value);
    var eventoSeleccionado = Number(inputSeleccionEvento.options[inputSeleccionEvento.selectedIndex].value);
    if (eventoSeleccionado==32 || cantidadEntradas==32 || (document.getElementById('nombre').value == '') ) {
        alert('ALGUNO DE LOS DATOS INGRESADOS ES INCORRECTO');
    }else{    
    const saludoEntradas = document.getElementById('saludoEntradas');
    saludoEntradas.textContent = `Hola, ${document.getElementById('nombre').value}!!`;
    crearTicket(cantidadEntradas,eventoSeleccionado);}
}


function crearTicket(cantidadEntradas,evento) {  
   
    if (evento==1) {
        edicionPrimavera.ingresoDeCantidad(cantidadEntradas); 
        edicionPrimavera.precioTotal();       
        var ticketAdd = new Ticket(precio1,edicionPrimavera.precioTotal(),'Primavera',cantidadEntradas)
        entradas.push(ticketAdd);
        precioFinal += edicionPrimavera.precioTotal();
        const container2 = document.createElement("div"); 
        containerTickets.appendChild(container2);    
        container2.innerHTML = `
        <div id="register">
        <div id="ticket">
              <h1>Ticket CLR</h1>
              <table>
                <tbody id="entries">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Edicion:</th>
                        <th class="valores">Primavera</th>
                    </tr>    
                   
                    <tr>
                        <th>Cantidad solicitada: </th>
                        <th class="valores">${cantidadEntradas}</th>
                    </tr>      
                    <tr>
                        <th>Precio por entrada: </th>
                        <th class="valores">$${precio1}</th>
                    </tr>                      
                    <tr class="barraHorizontal">
                        <th>Total</th>
                        <th class="valores">$${edicionPrimavera.precioTotal()}</th>
                    </tr>
                </tfoot>
              </table>
            </div>
            </div>
            <div id="space">
            </div>
    
        `;
        
    }else{        
        edicionVerano.ingresoDeCantidad(cantidadEntradas);  
        edicionVerano.precioTotal();
        var ticketAdd2 = new Ticket(precio2,edicionVerano.precioTotal(),'Verano',cantidadEntradas);        
        entradas.push(ticketAdd2);
        precioFinal += edicionVerano.precioTotal();
        const container = document.createElement("div");            
        containerTickets.appendChild(container);     
        container.innerHTML = `
        <div id="register">
        <div id="ticket">
              <h1>Ticket CLR</h1>
              <table>
                <tbody id="entries">
                </tbody>
                <tfoot>
                    <tr>
                        <th>Edicion:</th>
                        <th class="valores">Verano</th>
                    </tr>      
                    
                    <tr>
                        <th>Cantidad solicitada: </th>
                        <th class="valores">${cantidadEntradas}</th>
                    </tr>      
                    <tr>
                        <th>Precio por entrada: </th>
                        <th class="valores">$${precio2}</th>
                    </tr>                      
                    <tr class="barraHorizontal">
                        <th>Total</th>
                        <th class="valores">$${edicionVerano.precioTotal()}</th>
                    </tr>
                </tfoot>
              </table>
            </div>
            </div>
            <div id="space">
            </div>
    
        `;
    }
    const spanPrecioTotal = document.getElementById('spanPrecioTotal');
    spanPrecioTotal.textContent = precioFinal;

    

    
}



sessionStorage.setItem('tickets', JSON.stringify(entradas));







