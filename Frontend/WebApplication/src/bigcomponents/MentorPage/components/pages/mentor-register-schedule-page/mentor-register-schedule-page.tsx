import MentorTeachingRegister from "../../molecules/teaching-register/teaching-register"
import '../../mentor-general.scss'
import TeachingRegisterNote from "../../molecules/teaching-register-note/teaching-register-note"


function MentorRegisterSchedule() {
    return (
        <>
        <MentorTeachingRegister />
        <TeachingRegisterNote />        
        </>
    )
}

export default MentorRegisterSchedule