import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MessagesPage } from '../entities/message/ui/MessagesPage'
import { LoginPage } from '../pages/login/ui/LoginForm'

export const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<LoginPage />} />
			<Route path='/messages' element={<MessagesPage />} />
		</Routes>
	</BrowserRouter>
)
