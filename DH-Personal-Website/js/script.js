$(document).ready(function() {

    $('.content-23').each(function() {
        if(! isMobile.any())
            $(this).parallax('50%', 0.3, true);
        else
            $(this).css('background-attachment', 'initial');
    });
    (function(el) {
        $(window).resize(function() {
            if (!el.hasClass('ani-processed')) {
                el.data('scrollPos', el.offset().top - $(window).height() + el.outerHeight() - parseInt(el.css('padding-bottom'), 10));
            }
        }).scroll(function() {
            if (!el.hasClass('ani-processed')) {
                if ($(window).scrollTop() >= el.data('scrollPos')) {
                    el.addClass('ani-processed');
                }
            }
        });
    })($('#projectPortfolio'));
  // Bind to the click of all links with a #hash in the href
    $('a[href^="#"]').click(function(e) {
      // Prevent the jump and the #hash from appearing on the address bar
      e.preventDefault();
      // Scroll the window, stop any previous animation, stop on user manual scroll
      // Check https://github.com/flesler/jquery.scrollTo for more customizability
      $(window).stop(true).scrollTo(this.hash, {duration:1000, interrupt:true});
    });

    var prefix = 'I work with ';
    var skills = [
        'Python',
        'C#',
        'x86 ASM',
        'JavaScript',
        'HTML & CSS',
        'LESS',
        'jQuery',
        'Node.js',
        'SQL',
        'PHP & MySQL',
        'People'
    ].map(function (s) { return s + "."; });
    var delay = 10;
    var step = 1;
    var tail = 5;
    var timeout = 75;
    var p = document.getElementsByClassName("adapt-text")[0];
    var prefix_e = document.createElement('span');
    prefix_e.className = "m-line";
    var postfix_e = document.createElement('span');
    // postfix_e.className = "m-line";

    var colors = [
      "#c0392b",
    ];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function getRandomChar() {
        return String.fromCharCode(Math.random() * (127 - 33) + 33);
    }
    function getRandomColoredString(n) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < n; i++) {
            var char = document.createElement('span');
            char.textContent = getRandomChar();
            char.style.color = getRandomColor();
            fragment.appendChild(char);
        }

        return fragment;
    }
    /** Global State */
    var state = {
        text: '',
        prefixP: -tail,
        skillI: 0,
        skillP: 0,
        direction: 'forward',
        delay: delay,
        step: step
    };
    function render() {
        var skill = skills[state.skillI];
        if (state.step) {
            state.step--;
        }
        else {
            state.step = step;
            if (state.prefixP < prefix.length) {
                if (state.prefixP >= 0) {
                    state.text += prefix[state.prefixP];
                }
                state.prefixP++;
            }
            else {
                if (state.direction === 'forward') {
                    if (state.skillP < skill.length) {
                        state.text += skill[state.skillP];
                        state.skillP++;
                    }
                    else {
                        if (state.delay) {
                            state.delay--;
                        }
                        else {
                            state.direction = 'backward';
                            state.delay = delay;
                        }
                    }
                }
                else {
                    if (state.skillP > 0) {
                        state.text = state.text.slice(0, -1);
                        state.skillP--;
                    }
                    else {
                        state.skillI = (state.skillI + 1) % skills.length;
                        state.direction = 'forward';
                    }
                }
            }
        }
        prefix_e.textContent = state.text.slice(0,prefix.length)
        postfix_e.textContent = state.text.slice(prefix.length,state.text.length)
        p.textContent = "";
        p.appendChild(prefix_e);
        p.appendChild(postfix_e);
        p.appendChild(getRandomColoredString(state.prefixP < prefix.length ?
            Math.min(tail, tail + state.prefixP) :
            Math.min(tail, skill.length - state.skillP)));
        setTimeout(render, timeout);
    }
    setTimeout(render, 500);
});
