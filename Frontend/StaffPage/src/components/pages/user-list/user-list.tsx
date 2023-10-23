import StaffHeader from "../../organisms/header/header"
import UserListTemplate from "../../templates/user-list/user-list"

function UserListPage() {
    return (
        <div className="page-container">
            <header>
                <StaffHeader />
            </header>
            <body>
                <UserListTemplate />
            </body>
            <footer>

            </footer>
        </div>
    )
}

export default UserListPage