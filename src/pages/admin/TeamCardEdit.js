import { useForm } from "../../hooks/useForm";
import { TEACHERS_URL } from "../../config/config";
import { useAuthContext } from "../../context/AuthContext";
import {useState, useEffect} from "react";

export default function TeacherCardEdit({teacher, courses}) {

    const formInitialState = {name: teacher.name, lastName: teacher.lastName, description: teacher.description, course_id: teacher?.course_id};    
    const [form, handleChange] = useForm(formInitialState);

    const { getAuthHeaders } = useAuthContext();

    const handleSubmit = async e => {
        e.preventDefault();
        
        const options = {
            method: "PUT",
            headers: getAuthHeaders({"Content-type": "application/json"}),
            body: JSON.stringify(form)
        }

        const response = await fetch(TEACHERS_URL, options);
        const data = await response.json();

    }

    const [courses, setCourses] = useState([]);

    const COURSES_URL = "http://localhost:8000/api/courses";

    useEffect(() => {
        fetch(COURSES_URL)
        .then(response => response.json())
        .then(data=>setCourses(data))
    }, [])


    return (
    <div>
            <h3>Modificación de algún dato de un profesor</h3>
        <form onSubmit={handleSubmit}>
            {/* <div>
                <label for="avatarInput">Foto</label>
                <input onChange={handleImgUpload} name="avatar" type="file" id="avatar" accept="png jpg jpeg"/>
            </div> */}
            <div>
                <label for="nameInput">Nombre</label>
                <input onChange={handleChange} value={form.name} name="name"/>
            </div>
            <div>
                <label for="lastNameInput">Apellidos</label>
                <input onChange={handleChange} value={form.lastName} name="lastName"/>
            </div>
            <div>
                <label for="descriptionInput">Descripción</label>
                <input onChange={handleChange} value={form.description} name="description"/>                    
            </div>
            <div>
                <label for="courseInput">Curso</label>
                <select onChange={handleChange} value={form.course_id} name="course_id">
                {courses.map(course => {
                    return (
                        <option value={course.id}>{course.name}</option>
                    )                        
                })}
                </select> 
            </div>   
            <button>Actualizar los datos</button>
           
        </form>
    </div>
    
    )
}
