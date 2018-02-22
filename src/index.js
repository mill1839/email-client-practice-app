import store from './store';

function renderMailboxList() {
  var mailboxes = Object.keys(store.mailboxes);

  return mailboxes.map((mailbox) => {
    return `
    <li class="mailbox-item">
      <button class="menu-item" type="button" data-mailbox="${mailbox}">${formatMailbox(mailbox)}</button>
    </li>
    `;
  }).join('');
}

function renderMailboxMenu() {
  var mailboxMenu = `
    <ul class="mailbox-list">
      ${renderMailboxList()}
    </ul>
  `;

  var container = document.querySelector('.mailbox-list-container');
  if (container != null) container.innerHTML = mailboxMenu;
}

function renderThreadList(currentMailbox) {
  var mailbox = store.mailboxes[currentMailbox];
  var threadIDs = mailbox.threadIds;
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

function renderThreadMenu(currentMailbox) {
  var inboxMenuContents = `
    <h2 class="email-header">${formatMailbox(currentMailbox)}</h2>
    <ul class="email-list">
      ${renderThreadList(currentMailbox)}
    </ul>
  `;

  var container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = inboxMenuContents;
}

function formatSender(sender) {
  return sender.split(" \\")[0];
}

function formatMailbox(mailbox) {
  var removeCatLabel = mailbox.replace('CATEGORY_','');
  var makeLower = removeCatLabel.toLowerCase();
  var capFirst = makeLower.charAt(0).toUpperCase();
  var minusFirst = makeLower.slice(1);

  return capFirst + minusFirst;
}


function addClickHandler() {
  var buttons = document.querySelectorAll('[data-mailbox]');

  buttons.forEach((button) => {
    if(button.dataset.mailbox === 'INBOX'){
      var currentMailbox = button.dataset.mailbox;

      button.parentElement.classList.add('active');
      renderThreadList(currentMailbox);
      renderThreadMenu(currentMailbox);
    }

    button.addEventListener('click', (e) => {
      var currentButton = e.currentTarget;
      var currentMailbox = e.currentTarget.dataset.mailbox;

      buttons.forEach(button => button.parentElement.classList.remove('active'));
      currentButton.parentElement.classList.add('active');
      renderThreadList(currentMailbox);
      renderThreadMenu(currentMailbox);
    });
  });
}

renderMailboxList();
renderMailboxMenu();
addClickHandler();
