# **Auto Archive II**

2020-05-26 Need to get dialog box working correctly.  Button appears in box
but does not open - instead an error occurs.

2020-05-28 Look at extension pages.  This appears to be the right approach

2020-07-20:  Refocus on rewriting the HTML pages.  Move to standard html and use Thunderbird's css for getting a 
consistent look and feel.

2020-07-21:  Use Photon style guide, find components at:  <https://protocol.mozilla.org/patterns/atoms/buttons.html>#
Need to convert for css to scss, find default style sheets at(?):  <https://github.com/thundernest/style-guide/tree/master/_sass>

Done -copy existing scss files into my directory structure -- hacky right now
need to figure out the right way.  Also, need to bind the scss files correctly, so they are served up.

2021-01-31:  Picking this up again.
Where to start?  Let's figure out the overall flow.  Separate the front-end from the back-end.  Can we get the
back-end working independently of focusing on how Thunderbird does its UI?

2021-02-01:  JSON Format better defined from an example.
Internally, a data structure should hold all the information.  We
should read and write JSON to store the data, but all manipulation
should be of a well-defined data structure.

- define the rule data structure
  - What limitations does thunderbird put on us here?
- Interactions with mail folders?
  - What has changed or does the same interface work?
  - Validate ability to copy, move and delete mailnotes via an api
- Identification of mailnotes to act on.
  - Has the interface changed?
- Develop clean modules to do each piece of this work.

2021-02-10:  Move to typescript.  Leverage work done by autoarchiveReloaded
and create a framework in typescript.  Cover interactions with thunderbird
are in place.  autoarchiveReloaded provides a simple archive function that
blindly archives based on number of days old.

Use this as the foundation and integrate autoArchive2 in as an advanced tab.
This will give us the best of both worlds.  Potential path to merge the two
applications.

- Continue fleshing out the basic archive application.
  - Build Options window
  
2021-02-27: Moved to angular.  Need to rework dialog boxes and remove references to JQuery.

2021-03-06:  Rebuilt and running with Angular.  Loads up in Thunderbird.  Base infrastructure appears to be up and 
working.


---

## To Do

- Better define a rule - right now it's an object with no form, it's
constructed from a bunch of json.  
  - Can we add in some form and validation?
  - Can we use this to more cleanly separate the front and backends?
- Look into code cleanup.  The routines are long and hard to follow.  Break them into smaller functions with
  well-defined functionality.
  
### What functions are supplied

- Create Rules
  - Action
    - Archive
    - Delete
    - Copy
    - Move
    - any others?
  - Source Folder
    - How are these defined?
       Folders are defined in 3 parts:
      - ```MailAccount.type``` Account Type: imap, pop3, or nntp (?)
      - ```MailAccount.name``` Account Name:  Human readable account name  
      - ```MailAccount.folder.path``` Folder Name:  the email folder name, I assume subfolders are just the
          individual directories concatenated together 
    - How are multiple mailboxes handled?  Can they be identified?
  - Scope
    - Does the rule apply to the current _Source Folder_ only or does it apply to any subdirectories?  Can the
       depth of recursion be controlled?
  - Destination Folder
    - If a move/copy/archive operation where does the result go?
  - Filters
    - From
    - Subject
    - Age
    - Others
  - Organize Rules
    - Rules are executed sequentially.  
    - Move Rule Up or Down
    - Delete Rule
- Execute Rules
  - Dry Run - Test running the rules but don't change anything
  - Run - execute the rules in the specified order
- Backgroup Tasks
  - Setup rules to execute on a regular basis

### What is the format of a rule?

Rules are defined using JSON.  autoArchiveUtil.createOneRule defines creating a rule, and implicitly, the JSON 
format of rules:

```json
[
  {
    "enable": true,
    "action": "move",
    "src" : "imap://accountName%40mail.com/INBOX",
    "sub" : 0,
    "dest" : "mailbox://nobody@Local%20Folders/Inbox",
    "age" : 30
  }
]
```

The above rule moves (archives) files from the imap account's inbox to
the local folder, also named, inbox, 30 days after it was received.

Order or rules in the JSON file implies the order of execution.
Processing will start with the first rule and progress to the last one.

#### Valid Values

| Key       | Attribute Values |
| --------- | ---------------- |
| enable    | true, false 
| action    | archive, copy, delete, move
| src       | source mail folder
| sub       | scope of the rule
| dest      | destination mail folder
| from      | email sender name/address
| recipient | email reciepient (assumablely one of potentially many)
| subject   | email subject (exact match?)
| size      | minimum size of email, move all emails over n K
| tags      | unknown
| age       | age of email in days

### Rule Execution

Rules are executed by the code in autoArchiveService.searchListener.
It takes the rule along with the source and destination folder and
looks for mailnotes that meet the rule.  Upon finding a message it
executes the rule and continues on through the source folder.

### How are background tasks defined?

### Integration into current Thunderbird organization?

- User Interface
- Activate the User Interface  
- How is data stored and managed
- Run or do a test run
- Set up the background task schedule
- Notifications
  - When a background task runs
  - When using the tool in an interactive session
