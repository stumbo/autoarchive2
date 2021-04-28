/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ArchiveManuallyMessageRequest } from '../sharedAll/Messages';
import { GetArchiveStatusMessageRequest } from '../sharedAll/Messages';
import { log } from '../sharedWebExtension/Logger';
import { AppInfoLogger } from './AppInfoLogger';
import { LogLevelInfoWebExtension } from '../sharedWebExtension/Logger';

async function startup(): Promise<void> {
  try {
    browser.runtime.onMessage.addListener(handleMessage);
    LogLevelInfoWebExtension.setGlobaleEnableInfoLogging(true);
    const appInfoLogger = new AppInfoLogger();
    await appInfoLogger.log();
    log.info('log file initialized');
  } catch (e) {
    log.error(e);
  }
}

function handleMessage(
  request: ArchiveManuallyMessageRequest | GetArchiveStatusMessageRequest,
  sender: RuntimeMessageSender,
  sendResponse: RuntimeMessageResponseFunction
): void {
  switch (request.message) {
    case 'archiveManually': {
      void browser.accounts.list().then((mailAccounts) => {
        const message = {
          accounts: mailAccounts.length,
          folders: mailAccounts[0].folders.length,
        };
        log.info(message.toString());
        for (const mailAccount of mailAccounts) {
          log.info('id: ' + mailAccount.id);
          log.info('name: ' + mailAccount.name);
          log.info('type: ' + mailAccount.type);
          log.info('Folders :');
          for (const folder of mailAccount.folders) {
            log.info('  path: ' + folder.path);
            log.info('  name: ' + folder.name);
            log.info('  type: ' + folder.type);
            log.info(' ----- ');
          }
        }
      });
      sendResponse(null);
    }
  }
}

// es-lint-disable-next-line @typescript-eslint/no-floating-promises
startup();
