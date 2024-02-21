(async () => {
    const token = document.querySelector('.js-notification-bulk-action form input').value;
    const notificationIds = [...document.querySelectorAll('.notifications-list-item:has(.octicon-git-pull-request-closed, .octicon-git-merge, .octicon-git-pull-request-draft)')].map(el => el.getAttribute('data-notification-id'));

    const formdata = new FormData();
    formdata.append('authenticity_token', token);
    for (const id of notificationIds) {
        formdata.append('notification_ids[]', id);
    }
    await fetch('/notifications/beta/archive', {
        method: 'POST',
        body: formdata
    });
    window.location.reload();
})()