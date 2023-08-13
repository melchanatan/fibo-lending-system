import '@styles/global.css';

// import Nav from '@components/Nav';
// import Provider from '@components/Provider';
import Footer from '@components/Footer';

export const metadata = {
    title: "Fra161 lending system",
    description: "Fibo robotic exploration equipment lending website.",
}

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
        <head>
            <link rel="icon" href="/favicon.png" />
        </head>
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
            
        </body>
    </html>
    
  )
}

export default Rootlayout;