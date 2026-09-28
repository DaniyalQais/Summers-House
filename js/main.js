(function ($) {
    "use strict";

    // Sticky Navbar
    function updateStickyNavbar() {
        if ($(window).scrollTop() > 5) {
            $('.navbar').addClass('sticky');
        } else if ($(window).width() >= 992) {
            $('.navbar').removeClass('sticky');
        }
    }

    $(document).ready(function () {
        updateStickyNavbar();
        $(window).trigger('scroll');
    });

    $(window).on('scroll', function () {
        updateStickyNavbar();

        // Back to top button
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Smooth scroll for in-page anchors, accounting for the fixed navbar
    $('a[href*="#"]').not('.back-to-top, [data-toggle]').on('click', function (e) {
        var hash = this.hash;
        if (!hash || hash === '#' || !$(hash).length) {
            return;
        }
        if (this.pathname !== window.location.pathname && this.pathname !== '') {
            return;
        }

        e.preventDefault();
        var offset = $(hash).offset().top - $('.navbar').outerHeight() - 15;

        $('html, body').animate({scrollTop: offset}, 800, 'easeInOutExpo', function () {
            $(hash).attr('tabindex', '-1').trigger('focus');
        });
    });

    // Collapse the mobile menu after picking a link
    $('#navbarCollapse').on('click', 'a', function () {
        if ($(window).width() < 992) {
            $('#navbarCollapse').collapse('hide');
        }
    });


    // Estimate forms are a design demo: no backend is wired up, so say so
    // instead of pretending the request was delivered.
    $(document).on('submit', '.estimate-form', function (e) {
        e.preventDefault();

        var form = $(this);
        var status = form.nextAll('.form-status').first();
        if (!status.length) {
            status = form.find('.form-status').first();
        }

        if (!this.checkValidity()) {
            status
                .text('Please fill in the required fields so we know how to reach you.')
                .addClass('is-visible is-error');
            form.find(':invalid').first().trigger('focus');
            return;
        }

        status
            .text('This is a design demo, so your request was not sent. On the live site this form will deliver your details straight to Summers House Care.')
            .removeClass('is-error')
            .addClass('is-visible');
    });

})(jQuery);
