const neededContainer = 3;
const listing = [
    {
        name: "Container renter A",
        container: 1,
        totalCost: 1
    },
    {
        name: "Container renter B",
        container: 2,
        totalCost: 1
    },
    {
        name: "Container renter C",
        container: 3,
        totalCost: 3
    },
]
const neededContainer2 = 10;
const listing2 = [
    {
        name: "Container renter A",
        container: 5,
        totalCost: 5
    },
    {
        name: "Container renter B",
        container: 2,
        totalCost: 10
    },
    {
        name: "Container renter C",
        container: 2,
        totalCost: 3
    },
]
const neededContainer3 = 3;
const listing3 = [
    {
        name: "Container renter A",
        container: 5,
        totalCost: 5
    },
    {
        name: "Container renter B",
        container: 2,
        totalCost: 10
    },
    {
        name: "Container renter C",
        container: 10,
        totalCost: 3
    },
]

function rentContainer(neededContainer, listing) {
    listing.sort((a, b) => (a.totalCost/a.container) - (b.totalCost/b.container));
  
    const results = [];
    let summary = 0;
    let notEnough = 0;
  
    for (const renter of listing) {
        if (neededContainer > 0) {
            results.push({
                name: renter.name,
                container: renter.container,
                totalCost: renter.totalCost,
            });
            neededContainer -= renter.container;
            summary += renter.totalCost;
        }
    }

    if(neededContainer > 0) {
        notEnough = 1;
    }
  
    return {
        results,
        summary,
        notEnough
    };
}

// Thay đổi listing ở đây ↧
const results = rentContainer(neededContainer, listing);
const rootDiv = document.getElementById("root");

const content = `
    <h2>Algorithm to rent cheapest containers</h2>
    <table>
        <tbody>
            ${results.results.map(r => `
                <tr>
                    <td>[Contract with] ${r.name} ${r.container} container, price: ${r.totalCost}</td>
                </tr>
            `).join("")}
        </tbody>
    </table>
    ${results.notEnough ? `<p>Not enough containers</p>` : ""}
    <p>[Summary] total cost ${results.summary}</p>
`;

rootDiv.innerHTML = content;

  
  