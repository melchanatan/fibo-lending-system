import RootLayout from '@app/layout';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import Footer from '@components/Footer';

const Admin = ({children}) => {
    return (
        <Provider>
            <RootLayout>
                <Nav />
                {children}
                <Footer />
            </RootLayout>
        </Provider>
    );
  };
  
export default Admin;