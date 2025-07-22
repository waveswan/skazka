Package.describe({
    name: 'waveswan:skazka',
    version: '0.1.0',
    summary: 'Toast notifications for Meteor with Blaze',
    git: ''
});

Package.onUse(function(api) {
    api.versionsFrom('2.0');
    api.use([
        'ecmascript',
        'blaze-html-templates',
        'tracker',
        'reactive-var'
    ], 'client');

    // Важен порядок - сначала HTML, потом JS
    api.addFiles('client/skazka.html', 'client');
    api.addFiles('lib/skazka.js', 'client');
    api.addFiles('client/skazka.css', 'client');

    api.mainModule('client/skazka.js', 'client');
});