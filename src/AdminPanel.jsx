import {useState, useEffect} from "react"
import { supabase } from "./supabase"
import './mystyle.css'

export default function AdminPanel()
{
    // Our useState variables or component states
    // items holds all of the individual SCP subject records once they are fetched from your Supabase database.
    const [items, setItems] = useState([])
    // A state variable named newRecord to act as a blank temporary form container
    // Alongside an updater function setNewRecord
    const [newRecord, setNewRecord] = useState(
        {
            item: '',
            class: '',
            containment: '',
            description: '',
            image: ''
        }
    )
    // Stores one single SCP subject object - but only while an administrator is actively clicking edit and modifying it.
    const [editRecord, setEditRecord] = useState(null)

    // This automatically fetches all SCP records from Supabase exactly once when the component loads and saves them into the state array to display on the screen.
    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('scp').select('*');
            if (error) {
                console.error(error);
            } else {
                setItems(data);
            }
        };
        fetchItems();
    }, []);

    // Function to add a new record
    const addRecord = async () => {
        await supabase.from('scp').insert([newRecord])
        setNewRecord({item: '', class: '', containment: '', description: '', image: ''})
        // Refresh component display on screen
        window.location.reload()
    }

    // Function to delete a record with confirmation - Gemini for confirm deleting - Vince
    const deleteRecord = async (id) => {
        // Show confirmation dialog
        const confirmed = window.confirm("Are you sure you want to delete this SCP record? This action cannot be undone.");

        // If the user clicks "OK", proceed with deletion
        if (confirmed) {
            const { error } = await supabase.from('scp').delete().eq('id', id);
            
            if (error) {
                alert("Error deleting record: " + error.message);
            } else {
                // Refresh component display on screen
                window.location.reload();
            }
        }
        // If they click "Cancel", nothing happens
    };

    // Prepare a record for updating
    const startEditing = (item) => {
        setEditRecord(item)
    }

    // Save the above edited record
    const saveEdit = async (id) => {
        await supabase.from('scp').update(editRecord).eq('id', id)
        setEditRecord(null) // Clear edit state after saving
        window.location.reload() // Refresh component display on screen
    }

    return(
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0,padding: 0}}>
                <div className="flexbox" style={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1 style={{color:'black'}}>Admin Section</h1>
                        <h2 style={{color:'black'}}>Add New Record</h2>
                        {/* Creates a controlled input field that displays its text directly from React state and completely overwrites that state with the updated user input every single time a key is pressed. */}
                        <input value={newRecord.item} onChange={(e)=>setNewRecord({...newRecord, item: e.target.value})} placeholder="Item" />
                        <input value={newRecord.class} onChange={(e)=>setNewRecord({...newRecord, class: e.target.value})} placeholder="Class"/>
                        <input value={newRecord.containment} onChange={(e)=>setNewRecord({...newRecord, containment: e.target.value})} placeholder="Containment"/>
                        <input value={newRecord.description} onChange={(e)=>setNewRecord({...newRecord, description: e.target.value})} placeholder="Description"/>
                        <input value={newRecord.image} onChange={(e)=>setNewRecord({...newRecord, image: e.target.value})} placeholder="Image Link"/>
                        <br></br>
                        <button onClick={addRecord}>Add Record</button>
                        
                        <h2 style={{color:'black'}}>Edit record</h2>
                        <ul>
                            {
                                // loops through the array of SCP database records (items) and dynamically generates a new HTML list item to edit
                                items.map(
                                    (item) => (
                                        <li key={item.id}>
                                            {
                                                // This line checks if an SCP subject is currently selected for editing by comparing its ID to the active loop item's ID
                                                editRecord && editRecord.id == item.id ? 
                                                // Edit Record form
                                                (<div className="edit">
                                                    <input value={editRecord.item} onChange={(e)=>setEditRecord({...editRecord, item: e.target.value})}  placeholder="Item" />
                                                    <input value={editRecord.class} onChange={(e)=>setEditRecord({...editRecord, class: e.target.value})}  placeholder="Class" />
                                                    <input value={editRecord.containment} onChange={(e)=>setEditRecord({...editRecord, containment: e.target.value})}  placeholder="Containment" />
                                                    <input value={editRecord.description} onChange={(e)=>setEditRecord({...editRecord, description: e.target.value})}  placeholder="Description" />
                                                    <input value={editRecord.image} onChange={(e)=>setEditRecord({...editRecord, image: e.target.value})} placeholder="Image Link" />
                                                    <br></br>
                                                    <button onClick={()=>saveEdit(item.id)}>Save</button>
                                                    <button onClick={()=>setEditRecord(null)}>Cancel</button>
                                                </div>) :
                                                (<div className="edit">
                                                    <h3 style={{fontSize: '3vw'}}>{item.item}</h3>
                                                    <button onClick={()=>startEditing(item)}>Edit</button>
                                                    <button onClick={()=>deleteRecord(item.id)}>Delete</button>
                                                </div>)
                                            }
                                        </li>
                                    )
                                )
                            }
                        </ul>
            
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        <footer style={{ padding: '1vw 5vw', textAlign: 'center', opacity: 0.7 }}>
        <span>
          ©Vince Vagay | 2026
          <a style={{ color: '#000000', paddingLeft: '23vw' }} href="#top">Back to top</a>
        </span>
        </footer>
        </div>
        </div>
    )
}