/* Page Load Header Fade Animation */
setTimeout(function () {
    document.getElementById('body').style.opacity = "1";
}, 100);






/* async function deletePastMonthRows() {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' }); // e.g., "April"

        // Month order for comparison (January = 0, December = 11)
        const monthOrder = {
            "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };

        // Fetch all rows from Supabase
        const { data: allRows, error: fetchError } = await supabase
            .from('inv_tax_indo')
            .select('*');

        if (fetchError) throw fetchError;

        // Filter rows where the month is 6 or more months in the past
        const rowsToDelete = allRows.filter(row => {
            if (!row.package_indo_last_month_date) return false;
            
            const rowMonth = row.package_indo_last_month_date.trim(); // e.g., "January"
            const currentMonthIndex = monthOrder[currentMonth];
            const rowMonthIndex = monthOrder[rowMonth];
            
            // Calculate the difference in months considering year boundaries
            let monthDifference;
            if (rowMonthIndex <= currentMonthIndex) {
                monthDifference = currentMonthIndex - rowMonthIndex;
            } else {
                // If row month is in previous year (e.g., current is January, row is November)
                monthDifference = (12 - rowMonthIndex) + currentMonthIndex;
            }


            
            // Only delete if the row's month is 6 or more months before current month
            return rowMonthIndex !== undefined && monthDifference >= 6;
        });

        // Delete each matching row
        for (const row of rowsToDelete) {
            const { error } = await supabase
                .from('inv_tax_indo')
                .delete()
                .eq('package_indo_user_current_date', row.package_indo_user_current_date);

            if (error) console.error('Delete failed:', error);
            else console.log(`Deleted: ${row.package_indo_last_month_date}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

// Check if today is the 6th, 7th, or 8th before running the function
function shouldRunCleanup() {
    const today = new Date();
    const currentDay = today.getDate(); // Returns day of the month (1-31)
    return [5, 6, 7, 8, 9, 10].includes(currentDay);
}

// Execute only if today is the 5th, 6th, 7th, 8th, 9th, or 10th
if (shouldRunCleanup()) {
    deletePastMonthRows();
} */









/* Code to reload the sounds to make sure there is no latency */
let clickSoundEffect = new Audio('click.ogg');
clickSoundEffect.preload = 'auto';

let successSoundEffect = new Audio('success.ogg');
successSoundEffect.preload = 'auto';

let errorSoundEffect = new Audio('error.ogg');
errorSoundEffect.preload = 'auto';

let isSoundEffectCooldown = false; // Flag to manage cooldown

function playSoundEffect(soundName) {

    if (isSoundEffectCooldown) return; // If in cooldown, do nothing

    isSoundEffectCooldown = true; // Set cooldown
    setTimeout(() => {
        isSoundEffectCooldown = false; // Reset cooldown after 150 milliseconds
    }, 150);



    let soundEffect;

    if (soundName === 'click') {
        soundEffect = clickSoundEffect;
    } else if (soundName === 'success') {
        soundEffect = successSoundEffect;
    } else if (soundName === 'error') {
        soundEffect = errorSoundEffect;
    }

    if (soundEffect) {
        soundEffect.currentTime = 0; // Ensure the audio plays from the start
        soundEffect.play();
    }
}























