import {useState, useEffect} from "react";
import {Link} from 'react-router';
import { supabase } from './supabase';
import Home from './Home'

export default function NavMenu()
{
    // Setup state items from database
    // Use this text as basis for nav links
    const [item, setItem] = useState([]);

    useEffect(
        () => {
            const fetchItem = async () => {
                const {data, error} = await supabase.from('scp').select('id, item')
                if(error)
                {
                    console.error(error);
                } else{
                    setItem(data); //Update component state with fetched data
                }
            };
            fetchItem();
        }, []
    )

    return(
        <nav>
            <Link to="/Home" className="home trapezium"><h3>Home</h3></Link>
            <Link to="/admin" className="admin trapezium"><h3>Admin Panel</h3></Link>
                <div className="dropdown">
                    {/* Toggle menu */}
                    <input type="checkbox" id="menu-toggle" style={{ display: 'none' }} />
                    <label htmlFor="menu-toggle" className="click-off-backdrop"></label>
                    {/* The button that the user clicks */}
                    <label htmlFor="menu-toggle" className="scplabel trapezium" style={{ cursor: 'pointer', display: 'block', marginTop: '1vw' }}>
                        <h3>SCP Subjects</h3>
                    </label>

                    {/* 3. The dropdown container */}
                    <div className="popup-menu">
                        {/* 1. Use 'items' for the array and 'scp' for the individual item */}
                        {item.map((scp) => (
                            /* 2. Use 'scp.id' as the key */
                            <div key={scp.id}> 
                                <Link to={`/item/${scp.id}`} className="trapezium">
                                    <h3>{scp.item}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
        </nav>
        
    )
}