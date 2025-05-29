import Image from "next/image"
import Link from "next/link"
import Comments from "../components/Comments";

const Gallery = () => {

    const handlePortfolioClick = () => {
    const portfolioDropdown = document.querySelector('.dropdown-menu');
    const navbarCollapse = document.querySelector('#navbarNav');
  
    if (portfolioDropdown.classList.contains('show')) {
      portfolioDropdown.classList.remove('show');
      navbarCollapse.classList.remove('show');
    } else {
      portfolioDropdown.classList.add('show');
      navbarCollapse.classList.add('show');
    }
  };


  return (
    <div className="gridGalleryContainer">

    <div className="jumbotron jumbotron-fluid" id="gridGalleryJumbo">
      <div className="container text-center">
          <h1 className="display-4 mt-4">Aktualnie tworzę w</h1>
      </div>

    <div style={{display: "flex", marginTop:"2rem"}}>
    <Image src="/check.svg"alt="checked" height={20} width={20}/>
        <h5 className="jumboItems"> <strong>HTML</strong> + <strong>CSS</strong> + <strong>JavaScript</strong> - Znam dobrze i pomino przejścia na bibioteki oraz frameworki JavaScriptu, nadal się szkolę oraz piszę w czystym JS. </h5>
        </div>
      <hr className="my-10" />

      <div style={{display: "flex", marginTop:"2rem"}}>
      <Image src="/check.svg"alt="checked" height={20} width={20}/>
        <h5 className="jumboItems"> <strong>Bootstrap</strong> pozwala tworzyć wygląd strony szybko, a w razie potrzeby można go &quot;ręcznie&quot; dostosować, upiększyć. Oczywiście, potrzebna jest znajomość CSS, a z nim &quot;koleguje się&quot; już od dawna.    </h5>
        </div>
      <hr className="my-10" />

      <div style={{display: "flex", marginTop:"2rem"}}>
      <Image src="/check.svg"alt="checked" height={20} width={20}/>
        <h5 className="jumboItems"><strong>React</strong> lśni w złożonych aplikacjach, choć jego deklaratywny styl początkowo nie przypadł mi do gustu. Przekonałem się jednak do niego szybko, zważywszy na zasoby, które posiada i możliwości, jakie stwarza. <strong>Next.js</strong> jest nie tylko ulepszoną wersją Reacta, jest po prostu wybitny i coraz mocniej kusi mnie by wejść również na backend.</h5>
        </div>
        <hr className="my-10" />

        <div style={{display: "flex", marginTop:"2rem"}}>
      <Image src="/check.svg"alt="checked" height={20} width={20}/>
        <h5 className="jumboItems"><strong>Electron</strong> oraz <strong>Cordova</strong> sprawiają, że programista webowy wchodzi w &quot;god mode&quot; i serwuje aplikacje na komputery (Windows, masOS, Linux) poprzez Electron i na smartfony (Android, iOS) poprzez Cordovę. Dla klienta jest to ogromna oszczędność pieniędzy i czasu. Większość z nas korzysta ze stworzonych w electronie aplikacji, by wymienić choćby MS Teams (lista jest bardzo <Link href="https://www.electronjs.org/apps" target="_blank">długa</Link>). Cordova (słusznie lub nie - długi temat), traci na popularności, dlatego ucze się również React native.  </h5>
        </div>
      <hr className="my-10" />

        <p className="lead" style={{marginTop:"2rem"}}>Aktualnie skupiam się na front-end, ale widzę duży potencjał (i niezależność przy tworzeniu aplikacji) w technologiach back-endowych. Bardzo ciekawym kierunkiem rozwoju jest też analiza i wizualizacja danych. </p>

        <div style={{display: "flex", flexDirection: "column", flexWrap:"wrap"}}>
        <p className="lead" style={{marginTop:"2rem"}}> Zapraszam do odwiedzenia mojego</p>
        <Link href="#" className="btn btn-primary btn-lg"
         style={{marginLeft: "2rem", marginTop: "1rem", maxWidth: "150px"}}
         onClick={handlePortfolioClick}>
         portfolio
        </Link>
        </div>

    
  
    </div>

  
   
 


    <div className="container" style={{marginTop:"2rem", minWidth: "40%", marginLeft: "auto", marginRight:"1rem"}}>
    <h1 style={{textAlign: "center"}}>Obecnie</h1>  
      <div className="row">
        <div className="col -md-4 gridGallItem" >
          <img src="/grid/html.PNG" alt="Image 1" width={300} height={200}style={{width: "100%", height: "100%"}} />
        </div>
        <div className="col-md-4 gridGallItem" >
          <img src="/grid/css.PNG" alt="Image 2" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-4 gridGallItem">
          <img src="/grid/javascript.PNG" alt="Image 3" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 gridGallItem">
          <img src="/grid/bootstrap.PNG" alt="Image 4" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-4 gridGallItem">
          <img src="/grid/react.PNG" alt="Image 5" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-4 gridGallItem">
          <img src="/grid/next.PNG" alt="Image 6" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-6 gridGallItem">
          <img src="/grid/cordova.PNG" alt="Image 4" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
       
        <div className="col-md-6 gridGallItem">
          <img src="/grid/electron.PNG" alt="Image 6" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
      </div>
      <h1 style={{marginTop: "2rem", textAlign: "center"}}>Mocno zainteresowany</h1>    

      <div className="row">
        <div className="col -md-4 gridGallItem" >
          <img src="/grid/typescript.PNG" alt="Image 1" width={300} height={200}style={{width: "100%", height: "100%"}} />
        </div>
        <div className="col-md-4 gridGallItem" >
          <img src="/grid/node.PNG" alt="Image 2" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-4 gridGallItem">
          <img src="/grid/express.PNG" alt="Image 3" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>

        </div>

        <div className="row">
        <div className="col -md-4 gridGallItem" >
          <img src="/grid/mongo.PNG" alt="Image 1" width={300} height={200}style={{width: "100%", height: "100%"}} />
        </div>
        <div className="col-md-4 gridGallItem" >
          <img src="/grid/native.PNG" alt="Image 2" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>
        <div className="col-md-4 gridGallItem">
          <img src="/grid/data1.PNG" alt="Image 3" width={300} height={200} style={{width: "100%", height: "100%"}}/>
        </div>

        
        </div>

        <Comments collection="devAboutPage"/>
        
    </div>
    
    </div>
  )
}

export default Gallery