/* Function to open choosing pdf file name box */
function openPdfDownloadBox() {
    // Check if overlay already exists
    if (document.querySelector('.black_overlay')) {
        return; // Prevent the function from running if overlay is still present
    }

    // Get the name pdf file box
    let namePdfBoxDiv = document.getElementById('name_pdf_file_div');

    // Create overlay layer
    let overlayLayer = document.createElement('div');
    overlayLayer.className = 'black_overlay';
    document.body.appendChild(overlayLayer);

    // Show overlay layer with smooth opacity transition
    setTimeout(() => {
        overlayLayer.style.opacity = '1'; // Delayed opacity transition for smooth appearance
        // Slide to the center of the screen
        namePdfBoxDiv.style.transform = 'translate(-50%, -50%)';
    }, 100);








    if (new_or_imported_inv_company_variable !== 'new_invoice_company') {
        // Collect all inv_tax_number_p_class elements and join their innerText
        const invNumberElements = document.querySelectorAll('.inv_tax_number_p_class');
        const allInvNumbersArr = Array.from(invNumberElements).map(el => el.innerText.trim()).filter(Boolean);
        const allInvNumber = allInvNumbersArr.join(', ');


        let pdfName = '';

        if (document.getElementById('current_used_rev_number_p_id').innerText !== '') {
            // Build PDF name
            pdfName = `Inv Tax Thailand VID${document.getElementById('current_used_rev_number_p_id').innerText} For Inv ${allInvNumber}`;

        } else {
            // Build PDF name
            pdfName = `Inv Tax Thailand VID For Inv ${allInvNumber}`;
        }

        // Set file name
        document.getElementById('pdf_file_name_input_id').value = pdfName;
    }






    /* Function to hide the name pdf file box */
    overlayLayer.onclick = function () {
        // Hide edit/delete options div
        namePdfBoxDiv.style.transform = 'translate(-50%, -100vh)';

        // Hide overlay layer with opacity transition
        overlayLayer.style.opacity = '0';

        // Remove overlay and edit/delete div from DOM after transition
        setTimeout(() => {
            document.body.removeChild(overlayLayer);
            // Now that the overlay is removed, allow the function to be triggered again
        }, 300); // Match transition duration in CSS
    };
}
























/* Function to duplicate the clicked row */
function setupDuplicateOptions(targetClass, parentClass) {
    // Create the floating options menu
    const optionsMenu = document.createElement("div");
    optionsMenu.style.position = "absolute";
    optionsMenu.style.display = "none"; // Hide by default
    optionsMenu.style.zIndex = "1000";
    optionsMenu.style.background = "#fff";
    optionsMenu.style.border = "1px solid #ccc";
    optionsMenu.style.padding = "10px";
    optionsMenu.style.borderRadius = "5px";
    optionsMenu.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    optionsMenu.style.flexDirection = "row"; // Explicitly set row layout
    optionsMenu.style.gap = "10px"; // Add spacing between options
    optionsMenu.style.alignItems = "center"; // Align items vertically in the center

    const copyUpOption = document.createElement("div");
    copyUpOption.innerText = "Copy Up";
    copyUpOption.style.cursor = "pointer";
    copyUpOption.style.padding = "8px 10px";
    copyUpOption.style.textAlign = "center";
    copyUpOption.style.borderBottom = "1px solid #eee";
    copyUpOption.style.fontSize = "1.2rem";
    copyUpOption.style.color = "#ffffff";
    copyUpOption.style.backgroundColor = "darkblue";
    copyUpOption.style.borderRadius = "3px";
    copyUpOption.style.whiteSpace = "nowrap"; // Prevent text from wrapping
    copyUpOption.style.display = "inline-flex"; // Ensure options behave as inline-flex
    copyUpOption.style.margin = "0 5px"; // Add small margin on left and right

    const copyDownOption = document.createElement("div");
    copyDownOption.innerText = "Copy Down";
    copyDownOption.style.cursor = "pointer";
    copyDownOption.style.padding = "8px 10px";
    copyDownOption.style.textAlign = "center";
    copyDownOption.style.fontSize = "1.2rem";
    copyDownOption.style.color = "#ffffff";
    copyDownOption.style.backgroundColor = "darkgreen";
    copyDownOption.style.borderRadius = "3px";
    copyDownOption.style.whiteSpace = "nowrap"; // Prevent text from wrapping
    copyDownOption.style.display = "inline-flex"; // Ensure options behave as inline-flex
    copyDownOption.style.margin = "0 5px"; // Add small margin on left and right

    const deleteDivOption = document.createElement("div");
    deleteDivOption.innerText = "Delete";
    deleteDivOption.style.cursor = "pointer";
    deleteDivOption.style.padding = "8px 10px";
    deleteDivOption.style.textAlign = "center";
    deleteDivOption.style.fontSize = "1.2rem";
    deleteDivOption.style.color = "#ffffff";
    deleteDivOption.style.backgroundColor = "darkred"; // Use red for delete
    deleteDivOption.style.borderRadius = "3px";
    deleteDivOption.style.whiteSpace = "nowrap";
    deleteDivOption.style.display = "inline-flex";
    deleteDivOption.style.margin = "0 5px";

    optionsMenu.appendChild(copyUpOption);
    optionsMenu.appendChild(copyDownOption);
    optionsMenu.appendChild(deleteDivOption);
    document.body.appendChild(optionsMenu);

    let currentElement = null;

    document.querySelectorAll(`.${targetClass}`).forEach(element => {
        element.addEventListener("click", (e) => {
            if (activeMenu) activeMenu.style.display = "none";

            currentElement = e.target;

            const rect = currentElement.getBoundingClientRect();
            optionsMenu.style.left = `${rect.left}px`;
            optionsMenu.style.top = `${rect.bottom + window.scrollY}px`;

            optionsMenu.style.display = "block";
            activeMenu = optionsMenu;

            e.stopPropagation();
        });
    });

    document.addEventListener("click", (e) => {
        if (!optionsMenu.contains(e.target) && !e.target.classList.contains(targetClass)) {
            optionsMenu.style.display = "none";
            activeMenu = null;
        }
    });

    copyUpOption.addEventListener("click", () => {
        if (currentElement) {
            const parentDiv = currentElement.closest(`.${parentClass}`);
            if (parentDiv) {
                const clone = parentDiv.cloneNode(true);
                parentDiv.parentNode.insertBefore(clone, parentDiv);
            }
            optionsMenu.style.display = "none";
            activeMenu = null;

            /* Call a function to make all elements editable */
            makeDivContentEditable();



            // Call the function to apply the duplicate elements functionality
            setupDuplicateOptions("duplicate_this_element_class", "invoice_company_row_div_class");

        }
    });

    copyDownOption.addEventListener("click", () => {
        if (currentElement) {
            const parentDiv = currentElement.closest(`.${parentClass}`);
            if (parentDiv) {
                const clone = parentDiv.cloneNode(true);
                parentDiv.parentNode.insertBefore(clone, parentDiv.nextSibling);
            }
            optionsMenu.style.display = "none";
            activeMenu = null;

            /* Call a function to make all elements editable */
            makeDivContentEditable();


            // Call the function to apply the duplicate elements functionality
            setupDuplicateOptions("duplicate_this_element_class", "invoice_company_row_div_class");

        }
    });




    deleteDivOption.addEventListener("click", () => {
        if (currentElement) {
            const parentDiv = currentElement.closest(`.${parentClass}`); // Find the parent div
            if (parentDiv) {
                parentDiv.remove(); // Remove it from the DOM

                optionsMenu.style.display = "none";
                activeMenu = null;


                /* Call a function to make all elements editable */
                makeDivContentEditable();

                // Call the function to apply the duplicate elements functionality
                setupDuplicateOptions("duplicate_this_element_class", "invoice_company_row_div_class");
            }
        }
    });
}

























