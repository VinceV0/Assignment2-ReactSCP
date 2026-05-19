import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { supabase } from './supabase'
import './mystyle.css'

export default function ItemDetail()
{
    // id: useParams is a React Router tool that extracts the dynamic value from the website's current URL address bar and saves it into a variable called 'id'
    const {id} = useParams();
    // itemData: A React state variable that holds the information for a single SCP subject fetched from the Supabase database.
    // Alongside a setter function setItemData to update it, starting with an initial value of null.
    const [itemData, setItemData] = useState(null);
    useEffect(
        () => {
            const fetchItemDetails = async () =>
            {
                // const {data, error}: This uses JavaScript destructuring to unpack the response from Supabase into two separate, ready-to-use variables right away.
                // await: This pauses the code execution right here until the database finishes sending the data back over the network.
                // .from('scp').select('*'): This targets the database table named 'scp' and tells it to select all available columns.
                // .eq('id', id): Acts as a search filter, telling the database to only pull the row where the table's id column matches the id from the website's URL.
                // .single(): This converts the database response from a list array into one individual object so you can access the data fields directly without looping.
                const {data, error} = await supabase.from('scp').select('*').eq('id', id).single();
                if(error){
                    console.error(error);
                }
                else{
                    setItemData(data); // Update this component state with fetched data
                }
            }
            fetchItemDetails()
        }, [id]
    )

    return(
        <div>
            {
                itemData ? (
                    <>
                        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif'}}>
                        <div className="flexbox" style={{ textAlign: 'center' }}>
                            <div>
                            <div style={{paddingBottom: '16vw'}}>
                                <div>
                                <img className='image' src={itemData.image} alt={itemData.item}/>
                                </div>
                                <h1><b>Item #:</b>{itemData.item}</h1>
                                <h2><b>Object Class:</b> {itemData.class}</h2>
                            </div>

                            <h3>Special Containment Procedures</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{itemData.containment}</p>

                            <h3>Description</h3>
                            <p style={{ whiteSpace: 'pre-line' }}>{itemData.description}</p>
                            <br></br><br></br>
                            </div>
                        <footer style={{ padding: '1vw 5vw', textAlign: 'center', opacity: 0.7 }}>
                            <span>
                            ©Vince Vagay | 2026
                            <a style={{ color: '#000000', paddingLeft: '23vw' }} href="#top">Back to top</a>
                            </span>
                        </footer>
                        </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )
            }
        </div>
    )
}