import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppContextProvider } from './context/AppContext';
import Details from '@/routes/questionaryTabs/DetailsTab';
import Patients from '@/routes/questionaryTabs/PatientsTab';
import Sections from '@/routes/questionaryTabs/SectionTab';
import Welcome from '@/routes/questionaryTabs/Welcome';
import SidebarLayout from '@/routes/layouts/SidebarLayout';
import PatientData from '@/routes/patients/PatientData';
import Settings from '@/routes/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route element={<Welcome />} path="/" />
            <Route element={<Welcome />} path="forms" />
            <Route element={<Details />} path="forms/:questionaryId/details" />
            <Route
              element={<Patients />}
              path="forms/:questionaryId/patients"
            />
            <Route
              element={<Sections />}
              path="forms/:questionaryId/:sectionId"
            />
            <Route
              element={<PatientData />}
              path="patients/:questionaryId/:inviteId"
            />
            <Route element={<Settings />} path="settings" />
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}
