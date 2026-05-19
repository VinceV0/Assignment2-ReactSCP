export default function Home()
{
    return(
    <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif'}}>
      <div className="flexbox" style={{ textAlign: 'center' }}>
      <h3 style={{ borderRadius: '0.5vw', border: '0.5vw solid #000000', padding: '0.5vw', width: '20vw', height: '2.5vw', marginLeft: '35vw', marginTop: '10vw', textAlign: 'center', fontSize: '2vw'}}>
        SCP FOUNDATION
      </h3>
      
      <h5 style={{ borderRadius: '1vw', border: '1vw solid #b22222', paddingBottom: '3vw', width: '50vw', height: '12vw', marginLeft: '20vw', marginTop: '1vw', marginBottom: '100vw', textAlign: 'center', fontSize: '10vw', paddingTop: '0vw', color: '#b22222', boxShadow: ' inset 5px 5px 10px rgba(0, 0, 0, 0.5) , 5px 5px 10px rgba(0, 0, 0, 0.5)', textShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)'}}>
        CLASSIFIED
      </h5>

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
