/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const journalEntryComponent = (entry) => {
    return `
        <article class="journal__entry" id="entry--${entry.id}">
        <div class="journal__header">
            <h2>Concepts: ${entry.concept}</h2>
            <h3>Mood: ${entry.mood}</h3>
        </div>
        <p class="journal__body">${entry.entry}</p>
    `
}