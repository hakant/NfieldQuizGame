var theme = {},
    withinTime = true,
    socket;

theme.settings = {
    colors: ["blue", "orange", "green", "yellow"]
}

theme.functions = {

    initializeSocketIo: function() {
        console.log("Initializing...");
        socket = io.connect('https://frill-crafter.hyperdev.space');

        socket.emit('answer-received', 4);

        socket.on('button-clicked', function(json) {

            var data = JSON.parse(json);

            var element = ((data.ControllerId - 1) * 4) + (data.ButtonId - 1);

            if (withinTime) {
                $(".answer.category").eq(element).click();
                $(`.avatar-${data.ControllerId - 1}`).addClass("answerIn");
            }

        });
    },
    hideScreen: function() {
        $("body").wrapInner('<div id="original-page" />');
    },
    quizScreen: function() {
        $screen = $('<div/>', {
                'class': 'quiz'
            }),
            $players = $('<div/>', {
                'class': 'players row'
            }).appendTo($screen),
            numberOfPlayers = $(".nn-grid-row").length,
            columnWidth = 12 / numberOfPlayers;

        $(".nn-grid-row").each(function(index, element) {
            playerNameText = ($(element).find("p .style-0").text()),
                playerNameScore = ($(element).find("p .style-1").text());
            $playerColumn = $('<div/>', {
                    'class': 'col-xs-' + columnWidth + ' playerColumn'
                }),
                $playerAvatar = $('<div/>', {
                    'class': 'playerAvatar avatar-' + index
                }).appendTo($playerColumn),
                $playerScore = $('<div/>', {
                    'class': 'playerScore'
                }).html("<span>" + playerNameScore + "</span>").appendTo($playerColumn),
                $playerName = $('<div/>', {
                    'class': 'playerName'
                }).text(playerNameText).appendTo($playerColumn);

            $playerColumn.appendTo($players);
        });

        $question = $('<div/>', {
                'class': 'question row'
            }).appendTo($screen),
            $questionText = $('<div/>', {
                'class': 'questionText col-xs-8'
            }).text($(".segment.active h2").text()).appendTo($question);

        numberOfAnswers = $(".answer-holder .answer").length;

        $answerContainer = $('<div/>', {
            'class': 'answers col-xs-4'
        }).appendTo($question);

        $(".categorylist").eq(0).find(".answer-holder .answer").each(function(index, element) {
            $answer = $('<div/>', {
                'class': 'answer ' + theme.settings.colors[index]
            }).html("<span>" + $(element).find(".style-0").text() + "</span>").appendTo($answerContainer);
        });

        $progress = $('<div/>', {
                'class': 'progress progress-striped active'
            }),
            $progressBar = $('<div/>', {
                'class': 'progress-bar progress-bar-info'
            }).css("width", "100%").appendTo($progress);

        $progress.appendTo($screen);

        $screen.appendTo("body");

        setInterval(function() {
            $(".progress-bar").css("width", "-=100");
        }, 100);

        setTimeout(function() {
            socket.emit('answer-received', 5);
        }, 8000);

        setTimeout(function() {
            withinTime = false;
            theme.functions.showCorrectAnswer();
        }, 11000);

        setTimeout(function() {
            $(".btn.button-next").click();
        }, 15000);

    },
    showCorrectAnswer: function() {
        var correctAnswer,
            thisTime;
        $(".categorylist").eq(0).each(function(index, element) {
            $(element).find(".label.scale input").each(function(i, e) {
                thisTime = $(e).val().split("-")[1];
                if (thisTime == 1) {
                    correctAnswer = i;
                    $(".answers .answer").eq(correctAnswer).addClass("answered");
                }
            });
        });

        //socket.emit('answer-received', correctAnswer );

    }
};

theme.init = function() {

    theme.functions.hideScreen();

    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.8/socket.io.min.js")
        .done(function() {
            console.log("Successfully loaded socket.io");

            theme.functions.initializeSocketIo();
            theme.functions.quizScreen();
        })
        .fail(function() {
            console.log("Faiiiil!");
        });

};
