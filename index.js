document.addEventListener("DOMContentLoaded", () => {
    const teamScheduleContainer = document.getElementById("team-schedule");
    const scheduleSummaryContainer = document.getElementById("schedule-summary");
    const newMemberNameInput = document.getElementById("new-member-name");
    const addMemberButton = document.getElementById("add-member-btn");

    // --- Firebase Configuration --- 
    // IMPORTANT: Replace the placeholder values below with your actual Firebase project configuration.
    // You can find this in your Firebase project settings -> General -> Your apps -> Web app -> SDK setup and configuration.
    const firebaseConfig = {
        apiKey: "AIzaSyBqGizIbe_Mt7TeOikY3GymH673q5W6eJo",
        authDomain: "wfmperformance.firebaseapp.com",
        projectId: "wfmperformance",
        storageBucket: "wfmperformance.firebasestorage.app",
        messagingSenderId: "348421513930",
        appId: "1:348421513930:web:be2b241b43d9e6d8c58a33"
      };

    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
    } catch (e) {
        console.error("Firebase initialization error:", e);
        scheduleSummaryContainer.innerHTML = "<p style=\"color: red;\">Error initializing Firebase. Please check console and configuration.</p>";
        return; // Stop execution if Firebase fails to initialize
    }
    
    const db = firebase.firestore();
    const teamCollection = db.collection("teamMembers"); // Using 'teamMembers' as the collection name

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu"];

    // Function to get display text for status (e.g., wfh -> Home)
    function getStatusDisplayText(status) {
        switch (status) {
            case "wfh": return "Home";
            case "office": return "Office";
            case "off": return "Off";
            default: return "-";
        }
    }

    // Function to render the summary table
    function renderSummaryTable(team) {
        scheduleSummaryContainer.innerHTML = ""; // Clear previous table
        if (!team || team.length === 0) {
            scheduleSummaryContainer.innerHTML = "<p>No team members found in the database.</p>";
            return;
        }

        const table = document.createElement("table");
        table.classList.add("summary-table");

        // Table Header
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const nameHeaderCell = document.createElement("th");
        nameHeaderCell.textContent = "Name";
        headerRow.appendChild(nameHeaderCell);
        daysOfWeek.forEach(day => {
            const th = document.createElement("th");
            th.textContent = day;
            headerRow.appendChild(th);
        });

        // Table Body
        const tbody = table.createTBody();
        team.forEach(member => {
            const row = tbody.insertRow();
            const nameCell = row.insertCell();
            nameCell.textContent = member.name;

            daysOfWeek.forEach(day => {
                const cell = row.insertCell();
                const status = member.schedule && member.schedule[day] ? member.schedule[day] : "off"; // Default to off
                cell.textContent = getStatusDisplayText(status);
                cell.classList.add("status-cell", status);
            });
        });

        scheduleSummaryContainer.appendChild(table);
    }

    // Function to render detailed team schedules for management
    function renderDetailedSchedules(team) {
        teamScheduleContainer.innerHTML = ""; // Clear existing schedules
        if (!team) return; // Don't render if team data isn't loaded yet

        team.forEach(member => {
            const memberScheduleDiv = document.createElement("div");
            memberScheduleDiv.classList.add("member-schedule");
            memberScheduleDiv.setAttribute("data-id", member.id); // Use Firestore document ID

            // Member Header
            const memberHeader = document.createElement("div");
            memberHeader.classList.add("member-header");
            const nameHeading = document.createElement("h3");
            nameHeading.classList.add("member-name");
            nameHeading.textContent = member.name;
            // const removeButton = document.createElement("button");
            // removeButton.textContent = "Remove";
            // removeButton.classList.add("remove-btn");
            // removeButton.addEventListener("click", () => removeMember(member.id)); // Pass Firestore ID
            // memberHeader.appendChild(nameHeading);
            // memberHeader.appendChild(removeButton);

            // Weekly Schedule Grid (Detailed)
            const weeklyScheduleGrid = document.createElement("div");
            weeklyScheduleGrid.classList.add("weekly-schedule");

            daysOfWeek.forEach(day => {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day");

                const dayNamePara = document.createElement("p");
                dayNamePara.classList.add("day-name");
                dayNamePara.textContent = day;

                const statusDisplay = document.createElement("div");
                const currentStatus = member.schedule && member.schedule[day] ? member.schedule[day] : "off";
                statusDisplay.classList.add("status-display", currentStatus);
                statusDisplay.textContent = getStatusDisplayText(currentStatus);

                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("status-buttons");

                const wfhButton = createStatusButton("Home", "wfh-btn", () => updateStatus(member.id, day, "wfh"));
                const officeButton = createStatusButton("Office", "office-btn", () => updateStatus(member.id, day, "office"));
                const offButton = createStatusButton("Off", "off-btn", () => updateStatus(member.id, day, "off"));

                buttonContainer.appendChild(wfhButton);
                buttonContainer.appendChild(officeButton);
                buttonContainer.appendChild(offButton);

                dayDiv.appendChild(dayNamePara);
                dayDiv.appendChild(statusDisplay);
                dayDiv.appendChild(buttonContainer);
                weeklyScheduleGrid.appendChild(dayDiv);
            });

            memberScheduleDiv.appendChild(memberHeader);
            memberScheduleDiv.appendChild(weeklyScheduleGrid);
            teamScheduleContainer.appendChild(memberScheduleDiv);
        });
    }

    // Helper function to create status buttons
    function createStatusButton(text, className, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.classList.add("status-btn", className);
        button.addEventListener("click", onClick);
        return button;
    }

    // Function to update a member's status for a specific day in Firestore
    async function updateStatus(memberId, day, newStatus) {
        const memberRef = teamCollection.doc(memberId);
        const updateData = {};
        updateData[`schedule.${day}`] = newStatus; // Use dot notation to update nested field

        try {
            await memberRef.update(updateData);
            console.log(`Status updated for ${memberId} on ${day} to ${newStatus}`);
            // UI will update automatically via the onSnapshot listener
        } catch (error) {
            console.error("Error updating status: ", error);
            alert("Failed to update status. Please try again.");
        }
    }

    // Function to add a new member to Firestore
    async function addMember() {
        const name = newMemberNameInput.value.trim();
        if (name) {
            const defaultSchedule = {};
            daysOfWeek.forEach(day => {
                defaultSchedule[day] = "office"; // Default to Office
            });

            const newMember = {
                name: name,
                schedule: defaultSchedule
            };

            try {
                await teamCollection.add(newMember);
                console.log(`Member ${name} added.`);
                newMemberNameInput.value = ""; // Clear input
                // UI will update automatically via the onSnapshot listener
            } catch (error) {
                console.error("Error adding member: ", error);
                alert("Failed to add member. Please try again.");
            }
        } else {
            alert("Please enter a member name.");
        }
    }

    // Function to remove a member from Firestore
    // async function removeMember(memberId) {
    //     if (confirm("Are you sure you want to remove this member and their schedule?")) {
    //         try {
    //             await teamCollection.doc(memberId).delete();
    //             console.log(`Member ${memberId} removed.`);
    //             // UI will update automatically via the onSnapshot listener
    //         } catch (error) {
    //             console.error("Error removing member: ", error);
    //             alert("Failed to remove member. Please try again.");
    //         }
    //     }
    // }

    // --- Real-time Listener --- 
    // Listen for changes in the teamMembers collection
    teamCollection.orderBy("name").onSnapshot(snapshot => {
        const team = [];
        snapshot.forEach(doc => {
            team.push({ id: doc.id, ...doc.data() });
        });
        console.log("Data fetched/updated from Firestore:", team);
        renderSummaryTable(team);
        renderDetailedSchedules(team);
    }, error => {
        console.error("Error fetching team data: ", error);
        scheduleSummaryContainer.innerHTML = "<p style=\"color: red;\">Error fetching schedule data. Please check console.</p>";
        teamScheduleContainer.innerHTML = ""; // Clear detailed view on error
    });

    // Event listeners for adding member
    addMemberButton.addEventListener("click", addMember);
    newMemberNameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addMember();
        }
    });

});
