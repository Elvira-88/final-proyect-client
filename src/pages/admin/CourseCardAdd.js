import { useForm } from "../../hooks/useForm";
import { COURSES_URL } from "../../config/config";
import {useState} from "react";

export default function CourseCardAdd({teacher}) {

    const formInitialState = {name: "", lastName: "", description: "", course: ""};    
    const [form, handleChange] = useForm(formInitialState);
    const [img, setImg] = useState('');

    const handleImgUpload = e => setImg(e.target.files[0]);
 
    const handleSubmit = async e => {
        e.preventDefault();
        
        const options = {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(form)
        }

        const response = await fetch(COURSES_URL, options);
        const data = await response.json();

        const formImg = new FormData();
        formImg.append("avatar", img);

        const optionsImg = {
            method: "POST",
            body:formImg
        }

        const responseImg = await fetch(`TEACHERS_URL/${data.id}`, optionsImg);
        const dataImg = await responseImg;
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="avatarInput">Foto</label>
                    <input onChange={handleImgUpload} name="avatar" type="file" id="avatar" accept="png jpg jpeg"/>
                </div>
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
                    <input onChange={handleChange} value={form.course} name="course"/>
                </div>             
               
            </form>
        </div>
    )
}