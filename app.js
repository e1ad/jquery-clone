$(function () {

    //console.log('is ready')

    const h1 = $('#clickMe');
    console.log(h1)


    const destroyers = h1.bind('click', function () {
        console.log('clicked');
        $(this).removeClass('testing-addClass');
    });

    h1.css('color', 'red')
        .css({
            'font-size': '20px'
        })
        .attr('data', 'test')
        .addClass('testing-addClass');

    $('#destroyEventListeners').bind('click', () => {
        console.log('destroyEventListeners clicked');

        destroyers();
    });

    let show = true;

    $('#toggle-comment').bind('click', function () {
        show ? h1.hide() : h1.show();
        show = !show;
    })

})