// Praper the overlay layer variable
let overlayLayer = null;

// Function to show the overlay
function showOverlay(clickedInputDropdownIdName) {

    // Disable scrolling
    document.documentElement.style.overflow = 'hidden';


    let clickedInputDropdown = document.getElementById(clickedInputDropdownIdName);

    // Store the reference to the last clicked input field
    lastClickedClintMovementsCityInput = document.getElementById(event.target.id);
    clickedInputDropdown.classList.add('show'); // Show the clicked input dropdown
    clickedInputDropdown.style.transition = 'transform 0.2s ease-in-out'; // Ensure transform transition is smooth

    overlayLayer = document.createElement('div'); // Create a new overlay element
    overlayLayer.className = 'black_overlay'; // Set the class name for styling
    overlayLayer.onclick = hideOverlay; // Set the click event listener to hide the overlay when clicked outside
    document.body.appendChild(overlayLayer); // Append overlay to the document body

    setTimeout(() => {
        overlayLayer.style.opacity = '1'; // Delayed opacity transition for smooth appearance
    }, 50);
}

// Function to hide the overlay and any visible dropdown
function hideOverlay() {

    // Re-enable scrolling
    document.documentElement.style.overflow = 'auto';


    // Check if any dropdown with the class name 'searchable_names_dropdown_class' is visible and hide it
    let visibleDropdown_1 = document.querySelector('.searchable_names_dropdown_class.show');
    if (visibleDropdown_1) {
        visibleDropdown_1.classList.remove('show'); // Remove 'show' class to hide dropdown
    }


    // Reset all 'searchable_names_dropdown_class' elements back to their default styling
    let dropdownDivElements = document.querySelectorAll('.searchable_names_dropdown_class');
    dropdownDivElements.forEach(dropdown => {
        dropdown.style.maxHeight = ''; // Reset maxHeight to default
        dropdown.style.minHeight = ''; // Reset minHeight to default
        dropdown.style.transition = ''; // Reset transition to default
    });

    // Hide the overlay if it exists
    if (overlayLayer) {
        overlayLayer.style.opacity = '0'; // Set opacity to 0 for smooth disappearance

        setTimeout(() => {
            if (overlayLayer) {
                document.body.removeChild(overlayLayer); // Remove overlay from DOM
                overlayLayer = null; // Reset overlay variable
            }
        }, 200); // Assuming 200ms is the duration of your opacity transition
    }
}











