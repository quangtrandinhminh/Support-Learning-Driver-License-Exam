import StaffHeader from "../../organisms/header/header"
import UserListTemplate from "../../templates/user-list/user-list"

function UserListPage() {
    return (
        <>
            <header>
                <StaffHeader />
            </header>
            <body>
                <UserListTemplate />
            </body>
            <footer>

            </footer>
        </>
    )
}

export default UserListPage