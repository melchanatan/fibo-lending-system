import RootLayout from '@app/Layout';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

const Admin = ({children}) => {
    return (
        <Provider>
            <RootLayout>
                <Nav />
                {children}
            </RootLayout>
        </Provider>
    );
  };
  
export default Admin;