// Select all elements with the class 'search_bar_input_class'
let searchBarInputElements = document.querySelectorAll('.search_bar_input_class');

// Add event listeners to each search bar input element
searchBarInputElements.forEach(input => {

    // Add a click event listener to the input element
    input.addEventListener('click', () => {
        // Find the closest parent element with the class 'searchable_names_dropdown_class'
        let dropdownDiv = input.closest('.searchable_names_dropdown_class');

        // Set a smooth transition for the height property
        dropdownDiv.style.transition = 'height 0.1s ease-in-out';

        // Set the height of the dropdown div to 70vh when the search bar is clicked
        dropdownDiv.style.maxHeight = '70vh';
        dropdownDiv.style.minHeight = '70vh';
    });

    // Add an input event listener to the input element
    input.addEventListener('input', () => {
        // Get the trimmed and lowercased value of the input element
        let filter = input.value.trim().toLowerCase();

        // Split the input value into words for better matching
        let filterWords = filter.split(/\s+/); // Split by any whitespace

        // Find the closest parent element with the class 'searchable_names_dropdown_class'
        let dropdownDiv = input.closest('.searchable_names_dropdown_class');

        // Select all <h3> elements within the same dropdown div
        let options = dropdownDiv.querySelectorAll('h3');

        // Function to count occurrences of a word in a string
        let countOccurrences = (text, word) => {
            return text.split(word).length - 1;
        };

        // Initialize a counter for the number of visible options
        let visibleCount = 0;

        // Loop through each option in the dropdown
        options.forEach(option => {
            // Get the trimmed and lowercased text content of the option
            let optionText = option.textContent.trim().toLowerCase();

            // Check if all filter words are present in the option text with the same or more occurrences
            let matches = filterWords.every(word => {
                // Count occurrences of the word in the input and in the option text
                let inputWordCount = countOccurrences(filter, word);
                let optionWordCount = countOccurrences(optionText, word);

                // The word in the option text must appear at least as many times as in the input
                return optionWordCount >= inputWordCount;
            });

            // If the filter is empty and less than 6 options are visible, show the option
            if (filter === '' && visibleCount < 6) {
                option.style.display = 'block'; // Display the option
                visibleCount++; // Increment the visible options count
            }
            // If the option text includes all words from the filter with the correct occurrence count, show the option
            else if (matches) {
                option.style.display = 'block'; // Display the option
            }
            // Otherwise, hide the option
            else {
                option.style.display = 'none'; // Hide the option
            }
        });
    });
});







/* Function to make all elements innerText editable */
makeDivContentEditable = function () {
    const parentDiv = document.getElementById('whole_invoice_company_section_id');
    const childElements = parentDiv.querySelectorAll("p, pre");

    childElements.forEach(element => {
        element.setAttribute('contenteditable', true);

        element.addEventListener("focus", () => {
            element.style.outline = "none";
            element.style.border = "none";
        });

        element.addEventListener("blur", () => {
            element.style.outline = "";
            element.style.border = "";
        });

        element.addEventListener("input", () => {
            if (element.classList.contains("red_text_color_class")) {
                element.style.color = "black";
            }
        });

        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                const br = document.createElement("br");

                const selection = window.getSelection();
                const range = selection.getRangeAt(0);
                range.deleteContents(); // remove selected text if any
                range.insertNode(br);

                // Move caret after the <br>
                range.setStartAfter(br);
                range.setEndAfter(br);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        });
    });
};








