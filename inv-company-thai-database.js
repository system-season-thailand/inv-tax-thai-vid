// Global array to store all fetched data
let inv_comp_indo_allFetchedData = [];

const inv_comp_indo_fetchBatchFromSupabase = async () => {
    const { data, error } = await supabase
        .from('inv_comp_thai')
        .select('*')
        .range(0, 10000);

    if (error) {
        console.error("❌ Error fetching data from Supabase:", error);
        return;
    }

    inv_comp_indo_allFetchedData = data.map(row => ({
        name: row.name?.trim(),
        content: row.inv_company_thai_content?.trim()
    }));

};

const inv_comp_indo_loadAllData = async () => {
    const container = document.getElementById("all_supabase_stored_inv_comp_indo_data_names_for_importing_data_div");

    if (!container) {
        console.error("❌ Could not find #all_supabase_stored_inv_comp_indo_data_names_for_importing_data_div");
        return;
    }

    container.innerHTML = '';

    await inv_comp_indo_fetchBatchFromSupabase(); // assumes it fills inv_comp_indo_allFetchedData globally


    const allDataSet = new Set();
    const batchHTMLElements = [];

    inv_comp_indo_allFetchedData.forEach(row => {
        if (row.name && !allDataSet.has(row.name)) {
            allDataSet.add(row.name);

            const h3 = document.createElement("h3");
            h3.textContent = row.name;
            h3.setAttribute('data-original-name', row.name);
            
            h3.onclick = function () {
                inv_comp_indo_importContentForSelectedName(this);
            };

            batchHTMLElements.push(h3);
        }
    });

    if (batchHTMLElements.length === 0) {
        console.warn("⚠️ No unique entries found to display.");
    } else {
        // Reverse the order before appending
        batchHTMLElements.reverse().forEach(el => {
            container.appendChild(el);
        });
    }

    // Optional: trigger input filter if any
    document.querySelectorAll('.search_bar_input_class').forEach(input => {
        if (input.value.trim()) {
            let event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        }
    });
};
















