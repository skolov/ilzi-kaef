$(() => {
    const BLOCK_NAME = 'large-slider'
    const ELEMENT = {
        ROOT: BLOCK_NAME,
        CONTENT_BOX: 'large-slider__content',
        TOGGLER_LEFT: '.large-slider__right-arrow',
        TOGGLER_RIGHT: '.large-slider__left-arrow',
        CONTENT: 'large-slider__slide',
    }

    const SELECTOR = {
        ROOT: `.${ELEMENT.ROOT}`,
        CONTENT_BOX: `.${ELEMENT.CONTENT_BOX}`,
        TOGGLER_LEFT: `${ELEMENT.TOGGLER_LEFT}`,
        TOGGLER_RIGHT: `${ELEMENT.TOGGLER_RIGHT}`,
        CONTENT: `.${ELEMENT.CONTENT}`,
    }

    const $root = $(SELECTOR.ROOT)
    const $slidesBox = $(SELECTOR.CONTENT_BOX, $root)
    const $slides = $(SELECTOR.CONTENT, $slidesBox)
    const $togglerLeft = $(SELECTOR.TOGGLER_LEFT, $root)
    const $togglerRight = $(SELECTOR.TOGGLER_RIGHT, $root)

    const sliderLength = $slides.length
    const lastSlideIdx = sliderLength - 1

    console.log(sliderLength)

    let activeSlideIdx

    init()

    function init() {
        $slides.hide()
        $slidesBox.show()
        changeActiveSlide(0)
    }

    function changeActiveSlide(idx) {
        console.log('kk')
        $slides.eq(activeSlideIdx).hide()
        $slides.eq(idx).show()

        activeSlideIdx = idx
    }

    function nextSlide() {
        console.log('right')
        if (activeSlideIdx <= 0) {
            changeActiveSlide(lastSlideIdx)
        } else {
            changeActiveSlide(activeSlideIdx - 1)
        }
    }

    function prevSlide() {
        if (activeSlideIdx >= lastSlideIdx) {
            changeActiveSlide(0)
        } else {
            changeActiveSlide(activeSlideIdx + 1)
        }
    }

    $togglerLeft.on({
        click: nextSlide,
    })

    $togglerRight.on({
        click: prevSlide,
    })
})
