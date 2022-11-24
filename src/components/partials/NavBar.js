import { Link } from "react-router-dom"



export default function NavBar(){

    return(
        <nav>
            <div className="navbar">
                <div className="links">
                    <div className="link-item">
                        <Link to= "/" style={{textDecoration: 'none'}}> <p>Home</p> </Link>
                    </div>
                    <div className="link-item">
                        <Link to= "/dungeondiver" style={{textDecoration: 'none'}} ><p>DungeonDiver</p></Link> 
                    </div>
                </div>
            </div>
        </nav>
    )
}