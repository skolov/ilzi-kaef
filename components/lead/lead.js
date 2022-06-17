$(() => {
    const BLOCK_NAME = 'slider'
    const ELEMENT = {
        ROOT: BLOCK_NAME,
        CONTENT_BOX: 'slider__content',
        TOGGLER_LEFT: '.lead__slider-left',
        TOGGLER_RIGHT: '.lead__slider-right',
        CONTENT: 'slide',
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
    const $togglerLeft = $(SELECTOR.TOGGLER_LEFT)
    const $togglerRight = $(SELECTOR.TOGGLER_RIGHT)

    const sliderLength = $slides.length
    const lastSlideIdx = sliderLength - 1

    let activeSlideIdx

    init()

    function init() {
        $slides.hide()
        $slidesBox.show()
        changeActiveSlide(0)
    }

    function changeActiveSlide(idx) {
        $slides.eq(activeSlideIdx).hide()
        $slides.eq(idx).show()

        activeSlideIdx = idx
    }

    function nextSlide() {
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
