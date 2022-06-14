$('.video__image-wrapper').on('click', function() {
    $('.popup').addClass('model-open')
    $('.popup__play').addClass('play-show')
})
$('.popup__btn-close, .popup__overlay').click(function(){
    $('.popup').removeClass('model-open')
    $('.popup__video').get(0).pause()
})

$('.popup__play').on('click', function() {
    console.log('ddd')
    $('.popup__video').get(0).play()
    $('.popup__play').removeClass('play-show')
    $('.popup__video').click(function() {
        this.paused ? this.play() : this.pause()
    })
})
