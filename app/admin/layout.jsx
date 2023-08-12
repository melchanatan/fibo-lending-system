import RootLayout from '@app/layout';
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