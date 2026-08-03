/* Global array holding the name of every saved invoice company (filled page by page) */
let inv_comp_indo_allFetchedData = [];

/* The newest names show up right away, the older ones keep loading in the background */
const invCompIndoNamesLoader = createInvNamesLoader({
    tableName: 'inv_comp_thai',
    contentColumn: 'inv_company_thai_content',
    orderColumn: 'inv_company_user_current_date',
    containerId: 'all_supabase_stored_inv_comp_indo_data_names_for_importing_data_div',
    namesStore: inv_comp_indo_allFetchedData,
    onNameClick: (clickedName) => inv_comp_indo_importContentForSelectedName(clickedName),
    /* Shown as "26__1584 Mr. Alsafran Fahad Ali", the same way the inv company app shows them */
    buildNameLabel: buildInvoiceNameLabelWithYear,
    cleanSearchText: cleanInvoiceNameSearchText
});
