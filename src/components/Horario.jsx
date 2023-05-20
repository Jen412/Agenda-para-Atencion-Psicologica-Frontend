import useAuth from "../hooks/useAuth"
import Spinner from "./Spinner";

const Horario = ({idUsuario}) => {
    const {usuarioM, usuarioV, horarioUsuarioV, horarioUsuarioM, cargando} = useAuth();
    
    const validateI = (hora, dia) =>{
        let valid = false;
        if (usuarioM.idUsuario ===idUsuario) {
            horarioUsuarioM.map(horario =>{
                if (dia ===horario.diaSemana) {
                    if (hora === horario.horaEntrada || hora === horario.horaSalida) {
                        valid =true;
                    }
                    else {
                        valid = false;
                    }
                }
            });
        }else if (usuarioV.idUsuario ===idUsuario){
            horarioUsuarioV.map(horario =>{
                if (dia ===horario.diaSemana) {
                    if (hora === horario.horaEntrada || hora === horario.horaSalida) {
                        valid =true;
                    }
                    else {
                        valid = false;
                    }
                }
            });
        }
        return valid;
    }

    const validateF = (hora, dia)=>{
        let valid = false;
        if (usuarioM.idUsuario ===idUsuario) {
            horarioUsuarioM.map(horario =>{
                if (dia ===horario.diaSemana) {
                    if (hora === horario.horaSalida) {
                        valid =true;
                    }
                    else {
                        valid = false;
                    }
                }
            });
        }else if (usuarioV.idUsuario ===idUsuario){
            horarioUsuarioV.map(horario =>{
                if (dia ===horario.diaSemana) {
                    if (hora === horario.horaSalida) {
                        valid =true;
                    }
                    else {
                        valid = false;
                    }
                }
            });
        }
        return valid;
    }

    const validateHorario=(hora, dia)=>{
        let validateInitialHour = validateI(hora, dia);
        let validateFinalHour = validateF(hora, dia);
        if (validateInitialHour ===true && validateFinalHour === false) {
            return "I";
        }
        else if(validateFinalHour === true){
            return "F";
        }
    }

    if (cargando) {
        return <Spinner/>;
    }

    return (
        <table className="rounded text-sm text-gray-500 dark:text-gray-400 my-5 table-auto h-[30rem] w-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='top-0'>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Horario</th>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Lunes</th>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Martes</th>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Miercoles</th>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Jueves</th>
                    <th scope='col' className='p-x6 py-3 z-10 top-0 w-1/6'>Viernes</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"8:00": "15:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"08:00:00": "15:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"08:00:00": "15:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"08:00:00": "15:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"08:00:00": "15:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"08:00:00": "15:00:00","viernes")}  </p></td>
                
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"9:00": "16:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"09:00:00": "16:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"09:00:00": "16:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"09:00:00": "16:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"09:00:00": "16:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"09:00:00": "16:00:00","viernes")}  </p></td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"10:00": "17:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"10:00:00": "17:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"10:00:00": "17:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"10:00:00": "17:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"10:00:00": "17:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"10:00:00": "17:00:00","viernes")}  </p></td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"11:00": "18:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"11:00:00": "18:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"11:00:00": "18:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"11:00:00": "18:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"11:00:00": "18:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"11:00:00": "18:00:00","viernes")}  </p></td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"12:00": "19:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"12:00:00": "19:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"12:00:00": "19:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"12:00:00": "19:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"12:00:00": "19:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"12:00:00": "19:00:00","viernes")}  </p></td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"13:00": "20:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"13:00:00": "20:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"13:00:00": "20:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"13:00:00": "20:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"13:00:00": "20:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"13:00:00": "20:00:00","viernes")}  </p></td>
                </tr>
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>{usuarioM.idUsuario === idUsuario?"14:00": "21:00"}</td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"14:00:00": "21:00:00","lunes")}    </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"14:00:00": "21:00:00","martes")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"14:00:00": "21:00:00","miercoles")}</p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"14:00:00": "21:00:00","jueves")}   </p></td>
                    <td scope='row' className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'><p className="font-black text-xl">{validateHorario(usuarioM.idUsuario === idUsuario?"14:00:00": "21:00:00","viernes")}  </p></td>
                </tr>
            </tbody>
        </table>
    )
}

export default Horario
