import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './App.css';
// import { jwtDecode } from 'jwt-decode';
import { publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './Components/Layouts/DefaultLayout';
import AdminLayouts from './admin/Layouts';
import NotFound from './Components/NotFound/NotFound';
import { checkroleadmin } from './Service/Auth/Api';
import { useEffect, useState } from 'react';
import Loading from './admin/Components/Loading/Loading';

function App() {
	const [isAdmin, setIsAdmin] = useState(null);

	useEffect(() => {
		  const fetchRole = async () => {
			const check = await checkroleadmin();
			setIsAdmin(check);
		  };
		  fetchRole();
		}, []);
	  
		if (isAdmin === null) {
		 
		  return<Loading/>;
		}
	return (
		<Router>
			<Routes>
				{publicRoutes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						element={
							<DefaultLayout>
								<Helmet>
									<title>{route.title}</title>
								</Helmet>
								<route.component />
							</DefaultLayout>
						}
					/>
				))}
				
				{isAdmin &&  <>
					{adminRoutes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						element={
							<AdminLayouts>
								<Helmet>
									<title>{route.title}</title>
								</Helmet>
								<route.component />
							</AdminLayouts>
						}
					/>
				))}</>} 
				
				
				<Route path="*" element={<NotFound />} />
				
			</Routes>
		</Router>
	);
}

export default App;
