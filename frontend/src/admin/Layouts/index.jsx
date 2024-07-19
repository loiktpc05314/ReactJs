import Nav from './Nav/Nav';
import Sidebar from './Sidebar/Sidebar';

function AdminLayouts({ children }) {
	return (
		<section>
			<Nav />

			<Sidebar />

			

			<div className="p-4 sm:ml-64">
				<div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
					{children}
				</div>
			</div>
		</section>
	);
}

export default AdminLayouts;
