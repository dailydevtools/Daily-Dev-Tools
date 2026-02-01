export const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Margaret", "Anthony", "Betty", "Donald", "Sandra", "Mark", "Ashley", "Paul", "Dorothy", "Steven", "Kimberly", "Andrew", "Emily", "Kenneth", "Donna", "Joshua", "Michelle", "George", "Carol", "Kevin", "Amanda", "Brian", "Melissa", "Edward", "Deborah"];
export const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
export const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "company.com", "example.com", "test.org"];
export const streets = ["Maple", "Oak", "Cedar", "Pine", "Elm", "Washington", "Lake", "Hill", "Main", "Park", "View", "Sunset", "Broadway", "Highland", "Mill", "Spring", "North", "Ridge", "Church", "Willow"];
export const streetTypes = ["St", "Ave", "Rd", "Blvd", "Ln", "Dr", "Ct", "Way", "Cir", "Pkwy"];
export const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco", "Indianapolis", "Seattle", "Denver", "Washington"];
export const countries = ["USA", "Canada", "UK", "Australia", "Germany", "France", "Japan", "China", "India", "Brazil", "Mexico", "Italy", "Spain", "Russia", "South Korea", "Netherlands", "Turkey", "Switzerland", "Sweden", "Poland"];
export const companies = ["Acme Corp", "Globex", "Soylent Corp", "Initech", "Umbrella Corp", "Stark Ind", "Wayne Ent", "Cyberdyne", "Massive Dynamic", "Hooli", "Pied Piper", "Aperture Science", "Black Mesa", "Tyrell Corp", "Oscorp", "LexCorp", "Dharma", "Delos", "Virtucon", "MomCorp"];
export const positions = ["Engineer", "Manager", "Director", "Developer", "Designer", "Analyst", "Consultant", "Specialist", "Administrator", "Coordinator", "Executive", "Supervisor", "Officer", "Technician", "Assistant", "Associate", "Lead", "Chief", "Head", "VP"];

export const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomData = (type: string) => {
    switch (type) {
        case 'firstName': return getRandom(firstNames);
        case 'lastName': return getRandom(lastNames);
        case 'fullName': return `${getRandom(firstNames)} ${getRandom(lastNames)}`;
        case 'email':
            const f = getRandom(firstNames).toLowerCase();
            const l = getRandom(lastNames).toLowerCase();
            return `${f}.${l}@${getRandom(domains)}`;
        case 'phone':
            return `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
        case 'address':
            return `${Math.floor(Math.random() * 9999) + 1} ${getRandom(streets)} ${getRandom(streetTypes)}`;
        case 'city': return getRandom(cities);
        case 'country': return getRandom(countries);
        case 'company': return getRandom(companies);
        case 'jobTitle': return `${getRandom(['Senior', 'Junior', 'Lead', 'Chief', ''])} ${getRandom(positions)}`.trim();
        case 'uuid':
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        case 'boolean': return Math.random() < 0.5;
        case 'date':
            const start = new Date(2020, 0, 1);
            const end = new Date();
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
        case 'amount': return (Math.random() * 10000).toFixed(2);
        default: return '';
    }
};
