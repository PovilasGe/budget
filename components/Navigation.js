import { ImStatsBars } from "react-icons/im"

function Navigation() {
    return (
        <header className="container max-w-2xl px-6 py-6 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
                        <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80" alt="image of person" />
                    </div>
                    <small>hi Povilas</small>
                </div>
                <nav className="flex items-center gap-2">
                    <div><ImStatsBars className="text-2xl" /></div>
                    <div>
                        <button className="btn btn-danger">Sign out</button>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navigation
