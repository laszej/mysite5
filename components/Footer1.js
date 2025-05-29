import React from 'react'
import Link from 'next/link'

const Footer1 = () => {
  return (
    <footer className="bg-dark text-white py-10" id="footer" style={{width: "100%"}}>
    <div className="container">
      <div className="row">
        <div className="col-md-4 my-1">
          <h3>Krótko o mnie</h3>
          <p style={{letterSpacing:"0.05rem"}}>Pracuje według paradygmatu Javascript Everywhere.</p>
          <p style={{letterSpacing:"0.05rem"}}>Piszę kod raz, który następnie działa w przeglądarce i w aplikacjach na: iOS | Android | Windows | macOs | Linux</p>
        </div>
        <div className="col-md-4 my-1">
          <h3>Dodaj komentarz</h3>
          <ul className="list-unstyled">
          <p style={{letterSpacing:"0.05rem"}}>Jeśli chcesz przekazać swoje wrażenia dotyczące strony, portfolio lub zadać jakieś pytanie, możesz to zrobić bezpośrednio na stronie</p>
            <h4><Link href="/comments">komentarze</Link></h4>
          </ul>
        </div>
        <div className="col-md-4 my-1">
          <h3>Kontakt</h3>
          <p>Mail</p>
          <h5><Link href="mailto:stanislawlaskowski87@gmail.com">stanislawlaskowski87@gmail.com</Link></h5>
          <p>Telefon</p>
          <p>504 940 279</p>
          
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer1