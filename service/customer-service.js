import CustomerModel from "../models/customer-model.js";
const frmRegistro = document.querySelector('#frmData')
const inputFrm = document.forms['frmData']; 
const botones = document.querySelectorAll('.btn')
let idUser = 1;
const URL_API = "https://645284a6bce0b0a0f749221d.mockapi.io/" 
const refListar = document.querySelector('#listar');
const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const postCustomer = (datos) =>{
    fetch(`${URL_API}/customers`,
    {
        method: "POST",
        headers: myHeaders,
        body:JSON.stringify(datos)
    }
    ).then(res =>{
        return res.json()
    }).then(res =>{
        idUser=res.id
        console.log(res);
    }).catch(err =>{
        console.log(err);
    })
        

}
const putCustomer = (datos) =>{
    fetch(`${URL_API}customers/${idUser}`,
	{
		method: "PUT",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
        
    }).then(res=>{
 
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })

}
const deleteCustomer = (datos) =>{
    fetch(`${URL_API}customers/${idUser}`,
	{
		method: "DELETE",
		headers: myHeaders,
		body:JSON.stringify(datos)
	}
    ).then(res=>{
        return res.json()
        
    }).then(res=>{
       
        console.log(res);
    }).catch(err=>{
        console.log(err);
    })

}

const getCustomers = async() => {
    try{
        const respuesta = await fetch(`${URL_API}/customers`)

        //Si es correcta la respuesta

        if(respuesta.status === 200){
            const datos = await respuesta.json();
            viewDataHtml(datos);
        }else if(respuesta.status === 401){
            console.log('La url no es correcta');
        }else if(respuesta.status === 404){
            console.log('El cliente que buscas no exite');
        }else {
            console.log('Se presento un error en la peticion consulte al A dministrador');
        }
    } catch(error){
        console.log(error);
    }

}
/* function saveCustomer(){
    CustomerModel.createdAt = '2023-02-02';
    CustomerModel.nombres = 'Campers 2023';
    CustomerModel.apellidos = 'xxxxx';
    CustomerModel.email = 'xxxxxx';
    CustomerModel.fechaNacimiento = '1980-03-24';
    postCustomer(CustomerModel);
} 
function VerOcultar(divsVisibles){
    console.log(divsVisibles);
} */
document.querySelectorAll('.tabOpcion').forEach((val,id) =>{
    val.addEventListener("click", (e) =>{
        let datos = JSON.parse(e.target.dataset.verocultar);
        let cardVer = document.querySelector(datos[0]);
        if(cardVer.classList == 'btn-primary'){


        }
        cardVer.style.display = 'block';
        datos[1].forEach(card => {
            let cardActual = document.querySelector(card);
            cardActual.style.display = 'none';
        })
        e.stopImmediatePropagation();
        e.preventDefault();
    })
});

function viewDataHtml(dataCustomer){
    console.log(dataCustomer);
}

document.querySelector('#btnNuevo').addEventListener("click", (e) =>{
    inputFrm.querySelectorAll('.form-control').forEach((e) =>{
        e.value = '';
        if (e.name == 'createdAt'){
            e.valueAsDate = new Date();
            e.disabled = true;
        }
    })
    document.querySelectorAll('.btn').forEach((element) =>{
        element.disabled = true;
        if((element.id !='btnGuardar') && (element.id != 'btnCancelar')){
            element.classList.add('disabled');
            
        } 
    })

    document.querySelectorAll('.btn').forEach((element) =>{
        element.disabled = true;
        if((element.id !='btnGuardar')){
            element.classList.add('disabled');
            
        } 
    })
})


document.querySelectorAll('.btn').forEach((e) =>{
    e.addEventListener("click",(evento)=>{
        let datos = JSON.parse(evento.target.dataset.activardesactiva);
        let cardVer = document.querySelector(datos[0]);
        datos[0].forEach(btnActivar =>{
            let btndActual = document.querySelector(btnActivar);
            btndActual.classList.toggle('disabled');
        })
        datos[1].forEach(btnActivar =>{
            let btndActual = document.querySelector(btnActivar);
            if (!(btndActual.classList.contains('disabled'))){
                btndActual.classList.toggle('disabled');
            }
        })
    })
})

document.querySelector('#btnGuardar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    postCustomer(datos);
})

 document.querySelector('#btnEditar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    putCustomer(datos);
})

document.querySelector('#btnEliminar').addEventListener("click", (e) =>{
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    deleteCustomer(datos)
}) 