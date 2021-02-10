/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ArchiveManuallyMessageRequest } from "../sharedAll/Messages";
import { GetArchiveStatusMessageRequest } from "../sharedAll/Messages";

function startup(): void {
  try {
    browser.runtime.onMessage.addListener(handleMessage);
  } catch (e) {
    //log.exception(e);
    console.log(e);
  }
}

function handleMessage(
  request: ArchiveManuallyMessageRequest | GetArchiveStatusMessageRequest,
  sender: RuntimeMessageSender,
  sendResponse: RuntimeMessageResponseFunction
): void {
  switch (request.message) {
    case "archiveManually": {
      void browser.accounts.list().then((mailAccounts) => {
        const message = {
          accounts: mailAccounts.length,
          folders: mailAccounts[0].folders.length,
        };
        console.log(message);
        for (const mailAccount of mailAccounts) {
          console.log("id: " + mailAccount.id);
          console.log("name: " + mailAccount.name);
          console.log("type: " + mailAccount.type);
          console.log("Folders :");
          for (const folder of mailAccount.folders) {
            console.log("  path: " + folder.path);
            console.log("  name: " + folder.name);
            console.log("  type: " + folder.type);
            console.log(" ----- ");
          }
        }
      });
      sendResponse(null);
    }
  }
}

// es-lint-disable-next-line @typescript-eslint/no-floating-promises
startup();
