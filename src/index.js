import store from './store';

function renderMailboxList() {
  var mailboxes = Object.keys(store.mailboxes);

  return mailboxes.map(function(mailbox){
    return `
    <li>
      <button class="menu-item" type="button" data-mailbox="${mailbox}">${mailbox}</button>
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

function addClickHandler() {
  var buttons = document.querySelectorAll('[data-mailbox]');

  buttons.forEach(function(button){
    if(button.dataset.mailbox === 'INBOX'){
      button.classList.add('active');
      renderThreadList(button.dataset.mailbox);
    }

    button.addEventListener('click', function(e){
      buttons.forEach(button => button.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });
}

renderMailboxList();
renderMailboxMenu();
addClickHandler();

renderInboxMenu();



/*

if (e.currentTarget instanceof HTMLElement) {
  state.selectedMailbox = e.currentTarget.dataset.mailbox;
}







	$('.category-list .category-item').click(function(){
		var buttonSelect = $('.category-select .category-item');
		var allList = $('.category-list');
		var catSpecific = $('.category-details');
		var catSelect = $('.category-select');

		var me = $(this);
		var category = me.data('category');

		allList.hide();
		catSpecific.children().hide();
		catSpecific.children().filter(function() {
			return $(this).data('category') === category;
		}).show();
		catSpecific.show();

		catSelect.addClass('active');

		mapState(me);
		var note = me.data('label');
		console.log(me, note);

		buttonSelect.removeClass('active');
		buttonSelect.filter(function() {
			return $(this).data('category') === category;
		}).addClass('active');
	});




	// change state of graph based on all or specific category showing
	function mapState(toggle){
		var currentGraphCat = $(toggle.attr('data-target'));
		var assignments = currentGraphCat.find('.assignment-bar');
		var graph = $('.grade-graph');
		var graphCat = $('.category-graph');

		if(toggle.data('target') === 'all'){
			graph.removeClass('active-category');
			graphCat.removeClass('active');
		} else {
			graphCat.not(currentGraphCat).removeClass('active').addClass('collapsed');
			currentGraphCat.addClass('active').removeClass('collapsed');
			graph.addClass('active-category');
			console.log(currentGraphCat);
		}

		gb.update_graph();
	}
*/