/* Download the PDF file */
async function checkThePdfNameToDownload() {

    if (document.getElementById("pdf_file_name_input_id").value !== '') {

        // Play a sound effect
        playSoundEffect('success');


        /* Run a function to store the data in the google sheet */
        sendDataToSupabase()



        // Disable the button while processing
        const button = document.getElementById('check_pdf_name_button');
        button.style.pointerEvents = 'none';
        button.style.backgroundColor = 'gray';
        button.innerText = 'Great!';

        // Target all elements with the red text class
        const redTextElements = document.querySelectorAll('.red_text_color_class');

        // Store the original color and set the text color to black
        redTextElements.forEach(element => {
            element.dataset.originalColor = element.style.color; // Save original color
            element.style.color = 'black'; // Change to black for PDF
        });









        // Capture the div by ID
        const element = document.getElementById("whole_invoice_company_section_id");

        html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
        }).then(canvas => {
            const imgData = canvas.toDataURL("image/jpeg", 0.95);

            const imgWidthPx = canvas.width;
            const imgHeightPx = canvas.height;

            const pdfWidthMm = 210;      // A4 width
            const a4HeightMm = 297;      // A4 height
            const bottomPaddingMm = 10;  // Padding for tall content

            const pxPerMm = imgWidthPx / pdfWidthMm;
            const contentHeightMm = imgHeightPx / pxPerMm;

            // Add bottom padding only if height exceeds standard A4 height
            const pdfHeightMm = contentHeightMm > a4HeightMm
                ? contentHeightMm + bottomPaddingMm
                : a4HeightMm;

            const pdf = new jspdf.jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: [pdfWidthMm, pdfHeightMm]
            });

            // Position image at top-left, scaled to full width
            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidthMm, contentHeightMm);

            const fileName = document.getElementById('pdf_file_name_input_id').value || "invoice";
            pdf.save(`${fileName}.pdf`);
        });




















        // Restore original red color after download
        redTextElements.forEach(element => {
            element.style.color = element.dataset.originalColor || 'red';
        });











    } else {
        // Play a sound effect
        playSoundEffect('error');

        const button = document.getElementById('check_pdf_name_button');

        // Change background to red gradient
        button.style.background = 'rgb(125, 46, 46)';

        setTimeout(() => {
            // Change background back to green gradient after 1 second
            button.style.background = '#4CAF50';
        }, 500);

    }
}










const printLatestFullMonthName = () => {
    const div = document.getElementById("invoice_company_main_table_div_id");
    if (!div) {
        console.warn("Div not found");
        return;
    }

    const text = div.innerText;

    const monthReplacements = {
        "Jan": "Jan", "Feb": "Feb", "Mar": "Mar", "Apr": "Apr",
        "Mei": "May", "May": "May", "Jun": "Jun", "Jul": "Jul",
        "Agu": "Aug", "Aug": "Aug", "Sep": "Sep", "Okt": "Oct",
        "Oct": "Oct", "Nov": "Nov", "Des": "Dec", "Dec": "Dec"
    };

    const datePattern = /(\d{1,2}) (\w{3}) (\d{4})|(\d{1,2}) - (\d{1,2}) (\w{3}) (\d{4})|(\d{1,2}) (\w{3}) - (\d{1,2}) (\w{3}) (\d{4})/g;

    let match;
    let latestDate = null;

    while ((match = datePattern.exec(text)) !== null) {
        let day, month, year;

        if (match[1] && match[2] && match[3]) {
            // Format: "21 Jan 2026"
            day = match[1];
            month = monthReplacements[match[2]] || match[2];
            year = match[3];
        } else if (match[4] && match[5] && match[6] && match[7]) {
            // Format: "3 - 8 Dec 2025"
            day = match[5]; // last day
            month = monthReplacements[match[6]] || match[6];
            year = match[7];
        } else if (match[8] && match[9] && match[10] && match[11] && match[12]) {
            // Format: "8 Dec - 1 Jan 2026"
            day = match[10]; // last day
            month = monthReplacements[match[11]] || match[11];
            year = match[12];
        }

        if (day && month && year) {
            const parsedDate = new Date(`${month} ${day}, ${year}`);
            if (!latestDate || parsedDate > latestDate) {
                latestDate = parsedDate;
            }
        }
    }

    if (latestDate) {
        const fullMonth = latestDate.toLocaleString("en-US", { month: "long" });
        const year = latestDate.getFullYear();
        const result = `${fullMonth} ${year}`;
        console.log("Latest Month-Year:", result);
        return result;
    }

    // if no date is found then return current user month and year
    const now = new Date();
    const currentMonth = now.toLocaleString("en-US", { month: "long" });
    const currentYear = now.getFullYear();
    const fallbackResult = `${currentMonth} ${currentYear}`;
    console.log("Fallback to Current Month-Year:", fallbackResult);
    return fallbackResult;
};




















