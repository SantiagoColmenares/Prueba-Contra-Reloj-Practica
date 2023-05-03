import CustomerModel from "../models/customer-model.js";

const URL_API = "https://645284a6bce0b0a0f749221d.mockapi.io" 
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
        console.log(res);
    }).catch(err =>{
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
function saveCustomer(){
    CustomerModel.createdAt = '2023-02-02';
    CustomerModel.nombres = 'Campers 2023';
    CustomerModel.apellidos = 'xxxxx';
    CustomerModel.email = 'xxxxxx';
    CustomerModel.fechaNacimiento = '1980-03-24';
    postCustomer(CustomerModel);
}
function VerOcultar(divsVisibles){
    console.log(divsVisibles);

}

refListar.addEventListener("click", getCustomers);
refRegistro.addEventListener("click", (e) =>{
    VerOcultar(['#reg',['#listar','#buscar']]);
    e.preventDefault();
    e.stopImmediatePropagation();
});
document.querySelectorAll('.tabOpcion').forEach((val,id) =>{
    val.addEventListener("click", (e) =>{
        let datos = JSON.parse(e.target.dataset.verocultar);
        
    })
});

function viewDataHtml(dataCustomer){
    console.log(dataCustomer);
}