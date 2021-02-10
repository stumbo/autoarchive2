/* eslint-disable prefer-arrow/prefer-arrow-functions */
//TODO: temporarily or permanently?

import { log } from "../sharedWebExtension/Logger";
import { ArchiveManuallyMessageRequest } from "../sharedAll/Messages";

console.log("Auto Archive 2");

async function onManualArchive(): Promise<void> {
  console.log("button push");
  const message: ArchiveManuallyMessageRequest = { message: "archiveManually" };
  await browser.runtime.sendMessage(message);
  window.close();
}

function onLoad(): void {
  try {
    $("#archive").click(onManualArchive);
  } catch (e) {
    log.errorException(e);
    throw e;
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
$(onLoad);