// Function to import content for selected name
const inv_comp_indo_importContentForSelectedName = (clickedGoogleSheetDataName) => {

    playSoundEffect('click');

    if (clickedGoogleSheetDataName.style.backgroundColor === 'rgb(0, 155, 0)') {


        // Set the background color and text color of the clicked <h3> element
        clickedGoogleSheetDataName.style.backgroundColor = 'white';
        clickedGoogleSheetDataName.style.color = 'black';





        /* Set Today's Date */
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()];
        const year = today.getFullYear();

        document.getElementById("today_inv_company_date_p_id").innerText = `Date: ${day} ${month} ${year}`;





    } else {

        // Set the background color and text color of the clicked <h3> element
        clickedGoogleSheetDataName.style.backgroundColor = 'rgb(0, 155, 0)';
        clickedGoogleSheetDataName.style.color = 'white';
    }
};




/* Function to import the multiple inv tax (using saved inv company) */
const importMultipleSelectedInvCompIndoObjects = () => {
    const mainTableDiv = document.getElementById("invoice_company_main_table_div_id");
    const container = document.getElementById("all_supabase_stored_inv_comp_indo_data_names_for_importing_data_div");
    const h3Elements = container.querySelectorAll("h3");

    const selectedH3s = Array.from(h3Elements).filter(h3 =>
        window.getComputedStyle(h3).backgroundColor === "rgb(0, 155, 0)"
    );

    // Prepare an array to hold all rows' HTML
    let rowsHTML = "";

    selectedH3s.forEach(h3 => {
        const trimmedName = h3.innerText.trim();
        const matchedObject = inv_comp_indo_allFetchedData.find(obj => obj.name === trimmedName);

        if (matchedObject) {
            playSoundEffect('success');

            // Parse the imported HTML content
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = matchedObject.content;

            // Extract Invoice Number
            let invNumber = tempDiv.querySelector("#current_used_inv_number_span_id")?.innerText.trim() || "";

            // Extract Guest Name without surrounding parentheses
            let guestName = tempDiv.querySelector("#current_used_guest_name_p_id")?.innerText.trim() || "";
            guestName = guestName.replace(/^\((.*)\)$/, "$1").trim();


            // Extract all hotel date ranges
            const dateElements = tempDiv.querySelectorAll(".hotel_check_in_out_date_class");
            const dateRanges = Array.from(dateElements).map(p => p.innerText.trim());

            // Find first and last date for the period
            let allDates = [];
            dateRanges.forEach(range => {
                // Try to match "3 - 8 Dec 2025" or "8 Dec 2025"
                let match = range.match(/(\d{1,2})\s*-\s*(\d{1,2})\s*([A-Za-z]+)\s*(\d{4})/);
                if (match) {
                    const [, start, end, month, year] = match;
                    allDates.push(new Date(`${month} ${start}, ${year}`));
                    allDates.push(new Date(`${month} ${end}, ${year}`));
                } else {
                    // Try to match "8 Dec 2025"
                    let matchSingle = range.match(/(\d{1,2})\s*([A-Za-z]+)\s*(\d{4})/);
                    if (matchSingle) {
                        const [, day, month, year] = matchSingle;
                        allDates.push(new Date(`${month} ${day}, ${year}`));
                    }
                }
            });
            allDates = allDates.filter(d => !isNaN(d));
            allDates.sort((a, b) => a - b);

            let period = "";
            if (allDates.length > 0) {
                const first = allDates[0];
                const last = allDates[allDates.length - 1];
                const format = d => {
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = d.toLocaleString('en-US', { month: 'short' });
                    const year = d.getFullYear();
                    return `${day} ${month} ${year}`;
                };
                period = `${format(first)} - ${format(last)}`;
            }

            // Extract all unique cities (split comma-separated values, trim, deduplicate)
            const hotelCities = Array.from(tempDiv.querySelectorAll(".hotel_location_value_class"));
            const transportCities = Array.from(tempDiv.querySelectorAll(".transportation_cities_text_options_class"));
            // Flatten all city names, splitting on commas
            const allCities = hotelCities.concat(transportCities)
                .flatMap(p => p.innerText.split(","))
                .map(city => city.trim())
                .filter(city => city.length > 0);
            const citySet = new Set();
            const cityDisplayNames = [];
            allCities.forEach(city => {
                let cityKey = city.toLowerCase();
                if (city && !citySet.has(cityKey)) {
                    citySet.add(cityKey);
                    cityDisplayNames.push(city);
                }
            });
            console.log('Extracted unique cities:', cityDisplayNames);
            const cityList = cityDisplayNames.join(", ");



            // Build the row HTML
            rowsHTML += `
                <div class="invoice_company_row_div_class">
                    <div>
                        <p class="inv_tax_number_p_class">${invNumber}</p>
                    </div>
                    <div>
                        <p>${period}</p>
                    </div>
                    <div>
                        <p class="duplicate_this_element_class">${guestName}</p>
                    </div>
                    <div>
                        <p>${cityList}</p>
                    </div>
                    <div style="border-right: 0.5px solid black;">
                        <p class="inv_rest_payment_or_deposit_number_p_class red_text_color_class">000</p>
                    </div>
                </div>
            `;
        } else {
            playSoundEffect('error');
        }
    });

    // Replace the content of the main table div
    mainTableDiv.innerHTML = rowsHTML;

    // Append the total row with the exact structure as in the HTML
    const totalRow = `
        <div class="invoice_company_row_div_class last_invoice_company_row_div_class">
            <div>
                <p class="duplicate_this_element_class">TOTAL</p>
            </div>
            <div id="inv_tax_total_price_div_id" style="border-right: 0.5px solid black;">
                <p style="padding: 5px 0">
                    SAR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="aotumaticTotalPriceSpan">0</span>
                </p>
            </div>
        </div>
    `;
    mainTableDiv.innerHTML += totalRow;

    // Ensure all .inv_rest_payment_or_deposit_number_p_class elements have '000' as initial value
    document.querySelectorAll('.inv_rest_payment_or_deposit_number_p_class').forEach(el => {
        el.innerText = '000';
    });

    // Function to update the total price
    function updateAutomaticTotalPrice() {
        const numberElements = document.querySelectorAll('.inv_rest_payment_or_deposit_number_p_class');
        let total = 0;
        numberElements.forEach(el => {
            // Remove commas and spaces, parse as float
            let value = parseFloat(el.innerText.replace(/,/g, '').replace(/\s/g, ''));
            if (!isNaN(value)) {
                total += value;
                // Only format if the element is not currently being edited
                if (!el.matches(':focus')) {
                    if (value === 0) {
                        el.innerText = '000';
                    } else {
                        el.innerText = value.toLocaleString();
                    }
                }
            } else {
                if (!el.matches(':focus')) {
                    el.innerText = '000';
                }
            }
        });

        // Tax calculation
        let tax = 0;
        if (total > 7000) {
            tax = 50;
        } else if (total >= 4000 && total <= 7000) {
            tax = 40;
        } else {
            tax = 25;
        }

        let totalWithTax = total - tax;
        if (totalWithTax < 0) {
            totalWithTax = 0;
        }

        const totalSpan = document.getElementById('aotumaticTotalPriceSpan');
        if (totalSpan) {
            totalSpan.textContent = totalWithTax === 0 ? '000' : totalWithTax.toLocaleString();
        }
    }

    // Attach event listeners to all editable number elements
    const numberElements = document.querySelectorAll('.inv_rest_payment_or_deposit_number_p_class');
    numberElements.forEach(el => {
        el.addEventListener('input', updateAutomaticTotalPrice);

        // Format on blur (when user finishes editing)
        el.addEventListener('blur', () => {
            let value = parseFloat(el.innerText.replace(/,/g, '').replace(/\s/g, ''));
            if (!isNaN(value)) {
                if (value === 0) {
                    el.innerText = '000';
                } else {
                    el.innerText = value.toLocaleString();
                }
            } else {
                el.innerText = '000';
            }
        });

        // Handle focus to allow right-to-left typing
        el.addEventListener('focus', () => {
            // Don't clear the '000' - let user see it and start typing over it
            // The cursor will be at the beginning, so typing will naturally replace the content
        });
    });

    // Initial calculation
    updateAutomaticTotalPrice();

    // Optionally, re-apply editable and floating options functionality if needed
    if (typeof makeDivContentEditable === 'function') makeDivContentEditable();
    if (typeof setupDuplicateOptions === 'function') setupDuplicateOptions("duplicate_this_element_class", "invoice_company_row_div_class");

    // Setup drag and drop functionality
    setupDragAndDrop();



    /* Set Today's Date */
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][today.getMonth()];
    const year = today.getFullYear();

    document.getElementById("today_inv_company_date_p_id").innerText = `Date: ${day} ${month} ${year}`;



    /* Make the value of the 'new_or_imported_inv_company_variable' to tell the system we're editing now */
    new_or_imported_inv_company_variable = 'imported_inv_company';



    hideOverlay();
};






