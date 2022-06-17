$(() => {
    const BLOCK_NAME = 'popup'
    const ELEMENT = {
        ROOT: BLOCK_NAME,
        VIDEO: `${BLOCK_NAME}__video`,
        BTNPLAY: `${BLOCK_NAME}__play`,
    }

    const SELECTOR = {
        ROOT: `.${ELEMENT.ROOT}`,
        VIDEO: `.${ELEMENT.VIDEO}`,
        BTNPLAY: `.${ELEMENT.BTNPLAY}`,
    }

    const MODIFIER = {
        OPENED: 'model-open',
        PLAYSHOW: 'play-show',
    }

    const $root = $(SELECTOR.ROOT)
    const $video = $(SELECTOR.VIDEO)
    const $btnPlay = $(SELECTOR.BTNPLAY)

    $('.video__image-wrapper').on('click', function() {
        $($root).addClass(MODIFIER.OPENED)
        $($btnPlay).addClass(MODIFIER.PLAYSHOW)
    })
    $('.popup__btn-close, .popup__overlay').click(function(){
        $($root).removeClass(MODIFIER.OPENED)
        $($video).get(0).pause()
    })
    $($btnPlay).on('click', function() {
        $($video).get(0).play()
        $($btnPlay).removeClass(MODIFIER.PLAYSHOW)
        $($video).click(function() {
            this.paused ? this.play() : this.pause()
        })
    })
})
