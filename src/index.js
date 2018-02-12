import store from './store';

function renderMailboxList() {
  var mailboxes = Object.keys(store.mailboxes);

  return mailboxes.map(function(mailbox){
  console.log(mailbox);
    return `
    <li>
      <button class="menu-item" type="button">${mailbox}</button>
    </li>
    `;
  }).join('');
}

function renderMailboxMenu() {
  console.log(mailboxMenu, 'test');
  var mailboxMenu = `
    <ul class="mailbox-list">
      ${renderMailboxList()}
    </ul>
  `;

  var container = document.querySelector('.mailbox-list-container');
  if (container != null) container.innerHTML = mailboxMenu;
}

function renderThreadList() {
  var inbox = store.mailboxes.INBOX;
  var threadIDs = inbox.threadIds;
  var messages = store.messages;

  return threadIDs.map((id) => {
    var messageDetails = messages[id].payload.headers;
    var sender = messageDetails.find(detail => detail.name === 'From').value;
    var timestamp = messageDetails.find(detail => detail.name === 'Date').value;
    var subject = messageDetails.find(detail => detail.name === 'Subject').value;
    var [lastMessage] = store.threads[id].messages.slice(-1);
    var snippet = messages[lastMessage.id].snippet;
    return `
    <li>
      <button class="email-item" type="button">
        <div class="sender-details">
          <p>${formatSender(sender)}</p>
          <span class="timestamp">${timestamp}</span>
        </div>
        <p class="email-subject">${subject}</p>
        <p class="snippet">${snippet}</p>
      </button>
    </li>
    `;
  }).join('');
}

function formatSender(sender) {
  return sender.split(" \\")[0];
}

function renderInboxMenu() {
  var inboxMenuContents = `
    <h2 class="email-header">Inbox</h2>
    <ul class="email-list">
      ${renderThreadList()}
    </ul>
  `;

  var container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = inboxMenuContents;
}

renderInboxMenu();
renderMailboxList();

renderMailboxMenu();