setTimeout(() => {
    inv_comp_indo_loadAllData();
}, 500);

// Drag and Drop functionality for invoice rows
function setupDragAndDrop() {
    const container = document.getElementById('invoice_company_main_table_div_id');
    const rows = container.querySelectorAll('.invoice_company_row_div_class');
    let draggedElement = null;

    rows.forEach(row => {
        const firstDiv = row.querySelector('div:first-child');
        if (firstDiv) {
            firstDiv.draggable = true;
            firstDiv.style.cursor = 'grab';

            firstDiv.addEventListener('dragstart', (e) => {
                draggedElement = row;
                e.dataTransfer.effectAllowed = 'move';
                row.style.opacity = '0.5';
            });

            firstDiv.addEventListener('dragend', (e) => {
                row.style.opacity = '1';
                draggedElement = null;
            });
        }
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const dragoverRow = e.target.closest('.invoice_company_row_div_class');
        if (dragoverRow && draggedElement !== dragoverRow) {
            const rect = dragoverRow.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;

            // Clear all previous indicators
            container.querySelectorAll('.invoice_company_row_div_class').forEach(row => {
                row.style.borderTop = '';
                row.style.borderBottom = '';
            });

            if (e.clientY < midpoint) {
                dragoverRow.style.borderTop = '2px solid #4fc3f7';
            } else {
                dragoverRow.style.borderBottom = '2px solid #4fc3f7';
            }
        }
    });

    container.addEventListener('dragleave', (e) => {
        const rows = container.querySelectorAll('.invoice_company_row_div_class');
        rows.forEach(row => {
            row.style.borderTop = '';
            row.style.borderBottom = '';
        });
    });

    container.addEventListener('drop', (e) => {
        e.preventDefault();
        const dropTarget = e.target.closest('.invoice_company_row_div_class');

        if (draggedElement && dropTarget && draggedElement !== dropTarget) {
            const rect = dropTarget.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;

            if (e.clientY < midpoint) {
                dropTarget.parentNode.insertBefore(draggedElement, dropTarget);
            } else {
                dropTarget.parentNode.insertBefore(draggedElement, dropTarget.nextSibling);
            }

            // Clear border indicators
            const rows = container.querySelectorAll('.invoice_company_row_div_class');
            rows.forEach(row => {
                row.style.borderTop = '';
                row.style.borderBottom = '';
            });

            // Re-setup drag and drop for new elements
            setupDragAndDrop();

            // Re-apply editable functionality
            if (typeof makeDivContentEditable === 'function') makeDivContentEditable();
            if (typeof setupDuplicateOptions === 'function') setupDuplicateOptions("duplicate_this_element_class", "invoice_company_row_div_class");

            // Recalculate total after reordering
            if (typeof updateAutomaticTotalPrice === 'function') updateAutomaticTotalPrice();
        }
    });
}










// Make the invoice company logo image clickable to change its source
(function setupLogoImagePicker() {
    const logoImg = document.getElementById('inv_comp_logo');
    if (!logoImg) return;

    // Style cursor to indicate clickability
    logoImg.style.cursor = 'pointer';
    logoImg.title = 'Click to change logo';

    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // When the image is clicked, trigger the file input
    logoImg.addEventListener('click', function () {
        fileInput.value = '';
        fileInput.click();
    });

    // When a file is selected, update the image src
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                logoImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
})();