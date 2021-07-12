import {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function HireCourse() {
    
    const [hireCourse, setHireCourse] = useState({});

    const {id} = useParams();

    const history = useHistory();

    const form = {
   
        "course_id": useParams().id
        
     };

    const { getAuthHeaders } = useAuthContext();

    const COURSES_URL = "http://localhost:8000/api/courses/";  

    const ENROLLMENTS_URL = "http://www.localhost:8000/api/enrollments";
    
    const handlePay = async e => {
        e.preventDefault();
        
        const options = {
            method: "POST",
            headers: getAuthHeaders({"Content-type": "application/json"}),
            body: JSON.stringify(form)
        }

        const response = await fetch(ENROLLMENTS_URL, options);
        const data = await response.json();
        history.push("/courses")

    }
    
    useEffect(() => {
        fetch(`${COURSES_URL}${id}`)
        .then(response => response.json())
        .then(data => {
            setHireCourse(data);
        }) 
          
    }, [id])


    return (
        <div>
            <h3>Nombre del curso: {hireCourse.name}</h3>
            <h3>Duración: {hireCourse.duration} horas</h3>
            <h1>Total a pagar: {hireCourse.price} €</h1>
            <div>   
                <h4>Método de pago</h4>        
                <div>
                    <input type="radio" name="paymentMethod" id="paypalInput"></input>
                    <label for="paypalInput">Paypal</label>
                </div>
                <div>
                    <input type="radio" name="paymentMethod" id="creditCardInput" checked></input>
                    <label for="creditCardInput">Tarjeta de crédito</label>
                </div>
                <div>
                    <input type="radio" name="paymentMethod" id="bizumInput" required></input>
                    <label for="bizumInput">Bizum</label>
                </div>   
                <button onClick={handlePay}>Pagar</button>           
            </div>  
        </div>
    )
}
