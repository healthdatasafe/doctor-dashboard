import { useTranslation } from 'react-i18next';
import { PatientsTable } from '@/components/PatientsTable';
import { QuestionnaryLayout } from '@/routes/layouts/QuestionnaryLayout';
import type Collector from 'hds-lib-js/types/appTemplates/Collector';
import { useState } from 'react';

export default function PatientsTab() {
  const { t } = useTranslation();
 
  const [patientRef, setPatientRef] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function showErrorMessage(message: string) {
    const patientRefInput = document.getElementById('patientRef') as HTMLObjectElement;
    patientRefInput!.setCustomValidity(message);
  }

  async function _createSharingLink(collector: Collector) {
    try {
      console.log('## Clicked >>', patientRef);
      const futureName = (patientRef + '').trim();
      if (futureName.length < 5) {
        throw new Error('Sharing title too short (4 char min)');
      }
      // check if patientRef in not yet taken
      const matchingInviteFound = (await collector.getInvites()).find((i) => (i.displayName === futureName));
      if (matchingInviteFound != null) {
        throw new Error('An invite with a similar patient reference exists');
      }

      const options = { customData: { hello: 'bob' } };
      const invite = await collector.createInvite(futureName, options);
      const inviteSharingData = await invite.getSharingData();
      console.log('## createInvite newInvite and sharing', { invite, inviteSharingData });
      setPatientRef(''); // clearup field
      setRefreshKey((k) => k + 1); // refresh list
    } catch (e: any) {
      showErrorMessage(e.message);
    }
    setButtonDisabled(false);
  }

  return (
    <QuestionnaryLayout
      render={(collector: Collector) => {
        const createSharingLink = async () => { // used to pass "collector"
          setButtonDisabled(true);
          _createSharingLink(collector);
          
        };
        if (collector.statusCode !== 'active') {
          return (
            <article className="my-2 prose">
              <h3 className="italic">This questionnary has not been published yet</h3>
            </article>
          ) 
        }
        return (
          <>
            <article className="my-2 prose">
              <h3 className="italic">{t('createSharingLink')}</h3>
            </article>
            <form>
              <label
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="search"
              >
                {t('createSharingLinkPlaceholder')}
              </label>
              <div className="relative w-1/2">
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  id="patientRef"
                  onInput={e => setPatientRef((e.target as HTMLTextAreaElement).value)}
                  placeholder={t('createSharingLinkPlaceholder')}
                  required
                  type="text"
                />
                <button
                  className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-700 dark:text-gray-300 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                  onClick={createSharingLink}
                  disabled={isButtonDisabled}
                >
                  {t('create')}
                </button>
              </div>
            </form>

            <PatientsTable collector={collector} refreshKey={refreshKey} />
          </>
        );
      }}
    />
  );
}
