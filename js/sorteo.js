
$(document).ready(function(){
    //Selecciono los elementos necesarios del dom    
    const inputTicket = $('.user-form__input-ticket');
    const inputName = $('.user-form__input-name');
    const inputMail = $('.user-form__input-mail');
    const inputTel = $('.user-form__input-tel');
    const cargarBoton = document.getElementById('cargarBoton');
    const containerInscriptos = document.getElementById('muestraDeInscriptos');

    function User(ticket,name,mail,tel) {
        this.ticket = ticket;
        this.name = name;
        this.mail = mail;
        this.tel = tel;
    }
    // Las filas de mi tabla
    let listUser = [];
     //Si hay items en el localStorage, entonces guardarlos en mi lista.
     listUser = getUserFromStorage('users') || [];

    function saveToStorage(key,user) {
        
        listUser.push(user);
        localStorage.setItem(key, JSON.stringify(listUser));
    }

    function getUserFromStorage(key) {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key))
        }
        
    }

   



    function createTable(element,ticket) {
        const table = `<table class="table table-dark" id=${ticket}></table>`;
        $(element).append(table);
    }

    function createDataHeader(data) {
        return data.map(headerData => `<th class="pl-3 pr-3">${headerData}</th>`)
    }

    function createTableHeader(data,table) {
        const header = `<tr class="pl-3">${createDataHeader(data)}</tr>`;
        $(table).append(header);
    }

    function populateTableData(ticket, name, mail, tel) {
        return `
        <td>${ticket}</td>
        <td class="pl-3">${name}</td>
        <td class="pl-3">${mail}</td>
        <td class="pl-3">${tel}</td>
        `
    }
    
    function createRowUser(user,element) {
        const row = `<tr class="ml-5" id="tr-${user.ticket}">
            ${populateTableData(user.ticket,user.name, user.mail,user.tel)}

            </tr>`;
        $(element).append(row);

    }

    function populateRows(data,element) {
        data.map(user=>{
            createRowUser(user,element)
        })
    }

    if (localStorage.getItem('users')) {
        //1 Crear la tabla
        createTable(containerInscriptos,'user-table');
        //2 Crear el header de la tabla
        createTableHeader(['Ticket','Nombre','Mail','Telefono'],'#user-table')
        //3 popular las filas de la tabla con los datos del storage
        populateRows(getUserFromStorage('users'), '#user-table');


    }

    

    cargarBoton.addEventListener('click',function(event) { 
        event.preventDefault();
        const ticket = inputTicket.val();
        const name = inputName.val();
        const mail = inputMail.val();
        const tel = inputTel.val();

        const user = new User(ticket,name,mail,tel);

        if (!localStorage.getItem('users')) {
            createTable(containerInscriptos,'user-table');
            createTableHeader(['Ticket','Nombre','Mail','Telefono']);
        }

        saveToStorage('users',user);

        createRowUser(user,'#user-table');

     })

});


