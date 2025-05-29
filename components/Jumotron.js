import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Jumbotron() {
  const router = useRouter();

  return (
    <div className="jumotron">
      <div className="jumbotron jumbotron-fluid" id="jumbotron">
        <div className="container">
          <h1 className="display-4" style={{marginBottom: "1rem"}}>Technologie webowe</h1>
          <p className="lead">    Witam wszystkich serdecznie na mojej stronie! Jestem programistą korzystającym z technologii webowych do tworzenia: </p>
        <ul style={{marginLeft: "auto"}}>

          <li style={{display:"flex"}}>
            <Image src="/check.svg"
           alt="checked"
            height={20}
             width={20}/>
            <h5 className ="jumboItems">Stron internetowych</h5>
             </li>

          <li style={{display:"flex"}}>
            <Image src="/check.svg"
             alt="checked"
              height={20} 
              width={20}/>
              <h5 className="jumboItems">Aplikacji webowych</h5>
               </li>

          <li style={{display:"flex"}}>
            <Image src="/check.svg"
             alt="checked"
              height={20}
               width={20}/>
               <h5 className="jumboItems">Aplikacji mobilnych</h5>
                </li>

          <li style={{display:"flex"}}>
            <Image src="/check.svg"
             alt="checked"
              height={20}
               width={20}/>
               <h5 className="jumboItems">Aplikacji desktopowych</h5> </li>

    </ul>
    <div style={{display:"flex", flexWrap: "wrap"}}>
          <h5 style={{marginTop: "0.5rem"}}>Zapraszam do zapoznania się z tym <Link href="/about">co tworzę</Link></h5>
          </div>
        </div>
      </div>
    </div>
  );
}
