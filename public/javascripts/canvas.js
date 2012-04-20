var api_url = 'https://api-dev.bugzilla.mozilla.org/1.1',
    bug_url = 'https://bugzilla.mozilla.org/show_bug.cgi?id=';

var get_bug_url = function(bug) {
    return bug_url + bug.id;
};

window.addEvent('domready', function() {
    var search_f = document.id('search_form');
    var results_el = document.id('results');
    if (search_f && results_el) {
        var search_r = new Request.JSON({
            url: api_url + '/bug',
            method: 'GET',
            urlEncoded: false,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            useSpinner: true,
            spinnerTarget: 'search_submit',
            onSuccess: function(response) {
                response.bugs.each(function(bug) {
                    var className = bug.status;
                    if (bug.priority && bug.priority != '--') 
                        className += ' ' + bug.priotity;
                    new Element('a', {
                        href: get_bug_url(bug),
                        target: '_new',
                        text: bug.summary,
                    }).inject(
                        new Element('li', {
                            'class': className
                        }).inject(results_el));
                });
            }
        })

        search_f.addEvent('submit', function(e) {
            if (e) e.stop();

            search_r.send('limit=10&summary=' + document.id('query').get('value'));
        });
    }
});
