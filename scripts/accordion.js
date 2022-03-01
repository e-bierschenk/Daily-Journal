
//TODO:  add closing of all other journal entries on click. element.classList.contains("journal__body--closed")

export const buildAccordion = () => {
    const headerEl = document.querySelectorAll(".journal__header")
    
    for (const entry of headerEl) {
        entry.addEventListener("click", 
            function(){ 
                    // navigates to the parent container and selects the journal body of the associated journal entry
                    // then toggles the display:none with journal__body--closed
                entry.parentElement.children[1].classList.toggle("journal__body--closed")
            }
        )
    }
}
