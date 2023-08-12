import '@styles/global.css';

// import Nav from '@components/Nav';
// import Provider from '@components/Provider';
import Footer from '@components/Footer';

export const metadata = {
    title: "Fra161",
    description: "lend stuff"
}

const Rootlayout = ({ children }) => {
  return (
    <html>
        <body>
            <div>
                {/* <Provider> */}
                <div className='main'>
                    {/* <div className='gradient'/> */}
                </div>
                
                <main className='app'>
                    {/* <Nav /> */}
                    {children}
                </main>
                {/* </Provider> */}
            </div>
            
            <Footer />
        </body>
    </html>
    
  )
}

export default Rootlayout;