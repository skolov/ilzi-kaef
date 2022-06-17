$(() => {
    const BLOCK_NAME = 'function'
    const ELEMENT = {
        ROOT: BLOCK_NAME,
        TABS: `${BLOCK_NAME}__tabs`,
        TAB: `${BLOCK_NAME}__tab`,
        CONTENT: `${BLOCK_NAME}__tab-content`,
        ACTLINEONE: `${BLOCK_NAME}__icon`,
    }

    const SELECTOR = {
        ROOT: `.${ELEMENT.ROOT}`,
        TABS: `.${ELEMENT.TABS}`,
        TAB: `.${ELEMENT.TAB}`,
        CONTENT: `.${ELEMENT.CONTENT}`,
        ACTLINEONE: `.${ELEMENT.ACTLINEONE}`,
    }

    const MODIFIER = {
        OPENED: 'is-open',
        ACTIVE: 'is-active',
    }

    const $root = $(SELECTOR.ROOT)
    const $tabsWrapper = $(SELECTOR.TABS, $root)
    const $tabs = $(SELECTOR.TAB, $tabsWrapper)
    const $tabsContent = $(SELECTOR.CONTENT, $root)
    const $lineOne = $(SELECTOR.ACTLINEONE, $root)

    console.log($lineOne, 'lineOne')

    $tabs.each(function () {
        const $tab = $(this)
        const triggerId = $tab.data().tabTrigger

        $tab.on({
            click: () => {
                $tabs.removeClass(MODIFIER.ACTIVE)
                $tab.addClass(MODIFIER.ACTIVE)

                $tabsContent.each(function () {
                    const $content = $(this)
                    const contentId = $content.data().tabContent
                    console.log(contentId, 'contentId')
                    console.log(triggerId, 'triggerId')

                    if (contentId === triggerId) {
                        $content.addClass(MODIFIER.OPENED)
                    } else {
                        $content.removeClass(MODIFIER.OPENED)
                    }
                })
            },
        })
    })
})
